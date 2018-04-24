import { Provider } from 'react-redux'
import { expect } from 'chai'
import React from 'react'
import enzyme, { shallow, mount, render } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { UserPage } from './UserPage'
import {UserInfo} from './UserInfo'

const adapter = new Adapter()
const disableLifecycleMethods = true
enzyme.configure({
  adapter,
  disableLifecycleMethods
})

const state = {
  targetUser: {
    id: 1,
    isAdmin: false,
    name: 'Cody'
  },
  user: {
    id: 2,
    isAdmin: true,
    name: 'Grace Hopper'
  }
}

describe('UserPage', () => {
  let UserPageWrapper

  beforeEach('create <UserPage /> wrapper', () => {
    UserPageWrapper = shallow(<UserPage targetUser={state.targetUser} user={state.user} />)
  })

  describe('renders other components', () => {
    it('renders the UserInfo component', () => {
      expect(UserPageWrapper.find(UserInfo)).to.have.length(1)
    })
  })

  describe('passes state down as props to other components', () => {
    it('passes targetUser to UserInfo as a prop', () => {
      const UserInfoWrapper = UserPageWrapper.find(UserInfo)
      expect(UserInfoWrapper.props().targetUser.name).to.be.equal('Cody')
      expect(UserInfoWrapper.props().targetUser.isAdmin).to.be.equal(false)
      expect(UserInfoWrapper.props().targetUser.id).to.be.equal(1)
    })
  })
})

// describe('UserInfo', () => {
//   let UserPageWrapper

//   beforeEach('create <UserPage /> wrapper', () => {
//     UserPageWrapper = shallow(<UserPage targetUser={state.targetUser} user={state.user} />)
//     const UserInfoWrapper = UserPageWrapper.find(UserInfo)
//   })

//   describe('renders the targetUser props it receives', () => {
//     it('includes the user name as a header', () => {
//       expect(UserInfoWrapper.find('h1')).to.have.html('<h1>Hello, Cody</h1>')
//     })
//   })
// })
