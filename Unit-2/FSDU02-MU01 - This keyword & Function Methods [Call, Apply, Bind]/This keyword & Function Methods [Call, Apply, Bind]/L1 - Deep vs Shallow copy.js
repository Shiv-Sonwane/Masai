let original = { name: "Alice", hobbies: ["reading", "traveling"] }

const clone = JSON.parse(JSON.stringify(original));

clone.hobbies.push("coding")

console.log("Original:", original);
console.log("Clone   :", clone);