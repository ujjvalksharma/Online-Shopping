import React,{useEffect,useState} from 'react'
import CommentService from '../../services/comment-service' 
import InnerCommentService from '../../services/inner-comment-service'  
import {useParams} from "react-router-dom";
const Activity=()=>{

    const user=JSON.parse((sessionStorage.getItem('USER')))
    const [productComments,setProductComments]=useState([])
    const {profileId}= useParams()
     const [innerComments,setInnerComments]=useState([])
     useEffect(()=>{

      const currentUserId=profileId!==undefined?profileId:user.id
        CommentService.findCommentsByUserId(currentUserId)
        .then(comments=>{
            if(comments!==undefined&&comments.status!==500&&comments.status!==400){
                setProductComments(comments)
            }
        })
       // .catch(err=>/*alert('failed to fetch comments. Please refresh')*/)
    },[])

 useEffect(()=>{
  const currentUserId=profileId!==undefined?profileId:user.id
    InnerCommentService.findInnerCommentsByUserId(currentUserId)
    .then(innerComments=>{
        if(innerComments!==undefined&&innerComments.status!==500&&innerComments.status!==400){
            setInnerComments(innerComments)
        }
    })
   // .catch(err=>/*alert('failed to fetch inner comments. Please refresh')*/)
    
},[])

    return (<>
    <h1>All product comments activity</h1>
    <hr></hr>
   {productComments.map((comment,index)=><>
   <br />
   {/*<Link to={`/product/${comment.prodId}`} key={'profile_prod_comment'+index}>*/}
 
   <div className="card">
   <div className="card-body">
     Comment: {comment.text}
     <br /> {/* ask professor why link is not working */}
     <form action={`/product/${comment.prodId}`} key={'profile_prod_comment'+index}>
   <button type='submit' style={{ border: 'none',float:'right'}} className="btn btn-light">Click to view comment details </button>
     </form>
   </div>
 </div>
    </>)}

    <h1>All comment on comment activity</h1>
    <hr></hr>
    {innerComments.map((innerComment,index)=><>
   <br />
   {/*<Link to={`/product/${comment.prodId}`} key={'profile_prod_comment'+index}>*/}
 
   <div className="card">
   <div className="card-body">
     Comment: {innerComment.text} 
     <br />
     <form action={`/product/${innerComment.comment.prodId}/${innerComment.comment.id}`} key={'profile_prod_comment'+index}>
   <button type='submit' style={{ border: 'none',float:'right'}} className="btn btn-light">Click to view comment details </button>
     </form>
   </div>
 </div>
    </>)}

    </>
    
    )
}

export default Activity;