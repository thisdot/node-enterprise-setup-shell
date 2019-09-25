const dotenv = require('dotenv');

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config();
if (!envFound) {
  // This error should crash whole process

  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

const config = {
  dev: {
    /**
     * Your favorite port
     */
    port: parseInt(process.env.PORT, 10),

    /**
     * That long string from Mongo ATLAS
     */
    database_URL: process.env.MONGODB_URI_DEV,
    /**
     * API configs
     */
    api: {
      prefix: '/api'
    }
  },
  prod: {
    /**
     * Your favorite port
     */
    port: parseInt(process.env.PORT, 10),

    /**
     * That long string from Mongo ATLAS
     */
    database_URL: process.env.MONGODB_URI_PROD,
    /**
     * API configs
     */
    api: {
      prefix: '/api'
    }
  }
};

const getConfig = () => {
  return process.env.NODE_ENV === 'development' ? config.dev : config.prod;
};

module.exports = getConfig;
