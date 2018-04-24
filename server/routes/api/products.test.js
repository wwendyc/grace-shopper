/* eslint-env mocha,chai */

process.env.DATABASE_URL="postgres://localhost/grace-shopper-test"

const {expect} = require('chai')
const request = require('supertest')
const {db, Product} = require('../../db')
const app = require('../../app')

describe('Product routes', () => {

  let product1
  let product2
  let product3

  beforeEach(async () => {
    await db.sync({force: true})
    product1 = await Product.create({
      name: 'Laptop',
      description: 'Dell XPS 15',
      price: 999.99,
      inventoryQuantity: 2,
    })
    product2 = await Product.create({
      name: 'Computer',
      description: 'Gaming desktop',
      price: 1999.99,
      inventoryQuantity: 1,
    })
    product3 = await Product.create({
      name: 'Phone',
      description: 'Samsung note 8',
      price: 999.99,
      inventoryQuantity: 10,
    })
  })

  describe('/api/products', () => {

    it('GET /api/products - returns all products', async () => {
      await request(app)
        .get('/api/products')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array')
          expect(res.body.length).to.be.equal(3)
          expect(res.body[2].name).to.be.equal(product3.name)
        })
    })
  })

  it('POST /api/products - creates product and returns a success message', async () => {

    const product4 = { name: 'Monitor', description: '38 Ultrawide curved', price: 200, inventoryQuantity: 2 }

    await request(app)
      .post('/api/products')
      .send(product4)
      .expect(201)
      .then(res => {
        expect(res.body.msg).to.be.equal('Monitor has been added!')
        expect(res.body).to.be.an('object')
      })

    await request(app)
      .get('/api/products')
      .expect(200)
      .then(res => {
        expect(res.body.length).to.be.equal(4)
      })
  })

  it('GET /api/products/1 - Gets a product by id', async () => {
    await request(app)
      .get('/api/products/1')
      .expect(200)
      .then(res => {
        expect(res.body.name).to.be.equal('Laptop')
        expect(res.body).to.be.an('object')
      })
  })

  it ('GET /api/products/6 - Returns a message if product is not found', async () => {
    await request(app)
      .get('/api/products/6')
      .expect(404)
      .then(res => {
        expect(res.body.msg).to.be.equal('Product not found!')
        expect(res.body).to.be.an('object')
      })
  })

  it('DELETE /api/products/1 - Deletes a product by id', async () => {
    await request(app)
      .delete('/api/products/1')
      .expect(200)
      .then(res => {
        expect(res.body.msg).to.be.equal('Product was deleted!')
        expect(res.body).to.be.an('object')
      })

    await request(app)
      .get('/api/products')
      .expect(200)
      .then(res => {
        expect(res.body.length).to.be.equal(2)
      })
  })

  it('PUT /api/products/1 - Updates a product by id', async () => {
    await request(app)
      .put('/api/products/1')
      .send({ name: 'Dell Laptop' })
      .expect(200)
      .then(res => {
        expect(res.body.name).to.be.equal('Dell Laptop')
      })

    await request(app)
      .get('/api/products/1')
      .expect(200)
      .then(res => {
        expect(res.body.name).to.be.equal('Dell Laptop')
      })
  })

  it('GET /api/products/name/Laptop - Gets a product by name', async () => {
    await request(app)
      .get('/api/products/name/Laptop')
      .expect(200)
      .then(res => {
        expect(res.body.name).to.be.equal('Laptop')
      })
  })

})
