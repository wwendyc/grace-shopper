const router = require('express').Router()
const { User, Review } = require('../../db')
module.exports = router

// GET /api/users
// Hm...should everyone really be able to get these...?
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
      include: [{ model: Review }],
      where: { id: req.params.id }
    })
    res.json(singleUser)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const newUser = await User.create(req.body)
    res.status(201).send(newUser)
  } catch (err) {
    next(err)
  }
})

router.get('/admin', async (req, res, next) => {
  try {
    const adminUsers = await User.findAll({
      where: { isAdmin: true }
    })
    res.json(adminUsers)
  } catch (err) {
    next(err)
  }
})

router.get('/non-admin', async (req, res, next) => {
  try {
    const nonAdmins = await User.findAll({
      where: { isAdmin: false }
    })
    res.json(nonAdmins)
  } catch (err) {
    next(err)
  }
})
