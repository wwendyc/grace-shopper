import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import Fuse from 'fuse.js'

import { getProducts, setProduct } from '../store/product'
import SearchResults from './SearchResults'
import Prodcts, { Products } from './Products'

export class SearchBar extends Component {
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

  handleSubmit = evt => {
    evt.preventDefault()
    const { products } = this.props
    this.props.getSearchResults(this.state.query, products)
    this.setState({
      query: ''
    })
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            placeholder="I'm looking for..."
            value={this.state.query}
            onChange={this.handleInputChange}
          />
        </form>
      </div>
    )
  }
}

const mapState = (state, ownProps) => ({
  products: state.product.products
})

const mapDispatch = (dispatch, ownProps) => ({
  getSearchResults: (query, products) => {
    const options = {
      shouldSort: true,
      threshold: 0.3,
      location: 0,
      distance: 100,
      maxPatternLength: 32,
      minMatchCharLength: 1,
      keys: ['name', 'description']
    }
    const fuse = new Fuse(products, options)
    const results = fuse.search(query)
    ownProps.history.push('/search-results', { searchResults: results })
  }
})

export default withRouter(connect(mapState, mapDispatch)(SearchBar))
