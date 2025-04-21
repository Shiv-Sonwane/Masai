let arr = ["electronics", "clothing", "electronics", "toys", "clothing", "toys", "toys"];


let frequency = arr.reduce((acc, current) => {
    acc[current] = (acc[current] || 0) + 1;
    return acc;
}, {});

console.log("Frequencies:", frequency);


let sortedCategories = Object.entries(frequency)
    .sort((a, b) => b[1] - a[1]) 
    .map(entry => entry[0]);     

console.log("Sorted categories:", sortedCategories);
