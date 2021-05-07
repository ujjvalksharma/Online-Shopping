import React,{useState,useReducer, createContext} from 'react'
export const CartContextApi=createContext({})
/* Doubt why is dispatch called twice onClick? Ask professor */
const CartProductsContext=(props)=>{

    const [cartProducts]=useState([]);

    const reducer=(intitalState,action)=>{
if(action.type==='ADD'){
   let tempProducts=[]
   let isNewProductExist=false;
   for(let i=0;i<intitalState.length;i++){
    tempProducts.push(intitalState[i])
    if(tempProducts[i].id===action.newProduct.id){
        isNewProductExist=true;
    }
   }

   if(isNewProductExist){
    return tempProducts
   }
const newTempProduct=action.newProduct
newTempProduct.quantity=1
   tempProducts=[...tempProducts,newTempProduct]
   return tempProducts
   }
   else if(action.type==='DELETE'){
    let tempProducts=[]
    for(let i=0;i<intitalState.length;i++){
        
        if(intitalState[i].id!==action.productId){
            tempProducts.push(intitalState[i])
        }
       }
       return tempProducts;

   }else if(action.type==='UPDATE_QUANTITY'){

    let tempProducts=[]
    for(let i=0;i<intitalState.length;i++){
     tempProducts.push(intitalState[i])
     if(tempProducts[i].id===action.productId){
        tempProducts[i].quantity=action.newQuantity
     }
    }
return tempProducts
   }
   else if(action.type==='CLEAR'){
       return []
   }
  return []
}
    

    const [newState, dispatch] = useReducer(reducer, cartProducts);

    return (
        <CartContextApi.Provider value={{cartDispatch:dispatch,cartProducts:newState}}>
            {props.children}
            </CartContextApi.Provider>
      );


}

export default CartProductsContext;