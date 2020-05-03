const express = require("express");
const bodyParser = require("body-parser");
const pino = require("express-pino-logger")();
const axios = require("axios");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(pino);

app.get("/songkick/metroLocations", (req, res) => {
  const MetroIdSearchURL = `https://api.songkick.com/api/3.0/search/locations.json?query=${req.query.city}&apikey=${process.env.REACT_APP_SKK}`;
  console.log(MetroIdSearchURL);
  axios({
    method: "get",
    url: MetroIdSearchURL
  })
    .then(response => {
      // return the list of location data found
      res.send(response.data.resultsPage.results.location);
    })
    .catch(error => {
      res.send(JSON.stringify({ failed: "Sorry no dice" }));
    });
});

app.get("/songkick/upcomingEvents", (req, res) => {
  const UpcomingMetroEventsSearchURL = `https://api.songkick.com/api/3.0/metro_areas/${req.query.metroId}/calendar.json?apikey=${process.env.REACT_APP_SKK}`;

  axios({
    method: "get",
    url: UpcomingMetroEventsSearchURL
  })
    .then(response => {
      // return the list of event data found
      res.send(response.data.resultsPage.results.event);
    })
    .catch(error => {
      res.send(JSON.stringify({ failed: "Sorry no dice" }));
    });
});

app.listen(3001, () =>
  console.log("Express server is running on localhost:3001")
);
