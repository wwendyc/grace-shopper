import React, { Component } from 'react'
import { Link, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import Fuse from 'fuse.js'

import { getProducts, setProduct } from '../store/product'

import SearchResults from './SearchResults'
import Prodcts from './Products'

class SearchBar extends Component {
  constructor() {
    super()
    this.state = {
      query: '',
      results: []
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
    console.log('search result ', result)
    return (
      <div>
        <Switch>
          <Route
            path="/search-results"
            render={() => {
              <SearchResults searchResults={results} />
            }}
          />
        </Switch>
        <input
          placeholder="I'm looking for..."
          onChange={this.handleInputChange}
        />
        <Link to="/search-results">
          <button>Search</button>
        </Link>
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
