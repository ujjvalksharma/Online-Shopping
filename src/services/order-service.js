const ORDER_URL = "https://web-dev-cyu-server.herokuapp.com/order"
const USER_URL = "https://web-dev-cyu-server.herokuapp.com/user"


     const findOrderById = (orderId) => 
       fetch(`${ORDER_URL}/${orderId}`)
       .then(response => response.json())
   
    

const findOrderByUserId = (userId) =>  {
        
        return ( fetch(`${USER_URL}/${userId}/order`)
            .then(response => response.json())
        )
         }
   


const createOrder = (userId,order) => (fetch(`${USER_URL}/${userId}/order`, {
        method: "POST",
        body: JSON.stringify(order),
        headers: {
            'content-type': 'application/json'
        }
    }).then(response => response.json())
    )

    const deleteOrderById = (orderId) => (fetch(`${ORDER_URL}/${orderId}`, {
        method: "DELETE",
        headers: {
            'content-type': 'application/json'
        }
    }).then(response => response.json())
    )

       const api = {
        findOrderById,createOrder,findOrderByUserId,deleteOrderById
       }
       
    
    export default api;