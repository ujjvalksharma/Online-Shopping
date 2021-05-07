
import React, {useState } from 'react';
import {Link} from "react-router-dom";
//import '../../styles/App.css'
const NavBar = () => {


  const [q, setQ] = useState("");
  const user=JSON.parse((sessionStorage.getItem('USER')))
  const setSearchQuery=(e)=>{
    setQ(e.target.value)
  //  alert(q)
  }
   return (  
    <>
<nav className="navbar navbar-expand-lg navbar-light bg-light">
<Link to='/home'>
CYU Shop
  </Link>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation" >
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
    <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
     {user!==null&&<>
     <li className="nav-item">
      <Link to='/profile'>
        <a className="nav-link">My Account</a>
        </Link>
      </li>
      {user.type==='BUYER'&&
      <Link to='/cart'>
      <li className="nav-item">
        <a className="nav-link">Cart</a>
      </li>
      </Link>
}
      <Link to='/login'>
        <li className="nav-item">
          <a className="nav-link" onClick={()=> sessionStorage.removeItem('USER')}>Logout</a>
        </li>
        </Link>
      </>} 
      {user===null&&
        <Link to='/login'>
        <li className="nav-item">
          <a className="nav-link">Not logged in? Login</a>
        </li>
        </Link>}

    </ul>
    <form className="form-inline my-2 my-lg-0">
    <input className="form-control mr-sm-2" type="search" onChange={(e) => {setSearchQuery(e)}} placeholder="Search product name" aria-label="Search" size='70'/>
    <Link to={`/search/?q=${q}`}>
    <button className="btn btn-outline-primary my-2 my-sm-0" type="submit" >Search</button>
    </Link>
    </form>
  </div>
  </nav>
  
      </>
   );
}

export default NavBar;
