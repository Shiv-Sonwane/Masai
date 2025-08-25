import { auth, db } from "./config.js";
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut,
    updateProfile
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

const quill = new Quill('#editor', {
    theme: 'snow'
});

let currentUser = null;

onAuthStateChanged(auth, (user) => {
    if (user) {
        currentUser = user;
        document.getElementById('logoutBtn').style.display = 'inline-block';
    } else {
        window.location.href = '/UNIT-3 async/Build_Week_Project/html/index.html';
    }
});

document.getElementById('logoutBtn').addEventListener('click', () => {
    signOut(auth).then(() => {
        window.location.href = '/UNIT-3 async/Build_Week_Project/html/index.html';
    });
});

document.getElementById('recipeForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const title = document.getElementById('title').value;
    const instructions = quill.root.innerHTML;
    const ingredients = document.getElementById('ingredients').value;
    const tags = document.getElementById('tags').value.split(',').map(tag => tag.trim());
    const category = document.getElementById('category').value;
    const videoUrl = document.getElementById('videoUrl').value;
    const recipeId = document.getElementById('recipeId').value;

    const recipeData = {
        title,
        instructions,
        ingredients,
        tags,
        category,
        videoUrl,
        userId: currentUser.uid,
        comments: [],
        likes: 0,
        bookmarkedBy: [],
        createdAt: new Date().toISOString()
    };

    try {
        if (recipeId) {
            await updateDoc(doc(db, "recipes", recipeId), recipeData);
        } else {
            await addDoc(collection(db, "recipes"), recipeData);
        }
        document.getElementById('recipeForm').reset();
        quill.setContents([]);
        document.getElementById('recipeId').value = '';
        window.location.href = '/UNIT-3 async/Build_Week_Project/html/dashboard.html';
    } catch (error) {
        console.error("Error adding/updating recipe: ", error);
    }
});