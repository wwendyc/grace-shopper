import React from 'react'

class Review extends React.Component {
  constructor(){
    super()
    this.state = {
      reviews: '',
      reviewText: ''
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
          <div>
            <textarea name="reviewText" onChange={this.handleChange} value={this.state.reviewText} />
            <button>Add Review </button>
            {/* <button onClick={() => this.props.addReview(this.state.reviewText)}>Add Review </button> */}
          </div>
      </div>
    )
  }
}

export default Review
