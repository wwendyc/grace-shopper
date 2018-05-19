import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import StarRatingComponent from 'react-star-rating-component'
import {
  Card,
  CardActions,
  CardHeader,
  CardMedia,
  CardTitle,
  CardText
} from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'

import { getProducts, setProduct } from '../store/product'
import { getCart, addToCart } from '../store/cart'

const style = {
  titleTextStyle: {
    fontWeight: 'bold',
    fontSize: '18px'
  }
}

export const Products = props => {
  const { setProduct, addToCart } = props
  const avgReviews = props.avgReviews
  let products = props.products
  if (props.location.state) products = props.location.state.searchResults

  return (
    <div className="products-container">
      {products.map(product => {
        return (
          <div
            className="col-md-4"
            key={product.id}
            onClick={() => setProduct(product)}
          >
            <Card className="card card-raised">
              <CardMedia className="ImgContainer">
                <img src={product.imgUrl} />
              </CardMedia>
              <CardTitle
                className="center"
                title={product.name}
                titleStyle={style.titleTextStyle}
              />
              <div className="center">
                <StarRatingComponent
                  className="center"
                  name="productRating"
                  editing={false}
                  renderStarIcon={() => <span>✮</span>}
                  starCount={5}
                  value={
                    avgReviews.find(avgReview => {
                      return avgReview.id === product.id
                    }).avgRating
                      ? Math.ceil(
                          avgReviews.find(avgReview => {
                            return avgReview.id === product.id
                          }).avgRating * Math.pow(10, 2)
                        ) / Math.pow(10, 2)
                      : 'Not yet rated'
                  }
                />
              </div>
              <CardText>
                <ul className="productUL">
                  <li>Price: ${product.price}</li>
                  <li>Quantity in stock: {product.inventoryQuantity}</li>
                  <li className="sideMargins">{product.description}</li>
                </ul>
              </CardText>
              <div className="center bottomMargins">
                <button
                  className="btn btn-rose btn-round"
                  id={product.id}
                  onClick={event => addToCart(event)}
                >
                  Product Details
                </button>
              </div>
            </Card>
          </div>
        )
      })}
    </div>
  )
}

const mapState = state => {
  return {
    products: state.product.products,
    avgReviews: state.product.avgReviews
  }
}

const mapDispatch = (dispatch, ownProps) => {
  return {
    getProducts: dispatch(getProducts()),
    setProduct: product => {
      event.preventDefault()
      dispatch(setProduct(product))
      ownProps.history.push('/single-product')
    },
    addToCart: event => {
      event.preventDefault()
      const id = event.target.id
      dispatch(addToCart(id))
      ownProps.history.push('/cart')
    }
  }
}

export default connect(mapState, mapDispatch)(Products)
