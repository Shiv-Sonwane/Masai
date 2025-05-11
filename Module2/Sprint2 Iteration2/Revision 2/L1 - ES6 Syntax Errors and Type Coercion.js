const checkout = {
    items: [],
    total: 0,
    addItem(item) {
      if(isNaN(item.price) || Number(item.price)<0 ) {
        console.log("Invalid price.");
        return
        
      }
      this.items.push(item);
      this.total += +item.price;
      
    },
    getTotal() {
      return `Total: ${parseFloat(this.total).toFixed(2)}`; 
      
    } 
    
  };
  checkout.addItem({ name: "Coffee Maker", price: "99.95" });
  
  checkout.addItem({ name: "Milk", price: 3.50 });
  
  checkout.addItem({ name: "chips", price: "abc" });
  
  console.log(checkout.getTotal()); 