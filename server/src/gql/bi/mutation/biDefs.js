const mutationDefs = ` 

initiate_entry_summary_by_month(month: String!): JSON,

calculate_entry_summary_by_month(month: String!): JSON,

lock_entry_summary_by_month(month: String!): JSON,

`;

const biDefsMutationDefs = [mutationDefs]
export { biDefsMutationDefs };