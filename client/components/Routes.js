import React from 'react'
import {Switch, Route} from 'react-router-dom'
import {AuthRoute, Login, Signup} from './auth'
import Welcome from './Welcome'
import Home from './Home'
import NoMatch from './NoMatch'
import SingleProduct from './SingleProduct'

import {UserDetail} from './User/UserDetail'
import {EditUserForm} from './User/EditUserForm'

const Routes = () => (
  <div className='fill-xy center-xy column'>
    <Switch>
      <Route exact path='/' component={Welcome} />
      <Route path='/login' component={Login} />
      <Route path='/signup' component={Signup} />
      <Route path='/user/:userId' component={UserDetail} />
      <Route path='/user/:userId/edit' component={EditUserForm} />
      <AuthRoute path='/home' component={Home} />
      <Route path='/single-product' component={SingleProduct} />
      <Route component={NoMatch} />
    </Switch>
  </div>
)

export default Routes
