const { loadMovie } = require('../libs/read-files')
const { fetchMovie } = require('../libs/fetch-data')

const getMovieById = async (id) => {
  const localData = loadMovie(id)
  const imdbId = localData.imdbId
  const omdbData = await fetchMovie(imdbId)

  return localData
}

module.exports = {
  getMovieById
}
