import React, { Component } from 'react'
import { connect } from 'react-redux'

import {updateUser} from '../../store/user'

class UserForm extends Component {
  constructor() {
    super()
    this.state = {
      name: '',
      email: '',
      passowrd: '',
      admin: false
    }
  }

  handleChange = evt => {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }

  handleSubmit = evt => {
    evt.preventDefault()

    this.props.editUser() //userId, user
  }

  render() {
    // admin setting - need to consider how to distinguish between admin and user... via routes?
    const {name, email, password, admin} = this.state
    return (
      <div className="userForm">
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="name">Name: </label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={this.handleChange}
          />
          <label htmlFor="email">Email: </label>
          <input
            type="text"
            name="email"
            value={email}
            onChange={this.handleChange}
          />
          <label htmlFor="password">Password: </label>
          <input
            type="text"
            name="password"
            value={password}
            onChange={this.handleChange}
          />
          <label htmlFor="admin">Admin status: </label>
          <input
            type="text"
            name="admin"
            value={admin}
            onChange={this.handleChange}
          />
          <button type='submit'>Submit</button>
        </form>
      </div>
    )
  }
}

const mapDispatch = dispatch => ({
  editUser: (userId, user) => dispatch(updateUser(userId, user))
})

export default UserForm
