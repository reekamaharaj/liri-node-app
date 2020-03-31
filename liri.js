// require("dotenv").config();
// const keys = require("./keys.js");
// const spotify = new Spotify(keys.spotify);

let input = process.argv;

let command = input[2];
let param = input[3];
let song;
let movie;

let output;

switch(command){
    case "concert-this":
        output = "https://rest.bandsintown.com/artists/" + param + "/events?app_id=codingbootcamp";
        break;
        /*
            - name of the venue
            - venue location
            - date of the event, using moment mm/dd/yyyy format
        */
    
    case "spotify-this-song":
        param = song;
        output = "song info";
        break;
        /*
            - artist(s)
            - The song's name
            - A preview link of the song from Spotify
            - The album that the song is from 
            - if no song is provided then your program will default to "The Sign" by Ace of Base
            Using node-spotify-api to get the information from spotify
        */

    case "movie-this":
        param = movie;
        output = "movie info";
        break;
        /*
            -- Title of the movie.
            --- Year the movie came out.
            --- IMDB Rating of the movie.
            --- Rotten Tomatoes Rating of the movie.
            --- Country where the movie was produced.
            --- Language of the movie.
            --- Plot of the movie.
            --- Actors in the movie.

            default option -> 'Mr. Nobody.'
                using the axios package to get the OMDB API data
                api key -> trilogy
        */

        case "do-what-it-says":
            output = "do what it says";
            break;
            //takes the text from inside the random.txt file and uses it to call a LIRI command
}

console.log(output);

/* 

log data to log.txt
append commands to log.txt, don't over write the files

*/

