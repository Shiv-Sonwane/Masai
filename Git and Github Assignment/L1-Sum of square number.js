function squareofdigits(num){
    let flag=false
    for(let i=1;i<num;i++){
      for(let j=1;j<num;j++){
        let sum=0
        sum+=i*i+j*j
        if(sum==num){
          return true
        }
      }
      
    }
    if(flag==false){
          return false
        }
  }
  console.log(squareofdigits(19))