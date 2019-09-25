/*
  Express route controllers for all the endpoints of the app
*/

const todo = require('../todo/routes/todo');
const isAuth = require('./middleware/checkAuth');
const express = require('express');

// guaranteed to get dependencies
const apiRoutes = () => {
  const router = express.Router();
  router.use(isAuth);
  router.use(todo);
  return router;
};

module.exports = apiRoutes;
