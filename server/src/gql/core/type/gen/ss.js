const typeDefs = ` 
scalar JSON

type Mutations {id: ID!,
  model_id: ID,
  model_name: String,
  user_id: ID,
  user_name: String,
  created_at: Float,
  type: String,
  content: JSON,
  obj_id: ID,
  criteria: JSON,
  obj_cid: String,
  updated_at: Float,
   
   }

input MutationsInput {id: ID,
  model_id: ID,
  model_name: String,
  user_id: ID,
  user_name: String,
  created_at: Float,
  type: String,
  content: JSON,
  obj_id: ID,
  criteria: JSON,
  obj_cid: String,
  updated_at: Float,
   }

type LoginHistory {id: ID!,
  user_id: ID,
  login_name: String,
  host_name: String,
  login_time: Float,
   
   }

input LoginHistoryInput {id: ID,
  user_id: ID,
  login_name: String,
  host_name: String,
  login_time: Float,
   }

type ElementAuth {id: ID!,
  frame_id: ID,
  element_id: ID,
  role_applied: String,
  element_code: String,
  permitted: Boolean,
  created_at: Float,
  updated_at: Float,
  deleted_at: Float,
  type: String,
  client_id: ID,
   
   }

input ElementAuthInput {id: ID,
  frame_id: ID,
  element_id: ID,
  role_applied: String,
  element_code: String,
  permitted: Boolean,
  created_at: Float,
  updated_at: Float,
  deleted_at: Float,
  type: String,
  client_id: ID,
   }

`;

const ssTypeDefs = [typeDefs]
export default ssTypeDefs;

//  2018-01-24 17:37:05.099404+08