import { loadPage } from "./router.js"
import { login } from "./auth.js"
import "./payment.js"
window.go = loadPage
window.login = login

loadPage("login")

window.uploadNext = function(){

const file = document.getElementById("pdf").files[0]

if(!file){
alert("Upload PDF")
return
}

localStorage.setItem("copies",
document.getElementById("copies").value)

window.selectedFile = file

go("review")

}

window.loadReview = async function(){

const type = localStorage.getItem("printType")
const copies = parseInt(localStorage.getItem("copies"))

const file = window.selectedFile

if(!file){
document.getElementById("summary").innerText = "No file selected"
return
}

const pdf = await pdfjsLib.getDocument(URL.createObjectURL(file)).promise
const pages = pdf.numPages

let cost = 0

if(type === "ad"){

let first = Math.min(pages,5)
cost += first * 10

if(pages > 5){
cost += (pages-5) * 3
}

}
else if(type === "normal_bw"){
cost = pages * 3
}
else if(type === "normal_color"){
cost = pages * 10
}

cost = cost * copies

document.getElementById("summary").innerHTML = `
Pages: ${pages} <br>
Copies: ${copies} <br>
Print Type: ${type} <br>
Total Cost: ₹${cost}
`

window.totalCost = cost

}

window.startPayment = startPayment