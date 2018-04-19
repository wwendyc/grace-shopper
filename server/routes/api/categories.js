const router = require('express').Router()
const Category = require('../../db/category')

// send back confirmation on product being deleted instead of sending back the deleted product
// and correct status code

router.param('id', async (req, res, next, id) => {
  try {
    const category = await Category.findById(id)
    req.category = category
    if (!category) {
      const err = new Error(`Category with id: ${req.params.id} not found`)
      err.status = 404
      next(err)
    } else {
      next()
    }
  } catch (err) {
    next(err)
  }
})

router.get('/', async (req, res, next) => {
  try {
    const categories = await Category.findAll()
    res.json(categories)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', (req, res, next) => {
  res.json(req.category)
})

router.post('/', async (req, res, next) => {
  try {
    const category = await Category.create(req.body)
    res.json(category)
  } catch (err) {
    next(err)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    const category = await req.category.update(req.body)
    res.json(category)
  } catch (err) {
    next(err)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    await req.category.destroy()
    res.sendStatus(204)
  } catch (err) {
    next(err);
  }
});

module.exports = router
