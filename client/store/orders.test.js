/* eslint-env mocha,chai */

import {expect} from 'chai'
import {getOrders, addOrder, updateOrder, removeOrder} from './orders'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunks from 'redux-thunk'
import {createMemoryHistory} from 'history'

const history = createMemoryHistory()
const mockAxios = new MockAdapter(axios)
const middlewares = [thunks.withExtraArgument({axios, history})]
const mockStore = configureMockStore(middlewares)

describe('thunk creators', () => {
  let store
  const initialState = {
    list: [],
    selected: {}
  }

  beforeEach(() => {
    mockAxios.reset()
    store = mockStore(initialState)
  })

  describe('getOrders', () => {
    it('eventually dispatches the GET_ORDERS action', async () => {
      const fakeUser = {email: 'cody@puppybook.com'}
      const fakeOrders = [{}]
      mockAxios.onGet('/api/orders').replyOnce(200)
      await store.dispatch(getOrders())
      const [getUserAction] = store.getActions()
      expect(getUserAction.type).to.be.equal('GET_ORDERS')
      expect(getUserAction.orders).to.have.deep.members(fakeOrders)
    })
  })

  // describe('logout', () => {
  //   it('logout: eventually dispatches the REMOVE_USER action', async () => {
  //     mockAxios.onDelete('/auth').replyOnce(204)
  //     await store.dispatch(logout())
  //     const [removeUserAction] = store.getActions()
  //     expect(removeUserAction.type).to.be.equal('REMOVE_USER')
  //     expect(history.location.pathname).to.be.equal('/')
  //   })
  // })
})
