import React, { Component } from 'react'
import axios from 'axios'

class Products extends Component {
  constructor() {
    super()
    this.state = {
      products: []
    }
  }

  async componentDidMount() {
    const res = await axios.get('/api/products')
    const products = res.data
    this.setState({
      products
    })
    console.log(this.state)
  }

  render() {
    const products = this.state.products
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
                  <li>Quantity in stock: {product.inventory.Quantity}
                </ul>
              </div>
            </div>
          )
        })
      }
      </div>
    )
  }
}

export default Products