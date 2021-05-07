import React,{useState} from 'react';
import CouponService from '../../services/coupon-service'
const NewCoupon = ({history}) => {

const todayDate=new Date().toISOString().slice(0, 10);
  const [coupon,setCoupon]=useState({
    discount:0,
    startDate: todayDate,
    endDate: todayDate,
    name:"",
    namePresence:false
  });
  const [discountPresence,setDiscountPresence]=useState(false);


  const isDiscountError=()=>{
    return discountPresence&&(coupon.discount<=0||coupon.discount>100)
     }
     const startDateLessThanTodayErr=()=>{
      return todayDate>coupon.startDate
     }

     const endDateLessThanTodayErr=()=>{
      return todayDate>coupon.endDate
     }


     const couponNameErr=()=>{
      return coupon.name.length===0&&coupon.namePresence
     }

     const submitCoupon=()=>{

      if(startDateLessThanTodayErr()||endDateLessThanTodayErr()||coupon.discount<=0
      ||couponNameErr()||coupon.startDate>coupon.endDate
      ||coupon.discount>=100
      ||coupon.name.length<=0){
        alert('Your input is incorrect. Please try again!')
        return;
      }else{

      }
      CouponService.createCoupon(coupon)
      .then(data=> {
        if(data!==undefined&&data.status!==500&&data.status!==400){
          alert('coupon successfully created!!')
        }else{
          alert(data.message)
        }
      })
      .catch(err=>alert('Coupon service is not working contact admin'))


     }
   return (
       <>
           < br />
       <h4> New Cupon Code <i className="fa fa-diamond" aria-hidden="true"></i></h4>
       <br />
       <br />

         
  {startDateLessThanTodayErr()&&
     <div className="alert alert-danger" role="alert">
    Coupon start date should be greater than today's date
  </div>
  }

{coupon.startDate>coupon.endDate&&
     <div className="alert alert-danger" role="alert">
    Coupon start date should be not greater than coupon end date 
  </div>
  }

{endDateLessThanTodayErr()&&
     <div className="alert alert-danger" role="alert">
    Coupon end date should be greater than today's date
  </div>
  }
  
  {isDiscountError()&&
     <div className="alert alert-danger" role="alert">
    Please enter a positive integer discount less than 101
  </div>
  }

{couponNameErr()&&
     <div className="alert alert-danger" role="alert">
    Please enter a Coupon Name
  </div>
  }

<form>
 
  <h5>Start Date</h5>
  <div class="form-group">
  <div class="col-10">
    <input class="form-control" type="date" value={coupon.startDate} placeholder="mm/dd/yyyy"
    
    onChange={(e)=>
      {
        setCoupon(prevCoupon=>{
          return ({...prevCoupon,startDate:e.target.value})
        })
      }}

    id="example-date-input" />
  </div>
</div>
<h5>End Date</h5>
<div class="form-group">
  <div class="col-10">
    <input class="form-control" type="date" value={coupon.endDate} placeholder="mm/dd/yyyy"
    onChange={(e)=>
      {
        setDiscountPresence(true)
        setCoupon(prevCoupon=>{
          return ({...prevCoupon,endDate:e.target.value})
        })
      }}

    id="example-date-input" />
  </div>
</div>
<h5>Discount %</h5>
  <div class="form-group">
    <input type="number" class="form-control" id="exampleInputPassword1" placeholder="Discount percentage" onChange={(e)=>
    {
      setDiscountPresence(true)
      setCoupon(prevCoupon=>{
        return ({...prevCoupon,discount:e.target.value})
      })
    }} />
  </div>

  <h5>Name</h5>
  <div class="form-group">
    <input type="text" class="form-control" id="exampleInputPassword1" placeholder="Coupon Name" onChange={(e)=>
    {
      setCoupon(prevCoupon=>{
        return ({...prevCoupon,name:e.target.value,namePresence:true})
      })
    }} />
  </div>

  <button type="button" onClick={(e)=>submitCoupon()} class="btn btn-primary">Create Cupon</button>
</form>
       </>
   )
}
export default NewCoupon;
