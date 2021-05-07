import React, {useState,useContext} from 'react';
import {CartContextApi} from '../../context-store/cart-context'  
const ProductsInCart = ({product}) => {

const [quantity,setQuantity]=useState(product.quantity)
const cartApiSubscriber=useContext(CartContextApi);
const updateProductQuantity=(event)=>{

    setQuantity(event.target.value)
    cartApiSubscriber.cartDispatch({type:'UPDATE_QUANTITY',newQuantity:event.target.value,productId:product.id})

}

const deleteProduct=()=>{
    
    cartApiSubscriber.cartDispatch({type:'DELETE',productId:product.id})


}
    return (
        <>
            <li className='list-group-item' key={product.id}>
                  <div className='container row'>
                   <div className='col'>
                         <img src={product.image} alt='jacket' width='100' height='100'/>
                               </div>
                                <div className='col'>
                               <h4>{product.title}</h4>
                                  <br/>
                                 Quantity:
                                     <br/>
                                    <input type="number" value={quantity} onChange={(e)=>updateProductQuantity(e)} min='1' placeholder="Enter product Quantity" />
                                  
                                                <i className="fa fa-trash fa-2x" onClick={()=>deleteProduct()} aria-hidden="true" style={{marginLeft: '4rem'}}>

                                                </i>
                                              
                                              </div>
                                              <div className='col'>
                                                  Price: {product.price} X {product.quantity}= {(product.price*product.quantity).toFixed(2)}
                                              </div>
                                          </div>
                                      </li>
        </>
    )

}

export default ProductsInCart;