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

jest.mock('../../../src/libs/read-files', () => mockReadFiles)
jest.mock('../../../src/libs/fetch-data', () => mockFetchData)

const { getMovieById, searchMovies } = require('../../../src/services/movie')

describe('getMovieById', () => {
  beforeEach(() => {
    mockLoadMovie.mockImplementation(() => local[0])
  })

  afterEach(() => {
    mockLoadMovie.mockReset()
  })

  describe('when movie exists in the local database', () => {
    describe('when movie exists in OMDb', () => {
      beforeEach(() => {
        mockFetchMovie.mockImplementation(() => omdb[0])
      })

      afterEach(() => {
        mockFetchMovie.mockReset()
      })

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

describe('getMovieById', () => {
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
