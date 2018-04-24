import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { getProducts, setProduct } from '../store/product'
import { getCart, addToCart } from  '../store/cart'


export const Products = (props) => {
  const {setProduct, avgReviews} = props
  let products = props.products
  if (props.location.state) products = props.location.state.searchResults

  return (
    <div className='ProductsContainer'>
      {
        products.map(product => {
          return (
            <div key={product.id}>
              <div className='ImgContainer'  onClick={() => setProduct(product)}>
                <img src={product.imgUrl} />
              </div>
              <div className='ProductContainer'  onClick={() => setProduct(product)}>
                <ul>
                  <li className='mainli'>Name: {product.name}</li>
                  <li className='mainli'>Description: {product.description}</li>
                  <li className='mainli'>Price: ${product.price}</li>
                  <li>Quantity in stock: {product.inventoryQuantity}</li>
                  <li>Average Rating: {
                    avgReviews.find((avgReview) => {
                      return avgReview.id === product.id}).avgRating
                    ?
                     (Math.ceil(avgReviews.find((avgReview) => {
                      return avgReview.id === product.id}).avgRating * Math.pow(10, 2)) / Math.pow(10, 2))
                    :
                      'Not yet rated'
                  }</li>
                </ul>
              </div>
              <div style={{ display: "flex", justifyContent: "center"}}>
               <button id={product.id} onClick={event => addToCart(event)}>Add To Cart</button>
              </div>
            </div>
          )
        })
      }
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
    setProduct: (product) => {
      event.preventDefault()
      dispatch(setProduct(product))
      ownProps.history.push('/single-product')
    },
    addToCart: (event) => {
      event.preventDefault()
      const id = event.target.id
      dispatch(addToCart(id))
      ownProps.history.push('/cart')
    }
  }
}

export default connect(mapState, mapDispatch)(Products)
