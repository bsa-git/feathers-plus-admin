
/* eslint-disable no-unused-vars, indent */
// Define GraphQL resolvers using only Feathers services. (Can be re-generated.)
// !code: imports
const {inspector} = require('../../plugins/lib');
const debug = require('debug')('app:service.graphql.resolvers');

const isDebug = false;
const isLog = false;
// !end
// !code: init // !end

let moduleExports = function serviceResolvers(app, options) {
  const {convertArgsToFeathers, extractAllItems, extractFirstItem} = options;
  // !<DEFAULT> code: extra_auth_props
  const convertArgs = convertArgsToFeathers([]);
  // !end

  // !<DEFAULT> code: services
  let chatMessages = app.service('/chat-messages');
  let logMessages = app.service('/log-messages');
  let roles = app.service('/roles');
  let teams = app.service('/teams');
  let userProfiles = app.service('/user-profiles');
  let userTeams = app.service('/user-teams');
  let users = app.service('/users');
  // !end

  let returns = {

    ChatMessage: {

      // team(query: JSON, params: JSON, key: JSON): Team
      team:
        // !code: resolver-ChatMessage-team
        (parent, args, content, ast) => {
          const feathersParams = convertArgs(args, content, ast, {
            query: { _id: parent.teamId }, paginate: false
          });
          return (parent.teamId === '000000000000000000000000')? null : teams.find(feathersParams).then(extractFirstItem);
        },
        // !end

      // owner(query: JSON, params: JSON, key: JSON): User!
      owner:
        // !<DEFAULT> code: resolver-ChatMessage-owner
        (parent, args, content, ast) => {
          const feathersParams = convertArgs(args, content, ast, {
            query: { _id: parent.ownerId }, paginate: false
          });
          return users.find(feathersParams).then(extractFirstItem);
        },
        // !end

      // user(query: JSON, params: JSON, key: JSON): User
      user:
        // !code: resolver-ChatMessage-user
        (parent, args, content, ast) => {
          const feathersParams = convertArgs(args, content, ast, {
            query: { _id: parent.userId }, paginate: false
          });
          return (parent.userId === '000000000000000000000000')? null : users.find(feathersParams).then(extractFirstItem);
        },
        // !end
    },

    LogMessage: {

      // owner(query: JSON, params: JSON, key: JSON): User
      owner:
        // !<DEFAULT> code: resolver-LogMessage-owner
        (parent, args, content, ast) => {
          const feathersParams = convertArgs(args, content, ast, {
            query: { _id: parent.ownerId }, paginate: false
          });
          return users.find(feathersParams).then(extractFirstItem);
        },
        // !end

      // user(query: JSON, params: JSON, key: JSON): User
      user:
        // !<DEFAULT> code: resolver-LogMessage-user
        (parent, args, content, ast) => {
          const feathersParams = convertArgs(args, content, ast, {
            query: { _id: parent.userId }, paginate: false
          });
          return users.find(feathersParams).then(extractFirstItem);
        },
        // !end
    },

    Role: {

      // users: [User!]
      users:
        // !<DEFAULT> code: resolver-Role-users
        (parent, args, content, ast) => {
          const feathersParams = convertArgs(args, content, ast, {
            query: { roleId: parent._id, $sort: undefined }, paginate: false
          });
          return users.find(feathersParams).then(extractAllItems);
        },
        // !end
    },

    Team: {

      // members: [User!]
      members:
        // !code: resolver-Team-members
        (parent, args, content, ast) => {
          let feathersParams;
          // Set content.cache.Team.userIdsForTeam
          if (!(content.cache.Team && content.cache.Team.userIdsForTeam)) {
            feathersParams = convertArgs(args, content, ast, {
              query: {
                teamId: parent._id.toString(),
                $sort: {userId: 1}
              }, paginate: false
            });
            if (isDebug) debug('Team.members.feathersParams:', feathersParams);
            content.cache.Team = content.cache.Team || {};
            content.cache.Team.userIdsForTeam = userTeams.find(feathersParams).then(items => {
              return extractAllItems(items).map(item => item.userId.toString());
            });
          }
          return Promise.resolve(content.cache.Team.userIdsForTeam)
            .then(userIdsForTeam => {
              if (isLog) inspector('Team.members.userIdsForTeam', userIdsForTeam);
              feathersParams = convertArgs(args, content, ast, {
                query: {_id: {$in: userIdsForTeam}, $sort: {}}, paginate: false
              });
              if (isDebug) debug('Team.members.feathersParams:', feathersParams);
              return users.find(feathersParams);
            })
            .then(items => {
              const usersForTeam = extractAllItems(items);
              if (isLog) inspector('Team.members.usersForTeam', usersForTeam);
              return usersForTeam;
            });
        },
        // !end
    },

    UserProfile: {

      // addressFull: String!
      addressFull:
        // !code: resolver-UserProfile-addressFull-non
        (parent, args, content, ast) => {
          // ex. 438 Dark Spurt Apt. 420, San Francisco, CA 94528, USA
          return `${parent.addressStreet} ${parent.addressSuite}, ${parent.addressCity}, ${parent.addressStateAbbr} ${parent.addressZipCode}, ${parent.addressCountry}`;
        },
        // !end

      // user: User!
      user:
        // !<DEFAULT> code: resolver-UserProfile-user
        (parent, args, content, ast) => {
          const feathersParams = convertArgs(args, content, ast, {
            query: { profileId: parent._id }, paginate: false
          });
          return users.find(feathersParams).then(extractFirstItem);
        },
        // !end
    },

    UserTeam: {
    },

    User: {

      // fullName: String!
      fullName:
        // !code: resolver-User-fullName-non
        (parent, args, content, ast) => {
          return `${parent.firstName} ${parent.lastName}`;
        },
        // !end

      // role(query: JSON, params: JSON, key: JSON): Role
      role:
        // !<DEFAULT> code: resolver-User-role
        (parent, args, content, ast) => {
          const feathersParams = convertArgs(args, content, ast, {
            query: { _id: parent.roleId }, paginate: false
          });
          return roles.find(feathersParams).then(extractFirstItem);
        },
        // !end

      // profile(query: JSON, params: JSON, key: JSON): UserProfile
      profile:
        // !<DEFAULT> code: resolver-User-profile
        (parent, args, content, ast) => {
          const feathersParams = convertArgs(args, content, ast, {
            query: { _id: parent.profileId }, paginate: false
          });
          return userProfiles.find(feathersParams).then(extractFirstItem);
        },
        // !end

      // teams: [Team!]
      teams:
        // !code: resolver-User-teams
        (parent, args, content, ast) => {
        let feathersParams;
          // Set content.cache.User.teams
          if (!(content.cache.User && content.cache.User.teams)) {
            feathersParams = convertArgs(args, content, ast, {
              query: {}, paginate: false
            });
            if (isDebug) debug('User.teams.feathersParams:', feathersParams);
            content.cache.User = content.cache.User || {};
            content.cache.User.teams = teams.find(feathersParams).then(extractAllItems);
          }
          // Set content.cache.User.teamIdsForUser
          if (!content.cache.User.teamIdsForUser) {
            feathersParams = convertArgs(args, content, ast, {
              query: {
                userId: parent._id.toString(),
                $sort: {teamId: 1}
              }, paginate: false
            });
            if (isDebug) debug('User.teams.feathersParams:', feathersParams);
            content.cache.User.teamIdsForUser = userTeams.find(feathersParams).then(items => {
              return extractAllItems(items).map(item => item.teamId.toString());
            });
          }
          return Promise.all([
            Promise.resolve(content.cache.User.teams),
            Promise.resolve(content.cache.User.teamIdsForUser)
          ]).then(function (values) {
            const _allTeams = values[0];
            const _teamIdsForUser = values[1];
            if (isLog) inspector('User.teams.allTeams', _allTeams);
            if (isLog) inspector('User.teams.teamIdsForUser', _teamIdsForUser);
            const teamsForUser = _allTeams.filter(team => _teamIdsForUser.indexOf(team._id.toString()) >= 0);
            if (isLog) inspector('User.teams.teamsForUser', teamsForUser);
            return teamsForUser;
          });
        },
        // !end
    },

    // !code: resolver_field_more // !end

    Query: {

      // !<DEFAULT> code: query-ChatMessage
      // getChatMessage(query: JSON, params: JSON, key: JSON): ChatMessage
      getChatMessage(parent, args, content, ast) {
        const feathersParams = convertArgs(args, content, ast);
        return chatMessages.get(args.key, feathersParams).then(extractFirstItem);
      },

      // findChatMessage(query: JSON, params: JSON): [ChatMessage!]
      findChatMessage(parent, args, content, ast) {
        const feathersParams = convertArgs(args, content, ast, { query: { $sort: {   _id: 1 } } });
        return chatMessages.find(feathersParams).then(paginate(content)).then(extractAllItems);
      },
      // !end

      // !<DEFAULT> code: query-LogMessage
      // getLogMessage(query: JSON, params: JSON, key: JSON): LogMessage
      getLogMessage(parent, args, content, ast) {
        const feathersParams = convertArgs(args, content, ast);
        return logMessages.get(args.key, feathersParams).then(extractFirstItem);
      },

      // findLogMessage(query: JSON, params: JSON): [LogMessage!]
      findLogMessage(parent, args, content, ast) {
        const feathersParams = convertArgs(args, content, ast, { query: { $sort: {   _id: 1 } } });
        return logMessages.find(feathersParams).then(paginate(content)).then(extractAllItems);
      },
      // !end

      // !<DEFAULT> code: query-Role
      // getRole(query: JSON, params: JSON, key: JSON): Role
      getRole(parent, args, content, ast) {
        const feathersParams = convertArgs(args, content, ast);
        return roles.get(args.key, feathersParams).then(extractFirstItem);
      },

      // findRole(query: JSON, params: JSON): [Role!]
      findRole(parent, args, content, ast) {
        const feathersParams = convertArgs(args, content, ast, { query: { $sort: {   name: 1 } } });
        return roles.find(feathersParams).then(paginate(content)).then(extractAllItems);
      },
      // !end

      // !<DEFAULT> code: query-Team
      // getTeam(query: JSON, params: JSON, key: JSON): Team
      getTeam(parent, args, content, ast) {
        const feathersParams = convertArgs(args, content, ast);
        return teams.get(args.key, feathersParams).then(extractFirstItem);
      },

      // findTeam(query: JSON, params: JSON): [Team!]
      findTeam(parent, args, content, ast) {
        const feathersParams = convertArgs(args, content, ast, { query: { $sort: {   name: 1 } } });
        return teams.find(feathersParams).then(paginate(content)).then(extractAllItems);
      },
      // !end

      // !<DEFAULT> code: query-UserProfile
      // getUserProfile(query: JSON, params: JSON, key: JSON): UserProfile
      getUserProfile(parent, args, content, ast) {
        const feathersParams = convertArgs(args, content, ast);
        return userProfiles.get(args.key, feathersParams).then(extractFirstItem);
      },

      // findUserProfile(query: JSON, params: JSON): [UserProfile!]
      findUserProfile(parent, args, content, ast) {
        const feathersParams = convertArgs(args, content, ast, { query: { $sort: {   _id: 1 } } });
        return userProfiles.find(feathersParams).then(paginate(content)).then(extractAllItems);
      },
      // !end

      // !<DEFAULT> code: query-UserTeam
      // getUserTeam(query: JSON, params: JSON, key: JSON): UserTeam
      getUserTeam(parent, args, content, ast) {
        const feathersParams = convertArgs(args, content, ast);
        return userTeams.get(args.key, feathersParams).then(extractFirstItem);
      },

      // findUserTeam(query: JSON, params: JSON): [UserTeam!]
      findUserTeam(parent, args, content, ast) {
        const feathersParams = convertArgs(args, content, ast, { query: { $sort: {   teamId: 1,   userId: 1 } } });
        return userTeams.find(feathersParams).then(paginate(content)).then(extractAllItems);
      },
      // !end

      // !<DEFAULT> code: query-User
      // getUser(query: JSON, params: JSON, key: JSON): User
      getUser(parent, args, content, ast) {
        const feathersParams = convertArgs(args, content, ast);
        return users.get(args.key, feathersParams).then(extractFirstItem);
      },

      // findUser(query: JSON, params: JSON): [User!]
      findUser(parent, args, content, ast) {
        const feathersParams = convertArgs(args, content, ast, { query: { $sort: {   lastName: 1,   firstName: 1 } } });
        return users.find(feathersParams).then(paginate(content)).then(extractAllItems);
      },
      // !end
      // !code: resolver_query_more // !end
    },
  };

  // !code: func_return // !end
  return returns;
};

// !code: more // !end

// !code: exports // !end
module.exports = moduleExports;

function paginate(content) {
  return result => {
    content.pagination = !result.data ? undefined : {
      total: result.total,
      limit: result.limit,
      skip: result.skip,
    };

    return result;
  };
}

// !code: funcs // !end
// !code: end // !end
