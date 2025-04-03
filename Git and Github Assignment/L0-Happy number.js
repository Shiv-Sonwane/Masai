
let num=19

function squareofdigits(num){
  let sum=0
  while(num>0){
    let rem=num%10
    sum+=rem*rem
    num=Math.floor(num/10)
  }
  return sum
}

function ishappy(num){
  while(num!=1){
    num=squareofdigits(num)
  }
  if(num==1){
    return("happy")
  }
}

console.log(ishappy(num))