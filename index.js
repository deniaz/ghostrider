const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const apiaryBaseUrl = 'http://private-dcead-traildevils.apiary-mock.com';

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.status(200).send('Ghostrider.');
});

app.set('port', (process.env.PORT || 1337));

app.post('/login', require('./controller/login'));

app.post('/register', require('./controller/register'));

app.get('/shops', (req, res) => {
  res.redirect(302, `${apiaryBaseUrl}/shops`);
});

app.get('/trails', (req, res) => {
  res.redirect(302, `${apiaryBaseUrl}/shops`);
});

app.post('/trails/rating', (req, res) => {
  res.redirect(302, `${apiaryBaseUrl}/shops`);
});

app.post('/trails/condition', (req, res) => {
  res.redirect(302, `${apiaryBaseUrl}/shops`);
});

app.get('/search', (req, res) => {
  res.redirect(302, `${apiaryBaseUrl}/search`);
});

app.listen(app.get('port'), () => {
  console.log("Let's Ride on Port", app.get('port'));
});
