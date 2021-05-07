import React, {useState,useContext,useEffect} from 'react';
import {Link} from "react-router-dom";
import ProductsInCart from "./productsInCart";
import {CartContextApi} from '../../context-store/cart-context' 
import '../../styles/App.css'
import CouponService from '../../services/coupon-service'
import WrongMapping from '../wrong-mapping'
const Cart = () => {
    const cartApiSubscriber=useContext(CartContextApi);
    const [couponCode,setCouponCode]=useState("");
    const [totalAmount,setTotalAmount]=useState("");
    const [isCouponCorrect,setIsCouponCorrect]=useState(-1);
    const user=JSON.parse((sessionStorage.getItem('USER')))
useEffect(() => {
    changeTotalAmount()
},[cartApiSubscriber.cartProducts])

const changeTotalAmount=()=>{
    const products=cartApiSubscriber.cartProducts;
        let tempAmount=0
        for(let i=0;i<products.length;i++){
            tempAmount+=products[i].quantity*products[i].price
        }
        setTotalAmount(tempAmount.toFixed(2)) 

}

    const applyCoupon=()=>{
        const products=cartApiSubscriber.cartProducts;
        let tempAmount=0
        for(let i=0;i<products.length;i++){
            tempAmount+=products[i].quantity*products[i].price
        }
        setTotalAmount(tempAmount.toFixed(2)) // we are taking amount as only integer


        CouponService.findAllCoupons()
        .then(coupons=>{
          //  alert(JSON.stringify(coupons))
            for(let i=0;i<coupons.length;i++){
                if(coupons[i].name===couponCode){
                    setIsCouponCorrect(1)
                    tempAmount=tempAmount*((100-coupons[i].discount)/100)
                    setTotalAmount(tempAmount.toFixed(2))
                    break;
                }
                else{
                    setIsCouponCorrect(0)
                }
            }
            

        })

      /*  */
    }
    return (
        <>
        {user!==null&&user.type==='BUYER'&&
        <div className="container">
            <br />
        <h3>My Cart <i className="fa fa-shopping-cart fa-2x" aria-hidden="true"></i></h3>

        {cartApiSubscriber.cartProducts.length<=0&&<>
              <h3>Opps your cart is empty!!<i className="fa fa-frown-o fa-1x" aria-hidden="true"></i></h3>
              </>
}

        <div style={{marginTop: '2rem'}}>
            <ul className='list-group'> 
    {
    cartApiSubscriber.cartProducts.map(product=>
   <>
                <ProductsInCart product={product} key={'cart_prod'+product.id}/>
                
    </>)
    }
    </ul>
                </div>
                <br />
                <br />
              {cartApiSubscriber.cartProducts.length>0&&
              <>

<div class="form-group">
    <input type="text" class="form-control" id="state" placeholder="Enter coupon code"
    onChange={(e)=>setCouponCode(e.target.value)} value={couponCode}
    />
  </div>

  <button style={{float:'left'}} type="button" className="btn btn-primary" onClick={()=>applyCoupon()} >
                 Apply Couppon
               </button>
               <br />
               <br />
               <h1>{isCouponCorrect===0&&<h1>Invalid coupon!!</h1>}</h1>
<h5>Total Amount: {totalAmount}</h5>


          <Link to={`/billing/${totalAmount}`}> 
          
               <button style={{float:'right'}} type="button" className="btn btn-success" >
                   Proceed to Billing <i className="fa fa-credit-card" aria-hidden="true"></i>
               </button>
               </Link>
              </>}
             
            </div>
}
{ (user===null||(user!==null&&user.type==='ADMIN'))&&
<>
<WrongMapping />
</>
}
        </>
    )

}

export default Cart;