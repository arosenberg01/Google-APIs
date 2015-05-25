var fs = require('fs');
var qs = require('querystring');
var moment = require('moment');
var Promise = require('bluebird');
var request = Promise.promisify(require('request'));
var async = require('async');
var keys = require('./config.js');

var hrAddress ='944 Market Street #8, San Francisco, CA 94102';
var twentyFour = '45 Montgomery Street, San Francisco, CA 94101';
var arrivalTime = parseInt((moment().add(1, 'hour').valueOf()) / 1000);
var googleDirectionsEndPoint = 'https://maps.googleapis.com/maps/api/directions/json';

/**
 * Possible travel modes for Google Directions API
 */
var travelModes = {
  driving: 'driving',
  walking: 'walking',
  bicycling: 'bicycling',
  transit: 'transit'
};

/**
 * Returns Google Directions API url parameters object to be passed to qs.stringify
 * The arrival or departure time options (you can only choose one per call) are
 * optionally available only for the 'transit' travel mode
 */
var GoogleDirectionsUrl = function(origin, destination, travelMode, arrivalTime, departureTime) {
  var urlParams = {};

  urlParams.key =  keys.directionsApi;
  urlParams.origin = origin;
  urlParams.destination = destination;
  urlParams.mode = travelMode;

  if  (arrivalTime) {
    urlParams.arrival_time = arrivalTime; 
  } else if (departureTime) {
    urlParams.departure_time = departureTime
  }

  this.url = googleDirectionsEndPoint + '?' +
    qs.stringify(urlParams);
};



var getAllRoutes = function(origin, destination, arrivalTime, departureTime) {
  var googleDirectionsApiRequests = [];

  for (var mode in travelModes) {
    var requestUrl = new GoogleDirectionsUrl(origin, destination, travelModes[mode], arrivalTime, departureTime);
    googleDirectionsApiRequests.push(requestUrl)
  }

  console.log(googleDirectionsApiRequests);

  // async.parallel(googleDirectionsApiRequests, functions())
};

getAllRoutes(hrAddress, twentyFour, arrivalTime);

// request(googleDirectionsUrl).spread(function(response, body) {

//     var routes = JSON.parse(body).routes[0];

//     console.log(routes);

//     // routes.legs[0].steps.forEach(function(step) {
//     //     //   console.log('\n***********************************\n')
//     //     //   console.log(step);
//     //     // });
// }).catch(function(err) {
//     console.error(err);
// });

