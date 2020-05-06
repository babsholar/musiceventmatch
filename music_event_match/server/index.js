require("dotenv").config();
const express = require("express");
const pino = require("express-pino-logger")();
const axios = require("axios");
const app = express();
const errorType = "ERROR";
const infoType = "INFO";
/**
 * Configures the express application to use pino, an out-of-the-box api logging solution
 *
 * Server log example: 21:05:31 ✨ request completed GET 200 /songkick/metroLocations?city=Louisville 798ms
 */
app.use(pino);

/**
 * Endpoint setup to accept GET requests made to /songkick/metroLocations
 *
 * Returns JSON data on metro locations for the given city.
 */
app.get("/songkick/metroLocations", (req, res) => {
  const MetroIdSearchURL = `https://api.songkick.com/api/3.0/search/locations.json?query=${req.query.city}&apikey=${process.env.REACT_APP_SKK}`;

  log("Requesting metro locations.", infoType, req);

  axios({
    method: "get",
    url: MetroIdSearchURL
  })
    .then(response => {
      // return the list of location data found
      res.send(response.data.resultsPage.results.location);
    })
    .catch(error => {
      log(
        `Failed to retrieve metro locations: ${JSON.stringify(error)}`,
        errorType,
        req
      );
      res.send(
        JSON.stringify({ failed: "Failed to retrieve metro locations." })
      );
    });
});

/**
 * Endpoint setup to accept GET requests made to /songkick/upcomingEvents
 *
 * Returns JSON data on upcoming events for the given metro area by id
 */
app.get("/songkick/upcomingEvents", (req, res) => {
  const UpcomingMetroEventsSearchURL = `https://api.songkick.com/api/3.0/metro_areas/${req.query.metroId}/calendar.json?apikey=${process.env.REACT_APP_SKK}`;

  log("Requesting upcoming events.", infoType, req);

  axios({
    method: "get",
    url: UpcomingMetroEventsSearchURL
  })
    .then(response => {
      // return the list of event data found
      if (response.data.resultsPage.results.event) {
        console.log(response.data.resultsPage.results.event[0].venue);
        res.send(response.data.resultsPage.results.event);
      } else {
        res.send({ empty: "No Upcoming Events, try a different Metro Area!" });
      }
    })
    .catch(error => {
      log(
        `Failed to retrieve upcoming events: ${JSON.stringify(error)}`,
        errorType,
        req
      );
      res.send(
        JSON.stringify({ failed: "Failed to retrieve upcoming events." })
      );
    });
});

/**
 * Endpoint setup to accept GET requests made to /songkick/venueDetails
 *
 * Returns JSON data on venue details for the given venue by id
 */
app.get("/songkick/venueDetails", (req, res) => {
  const VenueDetailsURL = `https://api.songkick.com/api/3.0/venues/${req.query.venueId}.json?apikey=${process.env.REACT_APP_SKK}`;

  log("Requesting venue details.", infoType, req);

  axios({
    method: "get",
    url: VenueDetailsURL
  })
    .then(response => {
      // return the venue data
      console.log(response.data);
      res.send(response.data.resultsPage.results.venue);
    })
    .catch(error => {
      log(
        `Failed to retrieve venue details: ${JSON.stringify(error)}`,
        errorType,
        req
      );
      res.send(JSON.stringify({ failed: "Failed to retrieve venue details." }));
    });
});

/** Configures the express server to run on port 3001 */
app.listen(3001, () =>
  console.log("Express server is running on localhost:3001")
);

/**
 * Generic api logging via pino logger
 */
function log(message, type, req) {
  switch (type) {
    case "INFO":
      req.log.info(message);
      break;
    case "ERROR":
      req.log.error(message);
      break;
    default:
      req.log.console.warn("Invalid log type requested.");
  }
}
