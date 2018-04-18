import React from 'react'
import {connect} from 'react-redux'
import {addReview} from '../store'

class Review extends React.Component {
  constructor(){
    super()
    this.state = {
      reviews: [],
      review: ''
    }
  }

  componentWillReceiveProps = (props) => {
    this.setState({
      reviews: props.reviews
    });
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.addReview(this.state);// a method passed down from parent
  }

  render(){
    return (
      <div>
        <div>Reviews for Product:<ul> {
            (this.state.reviews.length)
            ?
            this.state.reviews.map(review => (
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

const mapDispatchToProps = (dispatch) => {
  return {
    addReview: (review) => dispatch(addReview(review)),
  }
}

export default connect(null, mapDispatchToProps)(Review)
