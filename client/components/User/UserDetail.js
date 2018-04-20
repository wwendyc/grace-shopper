import React, { Component } from 'react'
import { connect } from 'react-redux'
import {Link} from 'react-router-dom'

import {UserForm} from './UserForm'
// need to import Order component

class UserDetail extends Component {
  render() {
    const { id, name, email, orders } = this.props
    return (
      <div>
        <h1>{name}</h1>
        <h5>{email}</h5>
        <h5>Password</h5>
        {/* pass the user data down to the form */}
        <Link to={`/user/${id}/edit`}><button>Edit</button></Link>
        <h3>Order history:</h3>
        <ul>
          orders.map(order => (
            {/* <Orders key={order.id} {...order} /> */}
          ))
        </ul>
      </div>
    )
  }
}

const mapState = (state, props) => {
  const paramId = Number(props.match.params.userId)
  const user = state.users.find(user => user.id === paramId)
  return { user }
}

export default connect(mapState)(UserDetail)

/*
[
  {
    id: 1,
    name: 'Cody',
    email: 'cody@email.com',
    googleId: null,
    isAdmin: false,
    createdAt: '2018-04-18T16:18:28.645Z',
    updatedAt: '2018-04-18T16:18:28.645Z',
    orders: [
      {
        id: 1,
        products: [
          {
            id: 1,
            name: 'item',
            imgUrl: '',
            quantity: 2,
            price: 2
          },
          {
            id: 2,
            name: 'item2',
            imgUrl: '',
            quantity: 3,
            price: 3.75
          }
        ],
        address: '123 fake st',
        status: 'Created',
        checkoutDate: '2018-04-18T04:00:00.000Z',
        totalPrice: 50.12,
        createdAt: '2018-04-18T16:20:08.421Z',
        updatedAt: '2018-04-18T16:20:08.421Z',
        userId: 1
      },
      {
        id: 2,
        products: [
          {
            id: 3,
            name: 'item3',
            imgUrl: '',
            quantity: 2,
            price: 2
          },
          {
            id: 4,
            name: 'item4',
            imgUrl: '',
            quantity: 3,
            price: 3.75
          }
        ],
        address: '123 fake st',
        status: 'Created',
        checkoutDate: '2018-04-18T04:00:00.000Z',
        totalPrice: 50.12,
        createdAt: '2018-04-18T16:24:52.100Z',
        updatedAt: '2018-04-18T16:24:52.100Z',
        userId: 1
      }
    ]
  }
]
*/
