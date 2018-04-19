import React from 'react'
import {connect} from 'react-redux'
import {addReview} from '../store/product'

class Review extends React.Component {
  constructor(){
    super()
    this.state = {
      review: ''
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.addReview(this.state);
  }

  render(){
    const reviews =  this.props.selectedProduct.reviews || []

    return (
      <div>

        <div>Reviews for Product:<ul> {
            (reviews.length)
            ?
            reviews.map(review => (
              <li key= {review.id}>
                Rated: {review.rating} {review.review}
              </li>
              ))
            :
              <div>No reviews for this product yet</div>
        } </ul> </div>

        <form onSubmit = {this.handleSubmit}>
          <textarea name="review" onChange={this.handleChange} value={this.state.review} />
          <button type= "submit" disabled = {!(this.state.review)}>Add Review </button>
        </form>
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
    addReview: (review) => dispatch(addReview(review)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Review)
