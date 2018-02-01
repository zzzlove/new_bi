const typeDefs = `
type User {
  id: ID!
  name: String,
  username: String,
  password: String,
  profile_id: ID,
  fin_id: ID,
  ops_id: ID,
  sales_id: ID,  
  started_at: Float,
  finished_at: Float,
  disabled: Boolean,
  created_at: Float,
  updated_at: Float,
  deleted_at: Float,
  fin_code: String,
  ops_code: String,
  sales_code: String,
  fin_code_all: [String],
  ops_code_all: [String],
  sales_code_all: [String],
  roles: [String],
  product_no_all: [String],
  service_no_all: [String],
  company_code: String,
  control_center_all: [String],
  control_center_ids: [String],
  control_ids: [String],
  concerning_ids: [String],
}

input UserInput {id: ID,
  name: String,
  username: String,
  password: String,
  profile_id: ID,
  fin_id: ID,
  ops_id: ID,
  sales_id: ID,  
  started_at: Float,
  finished_at: Float,
  disabled: Boolean,
  created_at: Float,
  updated_at: Float,
  deleted_at: Float,
  fin_code: String,
  ops_code: String,
  sales_code: String,
  fin_code_all: [String],
  ops_code_all: [String],
  sales_code_all: [String],
  roles: [String],
  product_no_all: [String],
  service_no_all: [String],
  company_code: String,
  control_center_all: [String],
  control_center_ids: [String],
  control_ids: [String],
  concerning_ids: [String],
}

input UserDefaultInput {
  fin_id: ID,
  ops_id: ID,
  sales_id: ID,  
  fin_code: String,
  ops_code: String,
  sales_code: String,
  control_ids: [String],
  concerning_ids: [String],
}

`;



const userTypeDefs = [typeDefs]
export default userTypeDefs;
