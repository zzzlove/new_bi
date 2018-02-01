const mutationDefs = ` 

destroyMutations(id: ID!): Boolean,

createMutations(input_content: MutationsInput): Mutations,

updateMutations(id: ID!, input_content: MutationsInput): Mutations,

updateManyMutations(id: [ID], input_content: MutationsInput): Boolean,

destroyLoginHistory(id: ID!): Boolean,

createLoginHistory(input_content: LoginHistoryInput): LoginHistory,

updateLoginHistory(id: ID!, input_content: LoginHistoryInput): LoginHistory,

updateManyLoginHistory(where_content: LoginHistoryInput, input_content: LoginHistoryInput): Boolean,

destroyElementAuth(id: ID!): Boolean,

restoreElementAuth(id: ID!): Boolean,

createElementAuth(input_content: ElementAuthInput): ElementAuth,

updateElementAuth(id: ID!, input_content: ElementAuthInput): ElementAuth,

updateManyElementAuth(id: [ID], input_content: ElementAuthInput): Boolean,

`;

const ssMutationDefs = [mutationDefs]
export default ssMutationDefs;

//  2018-01-24 17:37:05.099404+08