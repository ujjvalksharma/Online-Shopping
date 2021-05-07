import React, {useState } from 'react';

const EditableCoupons =({
    coupon,
    setCouponsArr
})=>{

  const [editableCoupon, setCoupon] = useState(coupon);
    const [edit, setEdit] = useState(false);
    const todayDate=new Date().toISOString().slice(0, 10);
    const updateCoupon=()=>{
 
      setCouponsArr({type:'UPDATE',newCoupon:editableCoupon})
      setEdit(false)
    }


    const deleteCoupon=()=>{
    
      if(setCouponsArr({type:'DELETE',newCoupon:editableCoupon})){
        setEdit(false)
      }
      
    }

    const updateDisount=(event)=>{

      if(event.target.value<=0||event.target.value>100){
        alert('discount has to be a positive integer less than 101')
        return;
      }
      setCoupon(prevCoupon=>{
        return ({...prevCoupon,discount:event.target.value})
      })

    }

    const updateStartDate=(event)=>{

      if(todayDate>event.target.value||event.target.value>editableCoupon.endDate){
        alert('Start date has to be greater than current date and not more than end date')
        return;
      }
      setCoupon(prevCoupon=>{
        return ({...prevCoupon,startDate:event.target.value})
      })

    }

    const updateEndDate=(event)=>{

      if(todayDate>event.target.value||event.target.value<editableCoupon.endDate){
        alert('End date has to be greater than current date and not less than start date')
        return;
      }
      setCoupon(prevCoupon=>{
        return ({...prevCoupon,endDate:event.target.value})
      })

    }

    return (<> 
    {!edit&&
    <>
      <div className="row">
    <div className="col-2">{editableCoupon.id}</div>   
  <div className="col-2">{editableCoupon.name}</div>
  <div className="col-2"> {editableCoupon.startDate}</div>
  <div className="col-2"> {editableCoupon.endDate}</div>
  <div className="col-2"> {editableCoupon.discount}%</div>
  <div className="col-2"><i className="fa fa-pencil" aria-hidden="true" onClick={()=>setEdit(true)}></i></div>
</div>
    </>}

    {edit&&
    <>
      <div className="row">
    <div className="col-2">{editableCoupon.id}</div>   
  <div className="col-2">{editableCoupon.code}</div>
  <div className="col-2"><input class="form-control" type="date" value={editableCoupon.startDate}  placeholder="mm/dd/yyyy"
  onChange={(e)=>updateStartDate(e)} /></div>

  <div className="col-2"><input class="form-control" type="date" value={editableCoupon.endDate}  placeholder="mm/dd/yyyy"
   onChange={(e)=> updateEndDate(e)}
  /></div>
  <div className="col-2"><input type="text" class="form-control" value={editableCoupon.discount} placeholder="Discount percentage"
  onChange={(e)=>updateDisount(e)}
   /></div>
  <div className="col-2">
      <i className="fa fa-check" aria-hidden="true" onClick={()=> updateCoupon()}></i>  
      <i className="fa fa-trash-o" aria-hidden="true" onClick={()=>deleteCoupon()}></i>
  </div>
</div>
    </>}
  
    </>)
}

export default EditableCoupons;