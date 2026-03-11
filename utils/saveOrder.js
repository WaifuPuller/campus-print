import { getFirestore, collection, setDoc, doc }
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js"

import { getStorage, ref, uploadBytes, getDownloadURL }
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js"

import { app } from "../firebase.js"

const db = getFirestore(app)
const storage = getStorage(app)

export async function saveOrder(payment){

const order = window.orderData

const location = localStorage.getItem("location")

const orderId = "CP"+Date.now()

const fileRef = ref(storage,
`orders/${location}/${orderId}.pdf`)

await uploadBytes(fileRef,window.selectedFile)

const url = await getDownloadURL(fileRef)

await setDoc(doc(db,"orders",orderId),{

orderId,

email:JSON.parse(localStorage.getItem("user")).email,

location,

printType:localStorage.getItem("printType"),

pages:order.pages,

copies:order.copies,

colorPages:order.colorPages,

bwPages:order.bwPages,

totalCost:order.totalCost,

paymentId:payment.razorpay_payment_id,

fileURL:url,

status:"pending",

createdAt:new Date()

})

}