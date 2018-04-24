/* eslint-env mocha,chai */
// process.env.DATABASE_URL='postgres://localhost/grace-shopper-test'

import {Provider} from 'react-redux'
import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow, mount, render} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { Products } from './Products'

const adapter = new Adapter()
const disableLifecycleMethods = true
enzyme.configure({
  adapter,
  disableLifecycleMethods
})

const state = { products: [{
  name: 'Name',
  description: 'Desc',
  price: 99,
  inventoryQuantity: 1,
}] }

describe('Products', () => {
  const resolves = () => Promise.resolve('Oh yeah')
  const rejects = () => Promise.reject(new Error('Oh noes'))

  it('Loads initial state', () => {
    const wrapper = shallow(<Products products={state.products} />)
    expect(wrapper.find('li').at(0).text()).to.be.equal('Name: Name')
    expect(wrapper.find('li').someWhere(n => n.text().match(state.products[0].name))).to.be.equal(true)
  })

})
