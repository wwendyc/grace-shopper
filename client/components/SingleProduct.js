import React from 'react'
import { connect } from 'react-redux'
import StarRatingComponent from 'react-star-rating-component'

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
        <div className="main main-raised main-product">
          <div className="row">
            <div className="col-md-6 col-sm-6">
              <div className="tab-content">
                <div className="tab-pane" id="product-page1">
                  <img src={product.imgUrl} />
                </div>
              </div>
              <ul className="nav flexi-nav" role="tablist" id="flexiselDemo1">
                <li>
                  <a
                    href="#product-page1"
                    role="tab"
                    data-toggle="tab"
                    aria-expanded="false"
                  >
                    <img src={product.imgUrl} />
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-md-6 col-sm-6">
              <h2 className="title"> {product.name} </h2>
              <h3 className="main-price">${product.price}</h3>
              <div id="acordeon">
                <div className="panel-group" id="accordion">
                  <div className="panel panel-border panel-default">
                    <div className="panel-heading" role="tab" id="headingOne">
                      <a
                        role="button"
                        data-toggle="collapse"
                        data-parent="#accordion"
                        href="#collapseOne"
                        aria-expanded="true"
                        aria-controls="collapseOne"
                      >
                        <h4 className="panel-title">
                          Description
                          <i className="material-icons">keyboard_arrow_down</i>
                        </h4>
                      </a>
                    </div>
                    <div
                      id="collapseOne"
                      className="panel-collapse collapse in"
                    >
                      <div className="panel-body">
                        <p>{product.description}</p>
                      </div>
                    </div>
                  </div>
                  <div className="panel panel-border panel-default">
                    <div className="panel-heading" role="tab" id="headingOne">
                      <a
                        role="button"
                        data-toggle="collapse"
                        data-parent="#accordion"
                        href="#collapseTwo"
                        aria-controls="collapseOne"
                      >
                        <h4 className="panel-title">
                          Category
                          <i className="material-icons">keyboard_arrow_down</i>
                        </h4>
                      </a>
                    </div>
                    <div id="collapseTwo" className="panel-collapse collapse">
                      <div className="panel-body">
                        An infusion of West Coast cool and New York attitude,
                        Rebecca Minkoff is synonymous with It girl style.
                        Minkoff burst on the fashion scene with her best-selling
                        'Morning After Bag' and later expanded her offering with
                        the Rebecca Minkoff Collection - a range of luxe city
                        staples with a "downtown romantic" theme.
                      </div>
                    </div>
                  </div>
                  <div className="panel panel-border panel-default">
                    <div className="panel-heading" role="tab" id="headingOne">
                      <a
                        role="button"
                        data-toggle="collapse"
                        data-parent="#accordion"
                        href="#collapseThree"
                        aria-controls="collapseOne"
                      >
                        <h4 className="panel-title">
                          Reviews
                          <i className="material-icons">keyboard_arrow_down</i>
                        </h4>
                      </a>
                    </div>
                    <div id="collapseThree" className="panel-collapse collapse">
                      <div className="panel-body">
                        <ul className="productUL">
                          {reviews.map(review => (
                            <div key={product.id} className="bottomMargins">
                              {console.log('reviews ', review)}
                              <li>
                                <StarRatingComponent
                                  className="center"
                                  name="productRating"
                                  editing={false}
                                  renderStarIcon={() => <span>✮</span>}
                                  starCount={5}
                                  value={review.rating || 0}
                                />
                              </li>
                              <li>User: {review.user.name}</li>
                              <li>Review: {review.review}</li>
                            </div>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row text-right">
                <button
                  className="btn btn-rose btn-round"
                  id={product.id}
                  onClick={event => addToCart(event)}
                >
                  Add to Cart &nbsp;<i className="material-icons">
                    shopping_cart
                  </i>
                </button>
              </div>
            </div>
          </div>
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

//           <div className="ImgContainer">
//   <img src={product.imgUrl} />
// </div>
// <div> Product Name: {product.name}</div>
// <div> Discription: {product.description}</div>

// <div>
//   Categories for Product:<div className="ProductContainer">
//     <ul>
//       {' '}
//       {categories.length ? (
//         categories.map(category => (
//           <li key={category.id}>{category.name}</li>
//         ))
//       ) : (
//         <div>Category: NA</div>
//       )}{' '}
//     </ul>{' '}
//   </div>
// </div>

// <div> Price ${product.price}</div>

// <div>
//   <Review reviews={reviews} />
// </div>
// <div>
//   <button id={product.id} onClick={event => addToCart(event)}>
//     Add To Cart
//   </button>
// </div>
