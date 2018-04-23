import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import moment from 'moment'

class Checkout extends Component {
  constructor () {
    super()
  }

  render () {
    const { orders, setOrder, setProduct } = this.props

    return (
      <div>
        <ul>
          <li>Items:
          {
            order.products.map(product => {
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
                    <li>Subtotal: ${subtotal.toFixed(2)}</li>
                  </ul>
                </div>
              )
            })
          }
          </li>
          <li>Total: totalPrice to be passed in product as well?</li>
        </ul>
        <button type='submit'>Checkout</button>
      </div>
    )
  }
}

const mapState = (state) => ({
  orders: state.orders
})

// const mapDispatch = (dispatch) => ({

// })

export default connect(mapState)(Checkout)
