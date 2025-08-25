// Import Firebase app and auth modules, and Firebase configuration
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";
import { firebaseConfig } from "/UNIT-3 async/Build_Week_Project/js/config.js";

// Initialize Firebase with the provided configuration
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Get DOM elements for login and signup forms
const loginForm = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");

// Handle login form submission
if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
        e.preventDefault(); // Prevent default form submission
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        // Sign in user with email and password
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log("Login successful:", userCredential.user.email);
                // Redirect to dashboard after successful login
                window.location.href = "/UNIT-3 async/Build_Week_Project/html/dashboard.html";
            })
            .catch((error) => {
                console.error("Login error:", error.message);
                alert("Login failed: " + error.message);
            });
    });
}

// Handle signup form submission
if (signupForm) {
    signupForm.addEventListener("submit", (e) => {
        e.preventDefault(); // Prevent default form submission
        const username = document.getElementById("username").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirmPassword").value;

        // Validate password match
        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        // Create new user with email and password
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Update user profile with username
                return updateProfile(userCredential.user, {
                    displayName: username,
                }).then(() => {
                    console.log("Signup successful:", userCredential.user.email);
                    // Redirect to dashboard after successful signup
                    window.location.href = "/UNIT-3 async/Build_Week_Project/html/dashboard.html";
                });
            })
            .catch((error) => {
                console.error("Signup error:", error.message);
                alert("Signup failed: " + error.message);
            });
    });
}