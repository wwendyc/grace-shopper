import React, { Component } from 'react'
import { connect } from 'react-redux'

class UserDetail extends Component {
  render() {
    const { id, name, email, orders } = this.props
    return (
      <div>
        <h1>{name}</h1>
        <h5>{email}</h5>
        <h5>Password</h5>
        <button>Edit</button>
        <h3>Order history:</h3>
        <ul>List of orders</ul>
      </div>
    )
  }
}

const mapState = (state, props) => {
  const paramId = Number(props.match.params.studentId)
  const user = state.users.find(user => user.id === paramId)
  return { user }
}

export default connect(mapState)(UserDetail)

/*
[
  {
    "id": 2,
    "name": "Grace Hopper",
    "email": "grace@hopper.com",
    "googleId": null,
    "isAdmin": true,
    "createdAt": "2018-04-18T01:04:53.336Z",
    "updatedAt": "2018-04-18T01:04:53.336Z",
    "orders": []
  },
  {
    "id": 1,
    "name": "Cody",
    "email": "cody@email.com",
    "googleId": null,
    "isAdmin": false,
    "createdAt": "2018-04-18T01:04:53.335Z",
    "updatedAt": "2018-04-18T01:04:53.335Z",
    "orders": []
  }
]
*/
