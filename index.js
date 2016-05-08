const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const request = require('request');

const apiaryBaseUrl = process.env.APIARY_BASE_URL;
const traildevilsBaseUrl = process.env.TRAILDEVILS_BASE_URL;

const trails = require('./data/trails.json');

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.status(200).send('Ghostrider.');
});

app.set('port', (process.env.PORT || 1337));

app.post('/login', require('./controller/login'));

app.post('/register', require('./controller/register'));

app.get('/destinations', (req, res) => {
  request(`${traildevilsBaseUrl}/destinations`, (err, response, body) => {
    if (req.query.q && req.query.q.length > 0) {
      res
        .type('application/json')
        .status(200)
        .json(JSON.parse(body).filter(
          el => el.name
            .toLowerCase()
            .includes(req.query.q.toLowerCase())
        ));
    } else {
      res
        .type('application/json')
        .status(200)
        .json(JSON.parse(body));
    }
  });
});

app.get('/shops', (req, res) => {
  request(`${traildevilsBaseUrl}/dealers`, (err, response, body) => {
    if (req.query.q && req.query.q.length > 0) {
      res
        .type('application/json')
        .status(200)
        .json(JSON.parse(body).filter(
          el => el.name
            .toLowerCase()
            .includes(req.query.q.toLowerCase())
        ));
    } else {
      res
        .type('application/json')
        .status(200)
        .json(JSON.parse(body));
    }
  });
});

//app.get('/trails', (req, res) => {
//  request(`${apiaryBaseUrl}/trails`, (err, response, body) => {
//    res
//      .type('application/json')
//      .status(200)
//      .json(JSON.parse(body));
//  });
//});

app.get('/trails', (req, res) => {
  if (req.query.q && req.query.q.length > 0) {
    res
      .type('application/json')
      .status(200)
      .json(trails.filter(
        el => el.name
          .toLowerCase()
          .includes(req.query.q.toLowerCase())
      ));
  } else {
    res
      .type('application/json')
      .status(200)
      .json(trails);
  }
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
