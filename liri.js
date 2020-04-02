//TODO: Need to format log.txt
//TODO: Rotten Tomato rating problems

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
let artistInput;
let songInput;

if (command === "do-what-it-says") {
    random();
} else {
    switchCase();
}

function switchCase() {
    switch (command) {
        case "concert-this":
            if (Array.isArray(param) && param.length) {
                artistInput = String(param);
                artist = param.join("").replace(/['"]+/g, "");
                concertThis();
            } else {
                artist = "tool";
                concertThis();
            }
            break;

        case "spotify-this-song":
            if (Array.isArray(param) && param.length) {
                songInput = String(param);
                song = param.join("").replace(/['"]+/g, "");
                songThis();
            } else {
                song = "thesign";
                songThis();
            }
            break;

        case "movie-this":
            if (Array.isArray(param) && param.length) {
                movieInput = String(param);
                movie = param.join("+").replace(/['"]+/g, "");
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

                output = "Concerts for " + artistInput;
                console.group(output);
                console.info("Venue: " + response.data[i].venue.name );
                console.info("Location: " + response.data[i].venue.city + ", " + response.data[i].venue.region);
                console.info("Date: " + moment(response.data[i].datetime).format("MM/DD/YYYY"));
                console.groupEnd(output);

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
                output = "Song Input " + songInput;
                console.group(output);
                console.info("Artist: " + response.tracks.items[i].artists[0].name);
                console.info("Song name: " + response.tracks.items[i].name);
                console.info("Preview URL:  " + response.tracks.items[i].preview_url);
                console.info("Album the song is on: " + response.tracks.items[i].album.name);
                console.groupEnd(output);

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
            output =  "Movie Title: " + response.data.Title;
            console.group(output);
            console.info("Movie Release Year: " + response.data.Year);
            console.info("IMDB Rating: " + response.data.imdbRating);
            console.info("Movie produced in: " + response.data.Country);
            console.info("Language(s): " + response.data.Language);
            console.info("Movie plot: " + response.data.Plot);
            console.info("Actors: " + response.data.Actors);
            console.groupEnd(output);

            // rating = ", Rotten Tomatoes rating: " + response.data.Ratings[1].Value;

            fs.appendFile("log.txt", ", " + output, function(error) {
                if (error) {
                    return console.log(error);
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
