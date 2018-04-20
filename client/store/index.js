import {createStore, applyMiddleware, combineReducers} from 'redux'
import logger from 'redux-logger'
import thunks from 'redux-thunk'
import axios from 'axios'
import history from '../history'
import user from './user'
import product from './product'
import orders from './orders'

const reducer = combineReducers({user, product, orders})

const store = createStore(
  reducer,
  applyMiddleware(
    thunks.withExtraArgument({axios, history}),
    logger
  )
)

export default store
