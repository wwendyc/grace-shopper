import React from 'react'
import { connect } from 'react-redux'
import Review from './Review'
import { addToCart } from '../store/cart'

export class SingleProduct extends React.Component {
  constructor() {
    super()
    this.state = {
      quantity: 0
    }
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render() {
    const product = this.props.selectedProduct || {}
    const categories = this.props.selectedProduct.categories || []
    const reviews = this.props.selectedProduct.reviews || []
    const { addToCart } = this.props

    return (
      <div id="SingleProductContainer">
        <div className="ImgContainer">
          <img src={product.imgUrl} />
        </div>
        <div> Product Name: {product.name}</div>
        <div> Discription: {product.description}</div>

        <div>
          Categories for Product:<div className="ProductContainer">
            <ul>
              {' '}
              {categories.length ? (
                categories.map(category => (
                  <li key={category.id}>{category.name}</li>
                ))
              ) : (
                <div>Category: NA</div>
              )}{' '}
            </ul>{' '}
          </div>
        </div>

        <div> Price ${product.price}</div>

        <div>
          <Review reviews={reviews} />
        </div>
        <div>
          <button id={product.id} onClick={event => addToCart(event)}>
            Add To Cart
          </button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    selectedProduct: state.product.selectedProduct
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    addToCart: event => {
      event.preventDefault()
      const id = event.target.id
      dispatch(addToCart(id))
      ownProps.history.push('/cart')
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
