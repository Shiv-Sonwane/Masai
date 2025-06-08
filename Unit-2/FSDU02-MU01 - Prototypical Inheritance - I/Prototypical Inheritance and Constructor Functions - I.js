
function Car(make, model, year, type, isAvailabe = true) {
    this.make = make
    this.model = model
    this.type = type;
    this.year = year
    this.isAvailabe = isAvailabe
}


function Customer(name, rentedCars = []) {
    this.name = name
    this.rentedCars = rentedCars
}


Customer.prototype.rentCar = function (car) {
    if (car.isAvailabe) {
        car.isAvailabe = false
        this.rentedCars.push(car)
        console.log(`${this.name} rented a ${car.make} ${car.model}`);
    } else {
        console.log(`${car.make} ${car.model} is already rented.`);
    }
}



Customer.prototype.returnCar = function (car) {
    let index = this.rentedCars.indexOf(car)
    if (index > -1) {
        this.rentedCars.splice(index, 1)
        console.log(`${this.name} is returning ${car.make} ${car.model}...`)
    }
    setTimeout(() => {
        car.isAvailable = true;
        console.log(`${car.make} ${car.model} has been returned and is now available.`);
    }, 2000);
}


function PremiumCustomer(name, rentedCars = [], discountedRate) {
    Customer.call(this, name)
    this.discountedRate = discountedRate
}

PremiumCustomer.prototype = Object.create(Customer.prototype);
PremiumCustomer.prototype.constructor = PremiumCustomer;

function calculateRentalPrice(days, car, isPremium, discountRate) {
    const baseRate = 50
    let typeMultiplier = 1

    if (car.type == 'SUV') typeMultiplier = 1.5;
    else if (car.type == 'Sedan') typeMultiplier = 1.2

    let price = baseRate * typeMultiplier * days;

    if (isPremium) {
        price = price * (1 - discountRate)
    }
    return price
}



function scheduleMaintenance(car, delay) {
    console.log(`Maintenance started for ${car.make} ${car.model}...`);

    setTimeout(function () {
        car.isAvailable = true;
        console.log(`Maintenance completed. ${car.make} ${car.model} is now available.`);
    }, delay);
}

const car1 = new Car("Toyota", "Corolla", 2020, "Sedan");
const car2 = new Car("Honda", "CR-V", 2022, "SUV");
const car3 = new Car("Ford", "Fusion", 2021, "Sedan");


const alice = new Customer("Alice");
const bob = new PremiumCustomer("Bob", 0.2);


alice.rentCar(car1);
console.log("Rental price (Alice): $" + calculateRentalPrice(3, car1, false));


const boundRent = alice.rentCar.bind(bob); 
boundRent(car2);
console.log("Rental price (Bob): $" + calculateRentalPrice(5, car2, true, bob.discountRate));


setTimeout(() => {
    bob.returnCar(car2);
}, 4000);

setTimeout(() => {
    scheduleMaintenance(car2, 3000);
}, 7000);