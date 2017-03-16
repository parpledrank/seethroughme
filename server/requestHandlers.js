const watson = require('watson-developer-cloud');
const axios = require('axios');
const utility = require('./utility.js');
const { API_KEY_TRANSLATE, API_KEY_VR } = require('./config.js');

const vrHandler = function(req, res, next) {
  console.log("/upload being called");
  const imgURL = req.body.url;
  // check if the imgURL is empty or valid url
  if (!imgURL || !utility.isValidUrl(imgURL)) {
    console.log("client didn't provide image url or url is not valid");
    res.send("no-url");
    return;
  }
  const visual_recognition = watson.visual_recognition({
    api_key: API_KEY_VR,
    version: 'v3',
    version_date: '2016-05-20'
  });
  const params = {
    url: imgURL
  };

  visual_recognition.classify(params, function (err, results) {
    if (err) {
      console.log(err);
    } else {
      console.log(results.images[0].classifiers[0].classes);
      const keywords = results.images[0].classifiers[0].classes;
      res.send(keywords);
      next();
    }
  })
}

const translateHandler = (req, res) => {
  //JSO's notes to translateAPI
  //on client side, req should be sent as an object with the following properties:
  //keyword (word to be translate), source (source language) and target (target language);
  let { keywords, source, target } = req.body;

  console.log('keywords are: ', keywords);
  console.log('source is: ', source);
  console.log('target is: ', target);

  //https://translation.googleapis.com/language/translate/v2?key=AIzaSyBEb2nG4J6FMbY-3cmXBWL9nCGWp-fsx78&source=en&target=de&q=Hello%20world&q=My%20name%20is%20Jeff&q=dog
  //will need some function to transform source and target to values the api will accept (i.e. english should be 'en')

  let url = `https://translation.googleapis.com/language/translate/v2?key=${API_KEY_TRANSLATE}&source=${source}&target=${target}`;

  keywords.forEach((k) => {
    let query = k.split(' ').join('%20');
    url += `&q=${query}`
  })

  axios.get(url).then((results) => {
    res.send(results.data);
  });

  // axios.get(url).then((results) => {
  //   res.send(results);
  // })

  // res.send(url);
}

const rerouteHandler = (req, res) => {
  res.redirect('/');
}

module.exports = {
    vrHandler: vrHandler,
    translateHandler: translateHandler,
    rerouteHandler: rerouteHandler
}




