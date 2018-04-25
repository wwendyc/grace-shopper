import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import moment from 'moment'

import { getOrders, setOrder } from '../store/orders'
import { setProduct } from '../store/product'

const Orders = (props) => {
  const { setOrder, setProduct } = props
  let orders

  if (props.targetUser) {
    orders = props.targetUser.orders
  } else {
    orders = props.orders.list
  }

  return (
    <div className='OrderContainer'>
      {orders.map(order => {
        return (
          <div key={order.id}>
            <div className='small-margin-container'>
              <h3>
                <Link
                  to={`/orders/${order.id}`}
                  onClick={() => setOrder(order)}
                >
                  Order #: {order.id}
                </Link>
              </h3>
              <h4>Date: {moment(order.checkoutDate).format('LL')}</h4>
              <h4>Status: {order.status}</h4>
              <h4>Total: ${order.totalPrice.toFixed(2)}</h4>
              <h5>Notifications Sent To: {order.email}</h5>
            </div>
            <div className='ProductsContainer'>
              {order.products.map(product => {
                return (
                  <div key={product.id}>
                    <img src={product.imgUrl} />
                    <ul>
                      <li>
                        <Link
                          to='/single-product'
                          onClick={() => setProduct(product)}
                        >
                          {product.name}
                        </Link>
                      </li>
                      <li>${product.price.toFixed(2)}</li>
                      <li>Quantity: {product.quantity}</li>
                      <li>
                        Subtotal: ${product.subtotal.toFixed(2)}
                      </li>
                    </ul>
                  </div>
                )
              })}
            </div>
          </div>
        )
      })}
    </div>
  )
}

const mapState = state => ({
  orders: state.orders
})

const mapDispatch = dispatch => ({
  getOrders: dispatch(getOrders()),
  setOrder: order => {
    dispatch(setOrder(order))
  },
  setProduct: product => {
    dispatch(setProduct(product))
  }
})

export default connect(mapState, mapDispatch)(Orders)
