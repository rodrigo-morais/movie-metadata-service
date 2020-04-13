const fs = require('fs')
const path = require('path')

const loadMovie = (id) => {
  try {
    const file = fs.readFileSync(`./movies/${id}.json`)
    return JSON.parse(file)
  } catch(err) {
    return null
  }
}

const loadMovies = () => {
  try {
    return fs.readdirSync('./movies')
      .filter(file => path.extname(file) === '.json')
      .map(file => JSON.parse(fs.readFileSync(`./movies/${file}`)))
  } catch(err) {
    return null
  }
}

module.exports = {
  loadMovie,
  loadMovies,
}
