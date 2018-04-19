/* eslint-env mocha,chai */

const {expect} = require('chai')
const request = require('supertest')
const {db, User} = require('../../db')
const app = require('../../app')
const session = require('supertest-session')

describe('User routes', () => {
  let testSession = null

  beforeEach(async () => {
    await db.sync({force: true})
  })

  describe('/api/users/', () => {
    const codysName = 'Cody'
    const codysEmail = 'cody@puppybook.com'
    const codysPwd = '123'

    beforeEach(async () => {
      await User.create({
        name: codysName,
        email: codysEmail,
        password: codysPwd,
        isAdmin: true
      })

      testSession = session(app)

      return testSession
        .put('/auth/local')
        .send({email: codysEmail, password: codysPwd})
        .expect(200)
    })

    it('GET /api/users', async () => {
      return testSession
        .get('/api/users')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array')
          expect(res.body[0].email).to.be.equal(codysEmail)
        })
    })

    it('POST /api/users', async () => {
      return testSession
        .post('/api/users')
        .send({
          name: 'Tweety',
          email: 'tweety@twitter.com',
          password: 'yellowSubmarine'
        })
        .expect(201)
        .then(res => {
          expect(res.body.name).to.equal('Tweety')
          expect(res.body.email).to.equal('tweety@twitter.com')
        })
    })

    it('PUT /api/users', async () => {
      let user = await User.create({
        name: 'Tweety',
        email: 'tweety@twitter.com',
        password: 'yellowSubmarine'
      })

      return testSession
        .put(`/api/users/${user.id}`)
        .send({
          name: 'Grace'
        })
        .expect(200)
        .then(res => {
          expect(res.body.name).to.equal('Grace')
          expect(res.body.email).to.equal('tweety@twitter.com')
        })
    })
  }) // end describe('/api/users')
}) // end describe('User routes')
