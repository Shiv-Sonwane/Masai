// Question
// Problem 3: Fake Store Analytics – Async + HOF
// Objective
// Fetch product data from Fake Store API and generate analytics.

// Tasks
// Fetch all products from:

// https://fakestoreapi.com/products
// Filter products priced above $100.

// Map filtered products to strings:

// "Product Title - $Price - Category"

// Sort these products by price descending.

// Calculate the average rating (from rating.rate property) of filtered products.

// Show a loading indicator during fetch (in console , show …loading).

// Show a message(alert) if no products match.

async function fetching(){
  try{
    console.log("loading...");

    let response=await fetch("https://fakestoreapi.com/products");
    let products=await response.json();

    let productsAbove_hundred=products.filter(product=>product.price>100);


    let productStrings= productsAbove_hundred.map(product=>{
      return `${product.title} - $${product.price} - ${product.category}`
    })

    let sortedProducts=[...productsAbove_hundred].sort((a,b)=>b.price-a.price)

    let avg_rating=sortedProducts.reduce((sum,product)=>sum+product.rating.rate,0)/sortedProducts.length
  
    console.log(productsAbove_hundred)
    console.log(productStrings)
    console.log(sortedProducts)
    console.log(avg_rating.toFixed(2))
  }
  catch(error){
    console.log("ERROR")
  }
}

fetching()