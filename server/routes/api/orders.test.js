/* eslint-env mocha,chai */

const {expect} = require('chai')
const request = require('supertest')
const {db, Order, User} = require('../../db')
const app = require('../../app')
const session = require('supertest-session')

describe('Order routes', () => {
  beforeEach(async () => {
    await db.sync({force: true})
  })

  // ** Need to find out how to have a user make the request
  describe('/api/orders/', () => {
    let testSession = null

    const codysName = 'Cody'
    const codysEmail = 'cody@puppybook.com'
    const codysPwd = '123'

    let codysOrder
    const orderProducts = [{
      id: 1,
      name: 'Pup Chow',
      price: 0.00
    }]
    const codysAddress = '123 Pup St'
    const orderStatus = 'Created'
    const orderCheckoutDate = '04/18/2018'
    const orderTotalPrice = 0.00
    const updatedAddress = '456 Poop Lane'

    beforeEach(async () => {
      await User.create({
        name: codysName,
        email: codysEmail,
        password: codysPwd,
        isAdmin: true
      })

      codysOrder = await Order.create({
        products: orderProducts,
        address: codysAddress,
        status: orderStatus,
        checkoutDate: orderCheckoutDate,
        totalPrice: orderTotalPrice
      })

      testSession = session(app)

      await testSession
        .put('/auth/local')
        .send({email: codysEmail, password: codysPwd})
        .expect(200)
    })

    it('GET /api/orders', async () => {
      await testSession
        .get('/api/orders')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array')
          expect(res.body[0].address).to.be.equal(codysAddress)
        })
    })

    it('GET /api/orders/1', async () => {
      await request(app)
        .get('/api/orders/1')
        .expect(200)
        .then(res => {
          expect(res.body.address).to.be.equal(codysAddress)
        })
    })

    it('POST /api/orders', async () => {
      await request(app)
        .post(`/api/orders`)
        .send({
          products: [{
            id: 2,
            name: 'Poop Scoop',
            price: 5.55
          }],
          address: '111 Doggo St',
          status: 'Processing',
          checkoutDate: new Date('01/02/3000'),
          totalPrice: 1.75
        })
        .expect(201)
        .then(res => {
          return Order.findById(res.body.id)
        })
        .then(foundOrder => {
          expect(foundOrder.address).to.be.equal('111 Doggo St')
        })
    })

    it('PUT /api/orders/1', async () => {
      await request(app)
        .put(`/api/orders/${codysOrder.id}`)
        .send({
          address: '456 Poop Lane'
        })
        .expect(200)
        .then(res => {
          expect(res.body.id).to.be.equal(codysOrder.id)
          expect(res.body.address).to.be.equal(updatedAddress)
        })
    })

    it('DELETE /api/orders/1', async () => {
      await request(app)
        .delete(`/api/orders/${codysOrder.id}`)
        .expect(204)
    })

  }) // end describe('/api/orders')
}) // end describe('Order routes')
