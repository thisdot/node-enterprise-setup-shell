/*
  Express route controllers for all the endpoints of the app
*/

const todo = require('../api/routes/todo');
const auth = require('../api/routes/auth');
const express = require('express');

// guaranteed to get dependencies
const apiRoutes = () => {
  const router = express.Router();
  todo(router);
  auth(router);
  return router;
};

module.exports = apiRoutes;
