/*
 Database models
*/
const mongoose = require('mongoose');

try {
  module.exports = mongoose.model('Task');
} catch (error) {
  const taskSchema = mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true }
  });
  module.exports = mongoose.model('Task', taskSchema);
}

//Take a look to fromClass
