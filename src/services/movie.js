const { loadMovie, loadMovies } = require('../libs/read-files')
const { fetchMovie } = require('../libs/fetch-data')
const { mergeMovie } = require('../libs/merge-movies')
const NodeCache = require('node-cache')
const localCache = new NodeCache()

const getMovieById = async (id) => {
  if (localCache.has(id)) {
    return localCache.get(id)
  } else {
    const localData = loadMovie(id)

    if (localData === null) { return null }

    const imdbId = localData.imdbId
    const omdbData = await fetchMovie(imdbId)
    const isValidResponse = omdbData.Response

    let movie = null
    if (isValidResponse) {
      movie = mergeMovie(localData, omdbData)
    } else {
      movie = localData
    }

    localCache.set(id, movie)
    return movie
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
  if (localCache.has('all')) {
    const movieIds = localCache.get('all')
    const movies = Object.values(localCache.mget(movieIds))

    return (!!searchKey ? movies.filter(filterMovie(searchKey, searchValue)) : movies)
  } else {
    const localData = loadMovies()

    if (localData === null) { return null }

    const mergedData = (await Promise.all(
      localData
        .filter(filterMovie(searchKey, searchValue, true))
        .map(async movie => mergeMovie(movie, await fetchMovie(movie.imdbId)))
    ))
  
    localCache.set('all', mergedData.map(movie => { localCache.set(movie.id, movie); return movie.id }));
    return (!!searchKey ? mergedData.filter(filterMovie(searchKey, searchValue)) : mergedData)
  }
}

module.exports = {
  getMovieById,
  searchMovies,
}
