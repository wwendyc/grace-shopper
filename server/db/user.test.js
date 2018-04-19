/* eslint-env mocha,chai */

const {expect} = require('chai')
const {db, User} = require('./index')

describe('User model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('instanceMethods', () => {
    describe('correctPassword', () => {
      let cody

      beforeEach(async () => {
        cody = await User.create({
          name: 'Cody',
          email: 'cody@puppybook.com',
          password: 'bones'
        })
      })

      it('returns true if the password is correct', () => {
        expect(cody.correctPassword('bones')).to.be.equal(true)
      })

      it('returns false if the password is incorrect', () => {
        expect(cody.correctPassword('bonez')).to.be.equal(false)
      })
    }) // end describe('correctPassword')
  }) // end describe('instanceMethods')

  describe('validateEmail', () => {
    beforeEach(async () => {
      cody = User.build({
        name: 'Cody',
        email: 'cody@puppybook.com',
        password: 'bones'
      })
    })

    it('returns the email that is correctedly formated', () => {
      return cody.save()
        .then(savedCody => {
          expect(cody.email).to.be.equal('cody@puppybook.com')
        })
    })

    it('throws an error if the email format is incorrect', async () => {
      cody.email = '¯l(ツ)_/¯'

      return cody.validate()
      .then(() => {
        throw new Error('email input should be in the correct format')
      },
      (result) => {
        expect(result).to.be.an.instanceOf(Error)
      })
    })
  }) // end describe('validateEmail')
}) // end describe('User model')
