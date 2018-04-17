import React, {Component} from 'react'

class UserDetail extends Component {
  render () {
    return (
      <div>
        <h1>Name</h1>
        <h3>Email</h3>
        <h3>Password</h3>
        <button>Edit</button>
        <ul>
          List of orders
        </ul>
      </div>
    )
  }
}

export default UserDetail
