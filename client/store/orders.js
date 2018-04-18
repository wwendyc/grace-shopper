/**
 * ACTION TYPES
 */
const GET_ORDERS = 'GET_ORDERS'
const ADD_ORDER = 'ADD_ORDER'
const UPDATE_ORDER = 'UPDATE_ORDER'
const REMOVE_ORDER = 'REMOVE_ORDER'
const SELECT_ORDER = 'SELECT_ORDER'

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

const select = (order) => ({
  type: SELECT_ORDER,
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

export const selectOrder = (orderId) => {
  return async (dispatch, getState, { axios, history }) => {
    try {
      const { data } = await axios.get(`/api/orders/${orderId}`);
      dispatch(select(data));

      history.push(`/orders/${orderId}`)
    }
    catch (error) {
      console.error(`Attempt to select order with id ${orderId} has failed`, error);
    }
  }
}

/**
 * REDUCER
 */
export default (orders = initialState, action) => {
  switch (action.type) {
    case GET_ORDERS:
      return {
        ...orders,
        list: action.orders
      }

    case ADD_ORDER:
      return {
        ...orders,
        list: [...orders.list, action.order],
        selected: action.order
      }

    case UPDATE_ORDER: {
      const list = orders.list.map(order => {
        if (order.id === action.order.id) {
          return action.order
        }

        return order
      })

      return {
        ...orders,
        list,
        selected: action.order
      }
    }

    case REMOVE_ORDER: {
      const list = orders.list.filter(order => {
        return order.id !== action.orderId
      })

      return {
        ...orders,
        list,
        selected: {}
      }
    }

    case SELECT_ORDER:
      return {
        ...orders,
        selected: action.order
      }

    default:
      return orders
  }
}