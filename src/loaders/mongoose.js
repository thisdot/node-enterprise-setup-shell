const mongoose = require('mongoose');
const config = require('../config');

const mongoDB = {
  async connect() {
    const mongoDbURI =
      process.env.NODE_ENV === 'development' ? config.database_URL_DEV : config.database_URL_PROD;
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
