import { auth, db } from "./config.js";
import { collection, addDoc, getDocs, query, where, deleteDoc, doc, serverTimestamp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

const recipeForm = document.getElementById("recipeForm");
const recipeList = document.getElementById("recipe-list");
const logoutBtn = document.getElementById("logoutBtn");

let currentUser = null;

// Ensure logged in
onAuthStateChanged(auth, async (user) => {
  if (!user) {
    window.location.href = "index.html";
  } else {
    currentUser = user;
    console.log("✅ Logged in as:", user.email);
    loadMyRecipes();
  }
});

// Add Recipe
recipeForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const title = document.getElementById("title").value.trim();
  const description = document.getElementById("description").value.trim();

  if (!title || !description) return alert("Fill all fields!");

  try {
    await addDoc(collection(db, "recipes"), {
      title,
      description,
      userId: currentUser.uid,
      userEmail: currentUser.email,
      createdAt: serverTimestamp()
    });
    console.log("✅ Recipe saved!");
    recipeForm.reset();
    loadMyRecipes();
  } catch (error) {
    console.error("❌ Error adding recipe:", error);
    alert("Error adding recipe: " + error.message);
  }
});

// Load current user's recipes
async function loadMyRecipes() {
  recipeList.innerHTML = "<p>Loading...</p>";

  try {
    const q = query(collection(db, "recipes"), where("userId", "==", currentUser.uid));
    const snapshot = await getDocs(q);

    recipeList.innerHTML = "";
    if (snapshot.empty) {
      recipeList.innerHTML = "<p>No recipes found for you.</p>";
      return;
    }

    snapshot.forEach((docSnap) => {
      const recipe = docSnap.data();
      const card = document.createElement("div");
      card.classList.add("recipe-card");
      card.innerHTML = `
        <h3>${recipe.title}</h3>
        <p>${recipe.description}</p>
        <small>👨‍🍳 You</small><br>
        <button data-id="${docSnap.id}">Delete</button>
      `;
      recipeList.appendChild(card);

      card.querySelector("button").addEventListener("click", async () => {
        await deleteDoc(doc(db, "recipes", docSnap.id));
        loadMyRecipes();
      });
    });
  } catch (error) {
    console.error("❌ Error loading recipes:", error);
  }
}

// Logout
logoutBtn.addEventListener("click", () => signOut(auth));
