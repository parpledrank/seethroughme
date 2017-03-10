var watson = require('watson-developer-cloud');

module.exports = function (app) {
  app.post('/picture', function (req, res) {
    var imgURL = "http://www.standard.net/image/2016/06/21/800x_a16-9_b0_q80_p1_ca667,604,4608,3072/porn-dog-1.JPG";
    var visual_recognition = watson.visual_recognition({
      api_key: '3936275c1ba6b366130abce63493b2250a8f24f1',
      version_date: '2016-05-20'
    });
    var params = {
      images_file: imageURL
    };

    visual_recognition.classify(params, function (err, res) {
      if (err)
        console.log(err);
      else
        console.log(JSON.stringify(res, null, 2));
    });
  })
}