const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController');

router.get('/tasks', todoController.getTasks);
router.get('/tasks/:id', todoController.getTasksById);

module.exports = router;
