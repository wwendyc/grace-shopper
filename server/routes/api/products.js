const router = require('express').Router()
const {Product, Review, Category, User} = require('../../db')
module.exports = router

// api/products

// send back confirmation on product being deleted instead of sending back the deleted product
// and correct status code

router.post('/addtocart', (req, res, next) => {
  const productToAdd = req.body
  req.session.cart.push(productToAdd)
  console.log(req.session.cart.length)
  res.status(201).json({ msg: `${productToAdd.name} has been added!` })
})

router.delete('/removefromcart', (req, res, next) => {

}) 

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
    if (deletedProduct) res.status(200).json({ msg: 'Product was deleted!' })
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

router.get('/:id', async (req, res, next) => {
  try {
    const id = req.params.id
    const product = await Product.findById(id)
    if (product) res.json(product)
    else res.status(404).json({ msg: 'Product not found!' })
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const productToAdd = req.body
    const newProduct = await Product.create(req.body)
    res.status(201).json({ msg: `${newProduct.name} has been added!`  })
  } catch (error) {
    next(error)
  }
})

router.get('/', async (req, res, next) => {
  try {
    const allProducts = await Product.findAll({
      include: [{model: Review, include: [User]}, {model: Category}]
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
