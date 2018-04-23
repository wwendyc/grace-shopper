const express = require('express')
const path = require('path')
const app = express()
const session = require('express-session')
module.exports = app

app.use(session({
  secret: 'FurryFrenchieBulldogs',
  resave: false,
  saveUninitialized: true
}))

app.use((req,res,next) => {
  if (!req.session.cart) req.session.cart = []
  next()
})

// all of our boilerplate middleware
app.use(require('./middleware'))

// all of our "auth" and "api" routes
app.use(require('./routes'))

// For all GET requests that aren't to an API route,
// we will send the index.html!
app.get('/*', (req, res, next) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'))
})

// Error handling endware
app.use((err, req, res, next) => {
  res.status(err.status || 500)
  res.send(err.message || 'Internal server error')
})
