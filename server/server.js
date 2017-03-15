const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser')
const { PORT }= require('./config');
const apiRouter = require('./router.js');
const requestHandlers = require('./requestHandlers.js');

const app = express();
const jsonParser = bodyParser.json();

app.use(cors());

app.use(jsonParser);

app.use(express.static(path.join(__dirname, '../public')));

app.use('/bundles', express.static(path.join(__dirname, '../bundles')));

app.use('/api', apiRouter);

app.get('/*', requestHandlers.rerouteHandler);

app.listen(PORT, () => {
  console.log(`App is listening at port ${PORT}.`)
})


