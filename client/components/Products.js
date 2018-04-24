import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { getProducts, setProduct } from '../store/product'


export const Products = (props) => {
  const {setProduct} = props
  let products = props.products
  if (props.location.state) products = props.location.state.searchResults

  return (
    <div id='ProductsContainer'>
      {
        products.map(product => {
          return (
            <div key={product.id} onClick={() => setProduct(product)}>
              <div className='ImgContainer'>
                <img src={product.imgUrl} />
              </div>
              <div className='ProductContainer'>
                <ul>
                  <li>Name: {product.name}</li>
                  <li>Description: {product.description}</li>
                  <li>Price: ${product.price}</li>
                  <li>Quantity in stock: {product.inventoryQuantity}</li>
                </ul>
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
  }
}

const mapDispatch = (dispatch, ownProps) => {
  return {
    getProducts: dispatch(getProducts()),
    setProduct: (product) => {
      event.preventDefault()
      dispatch(setProduct(product))
      ownProps.history.push('/single-product')
    }
  }
}

export default connect(mapState, mapDispatch)(Products)
