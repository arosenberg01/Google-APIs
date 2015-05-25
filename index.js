var fs = require('fs');
var qs = require('querystring');
var request = require('request');
var moment = require('moment');
var Promise = require('bluebird');
var keys = require('./config.js');

var hrAddress ='944 Market Street #8, San Francisco, CA 94102';
var twentyFour = '45 Montgomery Street, San Francisco, CA 94101';
var arrivalTime = parseInt((moment().add(1, 'hour').valueOf()) / 1000);
var googleDirectionsEndPoint = 'https://maps.googleapis.com/maps/api/directions/json';

var travelModes = {
  driving: 'driving',
  walking: 'walking',
  bicycling: 'bicycling',
  transit: 'transit'
};

var googleDirectionsRequest = googleDirectionsEndPoint + '?' + qs.stringify({
    origin: hrAddress,
    destination: twentyFour,
    key: keys.directionsApi,
    mode: 'walking',
    arrival_time: arrivalTime
  });


request(googleDirectionsRequest, function (error, response, body) {
  if (error){
    console.log('ERROR:', error)
  } else if (!error && response.statusCode == 200) {

    var routes = JSON.parse(body).routes[0];
 
    console.log(routes.legs[0]);
    // routes.legs[0].steps.forEach(function(step) {
    //   console.log('\n***********************************\n')
    //   console.log(step);
    // });

    // console.log(routes)




    fs.writeFile('file.js', body, function(err) {
      if(error) console.log(error);
      else {

        console.log('The file was saved!');
      }
    });
  } else {
    console.log('Unexpected status code:', response.statusCode);
  }
});
