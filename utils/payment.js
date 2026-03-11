import { saveOrder } from "./utils/saveOrder.js"
window.startPayment = async function(){

const data = window.orderData

const res = await fetch("https://campus-print.onrender.com/create-order",{

method:"POST",
headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({
amount:data.totalCost*100
})

})

const order = await res.json()

const options = {

key:"rzp_live_SPcApXB3TXAvdO",

amount:order.amount,

currency:"INR",

order_id:order.id,

name:"Campus Print",

description:"Document Printing",

handler: async function(response){

try{

console.log("Payment success", response)

await saveOrder(response)

console.log("Order saved to Firebase")

go("success")

}catch(err){

console.error("Save order failed:", err)
alert("Order saving failed. Check console.")

}

}

}

const rzp = new Razorpay(options)

rzp.open()

}