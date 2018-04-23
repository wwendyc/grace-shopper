import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { addOrder } from '../store/orders'

class Checkout extends Component {
  constructor () {
    super()
  }

  render () {
    const { user, onSubmit } = this.props
    // get order from cart session
    const cart = {
      "products": [
        {
          "id": 1,
          "name": "Sulley's thunder roar",
          "imgUrl": "https://www.conmishijos.com/assets/posts/0000/551-personajes-de-la-pelicula-monsters-university-sulley.jpg",
          "quantity": 2,
          "price": 150,
          "subtotal": 300
        },
        {
          "id": 2,
          "name": "Scary tactics with Mike Wazowski",
          "imgUrl": "http://cinemabh.com/wp-content/uploads/2013/02/Universidade-Monstros-Mike-Wazowski-poster.jpg",
          "quantity": 3,
          "price": 101.75,
          "subtotal": 305.25
        }
      ],
      "totalPrice": 605.25,
    }

    return (
      <div>
        <ul>
          <li>Items:
          {
            cart.products.map(product => {
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
          <li>Total: {cart.totalPrice}</li>
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
            <label htmlFor='email'>Email:</label>
            <input
              type='text'
              name='email'
              defaultValue={user.email}
            />
          </div>
          <div>
            <button type='submit'>Checkout</button>
          </div>
        </form>
      </div>
    )
  }
}

const mapState = (state) => ({
  user: state.user
})

const mapDispatch = (dispatch) => ({
  onSubmit: (event) => {
    event.preventDefault();
    // logic for user/non-user

    const order = {
      products: [
        {
          "id": 1,
          "name": "Sulley's thunder roar",
          "imgUrl": "https://www.conmishijos.com/assets/posts/0000/551-personajes-de-la-pelicula-monsters-university-sulley.jpg",
          "quantity": 2,
          "price": 150,
          "subtotal": 300
        },
        {
          "id": 2,
          "name": "Scary tactics with Mike Wazowski",
          "imgUrl": "http://cinemabh.com/wp-content/uploads/2013/02/Universidade-Monstros-Mike-Wazowski-poster.jpg",
          "quantity": 3,
          "price": 101.75,
          "subtotal": 305.25
        }
      ], // from cart
      address: event.target.address.value,
      email: event.target.email.value,
      status: 'Created',
      checkoutDate: Date.now(),
      totalPrice: 605.25 // from cart?
    }

    dispatch(addOrder(order))
  }
})

export default connect(mapState, mapDispatch)(Checkout)
