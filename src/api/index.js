/*
  Express route controllers for all the endpoints of the app
*/

const Router = require('express');

// guaranteed to get dependencies
const apiRoutes = () => {
  const app = Router();
  return app;
};

module.exports = apiRoutes;
