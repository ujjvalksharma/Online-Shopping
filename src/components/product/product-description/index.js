import React, { useEffect,useState,useContext } from 'react';
import {useParams} from "react-router-dom";
import {connect} from "react-redux";
import productService from '../../../services/product-service'
import {CartContextApi} from '../../../context-store/cart-context'
import {Link} from 'react-router-dom'
import CommentService from '../../../services/comment-service'
import InnerCommentService from '../../../services/inner-comment-service'
import '../../../styles/App.css'
import '../../../styles/product-desc.style.client.css'
const ProductDesc = () => {
   const cartApiSubscriber=useContext(CartContextApi);
  const {productId,commentId}= useParams()
  const [product, setProduct] = useState({}); 
  const [comment, setComment] = useState(""); 
  const [comments,setComments]=useState([])
  const [innerComment, setInnerComment] = useState(""); 
  const [innerComments,setInnerComments]=useState([]);

  const user=JSON.parse((sessionStorage.getItem('USER')))


           useEffect(()=>{

            if(commentId!==undefined&&commentId!==null){

               InnerCommentService.findAllInnerComment(commentId)
               .then(innerComments=>{
                  if(innerComments!==undefined&&innerComments.status!==500&&innerComments.status!==400){
                     setInnerComments(innerComments)
                  }
               })
            }
           },[commentId]);

    useEffect(()=>
    {
     fetch(`https://fakestoreapi.com/products/${productId}`)
       .then(response => response.json())
       .then(product => setProduct(product))
   },[productId])

   useEffect(()=>{
      CommentService.findAllComment(productId)
      .then(comments=>setComments(comments))
   },[productId])


   const addComment=()=>{
let currentComment={
     text:comment,
    prodId:productId,
	 user:{
       id:user.id
    }
}


CommentService.createComment(currentComment)
.then(data=>{
   if(data!==undefined&&data.status!==500 &&data.status!==400){
      data.user.firstName=user.firstName
      data.user.lastName=user.lastName
      data.user.type=user.type
   comments.push(data)
   setComment("")
   }
   
})
.catch(err=> alert('Server is not reponding to submit the comment. Please try again!!'))

   }

   const addInnerComment=()=>{
      let currentInnerComment={
         text:innerComment,
        user:{
           id:user.id
        },
        comment:{
           id: commentId
        }
    }
 InnerCommentService.createInnerComment(currentInnerComment)
    .then(innerComment=>{
   if(innerComment!==undefined&&innerComment.status!==500 &&innerComment.status!==400){
      innerComment.user.firstName=user.firstName
      innerComment.user.lastName=user.lastName
      innerComment.user.type=user.type
      innerComments.push(innerComment)
      setInnerComment("")
   }
   
})
.catch(err=> alert('Server is not reponding to submit the comment. Please try again!!'))
   
   }

   const deleteProductComment= (index)=>{
      
      CommentService.deleteCommentById(comments[index].id)
      .then(comment=>{
if(comment!==undefined&&comment.status!==500&&comment.status!==400){
alert('Your comment is successfully deleted')
   setComments(prevComments=>{
      let tempComments=[]
      
      for(let i=0;i<prevComments.length;i++){
         if(index!==i){
            tempComments.push(prevComments[i])
         }
      }
     return tempComments
   })

}
      })
      .catch(err=>alert('error deleting comment try again!!'))
      
   }

   const deleteInnerComment= (index)=>{
      
      InnerCommentService.deleteCommentById(innerComments[index].id)
      .then(comment=>{
if(comment!==undefined&&comment.status!==500&&comment.status!==400){
   alert('Your comment is successfully deleted')
   setInnerComments(prevComments=>{
      let tempComments=[]
      
      for(let i=0;i<prevComments.length;i++){
         if(index!==i){
            tempComments.push(prevComments[i])
         }
      }
     return tempComments
   })
   
}
      })
      .catch(err=>alert('error deleting comment try again!!'))
      
   }

   return (
<>
<div className="container">
   <br />
<center><img alt={product.title} src={product.image} className="webdev-cyu-product-desc-img"/></center>
<br />
<h5>Product Name: {product.title} </h5>
<br />
<h5>Product Category: {product.category} </h5>
<br />
<h5>Product Price: {product.price} </h5>
<br />
<h5>Product Description: {product.description} </h5>
<br />
{user!==null&&user.type=='BUYER'&&
<button type="button" className="btn btn-primary" onClick={()=>cartApiSubscriber.cartDispatch({type:'ADD',newProduct:product})}>
Add to cart</button>
}
    <br />
    <br />
{comments.map((comment,index)=>{
  return(
<>
   <br />
  <div className="card" key={"comment"+index}>
   
  <div className="card-body">
{comment.user.type!=='ADMIN'&&
   <p>
   <Link to={`/profile/${comment.user.id}`}>
      <b className="webdev-cyu-color-blue">{comment.user.firstName} {comment.user.lastName}:</b> 
      </Link>

      {comment.text} {user!=null&&(user.id===comment.user.id||user.type==='ADMIN')&&
      <i className="fa fa-trash webdev-cyu-color-red" aria-hidden="true" onClick={()=>deleteProductComment(index)} ></i>} 
      </p>
}
{comment.user.type==='ADMIN'&&
<p> <b>Admin:</b> {comment.text} {user!=null&&(user.id===comment.user.id)&&
      <i className="fa fa-trash webdev-cyu-color-red" aria-hidden="true" onClick={()=>deleteProductComment(index)} ></i>}  </p>
}
   <Link to={`/product/${productId}/${comment.id}`}>
   <p style={{float:'right'}} id={"comment"+index} className="webdev-cyu-color-blue">View comments</p>
   <hr></hr>
   </Link>
   {commentId===''+comment.id&&
    innerComments.map((innerComment,index)=>{
       return(<>
       { innerComment.user.type!=='ADMIN'&& <p className="webdev-cyu-innercomment" key={'innercomment'+index}>
            <Link to={`/profile/${innerComment.user.id}`}>
            <b className="webdev-cyu-color-blue">{innerComment.user.firstName} {innerComment.user.lastName}:</b>
            </Link>
          {innerComment.text} {user!=null&&(user.id===innerComment.user.id||user.type==='ADMIN')&&<i className="fa fa-trash webdev-cyu-color-red" aria-hidden="true" onClick={()=>deleteInnerComment(index)} ></i>}
          </p>}
          {innerComment.user.type==='ADMIN'&&
<p> <b>Admin:</b> {innerComment.text} {user!=null&&(user.id===innerComment.user.id)&&
      <i className="fa fa-trash webdev-cyu-color-red" aria-hidden="true" onClick={()=>deleteInnerComment(index)} ></i>}  </p>
}

       </>)
    })
   }

   { commentId===''+comment.id&&user!==null&&<div class="input-group mb-3 webdev-cyu-innercomment">
  <input type="text" class="form-control col-6" placeholder="Add user comment" onChange={(e)=>setInnerComment(e.target.value)} value={innerComment}/>
  <div class="input-group-append">
    <span class="input-group-text" onClick={()=> addInnerComment()}>post</span>
  </div>
</div>}

   </div>
  </div>
  </>
  ) 
})}
 <br />
{user!==null&&
<div class="input-group mb-3">
  <input type="text" class="form-control col-6" placeholder="Add product comment" onChange={(e)=>setComment(e.target.value)} value={comment}/>
  <div class="input-group-append">
    <span class="input-group-text" onClick={()=>addComment()}>post</span>
  </div>
</div>
}
{user===null&&<><hr></hr>
<h5><center>Please login to comment on products and users' comments <i className="fa fa-comments" aria-hidden="true"></i>
</center>
</h5>
</>
}
</div>
</>
   );
}



const stpm = (state) => ({
   products: state.ProductReducer.products
 })
 const dtpm = (dispatch) => ({
   findProductById: (productId) => {
    
       productService.findProductById(productId)
  
    }
 })
 
 const pm = connect(stpm, dtpm)
 
 export default pm(ProductDesc);