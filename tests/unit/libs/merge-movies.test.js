const { mergeMovie } = require('../../../src/libs/merge-movies')

const local = {
  description: 'Der im Exil lebende Jedi-Ritter Obi-Wan Kenobi nimmt sich einen Mann namens Luke Skywalker als Schüler. Zusammen helfen sie der Rebellion, die Pläne des bösen Imperiums und des Sith-Lords Darth Vader zu vereiteln. ',
  duration: 120,
  id: 11043689,
  imdbId: 'tt0076759',
  languages: [ 'de', 'en' ],
  originalLanguage: 'en',
  productionYear: 1977,
  studios: [ 'FOX', 'Paramount' ],
  title: 'Star Wars: Eine neue Hoffnung',
  userrating: {
    countStar1: 5,
    countStar2: 3,
    countStar3: 88,
    countStar4: 101,
    countStar5: 417,
    countTotal: 614
  }
}

const omdb = {
  Title: 'Star Wars: Episode IV - A New Hope',
  Year: '1977',
  Rated: 'PG',
  Released: '25 May 1977',
  Runtime: '121 min',
  Genre: 'Action, Adventure, Fantasy, Sci-Fi',
  Director: 'George Lucas',
  Writer: 'George Lucas',
  Actors: 'Mark Hamill, Harrison Ford, Carrie Fisher, Peter Cushing',
  Plot: 'The Imperial Forces, under orders from cruel Darth Vader, hold Princess Leia hostage in their efforts to quell the rebellion against the Galactic Empire. Luke Skywalker and Han Solo, captain of the Millennium Falcon, work together with the companionable droid duo R2-D2 and C-3PO to rescue the beautiful princess, help the Rebel Alliance and restore freedom and justice to the Galaxy.',
  Language: 'English',
  Country: 'USA',
  Awards: 'Won 6 Oscars. Another 52 wins & 28 nominations.',
  Poster: 'https://m.media-amazon.com/images/M/MV5BNzVlY2MwMjktM2E4OS00Y2Y3LWE3ZjctYzhkZGM3YzA1ZWM2XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg',
  Ratings: [
    { Source: 'Internet Movie Database', Value: '8.6/10' },
    { Source: 'Rotten Tomatoes', Value: '92%' },
    { Source: 'Metacritic', Value: '90/100' }
  ],
  Metascore: '90',
  imdbRating: '8.6',
  imdbVotes: '1,175,323',
  imdbID: 'tt0076759',
  Type: 'movie',
  DVD: '21 Sep 2004',
  BoxOffice: 'N/A',
  Production: '20th Century Fox',
  Website: 'N/A',
  Response: 'True'
}

describe('mergeMovie', () => {
  const result = mergeMovie(local, omdb)

  it('returns all attribute lower case', () => {
    Object.keys(result).forEach(key =>
      expect(key.charAt(0)).toBe(key.charAt(0).toLowerCase())
    )
  })

  it('returns description attribute with title value', () => {
    expect(result['title']).toBe(omdb['Title'])
  })

  it('returns merged object without Title captilized attribute', () => {
    expect(result['Title']).toBeUndefined()
  })

  it('returns description attribute with plot value', () => {
    expect(result['description']).toBe(omdb['Plot'])
  })

  it('returns merged object without plot attribute', () => {
    expect(result['Plot']).toBeUndefined()
    expect(result['plot']).toBeUndefined()
  })

  it('returns runtime attribute with duration value', () => {
    expect(result['description']).toBe(omdb['Plot'])
  })

  it('returns merged object without duration attribute', () => {
    expect(result['Duration']).toBeUndefined()
    expect(result['duration']).toBeUndefined()
  })

  it('returns imdbId attribute with imdbID value', () => {
    expect(result['imdbId']).toBe(omdb['imdbID'])
  })

  it('returns merged object without imdbID attribute', () => {
    expect(result['ImdbID']).toBeUndefined()
    expect(result['imdbID']).toBeUndefined()
  })

  it('returns year attribute with productionYear value', () => {
    expect(result['year']).toBe(local['productionYear'])
  })

  it('returns merged object without productionYear', () => {
    expect(result['ProductionYear']).toBeUndefined()
    expect(result['productionYear']).toBeUndefined()
  })

  it('returns director attribute as array', () => {
    expect(Array.isArray(result['director'])).toBeTruthy()
  })

  it('returns writer attribute as array', () => {
    expect(Array.isArray(result['writer'])).toBeTruthy()
  })

  it('returns actors attribute as array', () => {
    expect(Array.isArray(result['actors'])).toBeTruthy()
  })

  it('returns merged object with attributes from local data and OMDb', () => {
    expect(result['originalLanguage']).toBe(local['originalLanguage'])
    expect(omdb['originalLanguage']).toBeUndefined()

    expect(result['imdbVotes']).toBe(omdb['imdbVotes'])
    expect(local['imdbVotes']).toBeUndefined()
  })
})
