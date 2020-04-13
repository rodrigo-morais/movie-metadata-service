const fs = require('fs')

const loadMovie = (id) => {
  try {
    const file = fs.readFileSync(`./movies/${id}.json`)
    return JSON.parse(file)
  } catch(err) {
    return null
  }
}

module.exports = {
  loadMovie,
}
