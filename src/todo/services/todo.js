/*
    All the business logic is here
*/

const TaskModel = require('../models/task');

class TodoService {
  static getTasks() {
    return TaskModel.find();
  }

  static async getTasksById(id) {
    return TaskModel.findById(id);
  }
}

module.exports = TodoService;
