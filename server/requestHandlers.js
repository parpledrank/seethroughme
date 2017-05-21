let watson = require('watson-developer-cloud');
let axios = require('axios');
let utility = require('./utility.js');
let { API_KEY_TRANSLATE, API_KEY_VR, IMGUR_API_CLIENT } = require('./config.js');
let path = require('path');
let fs = require('fs');

let vrHandler = function(req, res, next) {
  console.log("/upload being called");
  let imgURL = req.body.url;
  // check if the imgURL is empty or valid url
  if (!imgURL || !utility.isValidUrl(imgURL)) {
    console.log("client didn't provide image url or url is not valid");
    res.send("no-url");
    return;
  }
  let visual_recognition = watson.visual_recognition({
    api_key: API_KEY_VR,
    version: 'v3',
    version_date: '2016-05-20'
  });

  let params = {
    url: imgURL
  };

  console.log('image url is', imgURL);

  visual_recognition.classify(params, function (err, results) {
    if (err) {
      console.log(JSON.stringify(err));
    } else {
      console.log(results);
      // console.log(results.images[0].classifiers[0].classes);
      let keywords = results.images[0].classifiers[0].classes;

      res.send(keywords);
      next();
    }
  })
}

let translateHandler = (req, res) => {

  let { keywords, source, target } = req.body;

  console.log('keywords are: ', keywords);
  console.log('source is: ', source);
  console.log('target is: ', target);

  let url = `https://translation.googleapis.com/language/translate/v2?key=${API_KEY_TRANSLATE}&source=${source}&target=${target}`;

  keywords.forEach((k) => {
    let query = k.split(' ').join('%20');
    url += `&q=${query}`
  })

  axios.get(url).then((results) => {
    console.log('hey');
    res.send(results.data);
  });

}

let rerouteHandler = (req, res) => {
  res.redirect('/');
}

let uploadImage = (req, res, next)=>{
  let file = req.files[0];
  console.log('Uploaded image to \'' + file.path + '\'');

  // res.send(path.join('uploads', file.filename));
  console.log('file is', file.filename);

  let params = {
    image: `http://104.236.153.154/uploads/${file.filename}`
  }

  var authOptions = {
    method: 'POST',
    url: 'https://api.imgur.com/3/image',
    data: params,
    headers: {
        'Authorization': `Client-ID ${IMGUR_API_CLIENT}`
    },
    json: true
  };

  axios(authOptions)
  .then((results) => 
  {
    fs.unlink(path.join(__dirname, `../public/uploads/${file.filename}`), (err) => {
      if (err) {
        console.log("failed to delete local image");
      } else {
        console.log("successfully deleted local image");
      }
    })
    res.send(results.data);
  })
  .catch((err) => { console.log(err)});
}

module.exports = {
    vrHandler: vrHandler,
    translateHandler: translateHandler,
    rerouteHandler: rerouteHandler,
    uploadImage: uploadImage
}




