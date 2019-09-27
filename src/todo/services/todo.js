const Task = require('../models/task');

class TodoService {
  static getTasks() {
    return Task.find();
  }

  static getTasksById(id) {
    return Task.findById(id);
  }
}

module.exports = TodoService;
