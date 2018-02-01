const mutationDefs = ` 

destroySessionLog(id: ID!): Boolean,

createSessionLog(input_content: SessionLogInput): SessionLog,

updateSessionLog(id: ID!, input_content: SessionLogInput): SessionLog,

updateManySessionLog(id: [ID], input_content: SessionLogInput): Boolean,

destroyFieldOption(id: ID!): Boolean,

createFieldOption(input_content: FieldOptionInput): FieldOption,

updateFieldOption(id: ID!, input_content: FieldOptionInput): FieldOption,

updateManyFieldOption(id: [ID], input_content: FieldOptionInput): Boolean,

`;

const psMutationDefs = [mutationDefs]
export default psMutationDefs;

//  2018-01-24 17:32:03.711735+08