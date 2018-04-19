const db = require('./database')
const Sequelize =  require('sequelize')

const Review = db.define('review', {
  review: {
    type: Sequelize.TEXT,
    validate: {
      len: [11]
    }
  },
  rating: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0,
      max: 5
    }
  }
})

module.exports = Review
