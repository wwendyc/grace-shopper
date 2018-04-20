const {expect} = require('chai')
const request = require('supertest')
const {db, Review} = require('../../db')
const app = require('../../app')

describe('User routes', () => {
  const review = 'i\'m not satisfied with this testing section. Might return to coding'
  const rating = 1

  beforeEach(async () => {

    await db.sync({force: true})
    await Review.create({
      review: review,
      rating: rating
    })
  })

  describe('/api/reviews/', () => {

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
        .send({review: 'still not satisfied', rating: 5, userId: 1})
        .expect(201)
        .then(res => {
          expect(res.body).to.be.an('object')
          newId = res.body.id
        })
        const postedReview =  await Review.findOne({
          where: {id: newId}
        })
        expect(postedReview).to.exist
    })

    it('PUT /api/reviews/1 - Updates a review by id', async () => {
      await request(app)
        .put('/api/reviews/1')
        .send({review: 'still not at all satisfied'})
        .expect(200)
        .then(res => {
          expect(res.body.review).to.be.equal('still not at all satisfied')
        })
    })

    it('DELETE /api/reviews/1 - Deletes a review by id', async () => {
      await request(app)
        .delete('/api/reviews/1')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('object')
        })

      await request(app)
        .get('/api/reviews')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array')
          expect(res.body.length).to.be.equal(0)
        })
    })

  })
})
