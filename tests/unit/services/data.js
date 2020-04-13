const local = [
  {
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
  },
  {
    description: 'Unter der Obhut des Panthers Baghira wächst das Findelkind Mogli bei einer Wolfsfamilie auf. Doch da erschüttert die Rückkehr des menschenfressenden Tigers Shir Khan den Dschungel. Die Sorge um Mogli zwingt Baghira zu der einzig möglichen Entscheidung.',
    duration: 75,
    id: 11528860,
    imdbId: 'tt0061852',
    languages: [ 'de', 'en' ],
    originalLanguage: 'en',
    productionYear: 1967,
    studios: [ 'Disney' ],
    title: 'Das Dschungelbuch',
    userrating: {
      countStar1: 1,
      countStar2: 2,
      countStar3: 49,
      countStar4: 37,
      countStar5: 140,
      countTotal: 229
    }
  },
  {
    description: 'Im Sündenpfuhl Sin City werden drei Geschichten parallel erzählt: Der Polizist Hartigan jagt einen Pädophilen, der Outlaw Dwight muss im Rotlichtbezirk untertauchen und dem Schläger Marv wird ein Mord angehängt. ',
    duration: 119,
    id: 3532674,
    imdbId: 'tt0401792',
    languages: [ 'de', 'en' ],
    originalLanguage: 'en',
    productionYear: 2005,
    studios: [ 'Studiocanal', 'Paramount' ],
    title: 'Sin City',
    userrating: {
      countStar1: 169,
      countStar2: 152,
      countStar3: 751,
      countStar4: 847,
      countStar5: 1197,
      countTotal: 3116
    }
  },
  {
    description: '1912: Der junge Indiana Jones will Grabräubern das Kreuz von Coronado abluchsen, um es in ein Museum zu bringen. Nach einem Zeitsprung ins Jahr 1938 kämpft Indy wieder um das Kreuz, diesmal erfolgreich. Anschließend soll er den Heiligen Gral suchen.',
    duration: 127,
    id: 5979300,
    imdbId: 'tt0097576',
    languages: [ 'de', 'en' ],
    originalLanguage: 'en',
    productionYear: 1989,
    studios: [ 'Paramount' ],
    title: 'Indiana Jones und der letzte Kreuzzug',
    userrating: {
      countStar1: 20,
      countStar2: 24,
      countStar3: 1103,
      countStar4: 1224,
      countStar5: 2349,
      countTotal: 4720
    }
  }
]

