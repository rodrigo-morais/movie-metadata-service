const axios = require("axios")

require('dotenv').config()

const fetchMovie = async (id) => {
  try {
    const apiKey = process.env.API_KEY
    const url = `${process.env.OMDB_URL}/?i=${id}&apikey=${apiKey}&plot=full`
    const response = await axios.get(url)
    const data = response.data

    return data
  } catch(err) {
    return null
  }
}

module.exports = {
  fetchMovie,
}
