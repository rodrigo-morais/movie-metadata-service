const { loadMovie, loadMovies } = require('../libs/read-files')
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

const filterMovie = (searchKey, searchValue, shouldReturnKeyMissing = false) => (movie) => {
  if (Array.isArray(movie[searchKey])) {
    return movie[searchKey].includes(searchValue)
  } else if (movie.hasOwnProperty(searchKey)) {
    return movie[searchKey] == searchValue
  } else { return shouldReturnKeyMissing }
}

const searchMovies = async (searchKey, searchValue) => {
  const localData = loadMovies()

  if (localData === null) { return null }

  const mergedData = (await Promise.all(
    localData
      .filter(filterMovie(searchKey, searchValue, true))
      .map(async movie => mergeMovie(movie, await fetchMovie(movie.imdbId)))
  ))
  
  return (!!searchKey ? mergedData.filter(filterMovie(searchKey, searchValue)) : mergedData)
}

module.exports = {
  getMovieById,
  searchMovies,
}
