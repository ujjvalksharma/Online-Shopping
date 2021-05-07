import React from 'react';
import Home from './components/home'
import ProductDesc from './components/product/product-description'
import NavBar from './components/nav-bar'
import ProductReducer from './reducers/product-reducer'
import Cart from './components/cart/cart'
import BillingPage from './components/billing/billing-page'
import {combineReducers, createStore} from "redux";
import {Provider} from "react-redux";
import Profile from './components/profile'
import OtherProfile from './components/profile/other-profile'
import Login from './components/login'
import SignUp from './components/sign-up'
import AnonymousUser from './components/anonymous-user'
/*import Account from './components/profile/account'
import NewCoupon from './components/profile/new-coupon'
import PreviousCoupon from './components/profile/active-coupons'
import AllOrder from './components/orders/all-orders'
import Activity from './components/profile/activity'*/
import WrongMapping from './components/wrong-mapping'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import CartProductsContext from './context-store/cart-context';
 const App= ()=> {
 


  const reducer = combineReducers({
    ProductReducer: ProductReducer,
})

const store = createStore(reducer) 
const user=JSON.parse((sessionStorage.getItem('USER')))

   return (
<>
<CartProductsContext>
  <Provider store={store}>
<Router>
<Switch>
  <Route path="/signup" component={SignUp} exact={true} />
  <Route path="/login" component={Login} exact={true} />
  <div> 
  <NavBar />
    {user!==null?<>
    {user.type==='ADMIN'?
    <>
      <Switch>
      <Route path="/home" component={Home} exact={true} />
      <Route path="/search" component={Home} exact={true} />
    <Route path="/" component={Home} exact={true} />
<Route path="/profile" exact={true} component={Profile}/>  
<Route path="/profile/activecoupons" exact={true} component={Profile}/> 
<Route path="/profile/newcoupon" exact={true} component={Profile}/> 
<Route path="/product/:productId" exact={true} component={ProductDesc} />
<Route path="/product/:productId/:commentId" exact={true} component={ProductDesc} />
<Route path="/profile/orders" component={WrongMapping} /> 
<Route path="/profile/activity" component={WrongMapping}/> 
<Route path="/profile/activity" exact={true} component={Profile}/> 
<Route path="/profile/:profileId" exact={true} component={OtherProfile}/> 
<Route path="/profile/:profileId/orders" exact={true} component={OtherProfile} />
<Route path="/billing/:totalAmount" exact={true} component={BillingPage} />
<Route path="/profile/:profileId/activity" exact={true} component={OtherProfile} />
<Route path="/cart" exact={true} component={Cart} />
<Route path="/" component={WrongMapping} />  
</Switch>
    </>:
    <>
        <Switch>
        <Route path="/home" component={Home} exact={true} />
        <Route path="/search" component={Home} exact={true} />
    <Route path="/" component={Home} exact={true} />
    <Route path="/profile" exact={true} component={Profile}/> 
    <Route path="/profile/activity" exact={true} component={Profile}/> 
    <Route path="/profile/orders" exact={true} component={Profile}/>  
    <Route path="/cart" exact={true} component={Cart} />
    <Route path="/billing/:totalAmount" exact={true} component={BillingPage} />
    <Route path="/product/:productId" exact={true} component={ProductDesc} />
    <Route path="/product/:productId/:commentId" exact={true} component={ProductDesc} />
    <Route path="/profile/:profileId" exact={true} component={OtherProfile}/> 
    <Route path="/profile/:profileId/orders" exact={true} component={OtherProfile} />
    <Route path="/profile/:profileId/activity" exact={true} component={OtherProfile} />
   <Route path="/" component={WrongMapping} /> 
   </Switch>
    </>}
    </> :<>
    <Switch>
    <Route path="/" component={Home} exact={true} />
    <Route path="/home" component={Home} exact={true} />
    <Route path="/search" component={Home} exact={true} />
    <Route path="/product/:productId" exact={true} component={ProductDesc} />
    <Route path="/product/:productId/:commentId" exact={true} component={ProductDesc} />
    <Route path="/profile" exact={true} component={Profile}/> 
    <Route path="/profile/:profileId" exact={true} component={OtherProfile}/> 
    <Route path="/profile/:profileId/orders" exact={true} component={OtherProfile} />
    <Route path="/profile/:profileId/activity" exact={true} component={OtherProfile} />
    <Route path="/billing/:totalAmount" exact={true} component={BillingPage} />
    <Route path="/cart" exact={true} component={Cart} />
    <Route path="/" component={AnonymousUser} />
    </Switch>
    </>
  }
    </div>
  </Switch>
</Router>
</Provider>
</CartProductsContext>
</>

   );

}

export default App;