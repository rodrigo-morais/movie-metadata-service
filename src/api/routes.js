const express = require('express')
const router = express.Router()
const { getMovieById } = require('../services/movie')

router
  .get('/:id', (req, res) =>
    res.send(getMovieById(req.params.id))
  )

module.exports = router
