const mongoose = require('mongoose');
const config = require('../config');

module.exports = async () => {
  const mongoDbURI =
    process.env.NODE_ENV === 'development' ? config.database_URL_DEV : config.database_URL_PROD;
  const connection = await mongoose.connect(mongoDbURI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  });
  return connection.connection.db;
};
