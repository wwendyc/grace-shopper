import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { AuthLink, Logout } from './auth'

import SearchBar from './SearchBar'

const Navbar = props => (
  <nav className="row center-y">
    <Link to="/">
      <img id="logo" src="/favicon.ico" />
    </Link>
    <Link to="/">Shop</Link>
    <Link to="/cart">Cart</Link>
    {!props.user.id ? (
      <div>
        <Link to="/login">Login</Link>
        <Link to="/signup">Signup</Link>
      </div>
    ) : (
      <div>
        <AuthLink to={`/user/${props.user.id}`}>Account</AuthLink>
        <AuthLink to="/">
          <Logout />
        </AuthLink>
      </div>
    )}
    <SearchBar />
  </nav>
)

const mapState = state => ({
  user: state.user
})

export default connect(mapState)(Navbar)
