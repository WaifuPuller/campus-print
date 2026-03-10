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
key_id: process.env.RAZORPAY_KEY_ID,
key_secret: process.env.RAZORPAY_KEY_SECRET
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
.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
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


const PORT = process.env.PORT || 5000

app.listen(PORT,()=>{
console.log("Server running on port", PORT)
})