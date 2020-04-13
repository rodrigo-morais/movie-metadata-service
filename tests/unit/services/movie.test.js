const { local, omdb, mergedMovies, mergedMoviesYear } = require('./data')
const mockLoadMovie = jest.fn()
const mockLoadMovies = jest.fn()
const mockReadFiles = {
  loadMovie: mockLoadMovie,
  loadMovies: mockLoadMovies,
}
const mockFetchMovie = jest.fn()
const mockFetchData = {
  fetchMovie: mockFetchMovie,
}
const mockCacheHas = jest.fn()
const mockCacheSet = jest.fn()
const mockCacheMget = jest.fn()
const mockCacheGet = jest.fn()

jest.mock('../../../src/libs/read-files', () => mockReadFiles)
jest.mock('../../../src/libs/fetch-data', () => mockFetchData)
jest.mock('node-cache', () => {
  return function() {
    return {
      has: mockCacheHas,
      set: mockCacheSet,
      mget: mockCacheMget,
      get: mockCacheGet,
    }
  }
})

const { getMovieById, searchMovies } = require('../../../src/services/movie')

describe('getMovieById', () => {
  beforeEach(() => {
    mockLoadMovie.mockImplementation(() => local[0])
    mockFetchMovie.mockImplementation(() => omdb[0])
  })

  describe('when data is not cached', () => {
    beforeAll(() => {
      mockCacheHas.mockImplementation(() => false)
    })

    it('calls cache has and set', async () => {
      const movie = await getMovieById('11043689')
      expect(mockCacheHas).toHaveBeenCalledWith('11043689')
      expect(mockCacheSet).toHaveBeenCalledWith('11043689', movie)
    })

    describe('when movie exists in the local database', () => {
      describe('when movie exists in OMDb', () => {
        it('returns merged movie with local and OMDb', async () => {
          const movie = await getMovieById('11043689')
          expect(movie).toStrictEqual(mergedMovies[0])
        })
      })


      describe('when movie does not exist in OMDb', () => {
        beforeEach(() => {
          mockFetchMovie.mockImplementation(() => ({ Response: false }))
        })

        afterEach(() => {
          mockFetchMovie.mockReset()
        })

        it('returns only the local movie', async () => {
          const movie = await getMovieById('11043699')
          expect(movie).toStrictEqual(local[0])
        })
      })
    })

    describe('when movie does not exist in the local database', () => {
        beforeEach(() => {
          mockLoadMovie.mockImplementation(() => null)
        })

        afterEach(() => {
          mockLoadMovie.mockReset();
        })

      it('returns null', async () => {
        const movie = await getMovieById('9999')
        expect(movie).toBeNull()
      })
    })
  })

  describe('when data is cached', () => {
    beforeAll(() => {
      mockCacheHas.mockImplementation(() => true)
    })

    it('calls cache has and set', async () => {
      const movie = await getMovieById('11043689')
      expect(mockCacheHas).toHaveBeenCalledWith('11043689')
      expect(mockCacheGet).toHaveBeenCalledWith('11043689')
    })

    describe('when movie exists in the local database', () => {
      describe('when movie exists in OMDb', () => {
        it('returns merged movie with local and OMDb', async () => {
          mockCacheGet.mockImplementation(() => mergedMovies[0])

          const movie = await getMovieById('11043689')
          expect(movie).toStrictEqual(mergedMovies[0])

          mockCacheGet.mockReset()
        })
      })


      describe('when movie does not exist in OMDb', () => {
        beforeEach(() => {
          mockFetchMovie.mockImplementation(() => ({ Response: false }))
          mockCacheGet.mockImplementation(() => local[0])
        })

        afterEach(() => {
          mockFetchMovie.mockReset()
          mockCacheGet.mockReset()
        })

        it('returns only the local movie', async () => {
          const movie = await getMovieById('11043699')
          expect(movie).toStrictEqual(local[0])
        })
      })
    })

    describe('when movie does not exist in the local database', () => {
      it('returns null', async () => {
        mockLoadMovie.mockImplementation(() => null)
        mockCacheHas.mockImplementation(() => false)

        const movie = await getMovieById('9999')
        expect(movie).toBeNull()

        mockLoadMovie.mockReset();
      })
    })
  })
})

describe('searchMovies', () => {
  describe('when data is not cached', () => {
    beforeAll(() => {
      mockCacheSet.mockReset()
      mockCacheHas.mockImplementation(() => false)
    })

    beforeEach(() => {
      mockLoadMovies.mockImplementation(() => local)
      mockFetchMovie.mockImplementation((movieId) =>
        omdb.find((m) => m.imdbID === movieId)
      )
    })

    afterEach(() => {
      mockLoadMovies.mockReset()
      mockFetchMovie.mockReset()
    })

    it('calls cache has and set', async () => {
      const movie = await searchMovies(null, null)

      expect(mockCacheHas).toHaveBeenCalledWith('all')
      expect(mockCacheSet).toBeCalledTimes(5)
    })

    describe('when no search term is provided', () => {
      it('returns all movies', async () => {
        expect(await searchMovies(null, null)).toStrictEqual(mergedMovies)
      })
    })

    describe('when search term is provided', () => {
      it('returns all movies that match with the search term', async () => {
        expect(await searchMovies('year', '1977')).toStrictEqual(mergedMoviesYear)
      })
    })

    describe('when has an error to load movies', () => {
      beforeEach(() => {
        mockLoadMovies.mockImplementation(() => null)
      })

      afterEach(() => {
        mockLoadMovies.mockReset()
      })

      it('returns null', async () => {
        expect(await searchMovies('year', '1977')).toBeNull()
      })
    })
  })

  describe('when data is cached', () => {
    const moviesObjs = mergedMovies
      .reduce((obj, movie) => {
        obj[movie.id] = movie
        return obj
      }, {})
    const moviesValues = Object.values(moviesObjs)

    beforeAll(() => {
      mockCacheHas.mockImplementation(() => true)
      mockCacheMget.mockImplementation(() => moviesObjs)
    })

    beforeEach(() => {
      mockLoadMovies.mockImplementation(() => local)
      mockFetchMovie.mockImplementation((movieId) =>
        omdb.find((m) => m.imdbID === movieId)
      )
    })

    afterEach(() => {
      mockLoadMovies.mockReset()
      mockFetchMovie.mockReset()
    })

    it('calls cache has and set', async () => {
      const movie = await searchMovies(null, null)
      const movieIds = local.map(movie => movie.id)

      expect(mockCacheHas).toHaveBeenCalledWith('all')
      expect(mockCacheGet).toHaveBeenCalledWith('all')
      expect(mockCacheMget).toBeCalledTimes(1)
    })

    describe('when no search term is provided', () => {
      it('returns all movies', async () => {
        const result = mergedMovies.sort(({id}) => id)
        expect(await searchMovies(null, null)).toStrictEqual(moviesValues)
      })
    })

    describe('when search term is provided', () => {
      it('returns all movies that match with the search term', async () => {
        expect(await searchMovies('year', '1977')).toStrictEqual(mergedMoviesYear)
      })
    })
  })
})
