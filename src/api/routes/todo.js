const TodoService = require('../../services/todo');
const isAuth = require('../middleware/checkAuth');
const todo = router => {
  /* Get All Tasks */
  router.get('/tasks', isAuth, async (req, res, next) => {
    try {
      const results = await TodoService.getTasks();
      return res.status(201).json(results);
    } catch (e) {
      return next(e);
    }
  });

  /* Get Task by ID */
  router.get('/tasks/:id', async (req, res, next) => {
    try {
      const taskId = req.params.id;
      const task = await TodoService.getTasksById(taskId);
      return res.status(200).json(task);
    } catch (e) {
      return next(e);
    }
  });
};

module.exports = todo;
