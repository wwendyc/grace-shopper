import React from 'react'
import {connect} from 'react-redux'
import {addReview} from '../store/product'

class Review extends React.Component {
  constructor(){
    super()
    this.state = {
      review: '',
      rating: '3'
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  handleOptionChange = (changeEvent) => {
    this.setState({
      rating: changeEvent.target.value
    })
  }
  handleSubmit = (event) => {
    event.preventDefault();
    // console.log('You have entered:', this.state.review);
    // console.log('You have selected:', this.state.rating);
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
              <div>
                <label><input type="radio" value="1"
                      checked={this.state.rating === '1' }
                      onChange={this.handleOptionChange} />1</label>
              </div>
              <div>
                <label><input type="radio" value="2"
                      checked={this.state.rating === '2'}
                      onChange={this.handleOptionChange} />2</label>
              </div>
              <div>
                <label><input type="radio" value="3"
                      checked={this.state.rating === '3'}
                      onChange={this.handleOptionChange} />3</label>
              </div>
              <div>
                <label><input type="radio" value="4"
                      checked={this.state.rating === '4'}
                      onChange={this.handleOptionChange}  />4</label>
              </div>
              <div>
                <label><input type="radio" value="5"
                      checked={this.state.rating === '5'}
                      onChange={this.handleOptionChange} />5</label>
              </div>
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
