const router = require('express').Router()
const { User, Order, Review } = require('../../db')
const { adminsOnly, authUser } = require('./gatekeeping')
module.exports = router

// GET /api/users
router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll()
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const singleUser = await User.findOne({
      include: [{ model: Order }, { model: Review }],
      where: { id: req.params.id }
    })
    singleUser ? res.json(singleUser) : res.sendStatus(404)
  } catch (err) {
    next(err)
  }
})

router.get('/:id/orders', async (req, res, next) => {
  try {
    const userOrders = await User.findOne({
      include: [{ model: Order }],
      where: { id: req.params.id }
    })
    userOrders ? res.json(userOrders) : res.sendStatus(404)
  } catch (err) {
    next(err)
  }
})

router.get('/:id/reviews', async (req, res, next) => {
  try {
    const userReviews = await User.findOne({
      include: [{ model: Review }],
      where: { id: req.params.id }
    })
    userReviews ? res.json(userReviews) : res.sendStatus(404)
  } catch (err) {
    next(err)
  }
})

router.get('/non-admin', adminsOnly, async (req, res, next) => {
  try {
    const nonAdmins = await User.findAll({
      where: { isAdmin: false }
    })
    res.json(nonAdmins)
  } catch (err) {
    next(err)
  }
})

router.get('/admin', adminsOnly, async (req, res, next) => {
  try {
    const adminUsers = await User.findAll({
      where: { isAdmin: true }
    })
    res.json(adminUsers)
  } catch (err) {
    next(err)
  }
})

// Create user
router.post('/', adminsOnly, async (req, res, next) => {
  try {
    const newUser = await User.create(req.body)
    res.status(201).json(newUser)
  } catch (err) {
    next(err)
  }
})

// Update user
router.put('/:id', adminsOnly, async (req, res, next) => {
  try {
    const targetUser = await User.findOne({
      where: { id: req.params.id }
    })
    if (targetUser) {
      const updatedUser = await targetUser.update(req.body)
      res.json(updatedUser)
    } else {
      res.sendStatus(404)
    }
  } catch (err) {
    next(err)
  }
})

// Delete user
router.delete('/:id', adminsOnly, async (req, res, next) => {
  try {
    const deleteUser = await User.destroy({
      where: { id: req.params.id }
    })
    deleteUser ? res.sendStatus(204) : res.sendStatus(404)
  } catch (err) {
    next(err)
  }
})


