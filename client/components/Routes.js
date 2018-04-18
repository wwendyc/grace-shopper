import React from 'react'
import {Switch, Route} from 'react-router-dom'
import {AuthRoute, Login, Signup} from './auth'
import Welcome from './Welcome'
import Home from './Home'
import NoMatch from './NoMatch'
import SingleOrder from './SingleOrder'

const Routes = () => (
  <div className='fill-xy center-xy column'>
    <Switch>
      <Route exact path='/' component={Welcome} />
      <Route path='/login' component={Login} />
      <Route path='/signup' component={Signup} />
      <Route path='/orders/:id' component={SingleOrder} />
      <AuthRoute path='/home' component={Home} />
      <Route component={NoMatch} />
    </Switch>
  </div>
)

export default Routes
