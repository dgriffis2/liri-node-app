require("dotenv").config();


var request = require("request");

if (process.argv[2]==="movie-this"){
    // var term = process.argv.slice(3).join(" ")
    var movie = process.argv.slice(3).join(" ")
    
    request("http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=f6a23cb0", function(error, response, body) {
        
        if (!error && response.statusCode === 200) {
            // console.log(JSON.parse(body));
            console.log("Title: " + JSON.parse(body).Title);
            console.log("Year movie came out: " + JSON.parse(body).Year);
            console.log("The movie's IMBD rating is: " + JSON.parse(body).imdbRating);
            console.log("The movie's Rotten Tomatoes score is: " + JSON.parse(body).Ratings[1].Value);
            console.log("Courtry where movie was produced: " + JSON.parse(body).Country);
            console.log("Language of the movie: " + JSON.parse(body).Language);
            console.log("Plot of the movie: " + JSON.parse(body).Plot);
            console.log("Actors in the movie: " + JSON.parse(body).Actors);
        }
    });
}

var Spotify = require('node-spotify-api');
var spotifyKeys=require("./keys")
if (process.argv[2]==="spotify-this-song"){

    var song=process.argv.slice(3).join(" ")
    
    var spotify = new Spotify({
        id: spotifyKeys.spotify.id,
        secret: spotifyKeys.spotify.secret
    });
    // console.log(spotify)
    spotify.search({ type: 'track', query: song,limit:1 }, function(err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        
        console.log("Artist(s): " + data.tracks.items[0].artists[0].name);
        console.log("Song Name: " + data.tracks.items[0].name); 
        console.log("Album Name: " + data.tracks.items[0].album.name);
        console.log("Preview URL: " + data.tracks.items[0].preview_url);
    });
    
}

var Twitter = require('twitter');
var twitterKeys = require("./keys")
if (process.argv[2]==="my-tweets"){

    var screenName = process.argv.slice(3).join(" ")
    var client = new Twitter({
        consumer_key: twitterKeys.twitter.consumer_key,
        consumer_secret: twitterKeys.twitter.consumer_secret,
        access_token_key: twitterKeys.twitter.access_token_key,
        access_token_secret: twitterKeys.twitter.access_token_secret
    });
    
    var params = {screen_name: screenName};
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
            if(tweets.length>19){
                for(var i =0;i<20;i++){
                    console.log("Tweet " + tweets[i].text);
                    console.log("Created " + tweets[i].created_at);
                }
            }else{
                for(var i =0;i<tweets.length;i++){
                    console.log("Tweet " + tweets[i].text);
                    console.log("Created " + tweets[i].created_at);
                }
            }
        }
    });
}