const express = require('express')
const bodyParser = require('body-parser')
const router = require('./routes')
const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use((req, res, next) => {
  res.set('Cache-Control', 'public, max-age=86400')
  next()
})
app.use('/api/movies', router)

module.exports = app
