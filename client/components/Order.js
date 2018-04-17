import React, { Component } from 'react'
import { connect } from 'react-redux'

// import ProductListing from './ProductListing'

class Order extends Component {
  constructor () {
    super()
  }

  render () {
    // const { currentOrder } = this.props
    const currentOrder = {
      id: 1,
      status: 'Created',
      checkoutDate: '04/28/2018',
      totalPrice: 50.25,
      products: [
        {
          id: 1,
          name: 'item1',
          imgUrl: '',
          quantity: 2,
          price: 2.00
        },
        {
          id: 2,
          name: 'item2',
          imgUrl: '',
          quantity: 1,
          price: 3.00
        },
      ]
    }

    return (
      <div>
        <div>
          <h1>Order ID: {currentOrder.id}</h1>
          <h1>Status: {currentOrder.status}</h1>
          <h3>Checkout Date: {currentOrder.checkoutDate}</h3>
          <h3>Total: ${currentOrder.totalPrice}</h3>
        </div>
        <div>
        {
          currentOrder.products.map(product => {
            return (
              <div key={product.id}>
                {/* <ProductListing product={product} /> */}
                <div>
                  <img src={product.imgUrl} />
                  <h4>{product.name}</h4>
                  <h5>{product.quantity}</h5>
                  <h5>{product.price}</h5>
                </div>
              </div>
            )
          })
        }
        </div>
      </div>
    )
  }
}

// const mapStateToProps = (state) => ({
//   currentOrder: state.currentOrder
// })

// const mapDispatchToProps = (dispatch) => ({

// })

// export default connect(mapStateToProps, mapDispatchToProps)(Order)
export default Order
