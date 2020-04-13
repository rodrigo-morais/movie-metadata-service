const express = require('express')
const router = express.Router()
const { getMovieById } = require('../services/movie')

router
  .get('/:id', async (req, res) =>
    res.send(await getMovieById(req.params.id))
  )

module.exports = router
