const adminsOnly = (req, res, next) => {
  if (!req.user.isAdmin) {
    const err = new Error('This page is only accessible to admins! :x')
    err.status = 401
    return next(err)
  }
  next()
}

const authUser = (req, res, next) => {
  if (!req.user.isAdmin || (user.id !== req.params.id)) {
    const err = new Error('You don\'t have permissions to view this page! :x')
    err.status = 401
    return next(err)
  }
  next()
}
module.exports = {
  adminsOnly,
  authUser
}