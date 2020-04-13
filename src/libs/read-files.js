const fs = require('fs')
const path = require('path')
const AWS = require('aws-sdk')
const s3 = new AWS.S3()

require('dotenv').config()

const loadMovie = async (id) => {
  try {
    if (process.env.FILE_SOURCE === 'S3') {
      const params = { Bucket: process.env.S3_BUCKET, Key: `${id}.json` }
      return JSON.parse((await s3.getObject(params).promise()).Body)
    } else {
      const file = fs.readFileSync(`./movies/${id}.json`)
      return JSON.parse(file)
    }
  } catch(err) {
    return null
  }
}

const loadMovies = async () => {
  try {
    if (process.env.FILE_SOURCE === 'S3') {
      const params = { Bucket: process.env.S3_BUCKET, Key: 'all.json' }
      const data = JSON.parse((await s3.getObject(params).promise()).Body)

      return data
    } else {
      return fs.readdirSync('./movies')
        .filter(file => path.extname(file) === '.json')
        .map(file => JSON.parse(fs.readFileSync(`./movies/${file}`)))
    }
  } catch(err) {
    return null
  }
}

module.exports = {
  loadMovie,
  loadMovies,
}
