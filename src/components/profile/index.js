import React from 'react';
import Account from './account'
import NewCoupon from './new-coupon'
import PreviousCoupon from './active-coupons'
import AllOrder from '../orders/all-orders'
import Activity from './activity'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
const Profile = ({otherUser}) => {
  const user=otherUser!==undefined?otherUser:JSON.parse((sessionStorage.getItem('USER'))) 

   return (
<>
<Router>
{(otherUser!==undefined||user!==null)&&
<div className="container-fluid">
<div className="row">
{otherUser===undefined&&<>
<div className="col-2">
<ul className="list-group">
<Link to="/profile">
 <li className="list-group-item">Account</li>
 </Link>
 {user!==null&&user.type==='ADMIN'&&
 <Link to="/profile/activecoupons">
 <li className="list-group-item">Active Coupons</li>
 </Link>}
 
 {user!==null&&user.type==='ADMIN'&&
<Link to="/profile/newcoupon">
<li className="list-group-item">Create New Coupons</li>
</Link>
}
{user!==null&&user.type==='BUYER'&&<>
<Link to="/profile/orders">
<li className="list-group-item">Previous Orders</li>
</Link>
<Link to="/profile/activity">
<li className="list-group-item">Previous Activities</li>
</Link>
</>
}
</ul>
  </div>
  </>
}
{otherUser!==undefined&&<>
  <div className="col-2">
<ul className="list-group">

<Link to={`/profile/${otherUser.id}`}>
 <li className="list-group-item">Account</li>
 </Link>

<Link to={`/profile/${otherUser.id}/orders`}>
<li className="list-group-item">Previous Orders</li>
</Link>

<Link to={`/profile/${otherUser.id}/activity`}>
<li className="list-group-item">Previous Activities</li>
</Link>

  </ul>
  </div>

</>}

  <div className="col-10">
<Switch>
<Route path="/profile" exact={true} component={Account} />
<Route path="/profile/newcoupon" exact={true} component={NewCoupon} />
  <Route path="/profile/activecoupons" exact={true} component={PreviousCoupon} /> 
  <Route path="/profile/orders" exact={true} component={AllOrder} />
  <Route path="/profile/activity" exact={true} component={Activity} />
  <Route path="/profile/:profileId/orders" exact={true} component={AllOrder} />
  <Route path="/profile/:profileId/activity" exact={true} component={Activity} />
  <Route path="/profile/:profileId" exact={true} component={Account} />
</Switch>

</div>

  </div>
</div>
}
{otherUser===undefined&&user===null&&
 <div className="container">
 <br />
 <br />
 <div className="alert alert-danger" role="alert">
 Looks like you have reached a invalid url path! <i className="fa fa-frown-o" aria-hidden="true"></i>
</div>
</div>
}
</Router>
</>

   );
}

export default Profile;