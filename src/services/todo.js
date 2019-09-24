/*
    All the business logic is here
*/

const TaskModel = require('../models/task');

class TodoService {
  static async getTasks() {
    try {
      const tasks = await TaskModel.find();
      return {
        message: 'Fetched posts successfully.',
        tasks: tasks,
        status: 200
      };
    } catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      return err;
    }
  }

  static async getTasksById(id) {
    const taskId = id;
    const task = await TaskModel.findById(taskId);
    try {
      if (!task) {
        const ERROR = new Error('Task not found');
        ERROR.statusCode = 404;
        throw ERROR;
      }
      return {
        message: 'Task feched',
        task: task,
        status: 200
      };
    } catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      return err;
    }
  }
}

module.exports = TodoService;
