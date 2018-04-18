import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'


const Products = () => {

  const products = []

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
    products: state.product.products
  }
}

const mapDispatch = dispatch => {

}


export default Products
