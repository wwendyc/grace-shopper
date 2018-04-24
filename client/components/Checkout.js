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
    <div>
      <ul>
        <li>Items:
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
        </li>
        <li>Total: {totalPrice}</li>
      </ul>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor='address'>Address:</label>
          <input
            type='text'
            name='address'
          />
        </div>
        <div>
          <label htmlFor='city'>City:</label>
          <input
            type='text'
            name='city'
          />
        </div>
        <div>
          <label htmlFor='state'>State:</label>
          <input
            type='text'
            name='state'
          />
        </div>
        <div>
          <label htmlFor='zipCode'>Zip Code:</label>
          <input
            type='text'
            name='zipCode'
          />
        </div>
        <div>
          <label htmlFor='email'>Email:</label>
          <input
            type='text'
            name='email'
            defaultValue={user.email}
          />
        </div>
        <div>
          <button
            type='submit'
            disabled={(Object.keys(cart).length === 0) ? 'disabled' : ''}
            >Submit
          </button>
        </div>
      </form>
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

    // products & totalPrice from cart in orders thunk
    const order = {
      address: `${address.value}, ${city.value}, ${state.value} ${zipCode.value}`,
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
