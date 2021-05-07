import React,{useState,useEffect} from 'react';
import '../../styles/App.css'
const Order= ({
    order,
    index,
    OrderDispatch
})=>{

    const [productNames,setProductNames]=useState("")
    useEffect(()=>{

        let tempNames=""
        const products=order.products;
        for(let i=0;i<products.length;i++){
            tempNames+=products[i].title+";"
        }
        setProductNames(tempNames)

    },[order.products])
const maxProdNameDisplayLen=50

const user=JSON.parse((sessionStorage.getItem('USER')))

    return (<>
<br />
<div className="row">
  <div className="col-3">{order._id}   {user!==null&&user.type==='ADMIN'&&<i className="fa fa-trash webdev-cyu-color-red" aria-hidden="true" onClick={()=> OrderDispatch({type:'DELETE',index:index}) }></i> }</div>
  <div className="col-3"> 
  
  {order.products.map(product=>{
    return (<> <b> <u>product name:</u></b> {product.title} ---- <b><u>Quantity:</u></b> {product.quantity}</>)
  })}
   </div>
  <div className="col-3">{order.totalAmount}</div>
  {JSON.parse(sessionStorage.getItem('USER'))!==null
  &&JSON.parse(sessionStorage.getItem('USER')).id===order.userId&&
  <div className="col-3">
  {order.shippingAddr.streetName}, {order.shippingAddr.city},
  {order.shippingAddr.state},{order.shippingAddr.zipcode}
  ,{order.shippingAddr.country}
  </div>
}

</div>


    </>)
}
export default Order