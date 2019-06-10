
/* eslint-disable no-unused-vars, indent */
// Define GraphQL resolvers using only Feathers services. (Can be re-generated.)
// !code: imports // !end
// !code: init // !end

let moduleExports = function serviceResolvers(app, options) {
  const {convertArgsToFeathers, extractAllItems, extractFirstItem} = options;
  // !<DEFAULT> code: extra_auth_props
  const convertArgs = convertArgsToFeathers([]);
  // !end

  // !<DEFAULT> code: services
  let roles = app.service('/roles');
  let teams = app.service('/teams');
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
        // !<DEFAULT> code: resolver-Team-members
        (parent, args, content, ast) => {
          const feathersParams = convertArgs(args, content, ast, {
            query: { _id: { $in: parent.memberIds }, $sort: undefined }, paginate: false
          });
          return users.find(feathersParams).then(extractAllItems);
        },
        // !end
    },

    UserTeam: {
    },

    User: {

      // fullName: String!
      fullName:
        // !code: resolver-User-fullName-non
        (parent, args, content, ast) => { return `${parent.firstName} ${parent.lastName}`; },
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

      // teams(query: JSON, params: JSON, key: JSON): [Team!]
      teams:
        // !<DEFAULT> code: resolver-User-teams
        (parent, args, content, ast) => {
          const feathersParams = convertArgs(args, content, ast, {
            query: { $sort: undefined }, paginate: false
          });

          if (!(content.cache.User && content.cache.User.teams)) {
            content.cache.User = content.cache.User || {};
            content.cache.User.teams = teams.find(feathersParams).then(extractAllItems);
          }

          return Promise.resolve(content.cache.User.teams)
            .then(res => res.filter(rec => rec.memberIds.map(key => key.toString()).indexOf(parent._id.toString()) !== -1));
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
