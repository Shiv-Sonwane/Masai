import { auth, db } from "./config.js";
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut 
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

import { doc, setDoc } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

document.addEventListener("DOMContentLoaded", () => {
  
  // --- Signup Logic ---
  const signupBtn = document.getElementById("signupBtn");
  if (signupBtn) {
    signupBtn.addEventListener("click", async (e) => {
      e.preventDefault();
      const email = document.getElementById("signup-email")?.value.trim();
      const password = document.getElementById("signup-password")?.value.trim();

      if (!email || !password) {
        alert("Please enter email and password");
        return;
      }

      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);

        await setDoc(doc(db, "users", userCredential.user.uid), { email });
        alert("Account created successfully! Please login.");
        window.location.href = "/UNIT-3 async/Build_Week_Project/html/index.html"; // redirect to login
      } catch (error) {
        console.error("Signup error:", error);
        alert("Signup failed: " + error.message);
      }
    });
  }

  // --- Login Logic ---
  const loginBtn = document.getElementById("loginBtn");
  if (loginBtn) {
    loginBtn.addEventListener("click", async () => {
      const email = document.getElementById("login-email")?.value.trim();
      const password = document.getElementById("login-password")?.value.trim();

      if (!email || !password) {
        alert("Please enter email and password");
        return;
      }

      try {
        await signInWithEmailAndPassword(auth, email, password);
        alert("Login successful!");
        window.location.href = "dashboard.html"; 
      } catch (error) {
        console.error("Login error:", error);
        alert("Login failed: " + error.message);
      }
    });
  }
});

// --- Logout Logic ---
export async function logoutUser() {
  await signOut(auth);
  alert("Logged out!");
  window.location.href = "index.html"; 
}
