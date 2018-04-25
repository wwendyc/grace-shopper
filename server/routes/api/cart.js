const router = require('express').Router()
const {Product, Review, Category, User} = require('../../db')
module.exports = router

//localhost/api/cart

router.post('/', (req, res, next) => {
  try {
    const productToAdd = req.body
    const id = productToAdd.id
    const cart = req.session.cart
    if(!cart[id]) {
      cart[id] = productToAdd
      cart[id].quantity = 1
    } else {
      cart[id].quantity += 1
    }
    res.status(201).json(cart)
  } catch (error) {
    res.status(500).json({ msg: 'There was an error adding this item to your cart, please try again.'})
  }
})

router.delete('/', (req, res, next) => {
  try {
    req.session.destroy()
    res.sendStatus(204)
  } catch (error) {
    console.log(error)
  }
})

router.delete('/:id', (req, res, next) => {
  try {
    const id = req.params.id
    const cart = req.session.cart
    if(cart[id].quantity > 1) {
      cart[id].quantity -= 1
    }
    else delete cart[id]
    res.status(204).json(cart)
  } catch (error) {
    console.log(error)
  }
})

router.get('/', (req, res, next) => {
  try {
    const cartItems = req.session.cart
    res.status(200).json(cartItems)
  } catch (error) {
    console.log(error)
  }
})
