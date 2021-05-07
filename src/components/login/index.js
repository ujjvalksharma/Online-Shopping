import React,{useState} from 'react';
import { Link } from 'react-router-dom';
import userService from '../../services/user-service'
import '../../styles/App.css'
const Login = ({history}) => {

    const [user,setUser]=useState({type:'BUYER'});
    const [emailPresence,setEmailPresence]=useState(false);
    const [passwordPresence,setPasswordPresence]=useState(false);

    const submitLogin=()=>{
   
  
      if(isEmailError()===undefined
      ||isPasswordError()===undefined){
        alert('Your input feilds are incorrect');
        return;
      }

      if(isEmailError()
      ||isEmailError()||isEmailValidNotEntered()){
        alert('Your input feilds are incorrect');
        return
      }
      if(user.type==='BUYER'){
      userService.findUserByEmailAndPass(user) // ask doubt why history.push is not working in then block
      .then(response => response.json())
      .then(data=>{
        if(data!==undefined&&data.status!==500&&data.status!==400){
          alert('Your login is successful')
        sessionStorage.setItem('USER',JSON.stringify(data))
        history.push('./home')
        }else{
          alert(data.message)
        }

      })
      .catch(err=> {
        alert(err.message)
      })


    }else if(user.type==='ADMIN'){


      userService.findAdminByEmailAndPass(user) // ask doubt why history.push is not working in then block
      .then(response => response.json())
      .then(data=>{
        if(data!==undefined&&data.status!==500&&data.status!==400){
          alert('Your login is successful')
        sessionStorage.setItem('USER',JSON.stringify(data))
        history.push('/home')
        }else{
          alert(data.message)
        }

      })
      .catch(err=> {
        alert(err.message)
      })
      

    }else{
      alert('We are facing some issue. Please contact the admin or refresh the page')
    }

    }

    const isEmailError=()=>{
    return emailPresence===true&&user.email.length===0
    }

  
    const isEmailValidNotEntered=()=>{
      return emailPresence&&!user.email.includes('@')&&!user.email.includes('.com')
    }
  
    const isPasswordError=()=>{
   return passwordPresence===true&&user.password.length===0
    }
  
     return (
      <div className="container">
      < br/>
      < br/>
      <h1> Login <i className="fa fa-pencil" aria-hidden="true"></i> </h1>
  
  

      {isEmailError()&&
   <div className="alert alert-danger" role="alert">
  Please enter the Email
</div>
}


{isEmailValidNotEntered()&&
   <div className="alert alert-danger" role="alert">
   Email should have '@' and '.com'
</div>
}
  
  
  {isPasswordError()&&
     <div className="alert alert-danger" role="alert">
    Please enter the  Password
  </div>
  }
  
      <div className="form-group">
        <label for="signup-email">Email address</label>
        <input type="email" onChange={(e)=>setUser
        (prevState=>{
          setEmailPresence(true)
           return {...prevState,email: e.target.value}}
         )
           
           } className="form-control" id="signup-email"  placeholder="Enter email" />
      </div>
      <div className="form-group">
        <label for="signup-password">Password</label>
        <input type="password" onChange={(e)=>setUser
        (prevState=>{
          setPasswordPresence(true)
            return {...prevState,password: e.target.value}}
            )} className="form-control" id="signup-password" placeholder="Enter password" />
      </div>

      <select class="browser-default custom-select col-2" onChange={(e)=>{
        setUser((prevUser)=>{
          let tempUser=prevUser
          prevUser.type=e.target.value 
          return prevUser
        })
      }}>
  <option value="ADMIN">Admin</option>
  <option value="BUYER" selected>Buyer</option>
</select>
<br />

<br />
<div className="row">
  <div className="col">
  <button type="button" onClick={()=> submitLogin() }className="btn btn-success">Submit</button>
  </div>
  <div className="col-1">
    <Link to="/signup" className="webdev-cyu-color-blue">
    Sign Up
    </Link>
  </div>
</div>
        </div>
   );
}

export default Login;