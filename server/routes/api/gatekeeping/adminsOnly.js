const adminsOnly = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    return next()
  }
  const err = new Error('This page is only accessible to admins! :x')
  err.status = 401
  next(err)
}

module.exports = adminsOnly
