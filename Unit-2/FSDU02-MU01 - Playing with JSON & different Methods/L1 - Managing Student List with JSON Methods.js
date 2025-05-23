function manageStudents() {
    let students = ["Alice", "Bob", "Charlie"];

    
    students.splice(1, 0, "David");  // Correct usage of splice

    
    console.log("Is 'Eve' in the list?", students.includes("Eve"));  // Should return false

    console.log("Student list:", students.join(","));  // Expected: "Alice,David,Bob,Charlie"


    
    students.splice(students.length, 0, "Eve");
    console.log("After adding 'Eve':", students.join(","));  // Expected: "Alice,David,Bob,Charlie,Eve"

    console.log("Is 'Eve' in the list now?", students.includes("Eve"));  // Should return true

    students.splice(0, 0, "Frank");
    console.log("After adding 'Frank' at the beginning:", students.join(","));  // Expected: "Frank,Alice,David,Bob,Charlie,Eve"
}

manageStudents();
