let express = require('express');
let requestHandlers = require('./requestHandlers.js');
let utility = require('./utility.js')

let router = express.Router();

router.post('/upload', requestHandlers.vrHandler);

router.use('/img', utility.fileParser.any());

router.post('/img', requestHandlers.uploadImage);

router.post('/translate', requestHandlers.translateHandler);


module.exports = router;
  
