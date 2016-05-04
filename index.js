const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const request = require('request');

const apiaryBaseUrl = 'http://private-dcead-traildevils.apiary-mock.com';

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

const trailsMock =   [
  {
    "id": "6c79a0896f66cf05c1b608d22ef16648",
    "name": "Lenzerheide Bikepark",
    "coords": {
      "lat": 46.740483813158,
      "lng": 9.55825174736026
    },
    "types": ["Downhill", "Freeride-Trail", "Dirtjump", "North-Shore", "Jumpline", "Pumptrack"],
    "rating": {
      "starCount": 3.5,
      "voteCount": 18
    },
    "condition": {
      "condition": 1,
      "date": "2016-04-20"
    }
  },
  {
    "id": "722316985449c73c810008d22ef165ed",
    "name": "Gurten Trail",
    "coords": {
      "lat": 46.9195,
      "lng": 7.44052
    },
    "types": ["Freeride-Trail"],
    "rating": {
      "starCount": 3,
      "voteCount": 24
    },
    "condition": {
      "condition": 2,
      "date": "2016-03-20"
    }
  },
  {
    "id": "ff21ac3a692ccac7e57508d296a472f3",
    "name": "Biketicket 2 RIDE schwarz",
    "coords": {
      "lat": 46.7398744226125,
      "lng": 9.55658197402954
    },
    "types": ["Freeride-Trails", "Singletrail", "Freeride-Tour", "All Mountain-Tour"],
    "rating": {
      "starCount": 4,
      "voteCount": 11
    },
    "condition": {
      "condition": 0,
      "date": null
    }
  },
  {
    "id": "8f635d17a3afcb08b06908d3180c54f7",
    "name": "Rothorn - Tiefencastel",
    "coords": {
      "lat": 46.7421619139939,
      "lng": 9.59921836853027
    },
    "types": ["Freeride-Trail", "Singletrail"],
    "rating": {
      "starCount": 2,
      "voteCount": 3
    },
    "condition": {
      "condition": 3,
      "date": "2016-02-20"
    }
  }
];

app.get('/trails', (req, res) => {
  request(`${apiaryBaseUrl}/trails`, (err, response, body) => {
    res
      .type('application/json')
      .status(200)
      .json(trailsMock);
  });
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
