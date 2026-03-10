const express = require("express")
const Razorpay = require("razorpay")
const cors = require("cors")
const crypto = require("crypto")

const app = express()

app.use(cors())
app.use(express.json())

// Debug logger
app.use((req,res,next)=>{
console.log("Incoming request:", req.method, req.url)
next()
})

// Razorpay instance
const razorpay = new Razorpay({
key_id: "rzp_live_SPcApXB3TXAvdO",
key_secret: "cwAXVtjwkFly2aUcbPDk3nEc"
})


// Create Razorpay Order
app.post("/create-order", async (req,res)=>{

try{

const { amount } = req.body

console.log("Amount received from frontend:", amount)

const options = {
amount: amount,
currency: "INR",
receipt: "receipt_"+Date.now()
}

const order = await razorpay.orders.create(options)

res.json(order)

}catch(err){

console.error(err)
res.status(500).send("Error creating order")

}

})


// Verify Payment
app.post("/verify-payment", (req,res)=>{

try{

const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body

const body = razorpay_order_id + "|" + razorpay_payment_id

const expectedSignature = crypto
.createHmac("sha256","cwAXVtjwkFly2aUcbPDk3nEc")
.update(body.toString())
.digest("hex")

if(expectedSignature === razorpay_signature){

res.json({status:"success"})

}else{

res.status(400).json({status:"failed"})

}

}catch(err){

console.error(err)
res.status(500).send("Verification failed")

}

})


app.listen(5000,()=>{
console.log("Server running on port 5000")
})