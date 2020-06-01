const Channel = require('./plugins/auth/channel.class');
const Hook = require('./plugins/hook-helpers/hook-helper.class');
const debug = require('debug')('app:channels');

const isLog = false;
const isDebug = false;

module.exports = function (app) {
  if (typeof app.channel !== 'function' || Channel.isTest()) {
    // If no real-time functionality has been configured just return
    return;
  }

  // Join a channel given a user and connection
  const joinChannels = async (user, connection) => {
    // Join connection for authenticated users
    app.channel('authenticated').join(connection);

    // Get object of channel
    const channel = new Channel(app, connection);

    // Join connection for role
    const roleName = await channel.getRoleName();
    app.channel(`roles/${Channel.getIsEnvRole(roleName)}`).join(connection);
    if (Channel.getIsEnvRole(roleName) !== 'isAdmin') {
      app.channel('roles/isUser').join(connection);
    }

    // Join connection for teams
    const teamsForUser = await channel.getTeamsForUser();
    if (teamsForUser) {
      teamsForUser.forEach(team => app.channel(`teams/${team.id}`).join(connection));
    }

    // Join connection for user.email
    app.channel(`emails/${channel.user.email}`).join(connection);

    // Join connection for user.id
    app.channel(`userIds/${channel.userId}`).join(connection);
  };

  // Get a user to leave all channels
  const leaveChannels = user => {
    const idField = Channel.getIdField(user);
    app.channel(app.channels).leave(connection => {
      if(connection && connection.user){
        return  connection.user[idField] === user[idField];
      } else {
        return false;
      }

    });
  };

  // Leave and re-join all channels with new user information
  const updateChannels = async user => {
    const idField = Channel.getIdField(user);
    // Find all connections for this user
    const {connections} = app.channel(app.channels).filter(connection => {
      if(connection && connection.user){
        return  connection.user[idField] === user[idField];
      } else {
        return false;
      }
    });

    // Leave all channels
    leaveChannels(user);

    const _joinChannels = async function(connection){
      await joinChannels(user, connection);
    };

    // Re-join all channels with the updated user information
    connections.forEach(_joinChannels);
  };

  app.on('connection', (connection) => {
    // On a new real-time connection, add it to the anonymous channel
    if (connection) {
      app.channel('anonymous').leave(connection);
      app.channel('anonymous').join(connection);
      if (isDebug) debug('app.on(\'connection\') for SocketIo transport');
      if (isLog) Channel.showChannelInfo(app, 'app.on(\'connection\')');
    } else {
      if (isDebug) debug('app.on(\'connection\') for Rest transport');
    }
  });

  app.on('login', async (payload, {connection}) => {
    // connection can be undefined if there is no
    // real-time connection, e.g. when logging in via REST
    if (connection && connection.user) {

      // The connection is no longer anonymous, remove it
      app.channel('anonymous').leave(connection);

      // Join channels for user
      await joinChannels(connection.user, connection);

      if (isDebug) debug('app.on(\'login\') for SocketIo transport');
      if (isLog) Channel.showChannelInfo(app, 'app.on(\'login\')');

    } else {
      if (isDebug) debug('app.on(\'login\') for Rest transport');
    }
  });

  app.on('logout', (payload, {connection}) => {
    if (connection) {
      app.channel('anonymous').join(connection);

      if (isDebug) debug('app.on(\'logout\') for SocketIo transport');
      if (isLog) Channel.showChannelInfo(app, 'app.on(\'logout\')');
    } else {
      if (isDebug) debug('app.on(\'logout\') for Rest transport');
    }
  });

  // On `users.updated` and `users.patched`, leave and re-join with new role assignments
  app.service('users').on('updated', async user => {
    await updateChannels(user);
    if (isDebug) debug('app.service(\'users\').on(\'updated\') for SocketIo transport');
    if (isLog) Channel.showChannelInfo(app, 'app.service(\'users\').on(\'updated\')');
  });
  app.service('users').on('patched', async user => {
    await updateChannels(user);
    if (isDebug) debug('app.service(\'users\').on(\'patched\') for SocketIo transport');
    if (isLog) Channel.showChannelInfo(app, 'app.service(\'users\').on(\'patched\')');
  });
  // On `users.removed`, remove the connection from all channels
  app.service('users').on('removed', user => {
    leaveChannels(user);
    if (isDebug) debug('app.service(\'users\').on(\'removed\') for SocketIo transport');
    if (isLog) Channel.showChannelInfo(app, 'app.service(\'users\').on(\'removed\')');
  });
  // On `user-teams.created` and `user-teams.removed`, leave and re-join with new team assignments
  app.service('user-teams').on('created', async userTeams => {
    const user = await app.service('users').get(userTeams.userId);
    await updateChannels(user);
    if (isDebug) debug('app.service(\'user-teams\').on(\'created\') for SocketIo transport');
    if (isLog) Channel.showChannelInfo(app, 'app.service(\'user-teams\').on(\'created\')');
  });
  app.service('user-teams').on('removed', async userTeams => {
    const user = await app.service('users').get(userTeams.userId);
    await updateChannels(user);
    if (isDebug) debug('app.service(\'user-teams\').on(\'removed\') for SocketIo transport');
    if (isLog) Channel.showChannelInfo(app, 'app.service(\'user-teams\').on(\'removed\')');
  });

  // eslint-disable-next-line no-unused-vars
  app.publish(async (data, hook) => {
    let publishResult = [];
    let paths = Channel.getServicePaths();
    const h = new Hook(hook);
    const contextPath = h.contextPath;
    if (!paths.includes(contextPath)) return;

    // Publish events to admins channel
    if (contextPath !== 'messages') {
      publishResult.push(app.channel('roles/isAdmin'));
    }

    // Publish events to users channel
    switch (contextPath) {
    case 'users':
      break;
    case 'user-profiles':
      break;
    case 'user-teams':
      break;
    case 'roles':
      break;
    case 'teams':
      break;
    case 'log-messages':
      publishResult.push(app.channel(`userIds/${data.userId}`));
      break;
    default:
      break;
    }
    if (isDebug) debug('Publishing all events to all authenticated users.');
    return publishResult;
  });
};
