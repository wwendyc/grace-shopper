import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export class UserInfo extends Component {
  render() {
    const { id, name, email, orders } = this.props.targetUser
    return (
      <div>
        <div>
          <h1>Hello, {name}</h1>
          <h5>{email}</h5>
          <Link to={`/user/edit`}>
              <button>Edit</button>
            </Link>
            <Link to={`/user/orders`}>
              <button>Orders</button>
            </Link>
        </div>
      </div>
    )
  }
}

export default UserInfo
