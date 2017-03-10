const watson = require('watson-developer-cloud');

const uploadImgGetResultFromWatson = function(request, response, next) {
  console.log("/upload being called");
  const imgURL = request.body.url;
  if (!imgURL) {
    console.log("client didn't provide image url");
    response.send("no-url");
    return;
  }
  const visual_recognition = watson.visual_recognition({
    api_key: '3936275c1ba6b366130abce63493b2250a8f24f1',
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
      response.send(result);
      next();
    }
  })
}

module.exports = {
    uploadImgGetResultFromWatson: uploadImgGetResultFromWatson
}



