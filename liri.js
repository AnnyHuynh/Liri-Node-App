require("dotenv").config();
var request = require("request");
var fs = require("fs");
var Spotify = require("node-spotify-api");
var moment = require("moment");
var keys = require("./keys");

var spotify = new Spotify(keys.spotify);

let command = process.argv[2];
// let param = process.argv[3];
var searchItem = "";
var dataLine1;
var dataLine2;
var dataLine3;
var dataLine4;
var dataLine5;
var dataLine6;
var dataLine7;
var dataLine8;

var commandLine = "";

for (i=0; i < process.argv.length; i++){
  commandLine += (process.argv[i]+ " ");
}

for (i=3; i < process.argv.length; i++){
  searchItem += (process.argv[i]+ " ");
}

searchItem = searchItem.trim();

if (command === "concert-this"){
  console.log(`Concert: ${searchItem}`);
  concertThis();
}else if (command === "spotify-this-song"){
  console.log(`Song: ${searchItem}`);
  spotifyThis();
}else if (command === "movie-this"){
  console.log(`Movie: ${searchItem}`);
  movieThis();
}else if (command === "do-what-it-says"){
  console.log(`Let's Do: ${searchItem}`);
  doWhat();
}else{
  console.log("Your searches are not available!");
}

function concertThis(){
  if (!searchItem){
    searchItem = "Rolling Stones"
  }
  request("https://rest.bandsintown.com/artists/" + searchItem + "/events?app_id=codingbootcamp", function (error, response, body){
    // Name of the venue
    // Venue location
    // Date of the Event (use moment to format this as "MM/DD/YYYY")
    var jasonData = JSON.parse(body);
    if (JSON.parse(body)[0] === undefined){
      console.log("No upcoming Shows found.")
    }else{
      dataLine1 = searchItem + " Playing at " + JSON.parse(body)[0].venue.name + ", " + JSON.parse(body)[0].venue.city + ", " + JSON.parse(body)[0].venue.country;
      dataLine2 = moment(JSON.parse(body)[0].datatime).format('MM/DD/YYYY');
      console.log(dataLine1);
      console.log(dataLine2);
      logFile();
    }
    
  }
  )};

  function spotifyThis(){
    if (!searchItem){
      searchItem = "The Sign by Ace of Base"
    }
    // Artist(s)
    // The song's name
    // A preview link of the song from Spotify
    // The album that the song is from
      spotify
      .search({ type: 'track', query: searchItem })
      .then(function(response) {
          var data = response.tracks.items[0];
          console.log(data);
          var showData = [
              "Artist(s): " + data.artists[0].name,
              "Song Name: " + data.name,
              "Link: " + data.external_urls.spotify,
              "Album: " + data.album.name
          ].join("\n\n");
          console.log(showData);
          logFile();
      })
      .catch(function(err) {
        console.log(err);
      });
      }
      
       function movieThis() {
        if(!searchItem){
          searchItem = "Mr. Nobody"
        }
        request("http://www.omdbapi.com/?apikey=2099c0cd&t=" + searchItem, function(error, response, body){
         if(!error && response.statusCode === 200) { 
           dataLine1 = "title: " + JSON.parse(body).Title;
           dataLine2 = "Release Year: "+ JSON.parse(body).Year;
           dataLine3 = "IMDb Rating: "+ JSON.parse(body).imdbRating;
           dataLine4 = "Rotten Tomatoes Rating: "+ JSON.parse(body).Ratings[1].Value;
           dataLine5 = "country: "+ JSON.parse(body).Country;
           dataLine6 = "Language: "+ JSON.parse(body).Language;
           dataLine7 = "Plot: "+ JSON.parse(body).Plot;
           dataLine8 = "Actors: "+ JSON.parse(body).Actors;
           console.log(dataLine1);
           console.log(dataLine2);
           console.log(dataLine3);
           console.log(dataLine4);
           console.log(dataLine5);
           console.log(dataLine6);
           console.log(dataLine7);
           console.log(dataLine8);
          logFile();

           }
         });
        };
      
        function doWhat(){
          fs.readFile("random.txt", "utf8", function(error, data){
            if (error){
              return console.log(error);
            }
            var dataArr = data.split(",");
            command = dataArr[0];
            searchItem = dataArr[1];
            spotifyThis();
          })
        };

        function logFile(){
          fs.appendFile("log.txt", "\r\n" + commandLine + "\r\n" + dataLine1 + "\r\n" + dataLine2 + "\r\n" + dataLine3 + "\r\n" + dataLine4 + "\r\n" + dataLine5 + "\r\n" + dataLine6 + "\r\n" + dataLine7 + "\r\n" + dataLine8, function(error){
            if (error){
              return console.log(error);
            }
          });
        };

    
    
    
      


