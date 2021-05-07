import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/home.style.client.css';
const Product = ({
   id,
   title,
   category,
   price,
   description,
   imgUrl
}) => {

   const sizeOfDescription=50;
   return (
<>
<div className="col-xl-3 col-lg-3 col-md-4 col-sm-6"> 
<Link to={`/product/${id}`} className="webdev-cyu-disable-color">
      <div className="card webdev-cyu-prod-card-width">
      <center><img alt={title} src={imgUrl} className="webdev-cyu-product-card-img"/></center>
  <div className="card-body webdev-product-card">
    <h5 className="card-title webdev-cyu-disable-color"><b>{title}</b></h5>
    <p className="card-text"><b>Category: </b> {category}</p>
    <p className="card-text"><b>Product description: </b> {description.length>sizeOfDescription?description.substring(0, sizeOfDescription)+"...":description}</p>
    <p className="card-text"><b>Price: </b> {price} $</p>
  </div>
 </div>
 </Link>
 </div>
</>
   );
}

export default Product;