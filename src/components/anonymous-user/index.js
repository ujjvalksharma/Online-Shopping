import React from 'react'
const AnonymousUser= ()=>{
    return(<div className="container">
        <br />
        <br /> 
        <div className="alert alert-danger" role="alert">
        Only logged in user can view this functionality. Please login!! <i className="fa fa-lock" aria-hidden="true"></i>
</div>
    </div>)
}
export default AnonymousUser;