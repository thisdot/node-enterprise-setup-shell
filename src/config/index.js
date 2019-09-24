const dotenv = require('dotenv');

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config();
if (!envFound) {
  // This error should crash whole process

  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

const config = {
  /**
   * Your favorite port
   */
  port: parseInt(process.env.PORT, 10),

  /**
   * That long string from Mongo ATLAS
   */
  database_URL_DEV: process.env.MONGODB_URI_DEV,
  database_URL_PROD: process.env.MONGODB_URI_PROD,
  /**
   * API configs
   */
  api: {
    prefix: '/api'
  }
};

module.exports = config;
