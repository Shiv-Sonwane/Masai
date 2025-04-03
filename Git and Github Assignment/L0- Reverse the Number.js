
let num=971

function reverse(num){
  bag=""
  for(let i=0;num>0;i++){
    rem=num%10;
    num=Math.floor(num/10)
    bag+=rem
  }
  console.log(bag)
}
reverse(num)
