import React,{useState,useEffect} from 'react';
import EditableCoupons from './editable-coupons'
import CouponService from '../../services/coupon-service'
const ActiveCoupons= ()=>{

  const [coupons,setCoupons]=useState([]);
const couponKeyPrefix="counpon_"

  useEffect(() => {

    CouponService.findAllCoupons()
    .then(data=>setCoupons(data))
    .catch(err=>alert('Error fetching from coupons from server. Please try again!!'))
  }, [])

  const setCouponsArr=(action)=>{
    switch(action.type){

      case('DELETE'):{
        CouponService.deleteCouponById(action.newCoupon.id)
        .then(response=> {
          setCoupons(coupons.filter(coupon=>coupon.id!==action.newCoupon.id))
          return true;
        })
        .catch(err=> {
          alert('error deleting coupon try again!!')
          return false;
        })
        break;
      }
      
      case('UPDATE'):{

        CouponService.updateCoupon(action.newCoupon)
        .then(data=> {
const index=coupons.findIndex((element) => element.id===action.newCoupon.id )
let prevCoupons=coupons
prevCoupons[index]=action.newCoupon
setCoupons(prevCoupons)
          return true;
        })
        .catch(err=> {
          alert('error updating coupon try again!!')
          return false;
        })

        break;
      }
      default: break;

    }
    return true;
    
  }

    return (<>
    <h1> Active Coupons</h1>
    < br />
    <div className="row">
    <div className="col-2"> Cupon Id</div>
  <div className="col-2"> Cupon Code</div>
  <div className="col-2"> Start date</div>
  <div className="col-2"> End date</div>
  <div className="col-2"> Discount</div>
</div>
<br />
{/* */}
{coupons.map(coupon=>
  <>
  <EditableCoupons key={couponKeyPrefix+coupon.id} coupon={coupon} setCouponsArr={setCouponsArr} />
  </>)}
  <br />
  <br />
  <p><b>Note:</b> If you created a coupon and it is not showing, then it maybe an inactive coupon, so contact the super admin to make it active!!</p>
<br />
        </>)
}

export default ActiveCoupons;