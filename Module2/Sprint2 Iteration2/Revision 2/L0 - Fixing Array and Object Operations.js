const library = {
    books: [{ title: "The Hobbit", author: "J.R.R. Tolkien", year: 1937 }],
    addBook(book) {
      if (typeof book!="object"||typeof book.title!=="string" || !book.title || book.title.trim()==""||
      typeof book.author !="string" || !book.author || book.author.trim()==""|| 
      typeof book.year !="number" || !book.year|| book.year<=0) {
        console.log("Book information is incomplete.");
        return;
      }
      if(this.findBookByTitle(book.title)){
        console.log(`Book titled ${book.title} already exists.`);
        return
      }
   
      this.books.push(book);
      console.log("Book added successfully.");
    },
    findBookByTitle(title) {
      return this.books.find(book => book.title === title);
      
    },
    removeBook(title) {
      const index = this.books.findIndex(book => book.title === title);
      if (index !== -1) {
        this.books.splice(index, 1);
        console.log("Book removed successfully.");
      } 
      else {
        console.log("Book not found.");
        
      } 
      
    }
  };
  
  library.addBook({ author: "George Orwell", year: 1949 });
  
  library.addBook({ title: "Sheldon", author: "Cooper", year: 1987 });
  
  library.addBook({ title: "Sheldon", author: "Cooper", year: 1987 });
  
  
  console.log(library.books.length);
  