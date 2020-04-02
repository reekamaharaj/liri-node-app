//TODO: Need to format log.txt
//TODO: Rotten Tomato rating problem

require("dotenv").config();
const fs = require("fs");
const keys = require("./keys.js");
const moment = require("moment");
const Spotify = require("node-spotify-api");
const spotify = new Spotify(keys.spotify);
const axios = require("axios");

let input = process.argv.slice(2);
let command = input[0];
let param = input.slice(1);

let movie = [];
let song = [];
let artist = [];
let output;

if (command === "do-what-it-says") {
    random();
} else {
    switchCase();
}

function switchCase() {
    switch (command) {
        case "concert-this":
            if (Array.isArray(param) && param.length) {
                artist = param.join("").replace(/['"]+/g, "");
                concertThis();
            } else {
                artist = "tool";
                concertThis();
            }
            break;

        case "spotify-this-song":
            if (Array.isArray(param) && param.length) {
                song = param.join("").replace(/['"]+/g, "");
                songThis();
            } else {
                song = "thesign";
                songThis();
            }
            break;

        case "movie-this":
            if (Array.isArray(param) && param.length) {
                movie = param.join("").replace(/['"]+/g, "");
                movieThis();
            } else {
                movie = "Mr.Nobody";
                movieThis();
            }
            break;
    }
}

function random() {
    fs.readFile("random.txt", "utf8", function(error, data) {
        if (error) {
            console.error("There was an error reading the file!", err);
            return;
        }
        let randomTxt = data.split(",");
        command = randomTxt[0];
        param = randomTxt.slice(1);
        switchCase();
    });
}

function concertThis() {
    let queryUrlBands =
        "https://rest.bandsintown.com/artists/" +
        artist +
        "/events?app_id=codingbootcamp";

    axios
        .get(queryUrlBands)
        .then(function(response) {
            for (var i = 0; i < 4; i++) {
                output = 
                    "Venue: " +
                    response.data[i].venue.name +
                    ", Location: " +
                    response.data[i].venue.city +
                    ", " +
                    response.data[i].venue.region +
                    ", Date: " +
                    moment(response.data[i].datetime).format("MM/DD/YYYY");
                console.log(output);

                fs.appendFile("log.txt", ", " + output, function(error) {
                    if (error) {
                        return console.log(error);
                    }
                });
            }
        })
        .catch(function(error) {
            if (error) {
                console.log(error.config);
            }
        });
    artist = undefined;
}

function songThis() {
    spotify
        .search({ type: "track", query: song })
        .then(function(response) {
            for (var i = 0; i < 4; i++) {
                output =
                    "Artist: " +
                    response.tracks.items[i].artists[0].name +
                    " Song name: " +
                    response.tracks.items[i].name +
                    " Preview URL:  " +
                    response.tracks.items[i].preview_url +
                    " Album the song is on: " +
                    response.tracks.items[i].album.name;
                console.log(output);

                fs.appendFile("log.txt", ", " + output, function(error) {
                    if (error) {
                        return console.log(error);
                    }
                });
            }
        })
        .catch(function(error) {
            console.log(error);
        });
    song = undefined;
}

function movieThis() {
    let queryUrlOmdb =
        "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";
    axios
        .get(queryUrlOmdb)
        .then(function(response) {
            output =
                "Movie Title: " +
                response.data.Title +
                ", Movie Release Year: " +
                response.data.Year +
                ", IMDB Rating: " +
                response.data.imdbRating +
                ", Movie produced in: " +
                response.data.Country +
                "Language(s): " +
                response.data.Language +
                ", Movie plot: " +
                response.data.Plot +
                ", Actors: " +
                response.data.Actors;

            // rating = ", Rotten Tomatoes rating: " + response.data.Ratings[1].Value;

            console.log(output);

            fs.appendFile("log.txt", ", " + output, function(err) {
                if (err) {
                    return console.log(err);
                }
            });
        })
        .catch(function(error) {
            if (error) {
                console.log(error);
            }
        });
    movie = undefined;
}