const omdb = [
  {
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
  },
  {
    Title: 'Sin City',
    Year: '2005',
    Rated: 'R',
    Released: '01 Apr 2005',
    Runtime: '124 min',
    Genre: 'Crime, Thriller',
    Director: 'Frank Miller, Robert Rodriguez, Quentin Tarantino',
    Writer: 'Frank Miller (graphic novels)',
    Actors: 'Jessica Alba, Devon Aoki, Alexis Bledel, Powers Boothe',
    Plot: "Four tales of crime adapted from Frank Miller's popular comics, focusing around a muscular brute who's looking for the person responsible for the death of his beloved Goldie, a man fed up with Sin City's corrupt law enforcement who takes the law into his own hands after a horrible mistake, a cop who risks his life to protect a girl from a deformed pedophile, and a hitman looking to make a little cash.",
    Language: 'English',
    Country: 'USA',
    Awards: '34 wins & 52 nominations.',
    Poster: 'https://m.media-amazon.com/images/M/MV5BODZmYjMwNzEtNzVhNC00ZTRmLTk2M2UtNzE1MTQ2ZDAxNjc2XkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg',
    Ratings: [
      { Source: 'Internet Movie Database', Value: '8.0/10' },
      { Source: 'Rotten Tomatoes', Value: '77%' },
      { Source: 'Metacritic', Value: '74/100' }
    ],
    Metascore: '74',
    imdbRating: '8.0',
    imdbVotes: '726,752',
    imdbID: 'tt0401792',
    Type: 'movie',
    DVD: '16 Aug 2005',
    BoxOffice: 'N/A',
    Production: 'Dimension Films',
    Website: 'N/A',
    Response: 'True'
  },
  {
    Title: 'The Jungle Book',
    Year: '1967',
    Rated: 'G',
    Released: '18 Oct 1967',
    Runtime: '78 min',
    Genre: 'Animation, Adventure, Family, Musical',
    Director: 'Wolfgang Reitherman, James Algar, Jack Kinney',
    Writer: 'Larry Clemmons (story), Ralph Wright (story), Ken Anderson (story), Vance Gerry (story), Rudyard Kipling (inspired by the Mowgli stories)',
    Actors: 'Phil Harris, Sebastian Cabot, Bruce Reitherman, George Sanders',
    Plot: "Abandoned after an accident, baby Mowgli is taken and raised by a family of wolves. As the boy grows older, the wise panther Bagheera realizes he must be returned to his own kind in the nearby man-village. Baloo the bear however thinks differently taking the young Mowgli under his wing and teaching that living in the jungle is the best life there is. Bagheera realizes that Mowgli is in danger, particularly from Shere Khan the tiger who hates all people. When Baloo finally comes around, Mowgli runs off into the jungle where he survives a second encounter with Kaa the snake and finally, with Shere Khan. It's the sight of a pretty girl however that gets Mowgli to go the nearby man-village.",
    Language: 'English',
    Country: 'USA',
    Awards: 'Nominated for 1 Oscar. Another 4 wins & 3 nominations.',
    Poster: 'https://m.media-amazon.com/images/M/MV5BMjAwMTExODExNl5BMl5BanBnXkFtZTgwMjM2MDgyMTE@._V1_SX300.jpg',
    Ratings: [
      { Source: 'Internet Movie Database', Value: '7.6/10' },
      { Source: 'Rotten Tomatoes', Value: '87%' },
      { Source: 'Metacritic', Value: '65/100' }
    ],
    Metascore: '65',
    imdbRating: '7.6',
    imdbVotes: '157,472',
    imdbID: 'tt0061852',
    Type: 'movie',
    DVD: '11 Feb 2014',
    BoxOffice: 'N/A',
    Production: 'Buena Vista Pictures',
    Website: 'N/A',
    Response: 'True'
  },
  {
    Title: 'Indiana Jones and the Last Crusade',
    Year: '1989',
    Rated: 'PG-13',
    Released: '24 May 1989',
    Runtime: '127 min',
    Genre: 'Action, Adventure',
    Director: 'Steven Spielberg',
    Writer: 'Jeffrey Boam (screenplay), George Lucas (story), Menno Meyjes (story), George Lucas (characters), Philip Kaufman (characters)',
    Actors: 'Harrison Ford, Sean Connery, Denholm Elliott, Alison Doody',
    Plot: 'An art collector appeals to Jones to embark on a search for the Holy Grail. He learns that another archaeologist has disappeared while searching for the precious goblet, and the missing man is his own father, Dr. Henry Jones. The artifact is much harder to find than they expected, and its powers are too much for those impure in heart.',
    Language: 'English, German, Greek, Arabic',
    Country: 'USA',
    Awards: 'Won 1 Oscar. Another 7 wins & 22 nominations.',
    Poster: 'https://m.media-amazon.com/images/M/MV5BMjNkMzc2N2QtNjVlNS00ZTk5LTg0MTgtODY2MDAwNTMwZjBjXkEyXkFqcGdeQXVyNDk3NzU2MTQ@._V1_SX300.jpg',
    Ratings: [
      { Source: 'Internet Movie Database', Value: '8.2/10' },
      { Source: 'Rotten Tomatoes', Value: '88%' },
      { Source: 'Metacritic', Value: '65/100' }
    ],
    Metascore: '65',
    imdbRating: '8.2',
    imdbVotes: '660,318',
    imdbID: 'tt0097576',
    Type: 'movie',
    DVD: '21 Oct 2003',
    BoxOffice: 'N/A',
    Production: 'Paramount Pictures',
    Website: 'N/A',
    Response: 'True'
  }
]

