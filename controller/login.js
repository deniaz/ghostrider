let users = require('../collections/users');

module.exports = function login(req, res) {
  const login = req.body;

  let user = users.find(user => {
    return (user.username === login.username || user.email === login.email) && user.password === login.password;
  });

  if (user) {
    res
      .type('application/json')
      .status(200)
      .json({
        accessToken: user.auth_token
      });
  } else {
    res
      .status(404)
      .send('Check your credentials.');
  }
};
