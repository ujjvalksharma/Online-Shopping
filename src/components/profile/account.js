import React,{useEffect,useState} from 'react';
import ProfileEditableItem from './profile-editable-item'
import {useParams} from "react-router-dom";
import UserService from '../../services/user-service'
const Account = () => {

   const {profileId}= useParams()
   const [otherUser,setOtherUser]=useState(null)
   const changeUserDetails=({inputValue,type})=>{
  let prevUser=JSON.parse((sessionStorage.getItem('USER')))
  switch(type) {
   case 'firstName':
      prevUser.firstName=inputValue 
      break
     case 'lastName':
      prevUser.lastName=inputValue
      break
      case 'email': 
         prevUser.email=inputValue
         break
         case 'password':
            prevUser.password=inputValue
            break

            default: break

   }
   //alert(JSON.stringify(prevUser))
   UserService.updateUser(prevUser)
   .then(data=>  sessionStorage.setItem('USER',JSON.stringify(data)))
   .catch(err=> alert('Please try again!! Error Updating your account'))

}

useEffect(()=>{
   if(profileId!==undefined){

      UserService.findUserById(profileId)
      .then(user=>{
         if(user!==undefined&&user.status!=500&&user.status!=400){
           
            setOtherUser(user)
         }
      })
      
   }
  

},[profileId])
   return (
<>
< br />
<h4> Profile<i className="fa fa-user" aria-hidden="true"></i></h4>
{otherUser!==null&&<>
<ProfileEditableItem inputType="text" changeUserDetails={changeUserDetails} type="firstName" labelName='first Name' value={otherUser.firstName} isEditable={false} />
<ProfileEditableItem inputType="text" changeUserDetails={changeUserDetails} type="lastName" labelName='Last Name' value={otherUser.lastName} isEditable={false} />
</>
}
{otherUser===null&&JSON.parse((sessionStorage.getItem('USER')))!==null&&<>

   <br />
<br />
<ProfileEditableItem inputType="text" changeUserDetails={changeUserDetails} type="firstName" labelName='first Name' value={JSON.parse((sessionStorage.getItem('USER'))).firstName} isEditable={true} />
<br />
<ProfileEditableItem inputType="text" changeUserDetails={changeUserDetails} type="lastName" labelName='Last Name' value={JSON.parse((sessionStorage.getItem('USER'))).lastName} isEditable={true} />
<br />
<ProfileEditableItem inputType="text" changeUserDetails={changeUserDetails} type="email" labelName='email' value={JSON.parse((sessionStorage.getItem('USER'))).email} isEditable={false} />
<br />
<ProfileEditableItem inputType="password" changeUserDetails={changeUserDetails} type="password" labelName='password' value="" isEditable={true} user={JSON.parse((sessionStorage.getItem('USER')))}/>

</>
}

</>
   );
}

export default Account;

/*
{profileId!==null?
<>
<br />
<ProfileEditableItem inputType="text" changeUserDetails={changeUserDetails} type="firstName" labelName='first Name' value={otherUser.firstName} isEditable={false} />
<br />

<ProfileEditableItem inputType="text" changeUserDetails={changeUserDetails} type="lastName" labelName='Last Name' value={otherUser.lastName} isEditable={false} />
<br />
<br />
</>:<>
<br />
<ProfileEditableItem inputType="text" changeUserDetails={changeUserDetails} type="firstName" labelName='first Name' value={JSON.parse((sessionStorage.getItem('USER'))).firstName} isEditable={true} />
<br />
<ProfileEditableItem inputType="text" changeUserDetails={changeUserDetails} type="lastName" labelName='Last Name' value={JSON.parse((sessionStorage.getItem('USER'))).lastName} isEditable={true} />
<br />
<ProfileEditableItem inputType="text" changeUserDetails={changeUserDetails} type="email" labelName='email' value={JSON.parse((sessionStorage.getItem('USER'))).email} isEditable={true} />
<br />
<ProfileEditableItem inputType="password" changeUserDetails={changeUserDetails} type="password" labelName='password' value="" isEditable={true} user={JSON.parse((sessionStorage.getItem('USER')))}/>
<br />

</>}

*/