const mergedMovies = [
  {
    description: 'The Imperial Forces, under orders from cruel Darth Vader, hold Princess Leia hostage in their efforts to quell the rebellion against the Galactic Empire. Luke Skywalker and Han Solo, captain of the Millennium Falcon, work together with the companionable droid duo R2-D2 and C-3PO to rescue the beautiful princess, help the Rebel Alliance and restore freedom and justice to the Galaxy.',
    id: 11043689,
    imdbId: 'tt0076759',
    languages: [ 'de', 'en' ],
    originalLanguage: 'en',
    studios: [ 'FOX', 'Paramount' ],
    title: 'Star Wars: Episode IV - A New Hope',
    year: 1977,
    rated: 'PG',
    released: '25 May 1977',
    runtime: 120,
    genre: 'Action, Adventure, Fantasy, Sci-Fi',
    director: [ 'George Lucas' ],
    writer: [ 'George Lucas' ],
    actors: [
      'Mark Hamill',
      'Harrison Ford',
      'Carrie Fisher',
      'Peter Cushing'
    ],
    language: 'English',
    country: 'USA',
    awards: 'Won 6 Oscars. Another 52 wins & 28 nominations.',
    poster: 'https://m.media-amazon.com/images/M/MV5BNzVlY2MwMjktM2E4OS00Y2Y3LWE3ZjctYzhkZGM3YzA1ZWM2XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg',
    ratings: {
      '0': {
        'source': 'Internet Movie Database',
        'value': '8.6/10'
      },
      '1': {
        'source': 'Rotten Tomatoes',
        'value': '92%'
      },
      '2': {
        'source': 'Metacritic',
        'value': '90/100'
      },
      '3': {
        'source': 'Local Data',
        'value': '4.5/5'
      }
    },
    metascore: '90',
    imdbRating: '8.6',
    imdbVotes: '1,175,323',
    type: 'movie',
    dVD: '21 Sep 2004',
    boxOffice: 'N/A',
    production: '20th Century Fox',
    website: 'N/A',
    response: 'True'
  },
  {
    description: "Abandoned after an accident, baby Mowgli is taken and raised by a family of wolves. As the boy grows older, the wise panther Bagheera realizes he must be returned to his own kind in the nearby man-village. Baloo the bear however thinks differently taking the young Mowgli under his wing and teaching that living in the jungle is the best life there is. Bagheera realizes that Mowgli is in danger, particularly from Shere Khan the tiger who hates all people. When Baloo finally comes around, Mowgli runs off into the jungle where he survives a second encounter with Kaa the snake and finally, with Shere Khan. It's the sight of a pretty girl however that gets Mowgli to go the nearby man-village.",
    id: 11528860,
    imdbId: 'tt0061852',
    languages: [ 'de', 'en' ],
    originalLanguage: 'en',
    studios: [ 'Disney' ],
    title: 'The Jungle Book',
    year: 1967,
    rated: 'G',
    released: '18 Oct 1967',
    runtime: 75,
    genre: 'Animation, Adventure, Family, Musical',
    director: [ 'Wolfgang Reitherman', 'James Algar', 'Jack Kinney' ],
    writer: [
      'Larry Clemmons (story)',
      'Ralph Wright (story)',
      'Ken Anderson (story)',
      'Vance Gerry (story)',
      'Rudyard Kipling (inspired by the Mowgli stories)'
    ],
    actors: [
      'Phil Harris',
      'Sebastian Cabot',
      'Bruce Reitherman',
      'George Sanders'
    ],
    language: 'English',
    country: 'USA',
    awards: 'Nominated for 1 Oscar. Another 4 wins & 3 nominations.',
    poster: 'https://m.media-amazon.com/images/M/MV5BMjAwMTExODExNl5BMl5BanBnXkFtZTgwMjM2MDgyMTE@._V1_SX300.jpg',
    ratings: {
      '0': {
        'source': 'Internet Movie Database',
        'value': '7.6/10'
      },
      '1': {
        'source': 'Rotten Tomatoes',
        'value': '87%'
      },
      '2': {
        'source': 'Metacritic',
        'value': '65/100'
      },
      '3': {
        'source': 'Local Data',
        'value': '4.4/5'
      }
    },
    metascore: '65',
    imdbRating: '7.6',
    imdbVotes: '157,472',
    type: 'movie',
    dVD: '11 Feb 2014',
    boxOffice: 'N/A',
    production: 'Buena Vista Pictures',
    website: 'N/A',
    response: 'True'
  },
  {
    description: "Four tales of crime adapted from Frank Miller's popular comics, focusing around a muscular brute who's looking for the person responsible for the death of his beloved Goldie, a man fed up with Sin City's corrupt law enforcement who takes the law into his own hands after a horrible mistake, a cop who risks his life to protect a girl from a deformed pedophile, and a hitman looking to make a little cash.",
    id: 3532674,
    imdbId: 'tt0401792',
    languages: [ 'de', 'en' ],
    originalLanguage: 'en',
    studios: [ 'Studiocanal', 'Paramount' ],
    title: 'Sin City',
    year: 2005,
    rated: 'R',
    released: '01 Apr 2005',
    runtime: 119,
    genre: 'Crime, Thriller',
    director: [ 'Frank Miller', 'Robert Rodriguez', 'Quentin Tarantino' ],
    writer: [ 'Frank Miller (graphic novels)' ],
    actors: [ 'Jessica Alba', 'Devon Aoki', 'Alexis Bledel', 'Powers Boothe' ],
    language: 'English',
    country: 'USA',
    awards: '34 wins & 52 nominations.',
    poster: 'https://m.media-amazon.com/images/M/MV5BODZmYjMwNzEtNzVhNC00ZTRmLTk2M2UtNzE1MTQ2ZDAxNjc2XkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg',
    ratings: {
      '0': {
        'source': 'Internet Movie Database',
        'value': '8.0/10'
      },
      '1': {
        'source': 'Rotten Tomatoes',
        'value': '77%'
      },
      '2': {
        'source': 'Metacritic',
        'value': '74/100'
      },
      '3': {
        'source': 'Local Data',
        'value': '3.9/5'
      }
    },
    metascore: '74',
    imdbRating: '8.0',
    imdbVotes: '726,752',
    type: 'movie',
    dVD: '16 Aug 2005',
    boxOffice: 'N/A',
    production: 'Dimension Films',
    website: 'N/A',
    response: 'True'
  },
  {
    description: 'An art collector appeals to Jones to embark on a search for the Holy Grail. He learns that another archaeologist has disappeared while searching for the precious goblet, and the missing man is his own father, Dr. Henry Jones. The artifact is much harder to find than they expected, and its powers are too much for those impure in heart.',
    id: 5979300,
    imdbId: 'tt0097576',
    languages: [ 'de', 'en' ],
    originalLanguage: 'en',
    studios: [ 'Paramount' ],
    title: 'Indiana Jones and the Last Crusade',
    year: 1989,
    rated: 'PG-13',
    released: '24 May 1989',
    runtime: 127,
    genre: 'Action, Adventure',
    director: [ 'Steven Spielberg' ],
    writer: [
      'Jeffrey Boam (screenplay)',
      'George Lucas (story)',
      'Menno Meyjes (story)',
      'George Lucas (characters)',
      'Philip Kaufman (characters)'
    ],
    actors: [
      'Harrison Ford',
      'Sean Connery',
      'Denholm Elliott',
      'Alison Doody'
    ],
    language: 'English, German, Greek, Arabic',
    country: 'USA',
    awards: 'Won 1 Oscar. Another 7 wins & 22 nominations.',
    poster: 'https://m.media-amazon.com/images/M/MV5BMjNkMzc2N2QtNjVlNS00ZTk5LTg0MTgtODY2MDAwNTMwZjBjXkEyXkFqcGdeQXVyNDk3NzU2MTQ@._V1_SX300.jpg',
    ratings: {
      '0': {
        'source': 'Internet Movie Database',
        'value': '8.2/10'
      },
      '1': {
        'source': 'Rotten Tomatoes',
        'value': '88%'
      },
      '2': {
        'source': 'Metacritic',
        'value': '65/100'
      },
      '3': {
        'source': 'Local Data',
        'value': '4.2/5'
      }
    },
    metascore: '65',
    imdbRating: '8.2',
    imdbVotes: '660,318',
    type: 'movie',
    dVD: '21 Oct 2003',
    boxOffice: 'N/A',
    production: 'Paramount Pictures',
    website: 'N/A',
    response: 'True'
  }
]

