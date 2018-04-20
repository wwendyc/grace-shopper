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
    this.props.addReview(this.state, this.props.state.product.selectedProduct)
  }
  render(){
    const reviews =  this.props.state.product.selectedProduct.reviews || []
    // const user =  this.props.state.product.selectedProduct.reviews.user || {}

    return (
      <div>

        <div>Reviews for Product:<ul> {
            (reviews.length)
            ?
            reviews.map(review => (
              <li key= {review.id}>
                Rated: {review.rating} {review.review} <div> Reviewed by: {review.user && review.user.name} </div>
              </li>
              ))
            :
              <div>No reviews for this product yet</div>
        } </ul> </div>

        <form onSubmit = {this.handleSubmit}>{
          (Object.keys(this.props.state.user).length !== 0 )
          ?
            <div>
            <textarea name="review" onChange={this.handleChange} value={this.state.review} />
            <button type= "submit" disabled = {!(this.state.review) || (this.state.review.length < 10)}>Add Review </button>
            </div>
          :
            ''
        }
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    state
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addReview: (review, selectedProduct) => dispatch(addReview(review, selectedProduct)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Review)
