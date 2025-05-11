function createEmployee(name, role,salary) {
    return {
        name : name,
        role : role,
        salary : salary,
        introduce : function() {
            console.log(`Hello, I am ${this.name}, working as a ${this.role}.`)
        }
    }
}

const employee1 = createEmployee("Alice", "Developer", 60000);
employee1.introduce();
