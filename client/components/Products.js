import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { getProducts, setProduct } from '../store/product'
import { getCart, addToCart } from  '../store/cart'


const Products = (props) => {
  
  const  {products, setProduct, addToCart} = props

  return (
    <div id='ProductsContainer'>
      {
        products.map(product => {
          return (
            <div key={product.id} >
              <div className='ImgContainer' onClick={() => setProduct(product)}>
                <img src={product.imgUrl} />
              </div>
              <div className='ProductContainer' onClick={() => setProduct(product)}>
                <ul>
                  <li>Name: {product.name}</li>
                  <li>Description: {product.description}</li>
                  <li>Price: ${product.price}</li>
                  <li>Quantity in stock: {product.inventoryQuantity}</li>
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
    }
  }
}

export default connect(mapState, mapDispatch)(Products)
