/**
 * ACTION TYPES
 */
const GET_ALL_USERS = 'GET_ALL_USERS'
const GET_ONE_USER = 'GET_ONE_USER'
const ADD_USER = 'ADD_USER'
const EDIT_USER = 'EDIT_USER'
const DELETE_USER = 'DELETE_USER'

/**
 * INITIAL STATE
 */
const initialState = {
  usersList: [],
  singleUser: {}
}

/**
 * ACTION CREATORS
 */
const getAllUsers = users => ({type: GET_ALL_USERS, users})
const getOneUser = userId => ({type: GET_ONE_USER, userId})
const addUser = user => ({type: ADD_USER, user})
const editUser = user => ({type: EDIT_USER, user})
const deleteUser = userId => ({type: DELETE_USER, userId})

/**
 * THUNK CREATORS
 */
export const getUsersList = () => {
  return async (dispatch, _, {axios}) => {
    const allUsers = await axios.get('/api/users')
      .catch(err => console.err('Unable to get users'))
    dispatch(getAllUsers(allUsers.data))
  }
}

export const getSingleUser = (userId) => {
  return async (dispatch, _, {axios}) => {
    const singleUser = await axios.get(`/api/users/${userId}`)
      .catch(err => console.err('Unable to retrieve user'))
    dispatch(getOneUser(singleUser.data))
  }
}

export const createUser = user => {
  return async (dispatch, _, {axios}) => {
    const newUser = await axios.post('/api/users', user)
      .catch(err => console.err('Unable to create user'))
    dispatch(addUser(newUser.data))
  }
}

export const updateUser = (userId, user) => {
  return async (dispatch, _, {axios}) => {
    const updatedUser = await axios.put(`/api/user/${userId}`, user)
      .catch(err => console.err('Unable to update user'))
    dispatch(editUser(updatedUser.data))
  }
}

export const removeUser = (userId) => {
  return async (dispatch, _, {axios}) => {
    await axios.delete(`/api/user/${userId}`)
      .catch(err => console.err('Unable to delete user'))
    dispatch(deleteUser(userId))
  }
}

/**
 * REDUCER
 */
export default (state = initialState, action) => {
  switch (action.type) {
  case GET_ALL_USERS:
    return {
      ...state,
      usersList: action.users
    }
  case GET_ONE_USER:
    return {
      ...state,
      singleUser: action.user
    }
  case ADD_USER:
    return {
      ...state,
      usersList: [...state.usersList, action.user]
    }
  case EDIT_USER:
    const updatedUsersList = state.usersList.map(user => {
      return user.id === action.user.id ? action.user : user
    })
    return {
      ...state,
      usersList: updatedUsersList
    }
  case DELETE_USER:
    const updatedUsersList = state.usersList.filter(user => {
      return user.id !== action.userId
    })
    return {
      ...state,
      usersList: updatedUsersList
    }
  default:
    return state
  }
}
