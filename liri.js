// require("dotenv").config();
const fs = require("fs");
// const keys = require("./keys.js");
// const spotify = new Spotify(keys.spotify);
const axios = require("axios");

let input = process.argv;

let command = input[2];
let param = input[3];
let movie = "Mr. Nobody";


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

        axios.get("http://www.omdbapi.com/?t="+  movie +"&y=&plot=short&apikey=trilogy").then(
            function(response) {
                output = "Movie Title: " + response.data.Title + ", Movie Release Year: " + response.data.Year + ", IMDB Rating: " + response.data.imdbRating + ", Rotten Tomatoes rating: " + response.data.Ratings[1] + ", Movie produced in: " + response.data.Country + "Language(s): " + response.data.Language + ", Movie plot: " + response.data.Plot + ", Actors: " + response.data.Actors
            }
        )
        movie = "Mr. Nobody";

        break;

        case "do-what-it-says":
            output = "do what it says";
            break;
            //takes the text from inside the random.txt file and uses it to call a LIRI command
}

console.log(output);

//append log.txt to contain what was in the output
TODO: Need to get the formated in log.txt
fs.appendFile("log.txt", ", " output, function(err) {
    if (err) {
        return console.log(err);
    }
});

//read files will read what is in random.txt
TODO: Write code to make this do something with the data it reads
fs.readFile("random.txt", "utf8", function(err, data){
    if (err) {
        return console.log(err);
    }
})