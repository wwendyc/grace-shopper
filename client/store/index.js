import {createStore, applyMiddleware, combineReducers} from 'redux'
import logger from 'redux-logger'
import thunks from 'redux-thunk'
import axios from 'axios'
import history from '../history'
import user from './user'
import users from './users'
import product from './product'
import orders from './orders'
import cart from './cart'

// user is for login
// users is for retrieving user data
const reducer = combineReducers({user, users, product, orders, cart})

const store = createStore(
  reducer,
  applyMiddleware(
    thunks.withExtraArgument({axios, history}),
    logger
  )
)

export default store
