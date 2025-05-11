
function createBankAccount(x){
  let balance=x
  
  return{
    deposit(amount){
      balance+=amount
      return balance
    },
    withdraw(amount){
      if(balance>=amount){
        balance-=amount
        return balance
      }else{
        console.log("Insufficient balance")
      }
    },
    getBalance(){
      return balance
    }
    
  }
}
const account = createBankAccount(100);

console.log(account.deposit(50)); // Output: 150

console.log(account.withdraw(30)); // Output: 120

console.log(account.getBalance()); // Output: 120
