import React,{useContext,useState,useEffect} from 'react';
import {CartContextApi} from '../../context-store/cart-context'
import Cards from 'react-credit-cards'; 
import 'react-credit-cards/es/styles-compiled.css'
import OrderService from '../../services/order-service'
import {useParams} from "react-router-dom"; 
import WrongMapping from '../wrong-mapping'
const BillingPage=({history})=>{
    const cartApiSubscriber=useContext(CartContextApi);
   const {totalAmount}= useParams()
    const [shippingAddress,setShippingAddress]=useState({
        streetName:"",
        state:"",
        city:"",
        zipcode:"",
        country:"",
        streetNameEntered:false,
        stateEntered:false,
        cityEntered:false,
        zipcodeEntered:false,
        countryEntered:false,
    })

    useEffect(()=>{
        if(cartApiSubscriber.cartProducts.length===0){
            alert('Please add products to cart')
            history.push('/')
        }

    },[cartApiSubscriber.cartProducts])
    const [creditCard,setCreditCard]=useState({
        cvc:'',
        expiry:'',
        name:'',
        number:'',
        focused:'',
        cvcPresence:false,
        expiryPresence:false,
        namePresence:false,
        numberPresence:false
    })
    const [displayCreditCard,setDisplayCreditCard]=useState(false)
const [displayShippingAddr,setDisplayShippingAddr]=useState(true)

const isStreetNameErr=()=>{
    return shippingAddress.streetName.length===0&&shippingAddress.streetNameEntered
}

const isStateErr=()=>{
    return shippingAddress.state.length===0&&shippingAddress.stateEntered
}

const isCityErr=()=>{
    return shippingAddress.city.length===0&&shippingAddress.cityEntered
}

const isZipcodeErr=()=>{
    return shippingAddress.zipcode.length===0&&shippingAddress.zipcodeEntered
}
const isCountryErr=()=>{
    return shippingAddress.country.length===0&&shippingAddress.countryEntered
}


const isCvcErr=()=>{
    return creditCard.cvc.length===0&&creditCard.cvcPresence
}

const isExpiryErr=()=>{
    return creditCard.expiry.length===0&&creditCard.expiryPresence
}

const isNameErr=()=>{
    return creditCard.name.length===0&&creditCard.namePresence
}

const isNumberErr=()=>{
    return creditCard.number.length===0&&creditCard.numberPresence
}

const submitOrder=()=>{
    if(shippingAddress.streetName.length===0||shippingAddress.state.length===0
        ||shippingAddress.city.length===0||shippingAddress.zipcode.length===0
        ||shippingAddress.country.length===0){
        alert('Enter correct feilds in Shipping address')
return
    }

    if(creditCard.cvc.length!==3||creditCard.expiry.length!==4
        ||creditCard.name.length===0||creditCard.number.length!==16
        ||isCountryErr()){
        alert('Enter correct feilds for credit card information')
        return
    }
    const order={}
    order.products=cartApiSubscriber.cartProducts
    order.shippingAddr=shippingAddress
    order.totalAmount=totalAmount
    const userId=JSON.parse(sessionStorage.getItem('USER')).id;
   // alert(JSON.stringify(order))
   // alert(userId)
    OrderService.createOrder(userId,order)
    .then(data=>{
        if(data!==undefined&&data.status!==500&&data!==400){
            alert('Your order is sumbitted. It will arrive soon')
            cartApiSubscriber.cartDispatch({type:'CLEAR'})
        }else{
            alert('We are facing some issue while placing orders. Please contact the admin!!')
        }
        
       }
        )
    .catch(err=> alert('error submiting order. Please try again!!'))

   

}

const user=JSON.parse((sessionStorage.getItem('USER')))
    return (<>

    {user!==null&&
   <div className="container">
       <br />
       <br />
       {}
   <h1>Your order is almost ready!!<i class="fa fa-rocket" aria-hidden="true"></i> </h1>
   <h5>Your final Amount: {totalAmount}</h5>
{displayShippingAddr===true&&
<>

{
    isStreetNameErr()&&<div className="alert alert-danger" role="alert">
    Please enter the Street name
  </div>
}



{
    isStateErr()&&<div className="alert alert-danger" role="alert">
    Please enter the state name
  </div>
}



{
    isCityErr()&&<div className="alert alert-danger" role="alert">
    Please enter the city name
  </div>
}



{
    isZipcodeErr()&&<div className="alert alert-danger" role="alert">
    Please enter the zipcode
  </div>
}


{
    isCountryErr()&&<div className="alert alert-danger" role="alert">
    Please enter the country name
  </div>
}

<div class="form-group">
    <label for="streetName">Street Name:</label>
    <input type="text" class="form-control" id="streetName" placeholder="Enter street Name" onChange={
        (e)=>{
            setShippingAddress(prevAddress=>{
                return {...prevAddress,streetName:e.target.value,streetNameEntered:true}
            })
        }} 
        value={shippingAddress.streetName}
        />
  </div>

  <div class="form-group">
    <label for="city">City:</label>
    <input type="text" class="form-control" id="city" placeholder="Enter city name" 
    
    onChange={
        (e)=>{
            setShippingAddress(prevAddress=>{
                return {...prevAddress,city:e.target.value,cityEntered:true}
            })
        }} 
        value={shippingAddress.city}
    />
  </div>
  <div class="form-group">
    <label for="state">State:</label>
    <input type="text" class="form-control" id="state" placeholder="Enter state name"
    

    onChange={
        (e)=>{
            setShippingAddress(prevAddress=>{
                return {...prevAddress,state:e.target.value,stateEntered:true}
            })
        }} 
        value={shippingAddress.state}

    />
  </div>
  <div class="form-group">
    <label for="zipcode">Zipcode:</label>
    <input type="number" class="form-control" id="zipcode" placeholder="Enter zipcode" 
    
    onChange={
        (e)=>{
            setShippingAddress(prevAddress=>{
                return {...prevAddress,zipcode:e.target.value,zipcodeEntered:true}
            })
        }} 
        value={shippingAddress.zipcode}

    />
    </div>

    <div class="form-group">
    <label for="zipcode">Country:</label>
    <input type="text" class="form-control" id="zipcode" placeholder="Enter Country" 
    
    onChange={
        (e)=>{
            setShippingAddress(prevAddress=>{
                return {...prevAddress,country:e.target.value,countryEntered:true}
            })
        }} 
        value={shippingAddress.country}

    />
    </div>

</>}
 {displayCreditCard===true&&<>


    {
    isCvcErr()&&<div className="alert alert-danger" role="alert">
    Please enter the Cvc
  </div>
}



{
    isExpiryErr()&&<div className="alert alert-danger" role="alert">
    Please enter the expiry date
  </div>
}



{
    isNumberErr()&&<div className="alert alert-danger" role="alert">
    Please enter the card number
  </div>
}



{
    isNameErr()&&<div className="alert alert-danger" role="alert">
    Please enter the card holder name
  </div>
}

  <Cards
          cvc={creditCard.cvc}
          expiry={creditCard.expiry}
          name={creditCard.name}
          number={creditCard.number}
        />
<div class="form-group">
    <label for="name">Card Holder Name:</label>
    <input type="text" class="form-control" id="name" placeholder="Enter Card Holder Name"
    

    onChange={
        (e)=>{

            setCreditCard(prevCreditCard=>{
                return {...prevCreditCard,focused:'name'}
            })

            setCreditCard(prevCreditCard=>{
                return {...prevCreditCard,name:e.target.value,namePresence:true}
            })
        }} 
        value={creditCard.name}

    />
  </div>

  <div class="form-group">
    <label for="expiry">Expiry:</label>
    <input type="number" class="form-control" id="expiry" placeholder="Enter Expiry"
    onChange={
        (e)=>{
if(e.target.value.length<=4){
            setCreditCard(prevCreditCard=>{
                return {...prevCreditCard,focused:'expiry'}
            })

            setCreditCard(prevCreditCard=>{
                return {...prevCreditCard,expiry:e.target.value,expiryPresence:true}
            })
        }
        }} 
        value={creditCard.expiry}

    />
  </div>

  <div class="form-group">
    <label for="cvc">CVC:</label>
    <input type="number" class="form-control" id="cvc" placeholder="Enter CVC"
    
    maxlength="3"
    onChange={
        (e)=>{

            if(e.target.value.length<=3){
            setCreditCard(prevCreditCard=>{
                return {...prevCreditCard,focused:'cvc'}
            })

            setCreditCard(prevCreditCard=>{
                return {...prevCreditCard,cvc:e.target.value,cvcPresence:true}
            })
        }
        }} 
        value={creditCard.cvc}

    />
  </div>

  <div class="form-group">
    <label for="number"> Card Number:</label>
    <input type="number" class="form-control" id="number" placeholder="Enter card number"

    onChange={
        (e)=>{

            if(e.target.value.length<=16){
            setCreditCard(prevCreditCard=>{
                return {...prevCreditCard,focused:'number'}
            })

            setCreditCard(prevCreditCard=>{
                return {...prevCreditCard,number:e.target.value,numberPresence:true}
            })
        }
        }} 
        value={creditCard.number}

    />
  </div>

  <button type="submit" onClick={()=>submitOrder()}class="btn btn-success" style={{float:'right'}}>Confirm Order</button>

 </>}
 <br />
 <br />
{displayShippingAddr===true?
 <div class="form-check">
 <input class="form-check-input" type="checkbox" value="1" id="shippingAddr"  checked onClick={()=>displayShippingAddr===true?setDisplayShippingAddr(false):setDisplayShippingAddr(true)}/>
 <label class="form-check-label" for="shippingAddr">
   Edit Shipping Address
 </label>
</div>:
 <div class="form-check">
 <input class="form-check-input" type="checkbox" value="1" id="shippingAddr" onClick={()=>displayShippingAddr===true?setDisplayShippingAddr(false):setDisplayShippingAddr(true)}/>
 <label class="form-check-label" for="shippingAddr">
   Edit Shipping Address
 </label>
</div>
}

<div class="form-check">
  <input class="form-check-input" type="checkbox" value="" id="credit-card" onClick={()=>displayCreditCard===true?setDisplayCreditCard(false):setDisplayCreditCard(true)} />
  <label class="form-check-label" for="credit-card">
    Edit Credit Card
  </label>
</div>

   </div>
}
{user===null&&
<WrongMapping />
}
{user!==null&&user.type==='ADMIN'&&
<WrongMapping />
}
    </>)
}
export default BillingPage