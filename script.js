let totalPages = 0
let cost = 0

async function calculate(){

let file = document.getElementById("pdfUpload").files[0]

if(!file){
alert("Upload PDF first")
return
}

const pdf = await pdfjsLib.getDocument(URL.createObjectURL(file)).promise

totalPages = pdf.numPages

let copies = parseInt(document.getElementById("copies").value)

let type = document.getElementById("printType").value

let baseCost = 0

if(type === "ad"){

let first = Math.min(totalPages,5)

baseCost = first * 10

if(totalPages > 5){

let extra = totalPages - 5

baseCost += extra * 3

}

}else{

baseCost = totalPages * 3

}

cost = baseCost * copies

// round to next multiple of 10
cost = Math.ceil(cost / 10) * 10

document.getElementById("result").innerText =
"Pages: " + totalPages + " | Cost: ₹" + cost

}


async function submitOrder(){

let file = document.getElementById("pdfUpload").files[0]

if(!file){
alert("Upload PDF first")
return
}

try{

// create Razorpay order
const response = await fetch("https://campus-print.onrender.com/create-order",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body: JSON.stringify({ amount: cost * 100 }) // convert to paisa
})

let order = await response.json()

let options = {

key: "rzp_live_SPcApXB3TXAvdO",

amount: order.amount,

currency: "INR",

order_id: order.id,

name: "Campus Print",

description: "Document Printing",

handler: async function(response){

let verify = await fetch("https://campus-print.onrender.com/verify-payment",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body: JSON.stringify(response)
})

let result = await verify.json()

if(result.status === "success"){

await uploadFile(file,cost,totalPages)

alert("Payment successful!")

}else{

alert("Payment verification failed")

}

}

}

let rzp = new Razorpay(options)

rzp.open()

}catch(err){

console.error(err)
alert("Payment Failed")

}

}