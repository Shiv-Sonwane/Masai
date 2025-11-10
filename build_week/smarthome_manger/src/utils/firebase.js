// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBd1hgWg5iDqz5-YGQKvTtu48hafOhmufk",
  authDomain: "smarthome-manager-daa0c.firebaseapp.com",
  projectId: "smarthome-manager-daa0c",
  storageBucket: "smarthome-manager-daa0c.firebasestorage.app",
  messagingSenderId: "843045611857",
  appId: "1:843045611857:web:2a18e31f6450a6ea6c8b70",
  measurementId: "G-7GF8LZT9MF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app); 

export {auth,db};