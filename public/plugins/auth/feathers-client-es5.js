
import feathers from '@feathersjs/client/index';
import authentication from '@feathersjs/client/authentication';
import io from 'socket.io-client';
// import axios from 'axios';
//
// import { CookieStorage } from 'cookie-storage';

/////////////////////////////////////////////////////////////



const restURL = process.env.BASE_URL;
// if (process.env.NODE_ENV === 'development') {
//   restURL += `:${this.data.port}`;
// }
// const feathers = require('@feathersjs/client/index');
// const axios = require('axios');
//---------------------------------

const socket = io(restURL);

// Create app
const feathersClient = feathers();
// Connect to URL
// const restClient = feathers.rest(restURL);
// Configure an AJAX library (see below) with that client
// feathersClient.configure(restClient.axios(axios));
// Configure an socket
feathersClient.configure(feathers.socketio(socket));

// const authentication = require('@feathersjs/client/authentication');
feathersClient.configure(authentication({
  storage: window.localStorage
}));




export default feathersClient;
