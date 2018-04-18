const router = require('express').Router()
const {Product, Review, Category} = require('../../db')
module.exports = router

// api/products

router.get('/category/:category', async (req, res, next) => {
  try {
    const category = req.params.category
    const foundProducts = await Product.findAll({
      where: {[category.name]: category},
      include: [{model: Review}, {model: Category}]
    })
    if (foundProducts.length > 0) res.json(foundProducts)
    else res.status(404).send('No products found under that category!')
  } catch (error) {
    next(error)
  }
})

router.get('/name/:name', async (req, res, next) => {
  try {
    const name = req.params.name
    const foundProduct = await Product.findOne({
      where: {name},
      include: [{model: Review}, {model: Category}]
    })
    if (foundProduct) res.json(foundProduct)
    else res.status(404).send('No product with that name was found.')
  } catch (error) {
    next(error)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const id = req.params.id
    const deletedProduct = await Product.destroy({
      where: {id}
    })
    if (deletedProduct) res.json(deletedProduct)
    else res.status(404).send('Product not found!')
  } catch (error) {
    next(error)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    const id = req.params.id
    const updatedProduct = req.body
    const [num, savedProduct] = await Product.update(updatedProduct, {
      where: {id},
      returning: true,
      plain: true
    })
    if (savedProduct) res.json(savedProduct)
    else res.status(404).send('Product not found!')
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const productToAdd = req.body
    const newProduct = await Product.create(req.body)
    res.json(newProduct)
  } catch (error) {
    next(error)
  }
})

router.get('/', async (req, res, next) => {
  try {
    const allProducts = await Product.findAll({
      include: [{model: Review}, {model: Category}]
    })
    if (allProducts.length > 0) res.json(allProducts)
    else res.status(404).send('No products found!')
  } catch (error) {
    next(error)
  }
})

router.use((req, res, next) => {
  const error = new Error('API route not found!')
  error.status = 404
  next(error)
})