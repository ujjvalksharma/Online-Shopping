import React,{useState,useEffect} from 'react';
import Order from './order'
import OrderService from '../../services/order-service'
import {useParams} from "react-router-dom";
const AllOrder= ()=>{

  const [orders,setOrders]=useState([]);
  const {profileId}= useParams()

//    const currentUserId=profileId!==undefined?profileId:user.id
  useEffect(()=>{
    if(profileId===undefined){
      const userId=JSON.parse(sessionStorage.getItem('USER')).id
      OrderService.findOrderByUserId(userId)
      .then(data=>setOrders(data))
    }
  },[])

  useEffect(()=>{
    if(profileId!==undefined){
      OrderService.findOrderByUserId(profileId)
      .then(data=>setOrders(data))
    }
  },[])

  const OrderDispatch=(action)=>{
    if(action.type==='DELETE'){
      

      OrderService.deleteOrderById(orders[action.index]._id)
      .then(order=>{
        if(order!==undefined&&order.status!==500&&order.status!==400){
          let tempOrder=[]

          for(let i=0;i<orders.length;i++){
            if(action.index!==i){
              tempOrder.push(orders[i])
            }
          //  
          }
          setOrders(tempOrder)
         /* tempOrder.slice(action.index,1)
          setOrder(tempOrder)
         window.location.reload(false) */// remove reload ask professor
        }else{
          alert('We are facing some issue while deleting the order. Please contact super admin!!')
        }
      })

    }
  }

    return (<>
    <br />
    <h1>Previous orders <i className="fa fa-shopping-basket" aria-hidden="true"></i> </h1>
    <br />
    <div className="row">
  <div className="col-3">Order Id</div>
  <div className="col-3">Order items</div>
  <div className="col-3">Total Amount</div>
  {JSON.parse(sessionStorage.getItem('USER'))!==null&&
  <div className="col-3">Shipping address</div>
    }

</div>
<br />
{orders.map((order,index)=>
  <Order key={'all_order'+index} order={order} index={index} OrderDispatch={OrderDispatch} />
  )}


    </>)
}
export default AllOrder