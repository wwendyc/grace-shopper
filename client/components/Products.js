import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { getProducts, setProduct } from '../store/product'
import { getCart, addToCart } from '../store/cart'

import {
  Card,
  CardActions,
  CardHeader,
  CardMedia,
  CardTitle,
  CardText
} from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'

const titleTextStyle = {
  margin: 0
}

export const Products = props => {
  const { setProduct, addToCart } = props
  const avgReviews = props.avgReviews
  let products = props.products
  if (props.location.state) products = props.location.state.searchResults

  return (
    <div className="ProductsContainer">
      {products.map(product => {
        return (
          <div
            className="singleProd"
            key={product.id}
            onClick={() => setProduct(product)}
          >
            <Card className="card">
              <CardMedia className="ImgContainer">
                <img src={product.imgUrl} />
              </CardMedia>
              <CardTitle className="center" title={product.name} style={titleTextStyle} />
              <CardText style={titleTextStyle} >
                <ul className="productUL">
                  <li>Price: ${product.price}</li>
                  <li>Quantity in stock: {product.inventoryQuantity}</li>
                  <li>
                    Average Rating:{' '}
                    {avgReviews.find(avgReview => {
                      return avgReview.id === product.id
                    }).avgRating
                      ? Math.ceil(
                          avgReviews.find(avgReview => {
                            return avgReview.id === product.id
                          }).avgRating * Math.pow(10, 2)
                        ) / Math.pow(10, 2)
                      : 'Not yet rated'}
                  </li>
                  <li className="sideMargins">{product.description}</li>
                </ul>
              </CardText>
              <div className="center bottomMargins">
                <RaisedButton
                  id={product.id}
                  label="Add To Cart"
                  primary={true}
                  onClick={event => addToCart(event)}
                />
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
