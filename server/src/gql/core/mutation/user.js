const mutationDefs = `
destroyUser(id: ID!): Boolean,

restoreUser(id: ID!): Boolean,

createUser(input_content: UserInput): User,

updateUser(id: ID!, input_content: UserInput): User,

changeUserDefaultCode(id: ID!, input_content: UserDefaultInput): User,
`;

const userMutationDefs = [mutationDefs]
export default userMutationDefs;
