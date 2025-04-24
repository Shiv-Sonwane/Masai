function personInfo() {
    console.log(`Name : ${this.name}, Age: ${this.age}`)
}

const person = {
    name: "Shiv",
    age: 22
};

personInfo.call(person)