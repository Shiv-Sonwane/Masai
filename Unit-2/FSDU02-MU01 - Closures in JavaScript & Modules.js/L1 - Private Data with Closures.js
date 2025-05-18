function bankAccount(initialBalance) {
  let balance = initialBalance;  
  return {
    
    deposit: function(amount) {
      if (amount > 0) {
        balance += amount;
        return balance;
      } else {
        return "Deposit amount must be positive.";
      }
    },

    withdraw: function(amount) {
      if (amount > 0 && amount <= balance) {
        balance -= amount;
        return balance;
      } else if (amount > balance) {
        return "Insufficient funds.";
      } else {
        return "Withdrawal amount must be positive.";
      }
    },

   
    getBalance: function() {
      return balance;
    },

    reset: function() {
      balance = initialBalance;
      return balance;
    }
  };
}


const account = bankAccount(100);

console.log(account.deposit(50));  
console.log(account.withdraw(30)); 
console.log(account.getBalance()); 

console.log(account.withdraw(200)); 
console.log(account.deposit(-20)); 
account.reset(); 
console.log(account.getBalance()); 
