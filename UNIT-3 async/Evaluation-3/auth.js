import { auth } from "./config.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndEmailAndPassword,
  SignOut,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

document.addEventListener("DOMContentLoaded",()=>{
    const authSection=document.getElementById("authSection");
    const searchSection=document.getElementById("searchSection");
    const recpeBoxSection=document.getElementById("recpeBoxSection");

    document.getElementById("signup-btn").addEventListener("click", async ()=>{
        const email=document.getElementById("email").value
        const password =document.getElementById("password").value
        await createUserWithEmailAndPassword(auth,email,password)
    });

    document.getElementById("login-btn").addEventListener("click", async ()=>{
        const email=document.getElementById("email").value
        const password =document.getElementById("password").value
        await signInWithEmailAndPassword(auth,email,password)
    });

    document.getElementById("logout-btn").addEventListener("click", async ()=>{
        await SignOut(auth)
    })

    onAuthStateChanged(auth,(user)=>{
        if(user){
            authSection.classList.add("hidden")
            searchSection.classList.remove("hidden")
            recpeBoxSection.classList.remove("hidden")
        }
        else{
            authSection.classList.remove("hidden")
            searchSection.classList.add("hidden")
            recpeBoxSection.classList.add("hidden")
        }
    })
})
