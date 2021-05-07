const COUPON_URL = "https://web-dev-cyu-server.herokuapp.com/coupon"

const createCoupon = ( coupon) => 
    fetch(`${COUPON_URL}`, {
        method: "POST",
        body: JSON.stringify(coupon),
        headers: {
            'content-type': 'application/json'
        }
    })
        .then(response => response.json())


        const updateCoupon = (coupon) => 
    fetch(`${COUPON_URL}`, {
        method: "PUT",
        body: JSON.stringify(coupon),
        headers: {
            'content-type': 'application/json'
        }
    })
        .then(response => response.json())


        const findAllCoupons = () =>
        fetch(`${COUPON_URL}`)
        .then(response =>  response.json())

        const deleteCouponById = (couponId) =>
        fetch(`${COUPON_URL}/${couponId}`, {
            method: 'DELETE'
        })


        

const api={createCoupon,updateCoupon,findAllCoupons,deleteCouponById}
export default api;