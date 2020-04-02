# Liri Node App (Language Interpretation and Recognition Interface)

LIRI is a command line nodeJS app created to accept a search command and parameter and will return relevant data.

## Description

LIRI will search the Bands in Town, OMDB and Spotify APIs based on the command and parameter provided and return some basic information back in the console. The information will also be logged in the log.txt file.

LIRI will accept the following commands
* concert-this
* movie-this
* spotify-this-song
* do-what-it-says

**'concert-this <artist/band name here>`**
This will search the Bands in Town API and return 4 concerts for the artist/band entered. 

    Each item will include the following information:
    - Artist/band requested
    - Name of the venue
    - City and region of the concert
    - The date of the concert

**`spotify-this-song <song name here>`**
    This will search the Spotify API and return 4 results for the song name entered.

Each item will include the following information: 

**`movie-this <movie name here>`**
This will search the OMDB API and return data on the movie entered.

The results will include the following information:
- 



**`do-what-it-says`**

---
## How to use

Since LIRI is a command line app, all interaction with it takes place in the terminal.

The user can use one of the four commands listed below:

-   `node liri.js concert-this <artist/band name here>`
-   `node liri.js movie-this <movie name here>`
-   `node liri.js spotify-this-song <song name here>`
-   `node liri.js do-what-it-says`

The first three commands need a search parameter. If a search parameter is not entered, LIRI will generate the default search parameters that are hard coded. The last command does not take a search parameter, LIRI will use the information in the random.txt file to run the search.
---
## Features

-   console methods were used to aid data readability in the console and text files.

## Tech used

-   Visual Studios
-   JavaScript
-   Node.js
-   [Axios](https://www.npmjs.com/package/axios)
-   [Moment](https://www.npmjs.com/package/moment)
-   [DotEnv](https://www.npmjs.com/package/dotenv)

## APIs used

-   [Node-Spotify-API](https://www.npmjs.com/package/node-spotify-api)
-   [OMDB API](http://www.omdbapi.com)
-   [Bands In Town API](http://www.artists.bandsintown.com/bandsintown-api)

---
## Screenshots/Demo

## Role in App Development

Coded the app from scratch.






---
Delete this later
2. Give a high-level overview of how the app is organized
3. Give start-to-finish instructions on how to run the app
4. Include screenshots, gifs or videos of the app functioning
5. Contain a link to a deployed version of the app
