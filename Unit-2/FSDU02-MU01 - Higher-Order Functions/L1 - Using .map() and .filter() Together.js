function getEvenSquares(num){
    num=num.filter(num=>num%2==0).map(num=>num*num)
    return num
}
const numbers = [1, 2, 3, 4, 5, 6];
const result = getEvenSquares(numbers);
console.log(result); 