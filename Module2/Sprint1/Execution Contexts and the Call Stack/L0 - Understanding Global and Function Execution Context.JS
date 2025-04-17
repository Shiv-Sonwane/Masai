let age = 32;

function displayAge() {
    console.log("Current Age:", age);
}

function changeAge(newAge) {
    age = newAge; 
    console.log("Updated Age:", age);
}

displayAge();  
changeAge(38); 
displayAge();  