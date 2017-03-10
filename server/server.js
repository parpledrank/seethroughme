const express = require('express');
const axios = require('axios');
const cors = require('cors');
const { PORT, API_KEY_TRANSLATE, API_KEY_VR } = require('./config');

const app = express();

app.use(cors());

app.use(express.static(__dirname + '/../build'));

app.listen(PORT, () => {
  console.log(`App is listening at port ${PORT}.`)
})


