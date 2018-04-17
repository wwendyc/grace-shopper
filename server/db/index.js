const db = require('./database')
const User = require('./user')
const Product = require('./product')
const Review = require('./review')
const Category = require('./category')

// associations go here!
Product.belgonsTo(Category)
Category.hasMany(Product)
Product.hasMany(Review)
Review.belongsTo(Product)
Review.belongsTo(User)
User.hasMany(Review)

module.exports = {
  db,
  User,
  Product,
  Review,
  Category
}