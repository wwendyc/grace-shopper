const db = require('./database')
const User = require('./user')
const Order = require('./order')

// associations go here!
Order.belongsTo(User)
User.hasMany(Order)

module.exports = {
  db,
  User,
  Order
}
