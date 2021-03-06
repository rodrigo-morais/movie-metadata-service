const mockReaddirSync = jest.fn()
const mockReadFileSync = jest.fn()
const mockFs = {
  readdirSync: mockReaddirSync,
  readFileSync: mockReadFileSync
}
jest.mock('fs', () => mockFs)

const fs = require('fs')
const { loadMovie, loadMovies } = require('../../../src/libs/read-files')

describe('loadMovie', () => {
  const movieMetadata = '{\
    "description": "Der im Exil lebende Jedi-Ritter Obi-Wan Kenobi nimmt sich einen Mann namens Luke Skywalker als Schüler. Zusammen helfen sie der Rebellion, die Pläne des bösen Imperiums und des Sith-Lords Darth Vader zu vereiteln. ",\
    "duration": 120,\
    "id": 11043689,\
    "imdbId": "tt0076759",\
    "languages": [\
      "de",\
      "en"\
    ],\
    "originalLanguage": "en",\
    "productionYear": 1977,\
    "studios": [\
      "FOX",\
      "Paramount"\
    ],\
    "title": "Star Wars: Eine neue Hoffnung",\
    "userrating": {\
      "countStar1": 5,\
      "countStar2": 3,\
      "countStar3": 88,\
      "countStar4": 101,\
      "countStar5": 417,\
      "countTotal": 614\
    }\
  }'

  it('calls fs readFileSync', async () => {
    fs.readFileSync.mockReset()
    await loadMovie('99999')

    expect(fs.readFileSync).toHaveBeenCalledTimes(1)
  })

  describe('when file exist', () => {
    beforeEach(() => {
      jest.resetAllMocks()
      fs.readFileSync.mockReturnValue(movieMetadata)
    })

    it('returns a JSON file with movie metadata', async () => {
      const movieId = '11043689'
      const result = JSON.parse(movieMetadata)
      const expected = await loadMovie(movieId)

      expect(expected).toStrictEqual(result)
    })
  })

  describe('when file does not exist', () => {
    beforeEach(() => {
      jest.resetAllMocks()
    })

    it('returns null', async () => {
      const expected = await loadMovie('invalid')
      expect(expected).toBeNull()
    })
  })
})

describe('loadMovies', () => {
  const a = '{"a": 1, "b": 2}'
  const b = '{"a": 5, "b": 2, "c": 2}'
  const all = [JSON.parse(a), JSON.parse(b)]

  beforeEach(() => {
    mockReaddirSync.mockReset()
    mockReadFileSync.mockReset()

    mockReaddirSync.mockImplementation(() => ['a.json', 'b.json'])
    mockReadFileSync.mockImplementation((file) => {
      if (file === './movies/a.json') {
        return a
      } else {
        return b
      }
    })
  })

  it('calls fs readdirSync', async () => {
    await loadMovies()

    expect(fs.readdirSync).toHaveBeenCalledTimes(1)
    expect(fs.readFileSync).toHaveBeenCalledTimes(2)
  })

  it('returns all movies', async () => {
    const expected = await loadMovies()

    expect(expected).toStrictEqual(all)
  })
})
