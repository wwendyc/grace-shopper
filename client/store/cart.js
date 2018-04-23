import axios from 'axios'

const GET_CART = 'GET_CART'

const getCartAction = cart => ({
  type: GET_CART,
  cart
})

export const getCart = () => async (dispatch) => {
  const res = axios.get('/api/cart')
  const cart = res.data
  dispatch(getCartAction(cart))
}

export const addToCart = id => async (dispatch) => {
  const response = await axios.get(`/api/products/${id}`)
  const product = response.data
  const res = await axios.post('/api/cart', product)
  const cart = res.data
  dispatch(getCartAction(cart))
}

export const removeFromCart = id => async (dispatch) => {
  const response = await axios.get(`/api/products/${id}`)
  const product = response.data
  const res = await axios.delete('/api.cart', product)
  const cart = res.data
  dispatch(getCartAction(cart))
}

const initialState = {
  cart: {}
}

export default (state = initialState, action) => {
  switch(action.type) {
  case GET_CART:
    return {...state, cart: action.cart}
  default:
    return {...state}
  }
}