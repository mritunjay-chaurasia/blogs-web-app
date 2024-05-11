const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
const mongoose = require('mongoose');
const routes = require('./routes/index')
const http = require('http');
const path = require('path');
const app = express();
const server = http.createServer(app);
app.use(cors());

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api',routes)
// set port, listen for requests
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});