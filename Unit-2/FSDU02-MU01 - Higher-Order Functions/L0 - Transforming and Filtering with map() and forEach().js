let arr = [
    { name: "Laptop", price: 1000 },
    { name: "Mouse", price: 20 }
];

function processProducts(arr) {
    
    let narr = arr.map(ele => ele.name);

    arr.forEach(element => {
        let message = "";
        if (element.price > 50) {
            message = `${element.name} is above $50`;
        } else {
            message = `${element.name} is below $50`;
        }
        console.log(message);
    });
}

processProducts(arr);