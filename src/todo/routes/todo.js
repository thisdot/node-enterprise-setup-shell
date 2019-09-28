/*
  Express route controllers for all the endpoints of your todo
*/

const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController');

router.get('/tasks', todoController.getTask);
router.post('/tasks', todoController.createTask);

module.exports = router;
