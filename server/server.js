const express = require('express');

const app = express();

app.use(express.static(__dirname + '/../build'));

app.listen(8080, () => {
  console.log(`Port is up and running at 8080`);
})