/*
  Express route controllers for all the endpoints of the app
*/

const isAuth = require('./middleware/checkAuth');
const express = require('express');

const apiRoutes = () => {
  const router = express.Router();
  //Router level middleware router.use

  return router;
};

module.exports = apiRoutes;
