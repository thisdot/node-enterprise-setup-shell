/*
    App Entry Point
*/
const express = require('express');
const body_parser = require('body-parser');
const cors = require('cors');
const config = require('../config');
const apiRoutes = require('../api');
const app = express();

app.use(body_parser.json());
app.use(body_parser.urlencoded({ extended: false }));
app.use(cors());
app.use(config.api.prefix, apiRoutes());

/// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

module.exports = app;
