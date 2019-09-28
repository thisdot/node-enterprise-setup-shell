/*
  Express route controllers for all the endpoints of the app
*/

const express = require('express');

//Example
const todo = require('../todo/routes/todo');
const isAuth = require('./middleware/checkAuth');

const apiRoutes = () => {
  const router = express.Router();
  //Router level middleware router.use
  router.use(isAuth);
  router.use(todo);

  return router;
};

module.exports = apiRoutes;
