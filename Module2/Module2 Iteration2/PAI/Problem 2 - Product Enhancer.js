function ProductEnhancer(data){
  let {id,title,price,category}=data
  
  return{
    id,
    title,
    price,
    category,
    isExpensive:(price>100),
    summary(){
      let status=""
      if(this.isExpensive){
        status="Expensive"
      }
      else{
        status="Affordable"
      }
      return `${title} costs ${price} [${status}]`
      
    }
  }
}
const data = {
  id: 3,
  title: "Leather Jacket",
  price: 249.99,
  category: "clothing"
};

let product=ProductEnhancer(data)

console.log(product.summary())