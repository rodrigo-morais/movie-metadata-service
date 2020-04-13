const fs = require('fs')
const {loadMovie} = require('../../../src/libs/read-files')

jest.mock('fs')

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

  describe('when file exist', () => {
    beforeEach(() => {
      jest.resetAllMocks()
      fs.readFileSync.mockReturnValue(movieMetadata)
    })

    it('returns a JSON file with movie metadata', () => {
      const movieId = '11043689'
      const result = JSON.parse(movieMetadata)

      expect(loadMovie(movieId)).toStrictEqual(result)
    })
  })

  describe('when file does not exist', () => {
    beforeEach(() => {
      jest.resetAllMocks()
    })

    it('returns null', () => {
      expect(loadMovie('invalid')).toBeNull()
    })
  })
})
