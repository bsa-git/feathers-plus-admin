const {inspector} = require('./plugins/lib');
const debug = require('debug')('app:channels');

const isLog = false;

module.exports = function (app) {
  if (typeof app.channel !== 'function') {
    // If no real-time functionality has been configured just return
    return;
  }

  app.on('connection', (connection) => {
    // On a new real-time connection, add it to the anonymous channel
    if (connection) {
      app.channel('anonymous').join(connection);
      debug('app.on(\'connection\') for SocketIo transport');
    } else {
      debug('app.on(\'connection\') for Rest transport');
    }
  });

  app.on('login', (payload, {connection}) => {
    // connection can be undefined if there is no
    // real-time connection, e.g. when logging in via REST
    if (connection) {

      // Obtain the logged in user from the connection
      const user = connection.user;
      debug('app.on(\'login\') for SocketIo transport');
      if (isLog) inspector('app.on(\'login\') for user:', user);

      // The connection is no longer anonymous, remove it
      app.channel('anonymous').leave(connection);

      // Add it to the authenticated user channel
      app.channel('authenticated').join(connection);

      // Channels can be named anything and joined on any condition

      // E.g. to send real-time events only to admins use
      // if(user.isAdmin) { app.channel('admins').join(connection); }

      // If the user has joined e.g. chat rooms
      // if(Array.isArray(user.rooms)) user.rooms.forEach(room => app.channel(`rooms/${room.id}`).join(channel));

      // Easily organize users by email and userid for things like messaging
      // app.channel(`emails/${user.email}`).join(channel);
      // app.channel(`userIds/$(user.id}`).join(channel);
      // app.channel(`userIds/${user._id}`).join(connection);
    } else {
      debug('app.on(\'login\') for Rest transport');
    }
  });

  app.on('logout', (payload, {connection}) => {
    if (connection) {
      //When logging out, leave all channels before joining anonymous channel
      if (app.channels.length) {
        app.channel(app.channels).leave(connection);
        app.channel('anonymous').join(connection);
        debug('app.on(\'logout\') for SocketIo transport');
      }
    } else {
      debug('app.on(\'logout\') for Rest transport');
    }
  });

  // eslint-disable-next-line no-unused-vars
  app.publish((data, hook) => {
    // Here you can add event publishers to channels set up in `channels.js`
    // To publish only for a specific event use `app.publish(eventname, () => {})`

    // eslint-disable-next-line
    //--------------------------
    debug('Publishing all events to all authenticated users.');
    //--------------------------

    // e.g. to publish all service events to all authenticated users use
    return app.channel('authenticated');
  });

  // Here you can also add service specific event publishers
  // e.g. the publish the `users` service `created` event to the `admins` channel
  // app.service('users').publish('created', () => app.channel('admins'));

  // With the userid and email organization from above you can easily select involved users
  // app.service('messages').publish(() => {
  //   return [
  //     app.channel(`userIds/${data.createdBy}`),
  //     app.channel(`emails/${data.recipientEmail}`)
  //   ];
  // });
};
