import React, { Component } from 'react'
import { connect } from 'react-redux'
import {Link} from 'react-router-dom'

import {getSingleUser} from '../../store/users'

import UserForm from './UserForm'
import Orders from '../Orders'

class UserDetail extends Component {
  componentDidMount () {
    const userId = +this.props.match.params.userId
    this.props.singleUserData(userId)
  }

  render() {
    const { id, name, email, orders } = this.props.singleUser
    return (
      <div>
        <h1>{name}</h1>
        <h5>{email}</h5>
        <Link to={`/user/${id}/edit`}><button>Edit</button></Link>
        <Link to="/orders"><h5>View orders</h5></Link>
      </div>
    )
  }
}

const mapState = (state) => ({
  singleUser: state.users.singleUser
})

const mapDispatch = (dispatch) => ({
  singleUserData: (userId) => dispatch(getSingleUser(userId))
})

export default connect(mapState, mapDispatch)(UserDetail)
