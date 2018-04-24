import React from 'react'
import {connect} from 'react-redux'
import Review from './Review'

export class SingleProduct extends React.Component {
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
    const product =  this.props.selectedProduct || {};
    const categories = this.props.selectedProduct.categories || []
    const reviews = this.props.selectedProduct.reviews || []
    // const product =  selectedProduct || {};
    // const categories = selectedProduct.categories || []
    // const reviews = selectedProduct.reviews || []
    // console.log(this.props.selectedProduct)
    return (
      <div  id="SingleProductContainer">
        <div  className="ImgContainer"><img src={product.imgUrl} /></div>
        <div> Product Name: {product.name}</div>
        <div> Discription: {product.description}</div>

        <div>Categories for Product:<div  className="ProductContainer"><ul> {
            (categories.length)
            ?
            categories.map(category => (
              <li key= {category.id}>
                {category.name}
              </li>
              ))
            :
              <div>No categories for this</div>
        } </ul> </div></div>

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
