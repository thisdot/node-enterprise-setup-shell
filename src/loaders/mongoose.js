const mongoose = require('mongoose');
const config = require('../config');

module.exports = async () => {
  const connection = await mongoose.connect(config.database_URL_DEV, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  });
  return connection.connection.db;
};
