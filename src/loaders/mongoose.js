const mongoose = require('mongoose');
const config = require('../config');

const mongoDB = {
  async connect() {
    const mongoDbURI = config().database_URL;
    const connection = await mongoose.connect(mongoDbURI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true
    });
    return connection.connection.db;
  },
  disconnect() {
    mongoose.disconnect();
  }
};
module.exports = mongoDB;
