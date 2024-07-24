import express from "express";
import bodyParser from "body-parser";
import querystring from "querystring";
import dotenv from 'dotenv/config'
import axios from 'axios'
//import SpotifyApi from 'spotify-web-api-node';

const app = express();
const port = 3000;

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

let song = [];
let url = [];


 /* try {
    const response = await axios.request(options);
    console.log(response);
   var song = [(response.data.hits[0].result.full_title),(response.data.hits[1].result.full_title), (response.data.hits[2].result.full_title)];
    var url = [(response.data.hits[0].result.url),(response.data.hits[1].result.url), (response.data.hits[2].result.url)];
    //console.log(data);

    res.render("index.ejs", { name: song, link:url }); }
  /* catch (error) {
    console.error(error);
  } */
  
  

  app.post("/submit", async (req, res) => {
    const options = {
      method: 'GET',
      url: 'https://genius-song-lyrics1.p.rapidapi.com/search/',
      params: {
        q: req.body.lyric,
        per_page: '3',
        page: '1'
      },
      headers: {
        'x-rapidapi-key': process.env.KEY,
        'x-rapidapi-host': 'genius-song-lyrics1.p.rapidapi.com'
      }
    };
    try {
      const response = await axios.request(options);
      var song = response.data.hits[0].result.full_title;
      var url = response.data.hits[0].result.url;
      //console.log(song);
     // console.log(url)
      res.render("index.ejs",{ name: song, link:url });
    } catch (error) {
      res.render("index.ejs");
    }
  });



app.get("/",(req, res) => {
    res.render("index.ejs");
})





app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });