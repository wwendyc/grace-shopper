import React, { Component } from 'react'
import { connect } from 'react-redux'

// import ProductListing from './ProductListing'

class SingleOrder extends Component {
  constructor () {
    super()
  }

  render () {
    const { currentOrder } = this.props
    const selectedOrder = {
      id: 1,
      status: 'Created',
      checkoutDate: '04/28/2018',
      totalPrice: (50.20).toFixed(2),
      products: [
        {
          id: 1,
          name: 'item1',
          imgUrl: '',
          quantity: 2,
          price: 2.50
        },
        {
          id: 2,
          name: 'item2',
          imgUrl: '',
          quantity: 1,
          price: 3.75
        },
      ]
    }

    return (
      <div>
        <div>
          <div>
            <h1>Order ID: {selectedOrder.id}</h1>
            <h2>Status: {selectedOrder.status}</h2>
          </div>
          <div>
            <h3>Checkout Date: {selectedOrder.checkoutDate}</h3>
            <h3>Total: ${selectedOrder.totalPrice}</h3>
          </div>
        </div>
        <div>
        {
          selectedOrder.products.map(product => {
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
//   selectedOrder: state.selectedOrder
// })

// const mapDispatchToProps = (dispatch) => ({

// })

// export default connect(mapStateToProps, mapDispatchToProps)(SingleOrder)
export default SingleOrder
