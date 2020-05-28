const AWS = require('aws-sdk')
const s3 = new AWS.S3()
const { getMovieById } = require('./src/services/movie')

require('dotenv').config()

exports.handler = async (event, context) => {
  try{
    const id = event.pathParameters.id
    const movie = await getMovieById(id)

    if(!!movie) {
      return {
        isBase64Encoded: false,
        statusCode: 200,
        headers: { 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify(movie)
      }
    } else {
      return {
        statusCode: 404,
        body: JSON.stringify({
          errorTitle: 'Not Found',
          errorDetail: 'Movie not found'
        })
      }
    }
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        errorTitle: 'Bad Request',
        errorDetail: `Error to find movie ${error.stack}`
      })
    }
  }
}
