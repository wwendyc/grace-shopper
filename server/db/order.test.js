/* eslint-env mocha,chai */

const chai = require('chai')
const expect = chai.expect
const {db, Order} = require('./index')
chai.use(require('chai-datetime'))

describe('Order model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('fields', () => {
    let codysOrder
    const orderProducts = [
      {
        id: 1,
        name: 'Pup Chow',
        price: 0.00
      },
      {
        id: 2,
        name: 'Puppacino',
        price: 0.01
      }
    ]
    const codysAddress = '123 Pup St'
    const orderStatus = 'Created'
    const orderCheckoutDate = new Date('04/18/2018')
    const orderTotalPrice = 0.01

    beforeEach(async () => {
      codysOrder = await Order.create({
        products: orderProducts,
        address: codysAddress,
        status: orderStatus,
        checkoutDate: orderCheckoutDate,
        totalPrice: orderTotalPrice
      })
    })

    describe('products', () => {
      it('created products to equal orderProducts', () => {
        expect(codysOrder.products).to.have.deep.members(orderProducts)
      })
    }) // end describe('products')

    describe('address', () => {
      it('created address to equal codysAddress', () => {
        expect(codysOrder.address).to.be.equal(codysAddress)
      })
    }) // end describe('address')

    describe('status', () => {
      it('created status to equal orderStatus', () => {
        expect(codysOrder.status).to.be.equal(orderStatus)
      })
    }) // end describe('status')

    describe('checkoutDate', () => {
      it('created checkoutDate to equal orderCheckoutDate', () => {
        expect(codysOrder.checkoutDate).to.equalDate(orderCheckoutDate)
      })
    }) // end describe('checkoutDate')

    describe('totalPrice', () => {
      it('created totalPrice to equal orderTotalPrice', () => {
        expect(codysOrder.totalPrice).to.be.equal(orderTotalPrice)
      })
    }) // end describe('totalPrice')

  }) // end describe('fields')
}) // end describe('Order model')
