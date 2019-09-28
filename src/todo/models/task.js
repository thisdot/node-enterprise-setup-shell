/*
 Task Model Database models
*/
/*
 Database model
*/
const mongoose = require('mongoose');

try {
  module.exports = mongoose.model('Task');
} catch (error) {
  const taskSchema = mongoose.Schema({
    title: { type: String, required: true },
    status: { type: String, required: true }
  });
  module.exports = mongoose.model('Task', taskSchema);
}
