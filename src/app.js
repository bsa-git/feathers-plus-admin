
// Configure Feathers app. (Can be re-generated.)
const path = require('path');
const favicon = require('serve-favicon');
const compress = require('compression');
const cors = require('cors');
const helmet = require('helmet');
const logger = require('./logger');

const feathers = require('@feathersjs/feathers');
const configuration = require('@feathersjs/configuration');
const express = require('@feathersjs/express');
const socketio = require('@feathersjs/socketio');

const middleware = require('./middleware');
const services = require('./services');
const appHooks = require('./app.hooks');
const channels = require('./channels');
const generatorSpecs = require('../feathers-gen-specs.json');
const authentication = require('./authentication');

const mongoose = require('./mongoose');
// !code: imports
//-----------------
const dotenv = require('dotenv');// Loads environment variables from .env file.
const nuxt = require('./middleware/nuxt');// Loads nuxt middleware
//-----------------
// !end
// !code: init
//-----------------
dotenv.load(); // Load environment variables
//-----------------
// !end

const app = express(feathers());
// !code: use_start // !end

// Load app configuration
app.configure(configuration());
// !<DEFAULT> code: init_config
app.set('generatorSpecs', generatorSpecs);
// !end

// Enable security, CORS, compression, favicon and body parsing
app.use(helmet());
app.use(cors());
app.use(compress());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(favicon(path.join(app.get('public'), 'favicon.ico')));
// Host the public folder
app.use('/', express.static(app.get('public')));
// !code: use_end // !end

// Set up Plugins and providers
// !code: config_start
//--------------------
// Set authentication.local.usernameField = "email" for Win OS
const configAuthentication = app.get('authentication');
configAuthentication.local.usernameField = 'email';
app.set('authentication', configAuthentication);
//--------------------
// !end
app.configure(express.rest(
  // !code: express_rest // !end
));
app.configure(socketio(
  // !code: express_socketio // !end
));
// Configure database adapters
app.configure(mongoose);

// Configure other middleware (see `middleware/index.js`)
app.configure(middleware);
// Configure authentication (see `authentication.js`)
app.configure(authentication);
// Set up our services (see `services/index.js`)
app.configure(services);
// Set up event channels (see channels.js)
app.configure(channels);
// !code: config_middle
//---------------------
// Configure nuxt middleware
app.configure(nuxt);
//---------------------
// !end

// Configure a middleware for 404s and the error handler
app.use(express.notFound());
app.use(express.errorHandler({ logger }));
// !code: config_end // !end

app.hooks(appHooks);

const moduleExports = app;
// !code: exports // !end
module.exports = moduleExports;

// !code: funcs // !end
// !code: end // !end
