const Sequelize = require('sequelize')
const db = require('./database')

const Order = db.define('order', {
  items: {
    type: Sequelize.ARRAY(Sequelize.JSON),
    allowNull: false
  },
  address: {
    type: Sequelize.STRING
  },
  status: {
    type: Sequelize.ENUM(
      'Created',
      'Processing',
      'Cancelled',
      'Completed'
    ),
    allowNull: false
  }
})

module.exports = Order
