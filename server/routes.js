const requestHandlers = require('./requestHandlers.js');

module.exports = function (app) {

  app.get('/upload', requestHandlers.uploadImgGetResultFromWatson);
  
}