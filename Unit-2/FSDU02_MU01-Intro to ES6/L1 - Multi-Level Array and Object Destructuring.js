const people = [ { name: "Alice", address: 
                               { city: "New York", street: 
                               { name: "Broadway", number: 123 } } }, 
                 { name: "Bob", address: 
                               { city: "Los Angeles", street: { 
                                 name: "Sunset Boulevard", number: 456 } } } ];
                                 
                                 

       
let arr= people.map((ele)=>{
  let {name:personName,address:{city,street:{name: streetName }}}=ele
  return `${personName} lives in ${city} on ${streetName}`
})

console.log(arr)