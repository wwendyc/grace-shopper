const db = require('./database')
const Sequelize =  require('sequelize')

const Category = db.define('category', {
  categoryName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
})

module.exports = Category
