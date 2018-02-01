const mutationDefs = ` 

destroyFieldOption(id: Int!): Boolean,

createFieldOption(input_content: FieldOptionInput): FieldOption,

upsertFieldOption(input_content: FieldOptionInput): FieldOption,

updateFieldOption(id: Int!, input_content: FieldOptionInput): FieldOption,

updateManyFieldOption(where_content: FieldOptionInput, input_content: FieldOptionInput): Boolean,

`;

const psMutationDefs = [mutationDefs]
export default psMutationDefs;

//  2017-10-11 15:04:13.492938+08