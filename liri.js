require("dotenv").config();
const fs = require("fs");
const keys = require("./keys.js");
const moment = require("moment");
const Spotify = require("node-spotify-api");
const spotify = new Spotify(keys.spotify);

const axios = require("axios");

let input = process.argv;
let command = input[2];
let param = input[3];
let movie = "Mr. Nobody";
let song = "The Sign";
let output;

//TODO: Need to parse through all the responses to show multiple show dates
switch(command){
    case "concert-this":
        let queryUrlBands = "https://rest.bandsintown.com/artists/" + param + "/events?app_id=codingbootcamp";

        axios.get(queryUrlBands).then(
            function(response) {
                for(var i=0; i < 5; i++){
                output = "Venue: " + response.data[i].venue.name + ", Location: " + response.data[i].venue.city + ", " + response.data[i].venue.region + ", Date: " + moment(response.data[i].datetime).format("MM/DD/YYYY");
                console.log(output);

                fs.appendFile("log.txt", ", " + output, function(err) {
                    if (err) {
                        return console.log(err);
                    }
                });
            }

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

        break;
    
    case "spotify-this-song":
        song = param;
        spotify.search({ type: 'track', query: song}).then(function(response) {

            for(var i=0; i < 5; i++){

                output = "Artist: " + response.tracks.items[i].artists[0].name + " Song name: " + response.tracks.items[i].name + " Preview URL:  " + response.tracks.items[i].preview_url + " Album the song is on: " + response.tracks.items[i].album.name;
                console.log(output);

                fs.appendFile("log.txt", ", " + output, function(err) {
                    if (err) {
                        return console.log(err);
                    }
                });

            }
            

        }).catch(function(err) {
            console.log(err);
        });
        break;

    case "movie-this":
        movie = param;
        let queryUrlOmdb = "http://www.omdbapi.com/?t="+ movie +"&y=&plot=short&apikey=trilogy";
        
        axios.get(queryUrlOmdb).then(
            function(response) {
                output = "Movie Title: " + response.data.Title + ", Movie Release Year: " + response.data.Year + ", IMDB Rating: " + response.data.imdbRating + ", Rotten Tomatoes rating: " + response.data.Ratings[1].Value + ", Movie produced in: " + response.data.Country + "Language(s): " + response.data.Language + ", Movie plot: " + response.data.Plot + ", Actors: " + response.data.Actors;
                console.log(output);

                fs.appendFile("log.txt", ", " + output, function(err) {
                    if (err) {
                        return console.log(err);
                    }
                });
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
            fs.readFile("random.txt", "utf8", function(err, data){
                let random = data.split(",");
                // command = data[0];
                song = data[1]
                //run the spotify search
                spotify.search({ type: 'track', query: song}).then(function(response) {

                    for(var i=0; i < 5; i++){
        
                        output = "Artist: " + response.tracks.items[i].artists[0].name + " Song name: " + response.tracks.items[i].name + " Preview URL:  " + response.tracks.items[i].preview_url + " Album the song is on: " + response.tracks.items[i].album.name;
                        console.log(output);
        
                        fs.appendFile("log.txt", ", " + output, function(err) {
                            if (err) {
                                return console.log(err);
                            }
                        });
        
                    }
                    
        
                }).catch(function(err) {
                    console.log(err);
                });
                if (err) {
                    return console.log(err);
                }
            })
            break;
            //takes the text from inside the random.txt file and uses it to call a LIRI command
}

//TODO: Need to set the default song and movie if nothing is given
//append log.txt to contain what was in the output
//TODO: Need to get the formated in log.txt
// fs.appendFile("log.txt", ", " + output, function(err) {
//     if (err) {
//         return console.log(err);
//     }
// });

//read files will read what is in random.txt
//TODO: Write code to make this do something with the data it reads
