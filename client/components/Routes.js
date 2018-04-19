import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { AuthRoute, Login, Signup } from './auth'
import Products from './Products'
import Home from './Home'
import NoMatch from './NoMatch'
import SingleProduct from './SingleProduct'

import { UserDetail } from './User/UserDetail'
<<<<<<< HEAD
// import { EditUserForm } from './User/EditUserForm'
=======
import { UserForm } from './User/UserForm'
>>>>>>> master

const Routes = () => (
  <div className="fill-xy center-xy column">
    <Switch>
      <Route path="/user/:userId" component={UserDetail} />
      <AuthRoute path="/home" component={Home} />
      <Route exact path='/' component={Products} />
      <Route path="/single-product" component={SingleProduct} />
      <Route path='/login' component={Login} />
      <Route path='/signup' component={Signup} />
<<<<<<< HEAD
      {/* <Route path="/user/:userId/edit" component={EditUserForm} /> */}
=======
      <Route path="/user/:userId/edit" component={UserForm} />
>>>>>>> master
      <Route component={NoMatch} />
    </Switch>
  </div>
)

export default Routes
