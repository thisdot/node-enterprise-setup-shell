/*
  Express routes for each domain in one file
*/

const express = require('express');
const isAuth = require('./middleware/checkAuth');

const apiRoutes = () => {
  const router = express.Router();
  //Router level middleware router.use
  router.use(isAuth);
  //router.use('YOUR DOMAIN ROUTS FILE');

  return router;
};

module.exports = apiRoutes;
