const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const request = require('request');

const apiaryBaseUrl = process.env.APIARY_BASE_URL;
const traildevilsBaseUrl = process.env.TRAILDEVILS_BASE_URL;

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.status(200).send('Ghostrider.');
});

app.set('port', (process.env.PORT || 1337));

app.post('/login', require('./controller/login'));

app.post('/register', require('./controller/register'));

app.get('/destinations', (req, res) => {
  request(`${apiaryBaseUrl}/destinations`, (err, response, body) => {
    res
      .type('application/json')
      .status(200)
      .json(JSON.parse(body));
  });
});

app.get('/shops', (req, res) => {
  request(`${apiaryBaseUrl}/shops`, (err, response, body) => {
    res
      .type('application/json')
      .status(200)
      .json(JSON.parse(body));
  });
});

//app.get('/trails', (req, res) => {
//  request(`${traildevilsBaseUrl}/trails`, (err, response, body) => {
//    res
//      .type('application/json')
//      .status(200)
//      .json(JSON.parse(body));
//  });
//});

app.get('/trails', (req, res) => {
  "use strict";
  res
    .type('application/json')
    .status(200)
    .json([{
      id: "52f8cc5d6d08cf6085c708d22ef16415",
      name: "Bikepark Oberammergau",
      image: null,
      headerImage: null,
      latLng: { lat: 47.5966, lng: 11.049 },
      ratingValue: 4,
      conditionEstimation: 3
    }, {
      id: "2392e4dda4c9cffa041c08d22ef1641b",
      name: "Nordkette Singletrail Innsbruck",
      image: null,
      headerImage: null,
      latLng: { lat: 47.2606, lng: 11.3928 },
      ratingValue: 3.5,
      conditionEstimation: 1
    }, {
      id: "7e821eee4b2fccf19d0708d22ef16426",
      name: "Dättnau",
      image: "http://traildevils.ch/img/vga/3947463b3a85c2bb00e708d22f015658.jpg",
      headerImage: null,
      latLng: { lat: 47.4767, lng: 8.69793 },
      ratingValue: 2,
      conditionEstimation: 0
    }, {
      id: "de1ef457105ec33a580908d22ef1642b",
      name: "Bikepark Degernau",
      image: "http://traildevils.ch/img/vga/432bacbbc41ac65aea6408d22f01740d.jpg",
      headerImage: null,
      latLng: { lat: 47.6672, lng: 8.38858 },
      ratingValue: 4.5,
      conditionEstimation: 2
    }, {
      id: "37c2921b6473c380655408d22ef1642e",
      name: "NT Kronenwiese",
      image: "http://traildevils.ch/img/vga/52c57ead82edcc7447c908d22f0193be.jpg",
      headerImage: null,
      latLng: { lat: 47.3872, lng: 8.53584 },
      ratingValue: 1.5,
      conditionEstimation: 0
    }, {
      id: "99367a3525ccc2520ee208d22ef16432",
      name: "Dirtpark Trzic",
      image: null,
      headerImage: null,
      latLng: { lat: 46.3327, lng: 14.309 },
      ratingValue: 2,
      conditionEstimation: 4
    }, {
      id: "bfc313708f95c81e9eab08d22ef16438",
      name: "Flowpark Gößweinstein",
      image: "http://traildevils.ch/img/vga/3c45187105efc22d5cdb08d22f018bc2.jpg",
      headerImage: null,
      latLng: { lat: 49.7655, lng: 11.3446 },
      ratingValue: 2.5,
      conditionEstimation: 0
    }]);
});

app.post('/trails/rating', (req, res) => {
  request(`${apiaryBaseUrl}/trails/rating`, (err, response, body) => {
    res
      .type('application/json')
      .status(200)
      .json(JSON.parse(body));
  });
});

app.post('/trails/condition', (req, res) => {
  request(`${apiaryBaseUrl}/trails/condition`, (err, response, body) => {
    res
      .type('application/json')
      .status(200)
      .json(JSON.parse(body));
  });
});

app.get('/search', (req, res) => {
  request(`${apiaryBaseUrl}/search`, (err, response, body) => {
    res
      .type('application/json')
      .status(200)
      .json(JSON.parse(body));
  });
});

app.listen(app.get('port'), () => {
  console.log("Let's Ride on Port", app.get('port'));
});
