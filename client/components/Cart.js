import React from 'react'
import { connect } from 'react-redux'
import {getProducts} from '../store/product'

const Cart = props => {

  const {cart} = props

  if (cart.length > 0) {
    return (
      <div>
        {
          cart.map(product => (
            <div key={product.id} id='CartContainer' style={{border: '1px solid black', margin: '5px'}}>
              <div>
                <ul>
                  <li>{product.description}</li>
                  <li>Price: ${product.price}</li>
                </ul>
              </div>
            </div>
          ))
        }
      </div>
    )
  }
  else return <div>Your cart is empty!</div>
}

const mapState = state => ({
  cart: state.product.cart
})

const mapDispatch = dispatch => ({
  getProducts: dispatch(getProducts())
})

export default connect(mapState, mapDispatch)(Cart)