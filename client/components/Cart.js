import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import {getProducts} from '../store/product'
import {getCart, removeFromCart} from '../store/cart'

const Cart = props => {

  const {cart, removeFromCart} = props
  const cartList = (cart === undefined) ? [] : Object.values(cart)

  if (cartList.length > 0) {
    return (
      <div className='OrderContainer' style={{width: "75%"}}>
        {
          cartList.map(product => (
            <div key={product.id} id='CartContainer' style={{margin: "10px"}}>
              <div style={{display: "flex"}}>
                <ul>
                  <li>{product.name}</li>
                </ul>
                <ul>
                  <li>Quantity: {product.quantity}</li>
                </ul>
                <ul>
                  <li>Price: ${product.price}</li>
                </ul>
              </div>
              <button id={product.id} onClick={event => removeFromCart(event)}>Remove</button>
            </div>
          ))
        }
        <span style={{margin: "15px"}}>Total ${
          cartList.map(e => e.price * e.quantity)
            .reduce((a,b) => a + b)
        }</span>
        <Link to='/checkout'>Checkout</Link>
      </div>
    )
  }
  else return <div>Your cart is empty!</div>
}

const mapState = state => ({
  cart: state.cart.cart
})

const mapDispatch = dispatch => {
  return {
    getCart: dispatch(getCart()),
    removeFromCart: (event) => {
      event.preventDefault()
      const id = event.target.id
      dispatch(removeFromCart(id))
    }
  }
}

export default connect(mapState, mapDispatch)(Cart)
