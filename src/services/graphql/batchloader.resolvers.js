
/* eslint-disable no-unused-vars */
// Define GraphQL resolvers using Feathers services and BatchLoaders. (Can be re-generated.)
const { getByDot, setByDot } = require('feathers-hooks-common');
// !code: imports // !end
// !code: init // !end

let moduleExports = function batchLoaderResolvers(app, options) {
  // eslint-disable-next-line
  let { convertArgsToParams, convertArgsToFeathers, extractAllItems, extractFirstItem,
    feathersBatchLoader: { feathersBatchLoader } } = options;

  // !<DEFAULT> code: max-batch-size
  let defaultPaginate = app.get('paginate');
  let maxBatchSize = defaultPaginate && typeof defaultPaginate.max === 'number' ?
    defaultPaginate.max : undefined;
  // !end

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

  // !<DEFAULT> code: get-result
  // Given a fieldName in the parent record, return the result from a BatchLoader
  // The result will be an object (or null), or an array of objects (possibly empty).
  function getResult(batchLoaderName, fieldName, isArray) {
    const contentByDot = `batchLoaders.${batchLoaderName}`;

    // `content.app = app` is the Feathers app object.
    // `content.batchLoaders = {}` is where the BatchLoaders for a request are stored.
    return (parent, args, content, ast) => {
      let batchLoader = getByDot(content, contentByDot);

      if (!batchLoader) {
        batchLoader = getBatchLoader(batchLoaderName, parent, args, content, ast);
        setByDot(content, contentByDot, batchLoader);
      }

      const returns1 = batchLoader.load(parent[fieldName]);
      return !isArray ? returns1 : returns1.then(result => result || []);
    };
  }
  // !end

  // A transient BatchLoader can be created only when (one of) its resolver has been called,
  // as the BatchLoader loading function may require data from the 'args' passed to the resolver.
  // Note that each resolver's 'args' are static throughout a GraphQL call.
  function getBatchLoader(dataLoaderName, parent, args, content, ast) {
    let feathersParams;

    switch (dataLoaderName) {
    /* Persistent BatchLoaders. Stored in `content.batchLoaders._persisted`. */
    // !<DEFAULT> code: bl-persisted
    // case '_persisted.user.one.id': // service user, returns one object, key is field id
    // !end

    /* Transient BatchLoaders shared among resolvers. Stored in `content.batchLoaders._shared`. */
    // !<DEFAULT> code: bl-shared
    // *.*: User
    // case '_shared.user.one.id': // service user, returns one object, key is field id
    // !end

    /* Transient BatchLoaders used by only one resolver. Stored in `content.batchLoaders`. */

    // ChatMessage.team(query: JSON, params: JSON, key: JSON): Team
    // !<DEFAULT> code: bl-ChatMessage-team
    case 'ChatMessage.team':
      return feathersBatchLoader(dataLoaderName, '', '_id',
        keys => {
          feathersParams = convertArgs(args, content, null, {
            query: { _id: { $in: keys }, $sort: undefined },
            _populate: 'skip', paginate: false
          });
          return teams.find(feathersParams);
        },
        maxBatchSize // Max #keys in a BatchLoader func call.
      );
      // !end

    // ChatMessage.owner(query: JSON, params: JSON, key: JSON): User!
    // !<DEFAULT> code: bl-ChatMessage-owner
    case 'ChatMessage.owner':
      return feathersBatchLoader(dataLoaderName, '!', '_id',
        keys => {
          feathersParams = convertArgs(args, content, null, {
            query: { _id: { $in: keys }, $sort: undefined },
            _populate: 'skip', paginate: false
          });
          return users.find(feathersParams);
        },
        maxBatchSize // Max #keys in a BatchLoader func call.
      );
      // !end

    // ChatMessage.user(query: JSON, params: JSON, key: JSON): User
    // !<DEFAULT> code: bl-ChatMessage-user
    case 'ChatMessage.user':
      return feathersBatchLoader(dataLoaderName, '', '_id',
        keys => {
          feathersParams = convertArgs(args, content, null, {
            query: { _id: { $in: keys }, $sort: undefined },
            _populate: 'skip', paginate: false
          });
          return users.find(feathersParams);
        },
        maxBatchSize // Max #keys in a BatchLoader func call.
      );
      // !end

    // LogMessage.owner(query: JSON, params: JSON, key: JSON): User
    // !<DEFAULT> code: bl-LogMessage-owner
    case 'LogMessage.owner':
      return feathersBatchLoader(dataLoaderName, '', '_id',
        keys => {
          feathersParams = convertArgs(args, content, null, {
            query: { _id: { $in: keys }, $sort: undefined },
            _populate: 'skip', paginate: false
          });
          return users.find(feathersParams);
        },
        maxBatchSize // Max #keys in a BatchLoader func call.
      );
      // !end

    // LogMessage.user(query: JSON, params: JSON, key: JSON): User
    // !<DEFAULT> code: bl-LogMessage-user
    case 'LogMessage.user':
      return feathersBatchLoader(dataLoaderName, '', '_id',
        keys => {
          feathersParams = convertArgs(args, content, null, {
            query: { _id: { $in: keys }, $sort: undefined },
            _populate: 'skip', paginate: false
          });
          return users.find(feathersParams);
        },
        maxBatchSize // Max #keys in a BatchLoader func call.
      );
      // !end

    // Role.users: [User!]
    // !<DEFAULT> code: bl-Role-users
    case 'Role.users':
      return feathersBatchLoader(dataLoaderName, '[!]', 'roleId',
        keys => {
          feathersParams = convertArgs(args, content, null, {
            query: { roleId: { $in: keys }, $sort: undefined },
            _populate: 'skip', paginate: false
          });
          return users.find(feathersParams);
        },
        maxBatchSize // Max #keys in a BatchLoader func call.
      );
      // !end

    // Team.members: [User!]
    // !<DEFAULT> code: bl-Team-members
    case 'Team.members':
      return feathersBatchLoader(dataLoaderName, '[!]', '__NO_RELATION_OTHER_TABLE__',
        keys => {
          feathersParams = convertArgs(args, content, null, {
            query: { __NO_RELATION_OTHER_TABLE__: { $in: keys }, $sort: undefined },
            _populate: 'skip', paginate: false
          });
          return users.find(feathersParams);
        },
        maxBatchSize // Max #keys in a BatchLoader func call.
      );
      // !end

    // UserProfile.user: User!
    // !<DEFAULT> code: bl-UserProfile-user
    case 'UserProfile.user':
      return feathersBatchLoader(dataLoaderName, '!', 'profileId',
        keys => {
          feathersParams = convertArgs(args, content, null, {
            query: { profileId: { $in: keys }, $sort: undefined },
            _populate: 'skip', paginate: false
          });
          return users.find(feathersParams);
        },
        maxBatchSize // Max #keys in a BatchLoader func call.
      );
      // !end

    // User.role(query: JSON, params: JSON, key: JSON): Role
    // !<DEFAULT> code: bl-User-role
    case 'User.role':
      return feathersBatchLoader(dataLoaderName, '', '_id',
        keys => {
          feathersParams = convertArgs(args, content, null, {
            query: { _id: { $in: keys }, $sort: undefined },
            _populate: 'skip', paginate: false
          });
          return roles.find(feathersParams);
        },
        maxBatchSize // Max #keys in a BatchLoader func call.
      );
      // !end

    // User.profile(query: JSON, params: JSON, key: JSON): UserProfile
    // !<DEFAULT> code: bl-User-profile
    case 'User.profile':
      return feathersBatchLoader(dataLoaderName, '', '_id',
        keys => {
          feathersParams = convertArgs(args, content, null, {
            query: { _id: { $in: keys }, $sort: undefined },
            _populate: 'skip', paginate: false
          });
          return userProfiles.find(feathersParams);
        },
        maxBatchSize // Max #keys in a BatchLoader func call.
      );
      // !end

    // User.teams: [Team!]
    // !<DEFAULT> code: bl-User-teams
    case 'User.teams':
      return feathersBatchLoader(dataLoaderName, '[!]', '__NO_RELATION_OTHER_TABLE__',
        keys => {
          feathersParams = convertArgs(args, content, null, {
            query: { __NO_RELATION_OTHER_TABLE__: { $in: keys }, $sort: undefined },
            _populate: 'skip', paginate: false
          });
          return teams.find(feathersParams);
        },
        maxBatchSize // Max #keys in a BatchLoader func call.
      );
      // !end

    /* Throw on unknown BatchLoader name. */
    default:
      // !<DEFAULT> code: bl-default
      throw new Error(`GraphQL query requires BatchLoader named '${dataLoaderName}' but no definition exists for it.`);
      // !end
    }
  }

  let returns = {

    ChatMessage: {

      // team(query: JSON, params: JSON, key: JSON): Team
      // !<DEFAULT> code: resolver-ChatMessage-team
      team: getResult('ChatMessage.team', 'teamId'),
      // !end

      // owner(query: JSON, params: JSON, key: JSON): User!
      // !<DEFAULT> code: resolver-ChatMessage-owner
      owner: getResult('ChatMessage.owner', 'ownerId'),
      // !end

      // user(query: JSON, params: JSON, key: JSON): User
      // !<DEFAULT> code: resolver-ChatMessage-user
      user: getResult('ChatMessage.user', 'userId'),
      // !end
    },

    LogMessage: {

      // owner(query: JSON, params: JSON, key: JSON): User
      // !<DEFAULT> code: resolver-LogMessage-owner
      owner: getResult('LogMessage.owner', 'ownerId'),
      // !end

      // user(query: JSON, params: JSON, key: JSON): User
      // !<DEFAULT> code: resolver-LogMessage-user
      user: getResult('LogMessage.user', 'userId'),
      // !end
    },

    Role: {

      // users: [User!]
      // !<DEFAULT> code: resolver-Role-users
      users: getResult('Role.users', '_id', true),
      // !end
    },

    Team: {

      // members: [User!]
      // !<DEFAULT> code: resolver-Team-members
      members: getResult('Team.members', '__NO_RELATION_OUR_TABLE__', true),
      // !end
    },

    UserProfile: {

      // addressFull: String!
      // !<DEFAULT> code: resolver-UserProfile-addressFull-non
      addressFull: (parent, args, content, ast) => { throw Error('GraphQL fieldName UserProfile.addressFull is not calculated.'); },
      // !end

      // user: User!
      // !<DEFAULT> code: resolver-UserProfile-user
      user: getResult('UserProfile.user', '_id'),
      // !end
    },

    UserTeam: {
    },

    User: {

      // fullName: String!
      // !<DEFAULT> code: resolver-User-fullName-non
      fullName: (parent, args, content, ast) => { throw Error('GraphQL fieldName User.fullName is not calculated.'); },
      // !end

      // role(query: JSON, params: JSON, key: JSON): Role
      // !<DEFAULT> code: resolver-User-role
      role: getResult('User.role', 'roleId'),
      // !end

      // profile(query: JSON, params: JSON, key: JSON): UserProfile
      // !<DEFAULT> code: resolver-User-profile
      profile: getResult('User.profile', 'profileId'),
      // !end

      // teams: [Team!]
      // !<DEFAULT> code: resolver-User-teams
      teams: getResult('User.teams', '__NO_RELATION_OUR_TABLE__', true),
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
