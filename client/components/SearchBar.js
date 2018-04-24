import React, { Component } from 'react'
import { connect } from 'react-redux'
import Fuse from 'fuse.js'

import { getProducts, setProduct } from '../store/product'

class SearchBar extends Component {
  constructor() {
    super()
    this.state = {
      query: ''
    }
  }

  handleInputChange = evt => {
    this.setState({
      query: evt.target.value
    })
  }

  render() {
    const options = {
      shouldSort: true,
      threshold: 0.6,
      location: 0,
      distance: 100,
      maxPatternLength: 32,
      minMatchCharLength: 1,
      keys: ['name', 'description']
    }
    const { products, setProduct } = this.props
    const fuse = new Fuse(products, options)
    const result = fuse.search(this.state.query)
    history.push('/', {searchResults: results})
    console.log('search result ', result)
    return (
      <div>
        <input placeholder="I am looking for..." onChange={this.handleInputChange} />
      </div>
    )
  }
}

const mapState = state => ({
  products: state.product.products
})

const mapDispatch = (dispatch, ownProps) => ({
  getProducts: dispatch(getProducts()),
  setProduct: product => {
    event.preventDefault()
    dispatch(setProduct(product))
    ownProps.history.push('/single-product')
  }
})

export default connect(mapState, mapDispatch)(SearchBar)
