const db = require('./database')
const User = require('./user')
const Product = require('./product')
const Review = require('./review')
const Category = require('./category')
const Order = require('./order')

// associations go here!
<<<<<<< HEAD
Product.belongsTo(Category)
Category.hasMany(Product)
=======
Product.belongsToMany(Category, {through: 'productCategory'})
Category.belongsToMany(Product, {through: 'productCategory'})
>>>>>>> 7bd012d9c3b85cad6a0d917650351a2a1ecb41d4
Product.hasMany(Review)
Review.belongsTo(Product)
Review.belongsTo(User)
User.hasMany(Review)
Order.belongsTo(User)
User.hasMany(Order)

module.exports = {
  db,
  User,
  Product,
  Review,
  Category,
  Order
}
