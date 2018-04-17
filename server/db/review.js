const db = require('./database')
const Sequelize =  require('sequelize')

const Review = db.define('review', {
  review: {
    type: Sequelize.TEXT,
    validate: {
      min: {
        args: [10],
        msg: 'Minimum 10 characters required for review'
      }
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
