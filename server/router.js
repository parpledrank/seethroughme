const express = require('express');
const requestHandlers = require('./requestHandlers.js');

const router = express.Router();

router.post('/upload', requestHandlers.vrHandler);

router.post('/translate', requestHandlers.translateHandler);

module.exports = router;
  
