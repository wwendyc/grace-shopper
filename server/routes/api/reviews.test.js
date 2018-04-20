const {expect} = require('chai')
const request = require('supertest')
const {db, Review} = require('../../db')
const app = require('../../app')

describe('User routes', () => {
  beforeEach(async () => {
    await db.sync({force: true})
  })

  describe('/api/reviews/', () => {
    const review = 'i\'m not satisfied with this testing section. Might return to coding'
    const rating = 1

    beforeEach(async () => {
      await Review.create({
        review: review,
        rating: rating
      })
    })

    it('GET /api/reviews', async () => {
      await request(app)
        .get('/api/reviews')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array')
          expect(res.body[0].review).to.be.equal(review)
        })
    })

    it('POST /api/reviews', async () => {
      let newId;
      await request(app)
        .post('/api/reviews')
        .send({review: 'still not satisfied', rating: 5})
        .expect(201)
        .then(res => {
          expect(res.body).to.be.an('object')
          expect(res.body.review).to.be.equal('still not satisfied')
          newId = res.body.id
        })
        const postedReview =  await Review.findOne({
          where: {id: newId}
        })
        expect(postedReview).to.exist
    })

  })
})
