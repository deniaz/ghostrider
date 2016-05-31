let users = require('../collections/users');

function getProfileImage() {
  const imgID = Math.floor(Math.random() * 8);
  return `http://traildevils.ch/assets/img/rider/defprofileimgs/${imgID}.png`;
}

function getHeaderImage() {
  const images = [
    'http://cdn.coresites.factorymedia.com/mpora_new/wp-content/uploads/2014/07/red-bull-rampage-crash.jpg',
    'http://fortwilliamworldcup.co.uk/rare-management/wp-content/uploads/2010/02/16WCDownhill-700x338.gif',
    'http://www.fassa.com/Upload/cms/990_x/Downhill-Belvedere-Fassa.jpg',
    'http://tophdimgs.com/data_images/wallpapers/13/368763-downhill.jpg',
    'http://orig08.deviantart.net/5209/f/2013/164/c/b/downhill_girl_by_d1sord3r-d68u4vm.jpg',
    'http://cdn.shopify.com/s/files/1/0657/7393/products/downhill-mountain-biking-thailand-1-1000.jpg?v=1424444806',
    'http://www.dainese.com/system/resources/post/642/2631_downhill-6.jpg',
    'http://ep1.pinkbike.org/p4pb9800136/p4pb9800136.jpg',
    'http://images.gadmin.st.s3.amazonaws.com/n30441/images/bern/teaser/downhill.jpg',
    'http://www.seonweb.eu/swManager/sw_images/news/1977077_747442305275004_538265418_n_721.jpg',
    'http://www.crankworx.com/wordpress/wp-content/uploads/2016/01/DX3_0488_sm-1120x590.jpg',
    'http://ep1.pinkbike.org/p5pb10815595/p5pb10815595.jpg',
    'https://s-media-cache-ak0.pinimg.com/736x/b3/46/c7/b346c7f1511d62f5a8e8e8bd6ec131ba.jpg',
    'http://www.bikemag.com/files/2010/01/slide5-600x399.jpg',
  ];

  return images[Math.floor(Math.random() * images.length)];
}


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
      images: {
        header: getHeaderImage(),
        profile: getProfileImage(),
      }
    };

    users.push(user);

    res
      .type('application/json')
      .status(200)
      .json({
        access_token: user.auth_token
      });
  }
};