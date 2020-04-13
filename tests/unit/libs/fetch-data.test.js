const axios = require('axios')
const { fetchMovie } = require('../../../src/libs/fetch-data')

jest.mock('axios')

describe('fetchMovie', () => {
  it('calls axios get', async () => {
    await fetchMovie('tt99999')

    expect(axios.get).toHaveBeenCalledTimes(1)
  })
  
  describe('when movie exist', () => {
    beforeEach(() => {
      jest.resetAllMocks()
      axios.get.mockReturnValue(Promise.resolve({"data": {"Response": true}}))
    })

    it('returns movie metadata', async () => {
      const movieId = 'tt0076759'
      const result = {"Response": true}

      expect(await fetchMovie(movieId)).toStrictEqual(result)
    })
  })

  describe('when file does not exist', () => {
    beforeEach(() => {
      jest.resetAllMocks()
      axios.get.mockReturnValue(Promise.resolve({"data": {"Response": false}}))
    })

    it('returns a JSON object with attribute Response as false', async () => {
      const movieId = '999999999'
      const result = {"Response": false}

      expect(await fetchMovie(movieId)).toStrictEqual(result)
    })
  })
})
