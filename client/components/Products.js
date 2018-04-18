import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { getProducts, selectProduct } from '../store/product'


const Products = (props) => {

  const products = props.products

  return (
    <div id='ProductsContainer'>
      {
        products.map(product => {
          return (
            <div key={product.id}>
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
    selectedProduct: state.product.selectedProduct
  }
}

const mapDispatch = dispatch => {
  return {
    getProducts: dispatch(getProducts),
  }
}


export default connect(mapState, mapDispatch)(Products)
