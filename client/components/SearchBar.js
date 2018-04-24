import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Fuse from 'fuse.js'

import { getProducts, setProduct } from '../store/product'

import SearchResults from './SearchResults'
import Prodcts, { Products } from './Products'
import history from '../history'

class SearchBar extends Component {
  constructor() {
    super()
    this.state = {
      query: '',
    }
  }

  handleInputChange = evt => {
    this.setState({
      query: evt.target.value,
    })
  }

  handleSubmit = evt => {
    evt.preventDefault()
    const options = {
      shouldSort: true,
      threshold: 0.6,
      location: 0,
      distance: 100,
      maxPatternLength: 32,
      minMatchCharLength: 1,
      keys: ['name', 'description']
    }
    const { products } = this.props
    const fuse = new Fuse(products, options)
    const results = fuse.search(this.state.query)

    history.push('/', { searchResults: results })
  }

  render() {

    return (
      <div>
        <input
          placeholder="I'm looking for..."
          onChange={this.handleInputChange}
        />
        <button onClick={this.handleSubmit}>Search</button>
      </div>
    )
  }
}

const mapState = state => ({
  products: state.product.products
})

const mapDispatch = dispatch => ({
  getProducts: dispatch(getProducts()),
  setProduct: product => {
    event.preventDefault()
    dispatch(setProduct(product))
    ownProps.history.push('/single-product')
  }
})

export default connect(mapState, mapDispatch)(SearchBar)
