import { auth, db } from "./config.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";
import {
  collection, addDoc, query, where, onSnapshot,
  deleteDoc, doc, serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";
import { logoutUser } from "./auth.js";

// Protect page + start live listener
onAuthStateChanged(auth, (user) => {
  if (!user) {
    window.location.href = "index.html";
    return;
  }
  initMyRecipesListener(user.uid);
});

// Add Recipe (uses 'desc' to match your previous docs)
const addBtn = document.getElementById("addRecipeBtn");
if (addBtn) {
  addBtn.addEventListener("click", async () => {
    const titleEl = document.getElementById("recipe-title");
    const descEl  = document.getElementById("recipe-desc");
    const title = (titleEl?.value || "").trim();
    const desc  = (descEl?.value  || "").trim();

    if (!title || !desc) {
      alert("Please enter recipe title and description.");
      return;
    }

    try {
      await addDoc(collection(db, "recipes"), {
        uid: auth.currentUser.uid,
        email: auth.currentUser.email || "",
        title,
        desc, // <- keep 'desc'
        createdAt: serverTimestamp()
      });

      // Clear fields
      titleEl.value = "";
      descEl.value  = "";
    } catch (err) {
      console.error("Add failed:", err);
      alert("Error adding recipe: " + err.message);
    }
  });
}

// Live listener for *my* recipes only
function initMyRecipesListener(uid) {
  const list = document.getElementById("recipe-list");
  if (!list) return;

  const q = query(collection(db, "recipes"), where("uid", "==", uid));

  onSnapshot(q, (snap) => {
    list.innerHTML = "";

    if (snap.empty) {
      const empty = document.createElement("div");
      empty.className = "recipe-card";
      empty.innerHTML = "<p>No recipes yet. Add one!</p>";
      list.appendChild(empty);
      return;
    }

    snap.forEach((d) => {
      const data = d.data();
      const card = document.createElement("div");
      card.className = "recipe-card";
      card.innerHTML = `
        <h3>${escapeHTML(data.title || "")}</h3>
        <p>${escapeHTML(data.desc || "")}</p>
        <button class="delete-btn" data-id="${d.id}">Delete</button>
      `;
      list.appendChild(card);
    });

    // Wire delete buttons
    document.querySelectorAll(".delete-btn").forEach((btn) => {
      btn.addEventListener("click", async (e) => {
        const id = e.currentTarget.getAttribute("data-id");
        try {
          await deleteDoc(doc(db, "recipes", id));
        } catch (err) {
          console.error("Delete failed:", err);
          alert("Delete failed: " + err.message);
        }
      });
    });
  }, (err) => {
    console.error("My recipes listener error:", err);
    alert("Failed to load your recipes: " + err.message);
  });
}

// Simple HTML escaper to avoid XSS in titles/descriptions
function escapeHTML(str) {
  return String(str).replace(/[&<>"']/g, (m) => ({
    "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"
  }[m]));
}

// Logout
const logoutBtn = document.getElementById("logoutBtn");
if (logoutBtn) logoutBtn.addEventListener("click", logoutUser);
