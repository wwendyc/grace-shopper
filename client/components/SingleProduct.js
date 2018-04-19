import React from 'react'
import {connect} from 'react-redux'
import Review from './Review'

class SingleProduct extends React.Component {
  constructor() {
    super()
    this.state = {
      quantity: 0
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }


  render(){
    const selectedProduct = {
      id: 1,
      name: "Sully's thunder roar",
      description: 'BootCamp it is!!!',
      price: 100,
      imgUrl: '',
      reviews: [{
        review: 'excellent',
        rating: 4
      },
      {
        review: 'OutStanding',
        rating: 5
      }],
      category: {
        name: 'Remote'
      }
    }
    // const product =  this.props.selectedProduct || {};
    // const category = this.props.selectedProduct.category || ''
    // const reviews = this.props.selectedProduct.reviews || []
    const product =  selectedProduct || {};
    const category = selectedProduct.category || ''
    const reviews = selectedProduct.reviews || []
    // console.log(reviews)
    return (
      <div>
        <div> Product Name: {product.name}</div>
        <div><img src={product.imgUrl} /></div>
        <div> Discription: {product.description}</div>
        <div> Category: {category.name}</div>
        <div> Price ${product.price}</div>
        <div>
          <Review reviews = {reviews} />
        </div>

        <div>
          <label htmlFor= "quantity"> Enter quantity </label>
          <input type= "text" name ="quantity" value={this.state.quantity} onChange={this.handleChange} />
        </div>

        <div>
          <button>Add To Cart </button>
          {/* <button onClick={() => this.props.addProductToCart(product)}>Add To Cart </button> */}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    selectedProduct: state.product.selectedProduct
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // addToCart: (product) => dispatch(addToCart(product)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
