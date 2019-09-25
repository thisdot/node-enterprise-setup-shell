/*
 Database models
*/
const mongoose = require('mongoose');
const taskSchema = mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true }
});

module.exports = mongoose.model('Task', taskSchema);

//Take a look to fromClass
