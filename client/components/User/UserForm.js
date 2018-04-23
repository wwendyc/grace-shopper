import React, { Component } from 'react'
import { connect } from 'react-redux'

import { updateUser } from '../../store/users'

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
    const userId = +this.props.match.params.userId
    this.props.editUser(userId, { name: 'Gracie' })
  }

  render() {
    const { name, email, password, admin } = this.state
    return (
      <div className="userForm">
        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="name">Name: </label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <label htmlFor="email">Email: </label>
            <input
              type="text"
              name="email"
              value={email}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <label htmlFor="password">Password: </label>
            <input
              type="text"
              name="password"
              value={password}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <label htmlFor="admin">Admin status: </label>
            <input
              type="text"
              name="admin"
              value={admin}
              onChange={this.handleChange}
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    )
  }
}

const mapDispatch = dispatch => ({
  editUser: (userId, user) => dispatch(updateUser(userId, user))
})

export default connect(null, mapDispatch)(UserForm)
