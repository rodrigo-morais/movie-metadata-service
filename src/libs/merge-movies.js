const lowerCaseObjectKeys = obj =>
  Object.keys(obj).reduce((newObj, key) => {
    if (typeof obj[key] === 'object') {
      newObj[key.charAt(0).toLowerCase() + key.slice(1)] = lowerCaseObjectKeys(obj[key])
    } else if (Array.isArray(obj[key]) && typeof obj[key][0] === 'object') {
      newObj[key.charAt(0).toLowerCase() + key.slice(1)] = obj[key].map(elem => lowerCaseObjectKeys(elem))
    } else {
      newObj[key.charAt(0).toLowerCase() + key.slice(1)] = obj[key]
    }
    return newObj
  }, {})

const overwriteObjectKeys = (obj, keys) => keys.reduce((newObj, tuple) => {
  const {[tuple[0]]: omit, ...cloneObj} = newObj
  cloneObj[tuple[1]] = newObj[tuple[0]]
  return cloneObj
}, obj)

const convertKeyFromStringToArray = (obj, keys) => keys.reduce((newObj, key) => {
  newObj[key] = newObj[key].replace(/, /g, ',').split(',')
  return newObj
}, obj)

const addLocalRating = obj => {
  const {userrating, ...newObj} = obj

  newObj.ratings[Object.keys(newObj.ratings).length] = {
    'source': 'Local Data',
    'value': Number((
      obj.userrating.countStar1 +
      (obj.userrating.countStar2 * 2) + 
      (obj.userrating.countStar3 * 3) + 
      (obj.userrating.countStar4 * 4) + 
      (obj.userrating.countStar5 * 5)
    ) / obj.userrating.countTotal).toFixed(1) + '/5'
  }
  return newObj
}

const mergeMovie = (local, omdb) => {
  const tuples = [['plot', 'description'], ['duration', 'runtime'], ['imdbID', 'imdbId'], ['productionYear', 'year']]

  return addLocalRating(
    convertKeyFromStringToArray(
      overwriteObjectKeys(
        {...local, ...lowerCaseObjectKeys(omdb)}, tuples
      ), ['director', 'writer', 'actors']
    )
  )
}

module.exports = {
  mergeMovie,
}
