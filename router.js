import { login } from "./auth.js"

export async function loadPage(page){

const res = await fetch("pages/" + page + ".html")

const html = await res.text()

document.getElementById("app").innerHTML = html


// run page specific logic
if(page === "login"){

const btn = document.getElementById("loginBtn")

if(btn){
btn.onclick = login
}

}

if(page === "review"){
loadReview()
}

}