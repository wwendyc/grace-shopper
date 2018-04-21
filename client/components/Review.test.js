import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {Review} from './Review'
import {spy} from 'sinon';


const adapter = new Adapter()
const disableLifecycleMethods = true
enzyme.configure({
  adapter,
  disableLifecycleMethods
})
const state = {
  user: {},
  product: {
    selectedProduct: {
      name: 'some name',
      reviews: [
        {
          review: 'some review',
        }
      ]
    }
  }
}
describe('Review Component', () => {
  const resolves = () => Promise.resolve('Oh yeah')
  const rejects = () => Promise.reject(new Error('Oh noes'))
  let revCompWrapper;
  let sendSpy;

  const fakeEvent = {
    preventDefault: () => {},
    addReview: ({}, {}, {}) => {}
  }

  beforeEach('set up a wrapper', () => {
    sendSpy = spy();
    revCompWrapper = shallow(<Review state = {state} addReview={sendSpy} />)
  })

  it('initializes review state to empty string', () => {

    expect(revCompWrapper.state().review).to.equal('')
  })

  it('involks handleSubmit event handler on submit', () => {
  })

})
