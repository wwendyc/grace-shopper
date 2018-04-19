const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
const {db, Review} = require('./index')

const expect = chai.expect
chai.use(chaiAsPromised)

describe('Review model', () => {
  before(() => {
    return db.sync({force: true})
  })

  // beforeEach('Truncate the table', () => Review.truncate())

  it('should accept review text with minimum 10 char only', async() => {
    await expect(Review.create({review: 'test'})).to.be.rejected
  })

  it('should accept rating with between 0 and 5 only', async() => {
    await expect(Review.create({rating: 10})).to.be.rejected
  })

  it('has expected review definition', () => {
    expect(Review.attributes.review).to.be.an('object');
  });

  it('has expected rating definition', () => {
    expect(Review.attributes.rating).to.be.an('object');
  });

  it('`review` can hold a longer string', async () => {
    const reviewText = `The breed is often described by the Latin phrase multum in parvo, or "much in little" or "a lot of dog in a small space", alluding to the Pug's remarkable and charming personality, despite its small size. Pugs are strong willed but rarely aggressive, and are suitable for families with children. The majority of the breed is very fond of children and sturdy enough to properly play with them. Depending on their owner's mood, they can be quiet and docile but also vivacious and teasing. Pugs tend to be intuitive and sensitive to the moods of their owners and are usually eager to please them. Pugs are playful and thrive on human companionship. They also tend to have a snoozy nature and spend a lot of time napping. Pugs are often called "shadows" because they follow their owners around and like to stay close to the action, craving attention and affection from their owners.`

    const review = await Review.create({review: reviewText})
    expect(review.review).to.equal(reviewText)
  })

})
