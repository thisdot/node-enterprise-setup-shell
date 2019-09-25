const http = require('http');
const app = require('./loaders/express');
const config = require('./config');
const debug = require('debug')('node-enterprise-api');

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
  const bind = typeof port === 'string' ? 'pipe ' + port : 'port ' + port;
  debug('Listening on ' + bind);
  console.log(`
  ************************************************
  🚀  Server listening on port: ${config.port} 🚀
  ************************************************
`);
};

const port = normalizePort(config().port);
app.set('port', port);

const server = http.createServer(app);
server.on('error', onError);
server.on('listening', onListening);
server.listen(port);
