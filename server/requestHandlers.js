const watson = require('watson-developer-cloud');
const axios = require('axios');
const { API_KEY_TRANSLATE, API_KEY_VR } = require('./config.js');

const vrHandler = function(req, res, next) {
  console.log("/upload being called");
  const imgURL = req.body.url;
  if (!imgURL) {
    console.log("client didn't provide image url");
    res.send("no-url");
    return;
  }
  const visual_recognition = watson.visual_recognition({
    api_key: API_KEY_VR,
    version: 'v3',
    version_date: '2016-05-20'
  });
  const params = {
    url: "http://www.planwallpaper.com/static/images/desktop-year-of-the-tiger-images-wallpaper.jpg"
  };

  visual_recognition.classify(params, function (err, res) {
    if (err) {
      console.log(err);
    } else {
      console.log(JSON.stringify(res, null, 2));
      const result = res.images[0].classifiers[0].classes;
      res.send(result);
      next();
    }
  })
}

const translateHandler = (req, res) => {
  //JSO's notes to translateAPI
  //on client side, req should be sent as an object with the following properties:
  //keyword (word to be translate), source (source language) and target (target language);
  let { keyword, source, target } = req.body;

  //will need some function to transform source and target to values the api will accept (i.e. english should be 'en')

  let query = keyword.split(' ').join('%20');
  const url = `https://translation.googleapis.com/language/translate/v2?key=${API_KEY_TRANSLATE}&source=${source}&target=${target}&q=${query}`;

  axios.get(url).then((results) => {
    res.send(results);
  })
}

module.exports = {
    vrHandler: vrHandler,
    translateHandler: translateHandler
}




