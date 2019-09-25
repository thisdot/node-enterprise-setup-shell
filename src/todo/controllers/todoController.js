const todoService = require('../services/todo');

exports.getTasks = async (req, res, next) => {
  try {
    const tasks = await todoService.getTasks();
    return res.status(201).json({
      message: 'Fetched posts successfully.',
      tasks: tasks,
      status: 200
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    return err;
  }
};

exports.getTasksById = async (req, res, next) => {
  const taskId = req.params.id;
  const task = await todoService.getTasksById(taskId);
  try {
    if (!task) {
      throw new Error('Task not found');
    }

    return res.status(201).json({
      message: 'Task fetched',
      task: task,
      status: 200
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    return err;
  }
};
