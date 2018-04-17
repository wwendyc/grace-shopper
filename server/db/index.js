const db = require('./database')
const User = require('./user')
const Product = require('./product')
const Order = require('./order')

// associations go here!
Order.belongsTo(User)
User.hasMany(Order)

module.exports = {
  db,
  User,
  Product,
  Order
}
