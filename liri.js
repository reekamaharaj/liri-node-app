
//TODO: Need to format log.txt
//TODO: Write code to make this do something with the data it reads

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

let movie = undefined;
let song = undefined;
let artists = undefined;
let output;


switch(command){
    case "concert-this":
            if (param === undefined){
                artists = "tool";
            }
            else {
                
                artists = param.join("");
            }
            concertThis();
        break;
    
    case "spotify-this-song":
            if (param === undefined){
                song = "thesign";
            }
            else {
                song = param.join("");
            }
            songThis();
        break;

    case "movie-this":
            if (param === undefined){
                movie = "Mr.Nobody";
            }
            else {
                movie = param.join("+");
            }
            movieThis();
        break;

        case "do-what-it-says":
            random();
            break;
            //takes the text from inside the random.txt file and uses it to call a LIRI command
}

//Again works for anything entered but not for the case where no input is given
function concertThis(){
    let queryUrlBands = "https://rest.bandsintown.com/artists/" + artists + "/events?app_id=codingbootcamp";

        axios.get(queryUrlBands).then(
            function(response) {
                for(var i=0; i < 4; i++){
                output = "Venue: " + response.data[i].venue.name + ", Location: " + response.data[i].venue.city + ", " + response.data[i].venue.region + ", Date: " + moment(response.data[i].datetime).format("MM/DD/YYYY");
                console.log(output);

                fs.appendFile("log.txt", ", " + output, function(error) {
                    if (error) {
                        return console.log(error);
                    }
                });
            }
            }).catch(function(error) {
                if (error) {
                    console.log(error.config);
                }
            });
            artists = undefined;
}

//works for songs entered but not for the default case. Probably the same problem that is happening for the movie function
function songThis(){
    spotify.search({ type: 'track', query: song}).then(function(response) {
        for(var i=0; i < 4; i++){
            output = "Artist: " + response.tracks.items[i].artists[0].name + " Song name: " + response.tracks.items[i].name + " Preview URL:  " + response.tracks.items[i].preview_url + " Album the song is on: " + response.tracks.items[i].album.name;
            console.log(output);

            fs.appendFile("log.txt", ", " + output, function(error) {
                if (error) {
                    return console.log(error);
                }
            });
        }
    }).catch(function(error) {
        console.log(error);
    });
    song = undefined;
}

//works but not for mr. nobody unless its manually entered without a space. but will accept other movie titles with multiple words. need to figure out what to do with the rotten tomatoes rating. Sometimes works but isn't on every movie, and it stops working. Might need an if loop to handle that. 

function movieThis(){
    let queryUrlOmdb = "http://www.omdbapi.com/?t="+ movie +"&y=&plot=short&apikey=trilogy";
        axios.get(queryUrlOmdb).then(
            function(response) {
                output = "Movie Title: " + response.data.Title + ", Movie Release Year: " + response.data.Year + ", IMDB Rating: " + response.data.imdbRating + ", Movie produced in: " + response.data.Country + "Language(s): " + response.data.Language + ", Movie plot: " + response.data.Plot + ", Actors: " + response.data.Actors;

                // rating = ", Rotten Tomatoes rating: " + response.data.Ratings[1].Value;

                console.log(output);

                fs.appendFile("log.txt", ", " + output, function(err) {
                    if (err) {
                        return console.log(err);
                    }
                });
            }).catch(function(error) {
                if (error) {
                    console.log(error);
                }
            });
        movie = undefined;
}

function random(){
    fs.readFile("random.txt", "utf8", function(error, data){
        if (error) {
            console.error('There was an error reading the file!', err);
            return;
        }
        let randomTxt = data.split(",");
        command = randomTxt[0];
        param = randomTxt[1];
        console.log("Command was " + command + " Input was " + param);
    })
}