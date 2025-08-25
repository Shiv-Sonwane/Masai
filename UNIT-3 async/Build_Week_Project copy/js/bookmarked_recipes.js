import { auth, db } from "./config.js";
import { 
    onAuthStateChanged, 
    signOut
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";
import { getDocs, doc, getDoc, updateDoc, query, where } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

let currentUser = null;

onAuthStateChanged(auth, (user) => {
    if (user) {
        currentUser = user;
        loadBookmarkedRecipes();
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

async function loadBookmarkedRecipes() {
    const q = query(collection(db, "recipes"), where("bookmarkedBy", "array-contains", currentUser.uid));
    const querySnapshot = await getDocs(q);
    const recipeList = document.getElementById('bookmarked-recipe-list');
    recipeList.innerHTML = '';

    querySnapshot.forEach((doc) => {
        const recipe = doc.data();
        const recipeCard = document.createElement('div');
        recipeCard.className = 'recipe-card';
        recipeCard.innerHTML = `
            <h3>${recipe.title}</h3>
            <div class="instructions">${recipe.instructions}</div>
            <p><strong>Ingredients:</strong> ${recipe.ingredients}</p>
            <small>Category: ${recipe.category}</small>
            ${recipe.videoUrl ? `<p><a href="${recipe.videoUrl}" target="_blank">Video</a></p>` : ''}
            <div class="bookmark-icon" title="Bookmark" data-id="${doc.id}"></div>
            <div class="comments">
                <ul class="comment-list">${recipe.comments.map(c => `<li>${c}</li>`).join('')}</ul>
                <div class="comment-form">
                    <input type="text" placeholder="Add a comment" data-id="${doc.id}">
                    <button data-id="${doc.id}">Comment</button>
                </div>
            </div>
            <p>Likes: ${recipe.likes}</p>
            <button class="like-btn" data-id="${doc.id}">Like</button>
        `;
        const bookmarkIcon = recipeCard.querySelector('.bookmark-icon');
        bookmarkIcon.addEventListener('click', () => toggleBookmark(doc.id));
        if (recipe.bookmarkedBy.includes(currentUser.uid)) bookmarkIcon.classList.add('bookmarked');
        recipeCard.querySelector('.comment-form button').addEventListener('click', () => addComment(doc.id));
        recipeCard.querySelector('.like-btn').addEventListener('click', () => addLike(doc.id));
        recipeList.appendChild(recipeCard);
    });
}

async function toggleBookmark(id) {
    const recipeRef = doc(db, "recipes", id);
    const recipeSnap = await getDoc(recipeRef);
    const recipe = recipeSnap.data();
    const bookmarkedBy = recipe.bookmarkedBy || [];
    const bookmarkIcon = document.querySelector(`.bookmark-icon[data-id="${id}"]`);
    if (bookmarkedBy.includes(currentUser.uid)) {
        await updateDoc(recipeRef, { bookmarkedBy: bookmarkedBy.filter(uid => uid !== currentUser.uid) });
        bookmarkIcon.classList.remove('bookmarked');
    } else {
        await updateDoc(recipeRef, { bookmarkedBy: [...bookmarkedBy, currentUser.uid] });
        bookmarkIcon.classList.add('bookmarked');
    }
}

async function addComment(id) {
    const commentInput = document.querySelector(`.comment-form input[data-id="${id}"]`);
    const comment = commentInput.value.trim();
    if (comment) {
        const recipeRef = doc(db, "recipes", id);
        const recipeSnap = await getDoc(recipeRef);
        const recipe = recipeSnap.data();
        const comments = recipe.comments || [];
        await updateDoc(recipeRef, { comments: [...comments, comment] });
        commentInput.value = '';
        loadBookmarkedRecipes();
    }
}

async function addLike(id) {
    const recipeRef = doc(db, "recipes", id);
    const recipeSnap = await getDoc(recipeRef);
    const recipe = recipeSnap.data();
    await updateDoc(recipeRef, { likes: (recipe.likes || 0) + 1 });
    loadBookmarkedRecipes();
}