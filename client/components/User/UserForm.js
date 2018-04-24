import React, { Component } from 'react'
import { connect } from 'react-redux'

import { updateUser } from '../../store/users'

class UserForm extends Component {
  constructor() {
    super()
    this.state = {
      name: '',
      email: '',
      password: '',
      isAdmin: false
    }
  }

  handleChange = evt => {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }

  handleRadioChange = evt => {
    const isAdmin = evt.target.value === 'true' ? true : false
    this.setState({
      isAdmin
    })
  }

  handleSubmit = evt => {
    evt.preventDefault()
    const newInfo = Object.keys(this.state).reduce((obj, key) => {
      if (this.state[key]) obj[key] = this.state[key]
      return obj
    }, {})
    const userId = this.props.targetUser.id
    this.props.editUser(userId, newInfo)
  }

  render() {
    const { id, name, email } = this.props.targetUser
    const { isAdmin } = this.props.user
    const password = ''
    // TODO: add validataion
    return (
      <div className="userForm">
        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="name">Name: </label>
            <input
              type="text"
              name="name"
              placeholder={name}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <label htmlFor="email">Email: </label>
            <input
              type="text"
              name="email"
              placeholder={email}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <label htmlFor="password">Password: </label>
            <input
              type="text"
              name="password"
              placeholder={password}
              onChange={this.handleChange}
            />
          </div>
          {isAdmin || !isAdmin ? (
            <div>
              <p>Admin status: </p>
              <label htmlFor="admin">
                <input
                  name="adminStatus"
                  type="radio"
                  value="true"
                  onChange={this.handleRadioChange}
                />
                Admin
              </label>

              <label htmlFor="nonAdmin">
                <input
                  name="adminStatus"
                  type="radio"
                  value="false"
                  onChange={this.handleRadioChange}
                />
                Non-Admin
              </label>
            </div>
          ) : (
            ''
          )}
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
