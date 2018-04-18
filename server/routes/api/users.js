const router = require('express').Router()
const { User, Order, Review } = require('../../db')
const { adminsOnly, authUser } = require('./gatekeepers')
module.exports = router

// GET /api/users
router.get('/', adminsOnly, async (req, res, next) => {
  try {
    const users = await User.findAll({
      include: [{ model: Order }]
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', authUser, async (req, res, next) => {
  try {
    const singleUser = await User.findOne({
      include: [{ model: Review }],
      where: { id: req.params.id }
    })
    singleUser ? res.json(singleUser) : res.sendStatus(404)
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
    const user = await User.findOne({
      where: { id: req.params.id }
    })
    if (user) {
      const updatedUser = await User.update(req.body)
      res.json(updatedUser)
    } else {
      res.sendStatus(404)
    }
  } catch (err) {
    next(err)
  }
})

// Delete user
router.delete('/', adminsOnly, async (req, res, next) => {
  try {
    const deleteUser = await User.destroy({
      where: { id: req.params.id }
    })
    deleteUser ? res.sendStatus(204) : res.sendStatus(404)
  } catch (err) {
    next(err)
  }
})
