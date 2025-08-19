import { auth } from "./config.js";
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut 
} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";

// Signup Logic (signup.html)
const signupBtn = document.getElementById("signupBtn");
if (signupBtn) {
  signupBtn.addEventListener("click", async () => {
    const email = document.getElementById("signupEmail").value;
    const password = document.getElementById("signupPassword").value;

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Account created successfully! Please login.");
      window.location.href = "index.html"; // redirect to login page
    } catch (error) {
      alert(error.message);
    }
  });
}

// Login Logic (index.html)
const loginBtn = document.getElementById("loginBtn");
if (loginBtn) {
  loginBtn.addEventListener("click", async () => {
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Login successful!");
      // redirect to homepage/dashboard (create later)
      window.location.href = "index.html";
    } catch (error) {
      alert(error.message);
    }
  });
}

// Logout Logic (future use in home.html)
export async function logoutUser() {
  await signOut(auth);
  window.location.href = "index.html"; // back to login
}
