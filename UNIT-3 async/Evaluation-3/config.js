import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBV-xJ_KXZidl6nbNu5eZRZuJHXhbEkhsk",
  authDomain: "flavorfind-2b51c.firebaseapp.com",
  projectId: "flavorfind-2b51c",
  storageBucket: "flavorfind-2b51c.firebasestorage.app",
  messagingSenderId: "957298507807",
  appId: "1:957298507807:web:d28aa976f105751bab952a",
  measurementId: "G-46FW6NVL52",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