module.exports = {
  local,
  omdb,
  mergedMovies,
}

const mergedMoviesYear = [
  {
    description: 'The Imperial Forces, under orders from cruel Darth Vader, hold Princess Leia hostage in their efforts to quell the rebellion against the Galactic Empire. Luke Skywalker and Han Solo, captain of the Millennium Falcon, work together with the companionable droid duo R2-D2 and C-3PO to rescue the beautiful princess, help the Rebel Alliance and restore freedom and justice to the Galaxy.',
    id: 11043689,
    imdbId: 'tt0076759',
    languages: [ 'de', 'en' ],
    originalLanguage: 'en',
    studios: [ 'FOX', 'Paramount' ],
    title: 'Star Wars: Episode IV - A New Hope',
    year: 1977,
    rated: 'PG',
    released: '25 May 1977',
    runtime: 120,
    genre: 'Action, Adventure, Fantasy, Sci-Fi',
    director: [ 'George Lucas' ],
    writer: [ 'George Lucas' ],
    actors: [
      'Mark Hamill',
      'Harrison Ford',
      'Carrie Fisher',
      'Peter Cushing'
    ],
    language: 'English',
    country: 'USA',
    awards: 'Won 6 Oscars. Another 52 wins & 28 nominations.',
    poster: 'https://m.media-amazon.com/images/M/MV5BNzVlY2MwMjktM2E4OS00Y2Y3LWE3ZjctYzhkZGM3YzA1ZWM2XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg',
    ratings: {
      '0': {
        'source': 'Internet Movie Database',
        'value': '8.6/10'
      },
      '1': {
        'source': 'Rotten Tomatoes',
        'value': '92%'
      },
      '2': {
        'source': 'Metacritic',
        'value': '90/100'
      },
      '3': {
        'source': 'Local Data',
        'value': '4.5/5'
      }
    },
    metascore: '90',
    imdbRating: '8.6',
    imdbVotes: '1,175,323',
    type: 'movie',
    dVD: '21 Sep 2004',
    boxOffice: 'N/A',
    production: '20th Century Fox',
    website: 'N/A',
    response: 'True'
  }
]

module.exports = {
  local,
  omdb,
  mergedMovies,
  mergedMoviesYear,
}
