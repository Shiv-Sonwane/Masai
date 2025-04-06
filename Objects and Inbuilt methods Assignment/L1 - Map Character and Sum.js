let arr=['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
    'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
let N=30
let K=3 //length of string
let str="abc"
let sum=0
let objmap={}

for(let i=0;i<arr.length;i++){
objmap[arr[i]]=i+30
}
for(let i=0;i<str.length;i++){
sum+=objmap[str[i]]
}
console.log(sum)


//function map(N,K,str){
//  let arr=['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
//       'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
//  let sum=0
//  for(let i=0;i<arr.length;i++){
//    objmap[arr[i]]=i+N
//  }
//  for(let i=0;i<K;i++){
//   sum+=objmap[str[i]]
//  }
//  console.log(sum)
//}