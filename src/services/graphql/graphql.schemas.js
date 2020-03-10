
// Define the combined GraphQL schema. (Can be re-generated.)
// !code: imports // !end
// !code: init // !end

let moduleExports = `
type LogMessage {
  id: ID
  _id: ID
  gr: String
  pr: Int
  name: String
  ownerId: ID
  userId: ID
  msg: String
  owner(query: JSON, params: JSON, key: JSON): User
  user(query: JSON, params: JSON, key: JSON): User
}
 
type Role {
  id: ID
  _id: ID
  name: String
  description: String
  users: [User!]
}
 
type Team {
  id: ID
  _id: ID
  name: String
  description: String
  members: [User!]
}
 
type UserProfile {
  id: ID
  _id: ID
  personalPhone: String
  personalWebSite: String
  addressSuite: String
  addressStreet: String
  addressCity: String
  addressState: String
  addressStateAbbr: String
  addressCountry: String
  addressCountryCode: String
  addressZipCode: String
  addressLatitude: String
  addressLongitude: String
  jobCompanyName: String
  jobTitle: String
  jobType: String
  jobPhone: String
  jobWebSite: String
  jobEmail: String
  addressFull: String!
  user: User!
}
 
type UserTeam {
  id: ID
  _id: ID
  teamId: ID
  userId: ID
}
 
type User {
  id: ID
  _id: ID
  email: String
  firstName: String
  lastName: String
  avatar: String
  roleId: ID
  profileId: ID
  active: Boolean
  isVerified: Boolean
  verifyToken: String
  verifyShortToken: String
  verifyExpires: String
  verifyChanges: JSON
  resetToken: String
  resetShortToken: String
  resetExpires: String
  googleId: String
  githubId: String
  googleAccessToken: String
  googleRefreshToken: String
  githubAccessToken: String
  githubRefreshToken: String
  loginAt: String
  fullName: String!
  role(query: JSON, params: JSON, key: JSON): Role
  profile(query: JSON, params: JSON, key: JSON): UserProfile
  teams: [Team!]
}
 

type Query {
  getLogMessage(key: JSON, query: JSON, params: JSON): LogMessage
  findLogMessage(query: JSON, params: JSON): [LogMessage]!
  getRole(key: JSON, query: JSON, params: JSON): Role
  findRole(query: JSON, params: JSON): [Role]!
  getTeam(key: JSON, query: JSON, params: JSON): Team
  findTeam(query: JSON, params: JSON): [Team]!
  getUserProfile(key: JSON, query: JSON, params: JSON): UserProfile
  findUserProfile(query: JSON, params: JSON): [UserProfile]!
  getUserTeam(key: JSON, query: JSON, params: JSON): UserTeam
  findUserTeam(query: JSON, params: JSON): [UserTeam]!
  getUser(key: JSON, query: JSON, params: JSON): User
  findUser(query: JSON, params: JSON): [User]!
}
`;

// !code: exports // !end
module.exports = moduleExports;

// !code: funcs // !end
// !code: end // !end
