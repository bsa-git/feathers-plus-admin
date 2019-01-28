
// Define the combined GraphQL schema. (Can be re-generated.)
// !code: imports // !end
// !code: init // !end

let moduleExports = `
type Role {
  id: ID
  name: String
  users: [User!]
}
 
type Team {
  id: ID
  name: String
  memberIds: [String]
  members: [User!]
}
 
type User {
  id: ID
  email: String
  firstName: String
  lastName: String
  roleId: ID
  googleId: String
  githubId: String
  googleAccessToken: String
  githubAccessToken: String
  fullName: String!
  role(query: JSON, params: JSON, key: JSON): Role
  teams(query: JSON, params: JSON, key: JSON): [Team!]
}
 

type Query {
  getRole(key: JSON, query: JSON, params: JSON): Role
  findRole(query: JSON, params: JSON): [Role]!
  getTeam(key: JSON, query: JSON, params: JSON): Team
  findTeam(query: JSON, params: JSON): [Team]!
  getUser(key: JSON, query: JSON, params: JSON): User
  findUser(query: JSON, params: JSON): [User]!
}
`;

// !code: exports // !end
module.exports = moduleExports;

// !code: funcs // !end
// !code: end // !end
