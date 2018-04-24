import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

// Home: there's no place like it (as long as you've logged in).
const Home = (props) => {
  return (
    <div>
      <h1>Welcome Home {props.state.user.name}</h1>
      <Link to="/"><h3> Start shopping... </h3></Link>

    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    state
  }
}

export default connect(mapStateToProps, null)(Home)
