const mutationDefs = ` 

destroyEntrySummary(id: ID!): Boolean,

createEntrySummary(input_content: EntrySummaryInput): EntrySummary,

updateEntrySummary(id: ID!, input_content: EntrySummaryInput): EntrySummary,

updateManyEntrySummary(id: [ID], input_content: EntrySummaryInput): Boolean,

destroyEntry(id: ID!): Boolean,

restoreEntry(id: ID!): Boolean,

createEntry(input_content: EntryInput): Entry,

updateEntry(id: ID!, input_content: EntryInput): Entry,

updateManyEntry(id: [ID], input_content: EntryInput): Boolean,

destroyAccount(id: ID!): Boolean,

createAccount(input_content: AccountInput): Account,

updateAccount(id: ID!, input_content: AccountInput): Account,

updateManyAccount(id: [ID], input_content: AccountInput): Boolean,

`;

const fiMutationDefs = [mutationDefs]
export default fiMutationDefs;

//  2018-01-25 08:14:33.345891+08