/**
 * ACTION TYPES
 */
const GET_ALL_USERS = 'GET_ALL_USERS'
const ADD_USER = 'ADD_USER'
const EDIT_USER = 'EDIT_USER'

/**
 * INITIAL STATE
 */
const usersList = []

/**
 * ACTION CREATORS
 */
const allUsers = () => ({type: GET_ALL_USERS, users})
const addUser = user => ({type: ADD_USER, user})
const editUser = (user, userId) => ({type: EDIT_USER, userId, user})

/**
 * THUNK CREATORS
 */
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

/**
 * REDUCER
 */
export default (state = usersList, action) => {
  switch (action.type) {
  case GET_ALL_USERS:
    return state.usersList
  case ADD_USER:
  case EDIT_USER:
  case REMOVE_USER:
    return defaultUser
  default:
    return state
  }
}
