const express = require('express');
const requestHandlers = require('./requestHandlers.js');

const router = express.Router();

router.get('/upload', requestHandlers.uploadImgGetResultFromWatson);

module.exports = router;
  
