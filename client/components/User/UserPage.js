import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, Switch, Route } from 'react-router-dom'

import { getSingleUser } from '../../store/users'

import UserInfo from './UserInfo'
import UserForm from './UserForm'
import UserOrders from './UserOrders'

class UserPage extends Component {
  componentDidMount() {
    const userId = +this.props.match.params.userId
    this.props.singleUserData(userId)
  }

  render() {
    const { id, name, email, orders } = this.props.targetUser
    const user = this.props.user
    return (
      <div>
        {user.id === id || user.isAdmin ? (
          <div>
            <UserInfo targetUser={this.props.targetUser} />
            <Switch>
              <Route
                path="/user/edit"
                render={() => <UserForm targetUser={this.props.targetUser} />}
              />
              <Route
                path="/user/orders"
                render={() => <UserOrders targetUser={this.props.targetUser} />}
              />
            </Switch>
          </div>
        ) : (
          <h5>Please login to view this page</h5>
        )}
      </div>
    )
  }
}

const mapState = state => ({
  targetUser: state.users.singleUser,
  user: state.user
})

const mapDispatch = dispatch => ({
  singleUserData: userId => dispatch(getSingleUser(userId))
})

export default connect(mapState, mapDispatch)(UserPage)
