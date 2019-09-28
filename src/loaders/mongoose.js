const mongoose = require('mongoose');
const config = require('../config');

/*MongoDB Main methods*/

const mongoDB = {
  async connect() {
    try {
      const mongoDBURI = config().database_URL;
      const connection = await mongoose.connect(mongoDBURI, {
        useNewUrlParser: true,
        userCreateIndex: true,
        useUnifiedTopology: true
      });
      console.log(`  ✌️ DB loaded and connected!`);
      return connection.connection.db;
    } catch (err) {
      return err;
    }
  },
  disconnect() {
    mongoose.disconnect();
  }
};
module.exports = mongoDB;
