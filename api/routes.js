const express = require('express')
const router = express.Router()
const { getMovieById, searchMovies } = require('../src/services/movie')

router
  .get('/', async (req, res) => {
    const searchKey = Object.keys(req.query)[0] || null
    const searchValue = req.query[Object.keys(req.query)[0]] || null
    const movies = await searchMovies(searchKey, searchValue)

    if(!!movies) {
      res.status(200)
    } else {
      res.status(404)
    }

    res.send(movies)
  })
  .get('/:id', async (req, res) => {
    const movie = await getMovieById(req.params.id)

    if(!!movie) {
      res.status(200)
    } else {
      res.status(404)
    }
    
    res.send(movie)
  })

module.exports = router
