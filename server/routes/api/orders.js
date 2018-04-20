const router = require('express').Router()
const { Order } = require('../../db')

router.param('id', async (req, res, next, id) => {
  try {
    const order = await Order.findById(id)
    req.order = order

    if (!order) {
      const err = new Error(`Order with id: ${req.params.id} not found`)
      err.status = 404
      return next(err)
    }

    next();
  } catch (err) {
    next(err)
  }
});

// TODO: need gatekeeping
router.get('/', async (req, res, next) => {
  try {
    let orders = []

    // if (req.user.isAdmin) {
      orders = await Order.findAll({
        order: [
          ['checkoutDate', 'DESC']
        ]
      })
    // }
    // else {
    //   orders = await Order.findAll({
    //     where: {
    //       id: req.user.id
    //     },
    //     order: [
    //       ['checkoutDate', 'DESC']
    //     ]
    //   })
    // }

    res.json(orders)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', (req, res, next) => {
  res.json(req.order)
})

router.post('/', async (req, res, next) => {
  try {
    const order = await Order.create(req.body)

    res.status(201).json(order)
  } catch (err) {
    next(err)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    const order = await req.order.update(req.body);

    res.json(order)
  } catch (err) {
    next(err)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    await req.order.destroy();

    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});

module.exports = router
