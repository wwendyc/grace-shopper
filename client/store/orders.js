import { clearCart } from './cart'

/**
 * ACTION TYPES
 */
const GET_ORDERS = 'GET_ORDERS'
const ADD_ORDER = 'ADD_ORDER'
const UPDATE_ORDER = 'UPDATE_ORDER'
const SET_ORDER = 'SET_ORDER'

/**
 * INITIAL STATE
 */
const initialState = {
  list: [],
  selected: {}
}

/**
 * ACTION CREATORS
 */
const get = (orders) => ({
  type: GET_ORDERS,
  orders
})

const add = (order) => ({
  type: ADD_ORDER,
  order
})

// Future Feature: Admin update order status | User cancel order
const update = (order) => ({
  type: UPDATE_ORDER,
  order
})

export const setOrder = (order) => ({
  type: SET_ORDER,
  order
})

/**
 * THUNK CREATORS
 */
export const getOrders = () => {
  return async (dispatch, getState, { axios }) => {
    try {
      const { data } = await axios.get('/api/orders');
      dispatch(get(data));
    }
    catch (error) {
      console.error('Attempt to get orders has failed', error);
    }
  }
}

export const addOrder = (order) => {
  return async (dispatch, getState, { axios, history }) => {
    try {
      const { cart, user } = getState()
      let cartList = (Object.keys(cart.cart).length === 0) ? [] : Object.values(cart.cart)
      let totalPrice = 0

      cartList = cartList.map(product => {
        const subtotal = product.price * product.quantity
        totalPrice += subtotal

        return {...product, subtotal}
      });

      order = {
        ...order,
        products: cartList,
        totalPrice
      }

      if (user.id) {
        order = {...order, userId: user.id}
      }

      const { data } = await axios.post('/api/orders', order);
      await dispatch(add(data));
      await dispatch(clearCart())

      history.push(`/orders/${data.id}`)
    }
    catch (error) {
      console.error('Attempt to add order has failed', error);
    }
  }
}

// Future Feature: Admin update order status | User cancel order
export const updateOrder = (order) => {
  return async (dispatch, getState, { axios, history }) => {
    try {
      const { data } = await axios.put(`/api/orders/${order.id}`, order);
      dispatch(update(data));

      history.push(`/orders/${order.id}`)
    }
    catch (error) {
      console.error(`Attempt to update order with id ${order.id} has failed`, error);
    }
  }
}

/**
 * REDUCER
 */
export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ORDERS:
      return {
        ...state,
        list: action.orders
      }

    case ADD_ORDER:
      return {
        ...state,
        list: [...state.list, action.order],
        selected: action.order
      }

    // Future Feature: Admin update order status | User cancel order
    case UPDATE_ORDER: {
      const list = state.list.map(order => {
        if (order.id === action.order.id) {
          return action.order
        }

        return order
      })

      return {
        ...state,
        list,
        selected: action.order
      }
    }

    case SET_ORDER:
      return {
        ...state,
        selected: action.order
      }

    default:
      return state
  }
}
