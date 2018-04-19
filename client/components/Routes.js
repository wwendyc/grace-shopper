import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { AuthRoute, Login, Signup } from './auth'
import Products from './Products'
import Home from './Home'
import NoMatch from './NoMatch'
import SingleProduct from './SingleProduct'
import UserDetail from './User/UserDetail'
import UserForm from './User/UserForm'

const Routes = () => (
  <div id="ComponentContainer" className="fill-xy center-xy column">
    <Switch>
      <AuthRoute path="/home" component={Home} />
      <Route exact path="/" component={Products} />
      <Route path="/single-product" component={SingleProduct} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
      <Route path="/user/:userId" component={UserDetail} />
      <Route path="/user/:userId/edit" component={UserForm} />
      <Route component={NoMatch} />
    </Switch>
  </div>
)

export default Routes
