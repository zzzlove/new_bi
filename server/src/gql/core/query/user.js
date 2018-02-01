const queryDefs = `
  user(id: ID, field: String, keyword: String, roles: [String]): [User]
`;

const userQueryDefs = [queryDefs]
export default userQueryDefs;
