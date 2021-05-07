import React,{useState,useEffect} from 'react'
import {useParams} from "react-router-dom";
import UserService from '../../services/user-service'
import Profile from './index'
const OtherProfile=()=>{

    const {profileId}= useParams()
const [user,setUser]=useState({})
const [isValidUser,setValidUser]=useState(false)

useEffect(()=>{
    UserService.findUserById(profileId)
    .then(data=>{
        if(data!==undefined&&data.status!==500 &&data.status!==400){
            
            setValidUser(true)
            setUser(data)
        }
    })

},[profileId])
    return (
        <>
 < br />
 < br />
           {isValidUser===false?
           profileId!=='activity'&&profileId!=='order'&&user.type==='ADMIN'&&
           <div className="container">
           <br />
           <br />
            <div className="alert alert-danger" role="alert">
  <h1>Opps!! No profile matches your query. 
      {user.type==='ADMIN'&&<b> Admin pages cannot be visited</b>}
      <i className="fa fa-frown-o" aria-hidden="true"></i></h1>
</div>
</div>:
           <>
           {user!==null&&user.type==='ADMIN'&&
             <div className="container">
             <br />
             <br />
              <div className="alert alert-danger" role="alert">
    <h1>Admin pages cannot be visited! <i className="fa fa-lock" aria-hidden="true"></i></h1>
  </div>
  </div>
           } 
          {user!==null&&user.type!=='ADMIN'&&<Profile otherUser={user}/>} 
           </>
           }
           {}
           {user.id===undefined&&(profileId==='activecoupons'||profileId==='newcoupon'||profileId==='orders')&&<>
           
           <div className="container">
           <br />
           <br />
            <div className="alert alert-danger" role="alert">
  <h1>Anonymous user cannot view this functionality
      <i className="fa fa-frown-o" aria-hidden="true"></i></h1>
</div>
</div>

           </>}

        </>
    );
}

export default OtherProfile;