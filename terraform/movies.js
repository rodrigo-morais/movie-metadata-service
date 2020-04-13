const AWS = require('aws-sdk')
const { searchMovies } = require('./src/services/movie')

exports.handler = async (event, context) => {
  try {
    const searchKey = !!event.queryStringParameters ? Object.keys(event.queryStringParameters)[0] : null
    const searchValue = !!searchKey ? event.queryStringParameters[searchKey] : null
    const movies = await searchMovies(searchKey, searchValue)

    if(!!movies) {
      return {
        isBase64Encoded: false,
        statusCode: 200,
        headers: { 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify(movies)
      }
    } else {
      return {
        statusCode: 404,
        body: JSON.stringify({
          errorTitle: 'Not Found',
          errorDetail: 'Movies not found'
        })
      }
    }
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        errorTitle: 'Bad Request',
        errorDetail: `Error to find movies ${error.stack}`
      })
    }
  }
}
