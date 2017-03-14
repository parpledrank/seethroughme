const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser')
const { PORT } = require('./config');
const apiRouter = require('./router.js');

const app = express();
const jsonParser = bodyParser.json();

app.use(cors());

app.use(jsonParser);

app.use(express.static(path.join(__dirname, '../public')));

app.use('/bundles', express.static(path.join(__dirname, '../bundles')));

app.use('/api', apiRouter);

app.get('/', (req, res) => {
  res.send('Server is running!');
})

app.listen(PORT, () => {
  console.log(`App is listening at port ${PORT}.`)
})


