/*
    App Entry Point
*/

//const logger = require('./loaders/logger');
const express = require('express');
const body_parser = require('body-parser');
const cors = require('cors');
const config = require('../config');
const apiRoutes = require('../api/index');
const app = express();

app.use(body_parser.json());
app.use(body_parser.urlencoded({ extended: false }));
app.use(cors());

app.get('/', function(req, res, next) {
  res.json({ msg: 'This is CORS-enabled for all origins!' });
});

app.use(config.api.prefix, apiRoutes());

/// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

module.exports = app;
