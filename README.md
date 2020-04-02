# Liri Node App (Language Interpretation and Recognition Interface)
LIRI is a command line node app created to accept a search command and parameter, LIRI will search the Bands in Town, OMDB and Spotify APIs based on the command and parameter provided and return some basic information back in the console. The information will also be logged in the log.txt file.

## Description
LIRI has three search possibilities:
- concerts by artist
- song by track name
- movie by movie name

LIRI also has a random search option if the user wants some random information.

## How to use
Since LIRI is a command line app, all interaction with it takes place in the terminal. 

The user can use one of the four commands listed below:
- `node liri.js concert-this <artist/band name here>`
- `node liri.js movie-this <movie name here>`
- `node liri.js spotify-this-song <song name here>`
- `node liri.js do-what-it-says`

The first three commands need a search parameter. If a search parameter is not entered, LIRI will generate the default search parameters that are hard coded. The last command does not take a search parameter, LIRI will use the information in the random.txt file to run the search. 

## Features
- console methods were used to aid data readability in the console and text files.

## Tech used
- Visual Studios
- JavaScript
- Node.js
- [Axios](https://www.npmjs.com/package/axios)
- [Moment](https://www.npmjs.com/package/moment)
- [DotEnv](https://www.npmjs.com/package/dotenv)

## APIs used

- [Node-Spotify-API](https://www.npmjs.com/package/node-spotify-api)
- [OMDB API](http://www.omdbapi.com)
- [Bands In Town API](http://www.artists.bandsintown.com/bandsintown-api)

## Screenshots/Demo

## Role in App Development
Coded the app from scratch. 

2. Give a high-level overview of how the app is organized
3. Give start-to-finish instructions on how to run the app
4. Include screenshots, gifs or videos of the app functioning
5. Contain a link to a deployed version of the app


