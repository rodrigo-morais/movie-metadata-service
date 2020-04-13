const { loadMovie } = require('../libs/read-files')
const { fetchMovie } = require('../libs/fetch-data')
const { mergeMovie } = require('../libs/merge-movies')

const getMovieById = async (id) => {
  const localData = loadMovie(id)

  if (localData === null) { return null }

  const imdbId = localData.imdbId
  const omdbData = await fetchMovie(imdbId)
  const isValidResponse = omdbData.Response


  if (isValidResponse) {
    return mergeMovie(localData, omdbData)
  } else {
    return localData
  }
}

module.exports = {
  getMovieById
}
