const USER_URL = "https://web-dev-cyu-server.herokuapp.com/user"

const createUser = ( user) => 
    fetch(`${USER_URL}`, { 
        method: "POST",
        body: JSON.stringify(user),
        headers: {
            'content-type': 'application/json'
        }
    })
        .then(response => response.json())


        const findUserByEmailAndPass = (user) =>
        fetch(`https://web-dev-cyu-server.herokuapp.com/verifybuyeruser`,{
        method: "POST",
        body: JSON.stringify(user),
        headers: {
            'content-type': 'application/json'
        }
    })


    const findAdminByEmailAndPass = (user) =>
    fetch(`https://web-dev-cyu-server.herokuapp.com/verifyadminuser`,{
    method: "POST",
    body: JSON.stringify(user),
    headers: {
        'content-type': 'application/json'
    }
})


        const updateUser = ( user) => 
    fetch(`${USER_URL}`, {
        method: "PUT",
        body: JSON.stringify(user),
        headers: {
            'content-type': 'application/json'
        }
    })
        .then(response => response.json())
    
        const findUserById=(userId)=>
        fetch(`${USER_URL}/${userId}`)
        .then(response=>response.json())

        

const api={createUser,findUserByEmailAndPass,updateUser,findUserById,findAdminByEmailAndPass}
export default api;