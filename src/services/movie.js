const { loadMovie } = require('../libs/read-files')

const getMovieById = (id) => loadMovie(id)

module.exports = {
  getMovieById
}
