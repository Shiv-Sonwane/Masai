const people = [ { name: "Alice", 
    address: { city: "New York", 
               street:{ name: "Broadway", 
                        number: 123 } } },
  { name: "Bob", 
    address: { city: "Los Angeles", 
               street: { name: "Sunset Boulevard", 
                        number: 456 } } } ];
                        



let data=people.map(({name:personName,address:{city,street:{name:streetName}}})=>`${personName} lives in ${city} on ${streetName}`)

console.log(data) 