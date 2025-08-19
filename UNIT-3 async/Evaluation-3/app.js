import {
  collection,
  addDoc,
  getDoc,
  query,
  where,
  updateDoc,
  deleteDoc,
  doc,
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";


const searchInput = document.getElementById("searchInput");
const results = document.getElementById("searchInput");
const recipeBox = document.getElementById("recipeBox");
const themeToggle = document.getElementById("themeToggle");

let debounceTimer;
let filterStatus= "All"


searchInput.addEventListener("input", ()=>{
    clearTimeout(debounceTimer)
    debounceTimer=setTimeout(fetchRecipes,500)
})

async function fetchRecipes(){
    const word=searchInput.value.trim()
    if(!word) return

    const res=await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${word}`)
    const data= await res.json();

    results.innerHTML=""

    if(data.meals){
        data.meals.forEach(meal => {
            const card=document.createElement('div')
            card.classList.add("recipe-card");
            card.innerHTML=`
            <img src="${meal.strMealThumb}"
            <h3>${meal.strMeal}</h3>
            <button data-id="${meal.idMeal}" data-name="${meal.strMeal}" data-thumb="${meal.strMealThumb}">Add to Box</>
            `
            card.querySelector("button").addEventListener("click",()=>addToBox(meal));
            results.appendChild(card)
        });
    }
}