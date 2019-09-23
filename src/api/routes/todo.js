const express = require('express');
const todo = router => {
  router.get('/', (req, res, next) => {
    return res.json({ msg: 'This is CORS-enabled for all origins!' }).status(200);
  });
};

module.exports = todo;
