const PRODUCT_URL = "https://fakestoreapi.com/products"



  export const findAllProducts = () =>  
 fetch(`${PRODUCT_URL}`)
    .then(response => response.json())

    export const findProductById = (productId) =>  {
        
   return ( fetch(`${PRODUCT_URL}/${productId}`)
       .then(response => response.json())
       .then(product => product)
   )
    }
   
       const api = {
        findProductById, findAllProducts
       }
       
    
    export default api;