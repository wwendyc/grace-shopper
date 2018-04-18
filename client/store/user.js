/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const ADD_USER = 'ADD_USER'
const EDIT_USER = 'EDIT_USER'
const REMOVE_USER = 'REMOVE_USER'

/**
 * INITIAL STATE
 */
const defaultUser = {}

/**
 * ACTION CREATORS
 */
const getUser = user => ({type: GET_USER, user})
const addUser = user => ({type: ADD_USER, user})
const editUser = (user, userId) => ({type: EDIT_USER, userId, user})
const removeUser = () => ({type: REMOVE_USER})

/**
 * THUNK CREATORS
 */
export const me = () =>
  (dispatch, _, {axios}) =>
    axios.get('/auth')
      .then(res =>
        dispatch(getUser(res.data || defaultUser)))
      .catch(err => console.log(err))

export const createUser = user => {
  return async (dispatch) => {
    const newUser = await axios.post('/api/users', user)
      .catch(err => console.err('Unable to create user'))
    dispatch(addUser(newUser.data))
  }
}

export const updateUser = (userId, user) => {
  return async (dispatch) => {
    const updatedUser = await axios.put(`/api/user/${userId}`, user)
      .catch(err => console.err('Unable to update user'))
    dispatch(editUser(userId, updatedUser.data))
  }
}

export const auth = (credentials, method) =>
  (dispatch, _, {axios, history}) =>
    axios[method](`/auth/local`, credentials)
      .then(res => {
        dispatch(getUser(res.data))
        history.push('/home')
      }, authError => { // rare example: a good use case for parallel (non-catch) error handler
        dispatch(getUser({error: authError.response.data}))
      })
      .catch(dispatchOrHistoryErr => console.error(dispatchOrHistoryErr))

export const logout = () =>
  (dispatch, _, {axios, history}) =>
    axios.delete('/auth')
      .then(() => {
        dispatch(removeUser())
      })
      .catch(err => console.log(err))


/**
 * REDUCER
 */
export default (state = defaultUser, action) => {
  switch (action.type) {
    case GET_USER:
      return action.user
    case REMOVE_USER:
      return defaultUser
    default:
      return state
  }
}
