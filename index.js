const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const request = require('request');

const apiaryBaseUrl = process.env.APIARY_BASE_URL;
const traildevilsBaseUrl = process.env.TRAILDEVILS_BASE_URL;

const trails = require('./data/trails.json');
const shops  = require('./data/shops.json');

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
  shops.forEach(shop => shop.ratingValue = Math.floor(Math.random() * 4) + 1);

  if (req.query.q && req.query.q.length > 0) {
    res
      .type('application/json')
      .status(200)
      .json(shops.filter(
        el => el.name
          .toLowerCase()
          .includes(req.query.q.toLowerCase())
      ));
  } else {
    res
      .type('application/json')
      .status(200)
      .json(shops);
  }
});

app.get('/shops/:id', (req, res) => {
  const shop = shops.find(el => el.id === req.params.id);

  if (shop) {
    shop.openingTimes = 'Mo - Fr: 8.00 - 17.00\nSa: 10.00 - 14.00';
    shop.website = 'http://example.com';
    shop.phone = '+41 23 456 78 90';
    shop.addres = 'Example Road 42\n8000 Zürich';
    shop.ratingValue = Math.floor(Math.random() * 4) + 1;
    shop.recommendations = 42;

    res
      .type('application/json')
      .status(200)
      .json(shop);

  } else {
    res
      .type('application/json')
      .status(404)
      .send();
  }
});

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

app.get('/trails/:id', (req, res) => {
  const trail = trails.find(el => el.id === req.params.id);

  if (trail) {
    trail.description = 'Der Begriff Singletrail steht für einen Pfad, der so schmal ist, dass man dort nicht nebeneinander fahren oder laufen kann. Zunächst fand er Verwendung im Bereich des Mountainbike-Sports, in letzter Zeit wird er ebenfalls im Bereich des Trailrunning verwendet. In der Regel sind Singletrails etwa 30 bis 60 cm breit.';
    trail.facts = {
      distance: '20km',
      altitudeUp: '1800hm',
      altitudeDown: '220hm',
      timeInMinutes: 150,
      difficulty: 2,
    };

    trail.types = [{
      id: 'a1b2c3d4e5',
      name: 'Downhill'
    }, {
      id: 'f6g7h8i9j1',
      name: 'Freeride',
    }];

    res
      .type('application/json')
      .status(200)
      .json(trail);
  } else {
    res
      .type('application/json')
      .status(404)
      .send();
  }
});

app.get('/tracks', (req, res) => {
  res
    .type('application/json')
    .status(200)
    .json(require('./data/tracks.json'));
})

app.post('/trails/rating', (req, res) => {
  res
    .type('application/json')
    .status(200)
    .json({
      rating: req.body.rating,
    });
});

app.post('/trails/condition', (req, res) => {
  res
    .type('application/json')
    .status(200)
    .json({
      condition: req.body.condition,
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
