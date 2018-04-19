import React from 'react'
import {connect} from 'react-redux'
import {addReview} from '../store'

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
    // this.props.addReview(this.state);
  }

  render(){
    // const reviews =  this.state.product.selectedProduct.reviews || []
    const reviews = [{
      review: 'excellent',
      rating: 4
    },
    {
      review: 'OutStanding',
      rating: 5
    }]
    return (
      <div>

        {/* <div>Reviews for Product:<ul> {
            (this.props.state.product.selectedProduct.reviews.length)
            ?
            this.props.state.product.selectedProduct.reviews.map(review => (
              <li key= {review.id}>
                Rated: {review.rating} {review.review}
              </li>
              ))
            :
              <div>No reviews for this product yet</div>
        } </ul> </div> */}

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
    state: state
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // addReview: (review) => dispatch(addReview(review)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Review)
