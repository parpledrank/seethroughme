const express = require('express');
const requestHandlers = require('./requestHandlers.js');

const router = express.Router();

router.post('/upload', requestHandlers.vrHandler);

module.exports = router;
  
