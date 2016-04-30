let users = require('../collections/users');

module.exports = function login(req, res) {
  const login = req.body;

  let user = users.find(user => {
    return (user.username === login.username || user.email === login.email) && user.password === login.password;
  });

  if (user) {
    let dto = Object.assign({}, user);
    delete dto.password;

    res
      .type('application/json')
      .status(200)
      .json(dto);
  } else {
    res
      .status(404)
      .send('Check your credentials.');
  }
};
