const authUser = (req, res, next) => {
  if ((user.id === req.params.id) || req.user.isAdmin) {
    return next()
  }
  const err = new Error('You don\'t have permissions to view this page! :x')
  err.status = 401
  next(err)
}

module.exports = authUser
