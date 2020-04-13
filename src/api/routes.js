const express = require('express')
const router = express.Router()
const { getMovieById, searchMovies } = require('../services/movie')

router
  .get('/', async (req, res) => {
    const searchKey = Object.keys(req.query)[0] || null
    const searchValue = req.query[Object.keys(req.query)[0]] || null

    res.send(await searchMovies(searchKey, searchValue))
  })
  .get('/:id', async (req, res) =>
    res.send(await getMovieById(req.params.id))
  )

module.exports = router
