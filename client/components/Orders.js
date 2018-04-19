import React, { Component } from 'react'
import { connect } from 'react-redux'

import { getOrders, setOrder } from '../store/orders'

class Orders extends Component {
  constructor () {
    super()
  }

  render () {
    const { orders, set } = this.props

    return (
      <div>
      {
        orders.list.map(order => {
          return (
            <div key={order.id} onClick={() => set(order)}>
              <ul>
                <li>Order #: {order.id}</li>
                <li>Date: {order.checkoutDate}</li>
                <li>Status: {order.status}</li>
                <li>Total: ${order.totalPrice}</li>
                <li>Items:
                  {
                    order.products.map(product => {
                      return (
                        <ul key={product.id}>
                          <li>{product.imgUrl}</li>
                          <li>{product.name}</li>
                          <li>{product.price}</li>
                          <li>{product.quantity}</li>
                        </ul>
                      )
                    })
                  }
                </li>
              </ul>
            </div>
          )
        })
      }
      </div>
    )
  }
}

const mapState = (state) => ({
  orders: state.orders
})

const mapDispatch = (dispatch, ownProps) => ({
  get: dispatch(getOrders()),
  set: (order) => {
    dispatch(setOrder(order))
    ownProps.history.push(`/orders/${order.id}`)
  }
})

export default connect(mapState, mapDispatch)(Orders)
