/**
 * ACTION TYPES
 */
const GET_ORDERS = 'GET_ORDERS'
const ADD_ORDER = 'ADD_ORDER'
const UPDATE_ORDER = 'UPDATE_ORDER'
const REMOVE_ORDER = 'REMOVE_ORDER'
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

const update = (order) => ({
  type: UPDATE_ORDER,
  order
})

const remove = (orderId) => ({
  type: REMOVE_ORDER,
  orderId
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
      const { user } = getState()

      if (user.id) {
        order = {...order, userId: user.id}
      }

      const { data } = await axios.post('/api/orders', order);
      dispatch(add(data));

      history.push(`/orders/${data.id}`)
    }
    catch (error) {
      console.error('Attempt to add order has failed', error);
    }
  }
}

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

export const removeOrder = (orderId) => {
  return async (dispatch, getState, { axios, history }) => {
    try {
      await axios.delete(`/api/orders/${orderId}`);
      dispatch(remove(orderId));

      history.push('/orders')
    }
    catch (error) {
      console.error(`Attempt to remove order with id ${orderId} has failed`, error);
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

    case REMOVE_ORDER: {
      const list = state.list.filter(order => {
        return order.id !== action.orderId
      })

      return {
        ...state,
        list,
        selected: {}
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
