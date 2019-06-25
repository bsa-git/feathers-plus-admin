
/* eslint-disable no-unused-vars, indent */
// Define GraphQL resolvers using only Feathers services. (Can be re-generated.)
// !code: imports
const {inspector, getGraphQLContext} = require('../../plugins/lib');
const debug = require('debug')('app:service.graphql.resolvers');

// const isDebug = true;
const isLog = false;
// !end
// !code: init // !end

let moduleExports = function serviceResolvers(app, options) {
  const {convertArgsToFeathers, extractAllItems, extractFirstItem} = options;
  // !<DEFAULT> code: extra_auth_props
  const convertArgs = convertArgsToFeathers([]);
  // !end

  // !<DEFAULT> code: services
  let roles = app.service('/roles');
  let teams = app.service('/teams');
  let userProfiles = app.service('/user-profiles');
  let userTeams = app.service('/user-teams');
  let users = app.service('/users');
  // !end

  let returns = {

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
        async (parent, args, content, ast) => {
          // Get content.cache.User.userTeams
          if (!(content.cache.Team && content.cache.Team.userIdsForTeam)) {
            content.cache.Team = content.cache.Team || {};
            const userIdsForTeam = await userTeams.find({query: {teamId: parent._id.toString(),  $sort: {userId: 1}}}).then(extractAllItems);
            content.cache.Team.userIdsForTeam = userIdsForTeam.map(userTeam => userTeam.userId.toString());
            if(isLog) inspector('content.cache.Team.userIdsForTeam', content.cache.Team.userIdsForTeam);
          }
          // Set query for user
          const feathersParams = convertArgs(args, content, ast, {
            query: {_id: {$in: content.cache.Team.userIdsForTeam}, $sort: undefined}, paginate: false
          });
          if(isLog) inspector('Team.members.feathersParams', feathersParams);
          const usersForTeam = await users.find(feathersParams).then(extractAllItems);
          if(isLog) inspector('Team.members.usersForTeam', usersForTeam);
          return usersForTeam;
        },
        // !end
    },

    UserProfile: {
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

      // teams: [Team!]
      teams:
        // !code: resolver-User-teams
        async (parent, args, content, ast) => {

          // if(isLog) inspector('User.teams.parent', parent);
          if(isLog) inspector('User.teams.args', args);
          // if(isLog) inspector('User.teams.content', getGraphQLContext(content));

          const feathersParams = convertArgs(args, content, ast, {
            query: {$sort: undefined}, paginate: false
          });
          if(isLog) inspector('User.teams.feathersParams', feathersParams);
          // Get content.cache.User.teams
          if (!(content.cache.User && content.cache.User.teams)) {
            content.cache.User = content.cache.User || {};
            content.cache.User.teams = await teams.find(feathersParams).then(extractAllItems);
          }
          if(isLog) inspector('content.cache.User.teams', content.cache.User.teams);
          // Get content.cache.User.teamIdsForUser
          if (!(content.cache.User && content.cache.User.teamIdsForUser)) {
            content.cache.User = content.cache.User || {};
            const teamIdsForUser = await userTeams.find({query: {userId: parent._id.toString(), $sort: {teamId: 1}}}).then(extractAllItems);
            content.cache.User.teamIdsForUser = teamIdsForUser.map(userTeam => userTeam.teamId.toString());
            if(isLog) inspector('content.cache.User.teamIdsForUser', content.cache.User.teamIdsForUser);
          }
          // Get teams for user
          const teamsForUser = content.cache.User.teams.filter(team => content.cache.User.teamIdsForUser.indexOf(team._id.toString()) >= 0);
          if(isLog) inspector('User.teams.teamsForUser', teamsForUser);
          return teamsForUser;
        },
        // !end
    },

    // !code: resolver_field_more // !end

    Query: {

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
