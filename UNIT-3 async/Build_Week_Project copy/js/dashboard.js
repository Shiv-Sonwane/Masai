// Import Firebase app, auth, and Firestore modules, and Firebase configuration
import { auth, db } from "/UNIT-3 async/Build_Week_Project/js/config.js";
import {
    collection,
    addDoc,
    query,
    where,
    onSnapshot,
    deleteDoc,
    doc,
    serverTimestamp,
    updateDoc,
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";
import {
    onAuthStateChanged,
    signOut,
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

// Get DOM elements for recipe form and list
const recipeForm = document.getElementById("recipeForm");
const recipeList = document.getElementById("recipe-list");
const logoutBtn = document.getElementById("logoutBtn");
const formTitle = document.getElementById("formTitle");
const submitBtn = document.getElementById("submitBtn");
const recipeIdInput = document.getElementById("recipeId");

let currentUser = null;
let quill;

// Initialize Quill editor for rich text instructions
document.addEventListener("DOMContentLoaded", () => {
    quill = new Quill('#editor', {
        theme: 'snow',
        modules: {
            toolbar: [
                ['bold', 'italic', 'underline'],
                ['link', 'image'],
                [{ list: 'ordered' }, { list: 'bullet' }]
            ]
        }
    });
});

// Monitor authentication state
onAuthStateChanged(auth, (user) => {
    if (!user) {
        // Redirect to login if not authenticated
        window.location.href = "/UNIT-3 async/Build_Week_Project/html/index.html";
    } else {
        currentUser = user; // Store current user
        loadMyRecipes(); // Load user's recipes
    }
});

// Handle recipe form submission for adding or editing recipes
recipeForm.addEventListener("submit", async (e) => {
    e.preventDefault(); // Prevent default form submission
    const title = document.getElementById("title").value.trim();
    const instructions = quill.root.innerHTML;
    const ingredients = document.getElementById("ingredients").value.trim();
    const tags = document.getElementById("tags").value.trim().split(",").map(tag => tag.trim()).filter(tag => tag);
    const category = document.getElementById("category").value;
    const videoUrl = document.getElementById("videoUrl").value.trim();
    const recipeId = recipeIdInput.value;

    // Validate required fields
    if (!title || !instructions || !ingredients || !category) {
        alert("Please fill all required fields!");
        return;
    }

    try {
        if (recipeId) {
            // Update existing recipe
            const recipeRef = doc(db, "recipes", recipeId);
            await updateDoc(recipeRef, {
                title,
                instructions,
                ingredients,
                tags,
                category,
                videoUrl,
                updatedAt: serverTimestamp(),
            });
            alert("Recipe updated successfully!");
        } else {
            // Add new recipe
            await addDoc(collection(db, "recipes"), {
                title,
                instructions,
                ingredients,
                tags,
                category,
                videoUrl,
                userId: currentUser.uid,
                userEmail: currentUser.email,
                username: currentUser.displayName || currentUser.email,
                createdAt: serverTimestamp(),
            });
            alert("Recipe added successfully!");
        }

        // Reset form and UI
        recipeForm.reset();
        quill.root.innerHTML = "";
        recipeIdInput.value = "";
        formTitle.textContent = "Add a New Recipe";
        submitBtn.textContent = "Add Recipe";
    } catch (error) {
        console.error("Error saving recipe:", error);
        alert("Error saving recipe: " + error.message);
    }
});

// Load and display user's recipes
function loadMyRecipes() {
    recipeList.innerHTML = "<p>Loading...</p>";

    // Query recipes for the current user
    const q = query(collection(db, "recipes"), where("userId", "==", currentUser.uid));
    onSnapshot(q, (snapshot) => {
        recipeList.innerHTML = "";
        if (snapshot.empty) {
            recipeList.innerHTML = "<p>No recipes yet.</p>";
            return;
        }

        // Iterate through user's recipes
        snapshot.forEach((docSnap) => {
            const recipe = docSnap.data();
            const card = document.createElement("div");
            card.classList.add("recipe-card");

            // Create recipe card HTML
            card.innerHTML = `
                <h3>${escapeHTML(recipe.title)}</h3>
                <p><strong>Ingredients:</strong> ${escapeHTML(recipe.ingredients)}</p>
                <div class="instructions">${recipe.instructions}</div>
                <p><strong>Category:</strong> ${escapeHTML(recipe.category)}</p>
                <p><strong>Tags:</strong> ${recipe.tags?.length ? recipe.tags.map(tag => escapeHTML(tag)).join(", ") : "None"}</p>
                ${recipe.videoUrl ? `<p><a href="${recipe.videoUrl}" target="_blank">Watch Video</a></p>` : ""}
                <small>👨‍🍳 ${escapeHTML(recipe.username)}</small><br>
                <button class="edit-btn" data-id="${docSnap.id}">Edit</button>
                <button class="delete-btn" data-id="${docSnap.id}">Delete</button>
            `;

            recipeList.appendChild(card);

            // Handle edit button click
            card.querySelector(".edit-btn").addEventListener("click", () => {
                document.getElementById("title").value = recipe.title;
                quill.root.innerHTML = recipe.instructions;
                document.getElementById("ingredients").value = recipe.ingredients;
                document.getElementById("tags").value = recipe.tags?.join(", ") || "";
                document.getElementById("category").value = recipe.category;
                document.getElementById("videoUrl").value = recipe.videoUrl || "";
                recipeIdInput.value = docSnap.id;
                formTitle.textContent = "Edit Recipe";
                submitBtn.textContent = "Update Recipe";
                window.scrollTo({ top: 0, behavior: "smooth" });
            });

            // Handle delete button click
            card.querySelector(".delete-btn").addEventListener("click", async () => {
                try {
                    await deleteDoc(doc(db, "recipes", docSnap.id));
                    console.log("Recipe deleted:", docSnap.id);
                } catch (error) {
                    console.error("Error deleting recipe:", error);
                    alert("Failed to delete recipe: " + error.message);
                }
            });
        });
    }, (error) => {
        console.error("Error loading recipes:", error);
        alert("Failed to load your recipes: " + error.message);
    });
}

// Escape HTML to prevent XSS attacks
function escapeHTML(str) {
    return String(str).replace(/[&<>"']/g, (m) => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    }[m]));
}

// Handle logout
logoutBtn.addEventListener("click", () => signOut(auth));