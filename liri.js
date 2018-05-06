require("dotenv").config();

//require npm packages
var Twitter = require("twitter");
var Spotify = require('node-spotify-api');
var dotenv = require("dotenv");
var request = require('request');

//set node variables
var command = process.argv[2];
var selection = process.argv[3];

//evaluate command passed in argv 2 
if (command === 'my-tweets'){
console.log('my tweets');
mytweets();
}else if  (command === 'spotify-this-song'){
    console.log('spotify-this-song');
}else if (command === 'movie-this'){
    console.log('movie-this');
    movie();
}else if (command === 'do-what-it-says'){
    console.log('do what it says');
}else {
    console.log('enter a valid command');
}



// my-tweets
var client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
  });
function mytweets(){
  var params = {screen_name: 'jcw124'};
  client.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (!error) {
      console.log(tweets);
    }
  })
}

//spotify-this-song
function spotify (){
    console.log('this is the spotify function');
    var spotify = new Spotify({
        id: process.env.SPOTIFY_ID,
        secret: process.env.SPOTIFY_SECRET
      });
       
      spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
       
      console.log(data); 
      });
}
// movie-this
function movie(){
    // Request to the OMDB API with the movie specified
request("http://www.omdbapi.com/?t=" + selection + "&y=&plot=short&apikey=trilogy", function(error, response, body) {

    // If the request is successful (i.e. if the response status code is 200)
    if (!error && response.statusCode === 200) {
  
      // Parse the body of the site and recover just the imdbRating
      // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it)
      console.log("Title: " + JSON.parse(body).Title +"\n Year: " + JSON.parse(body).Year + "\n IMDB Rating: " + JSON.parse(body).imdbRating + "\n Rotten Tomato Rating: " + JSON.parse(body).Ratings[1].Value +  "\n Country: " + JSON.parse(body).Country + "\n Language: " + JSON.parse(body).Language + "\n Plot: " + JSON.parse(body).Plot + "\n Actors: "+ JSON.parse(body).Actors);
      console.log("find what you need" + body);
    }
  });
}
//do-what-it-says
function dowhatitsays(){
    console.log('this is the do what it says function');
}