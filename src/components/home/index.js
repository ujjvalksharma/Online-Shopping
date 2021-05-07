import React, { useEffect,useState } from 'react';
import '../../styles/home.style.client.css';
import '../../styles/App.css';
import {connect} from "react-redux";
import {useLocation} from "react-router-dom";
import Product from '../product/prod-card'
import productService from '../../services/product-service'
import couponService from '../../services/coupon-service'
import OrderService from '../../services/order-service'
const Home = (

  {

    products=[],
    findAllProducts

}

) => { 

  const location = useLocation();
  const [filter, setFilter] = useState(''); 
  const [coupons,setCoupons]=useState([]);
  const [previousProducts,setPreviousProducts]=useState([])
  const user=JSON.parse((sessionStorage.getItem('USER')))
  const tempFilter=  new URLSearchParams(location.search).get('q')
    useEffect(() => {
     
      findAllProducts()
      
      if(tempFilter!==null){
          setFilter(tempFilter)
      }else{
        setFilter("")
      }

    }, [new URLSearchParams(location.search).get('q')])

    useEffect(()=>{
      if(user!==null){
OrderService.findOrderByUserId(user.id)
.then(orders=>{
  orders.map(order=>{
    order.products.map(produdct=>{
      if(!previousProducts.includes(produdct)){
        setPreviousProducts(prevProduct=>{
            let tempProductArr=prevProduct
            tempProductArr.push(produdct)
            return tempProductArr
          
         
        })
      }

    })
  })

})
.then(x=>{
 let tempProducts=[]
 for(let i=0;i<previousProducts.length;i++){
   if(i<=3){
    tempProducts.push(previousProducts[i])
   }else{
     break;
   }
 }
 setPreviousProducts(tempProducts)
})

      }

    },[])
  
    useEffect(()=>{

      couponService.findAllCoupons()
      .then(data=>{
        if(data!==undefined&&data.status!==400&&data.status!==500){
          setCoupons(data)
        }
      })  

    },[])
    

    const [counter, setCounter] = useState(0);

    useEffect(() => {
      const timeout = setTimeout(() => {
        setCounter(counter + 1);
      }, 1500);
  
      return () => {
        clearTimeout(timeout);
      };
    }, [counter]);

   return (
       <>
<br />
    <div className="container-fluid">
   <h1>Welcome to CYU Shop!! Happy Shopping <i className="fa fa-smile-o webdev-cyu-color-blue" aria-hidden="true"></i> </h1>
   <br />
   <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
  <center>
    {coupons.map((coupon,index)=>{
     return((index===counter%coupons.length)&&<h1>{coupon.name}</h1>) 
    })}
  </center>
</div>

<div className="row">
       
       {/*


(filter.length>0)===true?
products.map((product,index)=>{
  return product.title.toUpperCase().includes(filter.toUpperCase()) &&  <Product key={'home_product_'+index} id={product.id} title={product.title}
 category={product.category} price={product.price} description={product.description}
 imgUrl={product.image}/>
})
:products.map((product,index) => (
      
  <Product key={'home_product_'+index} id={product.id} title={product.title}
  category={product.category} price={product.price} description={product.description}
  imgUrl={product.image}/>

 
))

       
*/}
   {
(filter.length>0)===true&&tempFilter!==null&&
products.map((product,index)=>{
  return product.title.toUpperCase().includes(filter.toUpperCase()) &&  <Product key={'home_product_'+index} id={product.id} title={product.title}
 category={product.category} price={product.price} description={product.description}
 imgUrl={product.image}/>
})
}

{tempFilter===null&&
products.map((product,index)=>{
  return product.title.toUpperCase().includes(filter.toUpperCase()) &&  <Product key={'home_product_'+index} id={product.id} title={product.title}
 category={product.category} price={product.price} description={product.description}
 imgUrl={product.image}/>
})
}
  </div>
  <h1><center>Some previous ordered products</center></h1>
  <hr></hr>
  {
    user===null&&<h5><center>This section is for logged in buyer only
      <i className="fa fa-lock" aria-hidden="true"></i>
      </center></h5>
  }
    {user!==null&& user.type==='ADMIN'&&<h5><center>This section is for logged in buyer only
      <i className="fa fa-lock" aria-hidden="true"></i>
      </center></h5>
  }
  {user!==null&& user.type==='BUYER'&&<h5><center>You haven't ordered anything yet
      <i className="fa fa-frown" aria-hidden="true"></i>
      </center></h5>
  }
<div className="row">
{
  previousProducts.map((product,index) => (
      
    <Product key={'prevproduct_'+index} id={product.id} title={product.title}
    category={product.category} price={product.price} description={product.description}
    imgUrl={product.image}/>
  
   
  ))
}
</div>
 </div>

      </>
   );
}

const stpm = (state) => ({
  products: state.ProductReducer.products
})
const dtpm = (dispatch) => ({
  findAllProducts: (topicId) => {
   
      productService.findAllProducts()
           .then(products => {
         
           dispatch({
               type: "FIND_ALL_PRODUCTS",
               products: products 
       })
       
   }
       )
 
   }
})

const pm = connect(stpm, dtpm)

export default pm(Home)


