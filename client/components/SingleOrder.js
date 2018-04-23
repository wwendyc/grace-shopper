import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import moment from 'moment'

import { setProduct } from '../store/product'

const SingleOrder = (props) => {
  const { orders } = props
  const selectedOrder = orders.selected

  return (
    <div>
      <div>
        <div>
          <h1>Order #: {selectedOrder.id}</h1>
          <h3>Date: {moment(selectedOrder.checkoutDate).format('LL')}</h3>
        </div>
        <div>
          <h3>Status: {selectedOrder.status}</h3>
          <h3>Total: ${selectedOrder.totalPrice.toFixed(2)}</h3>
          <h4>Notifications Sent To: {selectedOrder.email}</h4>
        </div>
      </div>
      <div>
      {
        selectedOrder.products.map(product => {
          return (
            <div key={product.id}>
              <img src={product.imgUrl} />
              <ul>
                <li>
                  <Link
                    to='/single-product'
                    onClick={() => setProduct(product)}
                    >{product.name}
                  </Link>
                </li>
                <li>${product.price.toFixed(2)}</li>
                <li>Quantity: {product.quantity}</li>
                <li>Subtotal: ${product.subtotal.toFixed(2)}</li>
              </ul>
            </div>
          )
        })
      }
      </div>
    </div>
  )
}

const mapState = (state) => ({
  orders: state.orders
})

const mapDispatch = (dispatch) => ({
  setProduct: (product) => {
    dispatch(setProduct(product))
  }
})

export default connect(mapState, mapDispatch)(SingleOrder)
