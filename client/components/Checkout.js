import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { addOrder } from '../store/orders'
import { setProduct } from '../store/product'

const Checkout = (props) => {
  const { cart, user, onSubmit, setProduct } = props
  let cartList = (Object.keys(cart).length === 0) ? [] : Object.values(cart)
  let totalPrice = 0

  cartList = cartList.map(product => {
    const subtotal = product.price * product.quantity
    totalPrice += subtotal

    return {...product, subtotal}
  });

  return (
    <div className='OrderContainer'>
      <div style={{alignSelf: 'center'}}>
        <h3>Total: ${totalPrice}</h3>
        <form onSubmit={onSubmit}>
          <label htmlFor='address'>Address:</label>
          <input type='text' name='address' />
          <br />

          <label htmlFor='city'>City:</label>
          <input type='text' name='city' />
          <br />

          <label htmlFor='state'>State:</label>
          <input type='text' name='state' />
          <br />

          <label htmlFor='zipCode'>Zip Code:</label>
          <input type='text' name='zipCode' />
          <br />

          <label htmlFor='email'>Email:</label>
          <input type='text' name='email' defaultValue={user.email} />
          <br />

          <button type='submit' disabled={(Object.keys(cart).length === 0) ? 'disabled' : ''}>Submit</button>
        </form>
      </div>

      <div className='ProductsContainer'>
      {
        cartList.map(product => {
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
  cart: state.cart.cart,
  user: state.user
})

const mapDispatch = (dispatch) => ({
  onSubmit: event => {
    event.preventDefault();
    const { address, city, state, zipCode, email} = event.target
    const addressStr =
      (address.value && city.value && state.value && zipCode.value)
        ? `${address.value}, ${city.value}, ${state.value} ${zipCode.value}`
        : ''

    // products & totalPrice from cart in orders thunk
    const order = {
      address: addressStr,
      email: email.value,
      status: 'Created',
      checkoutDate: Date.now()
    }

    dispatch(addOrder(order))
  },
  setProduct: product => {
    dispatch(setProduct(product))
  }
})

export default connect(mapState, mapDispatch)(Checkout)
