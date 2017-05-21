let express = require('express');
let path = require('path');
let cors = require('cors');
let bodyParser = require('body-parser')
let { PORT }= require('./config');
let apiRouter = require('./router.js');
let requestHandlers = require('./requestHandlers.js');

let app = express();
let jsonParser = bodyParser.json();

app.use(cors());

app.use(jsonParser);

app.use(express.static(path.join(__dirname, '../public')));

app.use('/bundles', express.static(path.join(__dirname, '../bundles')));

app.use('/api', apiRouter);

app.get('/*', requestHandlers.rerouteHandler);

app.listen(PORT, () => {
  console.log(`App is listening at port ${PORT}.`)
})


