let users = require('../collections/users');

module.exports = function register(req, res) {
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
};