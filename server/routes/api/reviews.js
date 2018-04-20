const router = require('express').Router()
const {Review, Product, User} = require('../../db')

router.get('/', async (req, res, next) => {
  try {
    const reviews = await Review.findAll()
    res.json(reviews)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  // console.log(req.user)
  try {
    const review = await Review.create(req.body.review)
    const reviewId = review.id

    if (req.body.selectedProduct){
      const product = await Product.findById(req.body.selectedProduct.id)
      await review.setProduct(product)
    }

    if (req.user){
      const user = await User.findById(req.user.id)
      await review.setUser(user)
    }

    const newReview = await Review.findById(reviewId, {
      include: [{model: User}]
    })
    res.status(201).json(newReview)
  } catch (err) {
    next(err)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.id)
    if (review){
      const updatedReview = await review.update(req.body)
      res.send(updatedReview)
    } else {
      const error = new Error('Review not found')
      error.status = 404
      next(error)
    }
  } catch (error) {next(error)}
})

router.delete('/:id', async (req, res, next) => {
  try {
    const noOfRows = await Review.destroy({
      where: {
        id: req.params.id
      }
    })
    if (noOfRows){
      res.sendStatus(204)
    } else {
      const error = new Error('Review not found')
      error.status = 404
      next(error)
    }
  } catch (error) {next(error)}
})

module.exports = router
