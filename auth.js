import { auth, provider } from "./firebase.js"

import { signInWithPopup, signOut } 
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js"

export async function login(){

try{

const result = await signInWithPopup(auth,provider)

const user = result.user

if(
user.email.endsWith("@mallareddyuniversity.ac.in") ||
user.email === "flash6027@gmail.com"
){

localStorage.setItem("user",JSON.stringify(user))

go("location")

}
else{

alert("Only college emails allowed")

await signOut(auth)

}

}
catch(err){

console.error(err)
alert("Login failed")

}

}