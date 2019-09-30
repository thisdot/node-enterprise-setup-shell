const http = require('http');
const debug = require('debug')('node-enterprise-api');
//My expressJS app
const app = require('./loaders/express');
//Configurations of the Project
const config = require('./config');

const normalizePort = val => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }

  if (port >= 0) {
    return port;
  }

  return false;
};

const onError = error => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const bind = typeof port === 'string' ? 'pipe ' + port : 'port ' + port;
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
};

const onListening = () => {
  const bind = typeof port === 'string' ? 'pipe ' + port : 'port: ' + port;
  debug('Listening on ' + bind);
  console.log(`
    ************************************************
    🚀  Server listening on ${bind} 🚀
    ************************************************
  `);
};
const server = http.createServer(app);
const port = normalizePort(config().port);
app.set('port', port);
server.on('error', onError);
server.on('listening', onListening);
server.listen(app.get('port'));

module.exports = server;
