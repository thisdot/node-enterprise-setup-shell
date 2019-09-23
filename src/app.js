/*
    App Entry Point
*/
const config = require('./config');
const logger = require('./loaders/logger');
const express = require('express');
const body_parser = require('body-parser');
cors = require('cors');
const app = express();

app.use(body_parser.json());
app.use(body_parser.urlencoded({ extended: false }));
app.use(cors());

app.get('/', function(req, res, next) {
  res.json({ msg: 'This is CORS-enabled for all origins!' });
});

module.exports = app;
