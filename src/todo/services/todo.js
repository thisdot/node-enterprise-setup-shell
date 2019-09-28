/* Todo Service */

const Task = require('../models/task');

class TodoService {
  static getTasks() {
    return Task.find();
  }

  static createTask(title, status) {
    const task = new Task({
      title: title,
      status: status
    });
    return task;
  }
}

module.exports = TodoService;
