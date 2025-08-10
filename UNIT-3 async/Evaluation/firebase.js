const FIREBASE_URL = "https://YOUR_PROJECT_ID.firebaseio.com/products";

// Add product
async function addProductToFirebase(product) {
  const res = await fetch(`${FIREBASE_URL}.json`, {
    method: "POST",
    body: JSON.stringify(product),
  });
  return res.json();
}

// Get all products
async function getProductsFromFirebase() {
  const res = await fetch(`${FIREBASE_URL}.json`);
  const data = await res.json();
  return data;
}

// Delete a product
async function deleteProductFromFirebase(id) {
  await fetch(`${FIREBASE_URL}/${id}.json`, {
    method: "DELETE",
  });
}

// Update a product
async function updateProductInFirebase(id, updatedFields) {
  await fetch(`${FIREBASE_URL}/${id}.json`, {
    method: "PATCH",
    body: JSON.stringify(updatedFields),
  });
}