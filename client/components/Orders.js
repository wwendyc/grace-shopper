import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import moment from 'moment'

import { getOrders, setOrder } from '../store/orders'
import { setProduct } from '../store/product'

class Orders extends Component {
  constructor () {
    super()
  }

  render () {
    const { orders, setOrder, setProduct } = this.props

    return (
      <div>
      {
        orders.list.map(order => {
          return (
            <div key={order.id}>
              <ul>
                <li>
                  <Link
                    to={`/orders/${order.id}`}
                    onClick={() => setOrder(order)}
                    >Order #: {order.id}
                  </Link>
                </li>
                <li>Date: {moment(order.checkoutDate).format('LL')}</li>
                <li>Status: {order.status}</li>
                <li>Total: ${order.totalPrice.toFixed(2)}</li>
                <li>Items:
                  {
                    order.products.map(product => {
                      return (
                        <div key={product.id}>
                          <ul>
                            <li><img src={product.imgUrl} /></li>
                            <li>
                              <Link
                                to='/single-product'
                                onClick={() => setProduct(product)}
                                >{product.name}
                              </Link>
                            </li>
                            <li>${product.price.toFixed(2)}</li>
                            <li>Quantity: {product.quantity}</li>
                            <li>Subtotal: ${(product.price * product.quantity).toFixed(2)}</li>
                          </ul>
                        </div>
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

const mapDispatch = (dispatch) => ({
  getOrders: dispatch(getOrders()),
  setOrder: (order) => {
    dispatch(setOrder(order))
  },
  setProduct: (product) => {
    dispatch(setProduct(product))
  }
})

export default connect(mapState, mapDispatch)(Orders)
