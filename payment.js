window.startPayment = async function(){

const totalCost = window.totalCost

const res = await fetch("https://campus-print.onrender.com/create-order",{

method:"POST",
headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({
amount: totalCost * 100
})

})

const order = await res.json()

const options = {

key:"rzp_test_SQav0WvwuGdoJT",

amount:order.amount,
currency:"INR",
order_id:order.id,

name:"Campus Print",
description:"Document Printing",

handler: async function(response){

console.log("Payment success", response)

const file = window.selectedFile

const storageRef = ref(storage, "orders/" + file.name)

await uploadBytes(storageRef, file)

await addDoc(collection(db, "orders"), {
    file: file.name,
    pages: window.pageCount,
    cost: window.totalCost,
    date: new Date(),
    paymentId: response.razorpay_payment_id
})

go("success")

}

}

const rzp = new Razorpay(options)
rzp.open()

}