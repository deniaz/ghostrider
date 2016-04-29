const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const apiaryBaseUrl = 'http://private-dcead-traildevils.apiary-mock.com';

let users = require('./collections/users');

app.use(bodyParser.json());

app.post('/login', (req, res) => {
    const login = req.body;

    let user = users.find(user => {
        return (user.username === login.username || user.email === login.email) && user.password === login.password;
    });

    if (user) {
        res
            .type('application/json')
            .status(200)
            .json({
                auth_token: user.auth_token,
            });
    } else {
        res
            .status(404)
            .send('Check your credentials.');
    }
});

app.post('/register', (req, res) => {
    const register = req.body;

    let errors = [];
    if (!register.email) {
        errors.push('email');
    }

    if (!register.username) {
        errors.push('username');
    }

    if (!register.password) {
        errors.push('password');
    }

    if (!register.terms) {
        errors.push('terms');
    }

    if (errors.length > 0) {
        res
            .status(400)
            .send('Please fill out the following fields: ' + errors.join(', '));
    } else {
        const user = {
            email: register.email,
            username: register.username,
            password: register.password,
            auth_token: Math.random().toString(36).substring(7),
        };

        users.push(user);

        res
            .type('application/json')
            .status(200)
            .json({
                auth_token: user.auth_token,
            });
    }
});

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

app.listen(1337, () => {
    console.log("Let's Ride!");
});