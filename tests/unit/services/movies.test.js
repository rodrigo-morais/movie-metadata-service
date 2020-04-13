const local = {
  description: 'Der im Exil lebende Jedi-Ritter Obi-Wan Kenobi nimmt sich einen Mann namens Luke Skywalker als Schüler. Zusammen helfen sie der Rebellion, die Pläne des bösen Imperiums und des Sith-Lords Darth Vader zu vereiteln. ',
  duration: 120,
  id: 11043689,
  imdbId: 'tt0076759',
  languages: [ 'de', 'en' ],
  originalLanguage: 'en',
  productionYear: 1977,
  studios: [ 'FOX', 'Paramount' ],
  title: 'Star Wars: Eine neue Hoffnung',
  userrating: {
    countStar1: 5,
    countStar2: 3,
    countStar3: 88,
    countStar4: 101,
    countStar5: 417,
    countTotal: 614
  }
}

const omdb = {
  Title: 'Star Wars: Episode IV - A New Hope',
  Year: '1977',
  Rated: 'PG',
  Released: '25 May 1977',
  Runtime: '121 min',
  Genre: 'Action, Adventure, Fantasy, Sci-Fi',
  Director: 'George Lucas',
  Writer: 'George Lucas',
  Actors: 'Mark Hamill, Harrison Ford, Carrie Fisher, Peter Cushing',
  Plot: 'The Imperial Forces, under orders from cruel Darth Vader, hold Princess Leia hostage in their efforts to quell the rebellion against the Galactic Empire. Luke Skywalker and Han Solo, captain of the Millennium Falcon, work together with the companionable droid duo R2-D2 and C-3PO to rescue the beautiful princess, help the Rebel Alliance and restore freedom and justice to the Galaxy.',
  Language: 'English',
  Country: 'USA',
  Awards: 'Won 6 Oscars. Another 52 wins & 28 nominations.',
  Poster: 'https://m.media-amazon.com/images/M/MV5BNzVlY2MwMjktM2E4OS00Y2Y3LWE3ZjctYzhkZGM3YzA1ZWM2XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg',
  Ratings: [
    { Source: 'Internet Movie Database', Value: '8.6/10' },
    { Source: 'Rotten Tomatoes', Value: '92%' },
    { Source: 'Metacritic', Value: '90/100' }
  ],
  Metascore: '90',
  imdbRating: '8.6',
  imdbVotes: '1,175,323',
  imdbID: 'tt0076759',
  Type: 'movie',
  DVD: '21 Sep 2004',
  BoxOffice: 'N/A',
  Production: '20th Century Fox',
  Website: 'N/A',
  Response: 'True'
}

const mergedMovie = {
    description: "The Imperial Forces, under orders from cruel Darth Vader, hold Princess Leia hostage in their efforts to quell the rebellion against the Galactic Empire. Luke Skywalker and Han Solo, captain of the Millennium Falcon, work together with the companionable droid duo R2-D2 and C-3PO to rescue the beautiful princess, help the Rebel Alliance and restore freedom and justice to the Galaxy.",
    id: 11043689,
    imdbId: "tt0076759",
    languages: [
        "de",
        "en"
    ],
    originalLanguage: "en",
    studios: [
        "FOX",
        "Paramount"
    ],
    title: "Star Wars: Episode IV - A New Hope",
    year: 1977,
    rated: "PG",
    released: "25 May 1977",
    runtime: 120,
    genre: "Action, Adventure, Fantasy, Sci-Fi",
    director: [
        "George Lucas"
    ],
    writer: [
        "George Lucas"
    ],
    actors: [
        "Mark Hamill",
        "Harrison Ford",
        "Carrie Fisher",
        "Peter Cushing"
    ],
    language: "English",
    country: "USA",
    awards: "Won 6 Oscars. Another 52 wins & 28 nominations.",
    poster: "https://m.media-amazon.com/images/M/MV5BNzVlY2MwMjktM2E4OS00Y2Y3LWE3ZjctYzhkZGM3YzA1ZWM2XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg",
    ratings: {
        0: {
            source: "Internet Movie Database",
            value: "8.6/10"
        },
        1: {
            source: "Rotten Tomatoes",
            value: "92%"
        },
        2: {
            source: "Metacritic",
            value: "90/100"
        },
        3: {
            source: "Local Data",
            value: "4.5/5"
        }
    },
    metascore: "90",
    imdbRating: "8.6",
    imdbVotes: "1,175,323",
    type: "movie",
    dVD: "21 Sep 2004",
    boxOffice: "N/A",
    production: "20th Century Fox",
    website: "N/A",
    response: "True"
}

const mockLoadMovie = jest.fn()
const mockReadFiles = {
  loadMovie: mockLoadMovie,
}
const mockFetchMovie = jest.fn()
const mockFetchData = {
  fetchMovie: mockFetchMovie,
}

jest.mock('../../../src/libs/read-files', () => mockReadFiles)
jest.mock('../../../src/libs/fetch-data', () => mockFetchData)

const { getMovieById } = require('../../../src/services/movie')

describe('getMovieById', () => {
  beforeEach(() => {
    mockLoadMovie.mockImplementation(() => local)
  })

  afterEach(() => {
    mockLoadMovie.mockReset()
  })

  describe('when movie exists in the local database', () => {
    describe('when movie exists in OMDb', () => {
      beforeEach(() => {
        mockFetchMovie.mockImplementation(() => omdb)
      })

      afterEach(() => {
        mockFetchMovie.mockReset()
      })

      it('returns merged movie with local and OMDb', async () => {
        const movie = await getMovieById('11043689')
        expect(movie).toStrictEqual(mergedMovie)
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
        expect(movie).toStrictEqual(local)
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
