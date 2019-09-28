/*
 Task Model Database models
*/
/*
 Database model
*/
const mongoose = require('mongoose');

try {
  module.exports = mongoose.model('NAME OF YOUR MODEL');
} catch (error) {
  //YOUR SCHEMA
  module.exports = mongoose.model('NAME OF YOUR MODEL', taskSchema);
}
