import { auth, db } from "./config.js";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";
import { collection, onSnapshot, query, orderBy } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

const allList = document.getElementById("all-recipe-list");
const logoutBtn = document.getElementById("logoutBtn");

onAuthStateChanged(auth, (user) => {
  if (!user) {
    window.location.href = "index.html";
  } else {
    loadAllRecipes();
  }
});

function loadAllRecipes() {
  const q = query(collection(db, "recipes"), orderBy("createdAt", "desc"));
  onSnapshot(q, (snap) => {
    allList.innerHTML = "";
    if (snap.empty) {
      allList.innerHTML = "<p>No recipes added yet.</p>";
      return;
    }

    snap.forEach((docSnap) => {
      const data = docSnap.data();
      const card = document.createElement("div");
      card.classList.add("recipe-card");
      card.innerHTML = `
        <h3>${data.title}</h3>
        <p>${data.description}</p>
        <small>👨‍🍳 Shared by: ${data.userEmail || "Unknown"}</small>
      `;
      allList.appendChild(card);
    });
  });
}

// Logout
logoutBtn.addEventListener("click", () => signOut(auth));
