import { getDownloadURL } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js"

import { go } from "./router.js"

import { storage, db } from "./firebase.js"

import { ref, uploadBytes } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js"

import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js"
window.startPayment = async function () {

const totalCost = window.totalCost

const res = await fetch("https://campus-print.onrender.com/create-order", {
method: "POST",
headers: {
"Content-Type": "application/json"
},
body: JSON.stringify({
amount: totalCost * 100
})
})

const order = await res.json()

const options = {

key: "rzp_live_SQbVfXkRlJtH3H",

amount: order.amount,
currency: "INR",
order_id: order.id,

name: "Campus Print",
description: "Document Printing",

handler: async function (response) {

try {

console.log("Payment success", response)

const file = window.selectedFile

if (!file) {
alert("File not found")
return
}

const storageRef = ref(storage, "orders/" + file.name)

await uploadBytes(storageRef, file)

const url = await getDownloadURL(storageRef)

await addDoc(collection(db, "orders"), {
file: file.name,
fileUrl: url,
pages: window.orderData.pages,
copies: window.orderData.copies,
printType: window.orderData.printType,
cost: window.orderData.totalCost,
date: new Date(),
paymentId: response.razorpay_payment_id
})

go("success")

} catch (error) {

console.error("Upload failed:", error)
alert("Error saving order")

}

}

}

const rzp = new Razorpay(options)
rzp.open()

}