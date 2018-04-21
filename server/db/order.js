const Sequelize = require('sequelize')
const db = require('./database')

// Think about what all is being stored into the products list

const Order = db.define('order', {
  products: {
    type: Sequelize.ARRAY(Sequelize.JSON),
    allowNull: false
  },
  address: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true
    }
  },
  status: {
    type: Sequelize.ENUM(
      'Created',
      'Processing',
      'Cancelled',
      'Completed'
    ),
    allowNull: false
  },
  checkoutDate: {
    type: Sequelize.DATE
  },
  totalPrice: {
    type: Sequelize.FLOAT
  }
})

module.exports = Order
