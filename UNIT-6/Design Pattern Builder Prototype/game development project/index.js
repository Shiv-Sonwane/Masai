// GameCharacter class implementing the Prototype Pattern
class GameCharacter {
  constructor(name, level, weapon) {
    this.name = name;
    this.level = level;
    this.weapon = weapon;
  }

  // clone method to create a copy of the current instance
  clone() {
    // Creates a shallow copy; if nested objects existed, we might need a deep copy
    return Object.assign(
      Object.create(Object.getPrototypeOf(this)),
      this
    );
  }
}

// Main function to demonstrate usage
function main() {
  // Step 1: Create a character
  const warrior = new GameCharacter("Warrior", 10, "Sword");
  console.log("Original Character:", warrior);

  // Step 2: Clone the character
  const warriorClone = warrior.clone();
  warriorClone.name = "Warrior Clone"; // Customize the clone
  console.log("Cloned Character:", warriorClone);

  // Step 3: Show they are separate instances
  console.log("Are they the same instance?", warrior === warriorClone); // false
}

// Run the main function
main();
