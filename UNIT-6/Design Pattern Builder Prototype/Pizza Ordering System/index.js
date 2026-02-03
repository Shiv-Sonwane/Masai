// Pizza class
class Pizza {
  constructor(size, cheese, pepperoni, mushrooms) {
    this.size = size;
    this.cheese = cheese;
    this.pepperoni = pepperoni;
    this.mushrooms = mushrooms;
  }

  getDetails() {
    return `
      Pizza Size: ${this.size}
      Cheese: ${this.cheese ? "Yes" : "No"}
      Pepperoni: ${this.pepperoni ? "Yes" : "No"}
      Mushrooms: ${this.mushrooms ? "Yes" : "No"}
    `;
  }
}

// PizzaBuilder class
class PizzaBuilder {
  constructor() {
    this.size = "medium"; // default
    this.cheese = false;
    this.pepperoni = false;
    this.mushrooms = false;
  }

  setSize(size) {
    this.size = size;
    return this; // enable chaining
  }

  addCheese() {
    this.cheese = true;
    return this;
  }

  addPepperoni() {
    this.pepperoni = true;
    return this;
  }

  addMushrooms() {
    this.mushrooms = true;
    return this;
  }

  build() {
    return new Pizza(this.size, this.cheese, this.pepperoni, this.mushrooms);
  }
}

// Usage example
function main() {
  const myPizza = new PizzaBuilder()
    .setSize("large")
    .addCheese()
    .addMushrooms()
    .build();

  console.log(myPizza.getDetails());
}

main();