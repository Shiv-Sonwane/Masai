function factorial(n){
    if(Number.isInteger(n) && n>=0){
      if(n==1||n==0){
        return 1
      }
      else{
        return n*factorial(n-1)
      }
    }
    else{
      return "invalid input"
    }
  }
  
  console.log(factorial(10))