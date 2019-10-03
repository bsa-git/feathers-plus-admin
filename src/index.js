
/* eslint-disable no-console */
// Start the server. (Can be re-generated.)
// !code: preface // !end
const logger = require('./logger');
const app = require('./app');
const seedData = require('./seed-data');
// !code: imports
const chalk = require('chalk');
// !end
// !code: init // !end

const port = app.get('port');
const server = app.listen(port);
// !code: init2 // !end

process.on('unhandledRejection', (reason, p) => {
  // !<DEFAULT> code: unhandled_rejection_log
  logger.error('Unhandled Rejection at: Promise ', p, reason);
  // !end
  // !code: unhandled_rejection
  console.log(chalk.red(reason), p);
  // !end
});

server.on('listening', async () => {
  // !<DEFAULT> code: listening_log
  logger.info('Feathers application started on http://%s:%d', app.get('host'), port);
  // !end
  // !code: listening
  //--------------------
  logger.info('Feathers application started on env="%s"', app.get('env'));
  process.on('nuxt:build:done', (err) => {
    if (err) {
      logger.error(err);
      process.exit(1);
    }
    logger.info('Nuxt:Build:Done - OK!');
    logger.info('Feathers application started on "http://%s:%d"', app.get('host'), port);
    logger.info('Feathers application started on env="%s"', app.get('env'));
  });
  //--------------------
  // !end
  await seedData(app);
  // !code: listening1 // !end
});

// !code: funcs // !end
// !code: end
logger.info('Initialization complete. Waiting for server to start.');
// !end
