require("dotenv").config();
const fs = require("fs");
const keys = require("./keys.js");
// const spotify = new Spotify(keys.spotify);
const axios = require("axios");
const bandsintown = require('bandsintown')("codingbootcamp");
let input = process.argv;

let command = input[2];
let param = input[3];
let movie = "Mr. Nobody";


let output;

switch(command){
    case "concert-this":
        queryUrl = "https://rest.bandsintown.com/artists/" + param + "/events?app_id=codingbootcamp";

       
        break;
        /*
            - name of the venue
            - venue location
            - date of the event, using moment mm/dd/yyyy format
        */
    
    case "spotify-this-song":

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
        movie = param;
        let queryUrl = "http://www.omdbapi.com/?t="+ movie +"&y=&plot=short&apikey=trilogy";
        
        axios.get(queryUrl).then(
            function(response) {
                output = "Movie Title: " + response.data.Title + ", Movie Release Year: " + response.data.Year + ", IMDB Rating: " + response.data.imdbRating + ", Rotten Tomatoes rating: " + response.data.Ratings[1].Value + ", Movie produced in: " + response.data.Country + "Language(s): " + response.data.Language + ", Movie plot: " + response.data.Plot + ", Actors: " + response.data.Actors;
                console.log(output);
            }).catch(function(error) {
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    console.log("---------------Data---------------");
                    console.log(error.response.data);
                    console.log("---------------Status---------------");
                    console.log(error.response.status);
                    console.log("---------------Status---------------");
                    console.log(error.response.headers);
                } else if (error.request) {
                    // The request was made but no response was received
                    // `error.request` is an object that comes back with details pertaining to the error that occurred.
                    console.log(error.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log("Error", error.message);
                }
                console.log(error.config);
            });
        movie = "Mr. Nobody";
        break;

        case "do-what-it-says":
            output = "do what it says";
            break;
            //takes the text from inside the random.txt file and uses it to call a LIRI command
}

console.log(output);

//append log.txt to contain what was in the output
//TODO: Need to get the formated in log.txt
fs.appendFile("log.txt", ", " + output, function(err) {
    if (err) {
        return console.log(err);
    }
});

//read files will read what is in random.txt
//TODO: Write code to make this do something with the data it reads
fs.readFile("random.txt", "utf8", function(err, data){
    if (err) {
        return console.log(err);
    }
})