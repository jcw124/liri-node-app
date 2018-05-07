require("dotenv").config();

//require npm packages
var Twitter = require("twitter");
var Spotify = require('node-spotify-api');
var dotenv = require("dotenv");
var request = require('request');
var fs = require('fs');


var keys = require("./keys.js");

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

//set node variables
var command = process.argv[2];
var selection = process.argv[3];

//evaluate command passed in argv 2 
if (command === 'my-tweets'){
mytweets();
}else if  (command === 'spotify-this-song'){
    spotifyThisSong();
}else if (command === 'movie-this'){
    movie();
}else if (command === 'do-what-it-says'){
    console.log('do what it says');
    random();
}else {
    console.log('Please enter a valid command (my-tweets or spotify-this-song or do-what-it-says');
}



//my-tweets
function mytweets(){
	var parameters = {
		count: 20
	};
	client.get('statuses/user_timeline', parameters, function(error, tweets, response){
		if (!error) {
	        for (i=0; i<tweets.length; i++) {
	            var response = ((i+1) + ". " + tweets[i].created_at + ' : ' + tweets[i].text );
	            console.log(response);
                console.log("-------------------------");
                
                fs.appendFile("log.txt", response, function(err) {
    
                    // If the code experiences any errors it will log the error to the console.
                    if (err) {
                      return console.log(err);
                    }
                  
                    
                  });

	        };
	    };
	});
};


//spotify-this-song
function spotifyThisSong(){

if (selection === undefined){
    selection = 'The Sign';
};

spotify.search({ type: 'track', query: selection }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
    else {
        console.log("-------------------------");
        console.log("Artist: " + data.tracks.items[0].artists[0].name);
        console.log("Song: " + data.tracks.items[0].name);
        console.log("Preview Here: " + data.tracks.items[0].preview_url);
        console.log("Album: " + data.tracks.items[0].album.name);
        console.log("-------------------------");

        var writeResponse = {
            Artits: data.tracks.items[0].artists[0].name,
            Song: data.tracks.items[0].name,
            PreviewHere: data.tracks.items[0].preview_url,
            Album: data.tracks.items[0].album.name,
        };

        fs.appendFile("log.txt", JSON.stringify(writeResponse, null, '\t'), function(err) {

            // If the code experiences any errors it will log the error to the console.
            if (err) {
              return console.log(err);
            }
          
            // Otherwise, it will print: "movies.txt was updated!"
            console.log("log.txt was updated!");
          
          });
    };
  });
};


// movie-this
function movie(){
    // Request to the OMDB API with the movie specified
    if (selection === undefined){
        selection = 'Mr. Nobody';
    };

request("http://www.omdbapi.com/?t=" + selection + "&y=&plot=short&apikey=trilogy", function(error, response, body) {

    // If the request is successful (i.e. if the response status code is 200)
    if (!error && response.statusCode === 200) {
  
      // Parse the body of the site and recover just the imdbRating
      // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it)
      console.log("Title: " + JSON.parse(body).Title +"\n Year: " + JSON.parse(body).Year + "\n IMDB Rating: " + JSON.parse(body).imdbRating + "\n Rotten Tomato Rating: " + JSON.parse(body).Ratings[1].Value +  "\n Country: " + JSON.parse(body).Country + "\n Language: " + JSON.parse(body).Language + "\n Plot: " + JSON.parse(body).Plot + "\n Actors: "+ JSON.parse(body).Actors);
    }
  });
}
//do-what-it-says
function random(){
    {
        fs.readFile("random.txt", "utf8", function(error, data){
            if (error) {
                return console.log(error);
              }
              else {
                var dataArr = data.split(",");
              
                getSpotify();
    
    
                function getSpotify(){
    
                    var findSong = dataArr[1];
                
                    spotify.search({ type: 'track', query: findSong }, function(err, data) {
                        if (err) {
                          return console.log('Error occurred: ' + err);
                        }
                        else {
                            console.log("-------------------------");
                            console.log("Artist: " + data.tracks.items[0].artists[0].name);
                            console.log("Song: " + data.tracks.items[0].name);
                            console.log("Preview Here: " + data.tracks.items[0].preview_url);
                            console.log("Album: " + data.tracks.items[0].album.name);
                            console.log("-------------------------");
    
                            var writeResponse = {
                                Artist: data.tracks.items[0].artists[0].name,
                                Song: data.tracks.items[0].name,
                                preview: data.tracks.items[0].preview_url,
                                Album:data.tracks.items[0].album.name,
                            };
    
                            fs.appendFile("log.txt", JSON.stringify(writeResponse, null, '\t'), function(err) {
    
                                // If the code experiences any errors it will log the error to the console.
                                if (err) {
                                  return console.log(err);
                                }
                              
                                // Otherwise, it will print: "movies.txt was updated!"
                                console.log("log.txt was updated!");
                              
                              });
                        };
                      });
                };
    
              }
        });
        
    };
}