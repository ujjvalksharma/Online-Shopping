import React, {useState } from 'react';
const ProfileEditableItem = ({
   labelName,
    value,
    isEditable,
    inputType,
    type,
    changeUserDetails
}) => {

   const [edit, setEdit] = useState(false);
   const [inputValue, setInputValue] = useState(value);
   return (
<>
{!edit&&
   <>
   <div className="row">
  <div className="col-8"><h4>{labelName}: {labelName!=='password'&& inputValue}</h4></div>
  {isEditable&&
       <div className="col-4"><i className="fa fa-pencil" aria-hidden="true"  onClick={()=>setEdit(true)}></i></div>
      }
</div>
</>}

{edit&&
<>
   <div className="row">
  <div className="col-8">
          <input type={inputType} class="form-control" value={inputValue} placeholder={'Enter '+labelName} onChange={(e)=>setInputValue(e.target.value)}/>
     </div>
  {isEditable&&
       <div className="col-4"><i className="fa fa-check" aria-hidden="true"  onClick={()=>
         {
            changeUserDetails({type,inputValue})
          setEdit(false)
         }}></i></div>
      }
</div>
</>}

</>
   );
}

export default ProfileEditableItem;