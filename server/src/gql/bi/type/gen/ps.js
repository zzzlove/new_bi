const typeDefs = ` 
scalar JSON

type SessionLog {id: ID!,
  user_name: String,
  model: String,
  create_at: String,
  token: String,
  is_active: Int,
  active_time: Int,
   
   }

input SessionLogInput {id: ID,
  user_name: String,
  model: String,
  create_at: String,
  token: String,
  is_active: Int,
  active_time: Int,
   }

type FieldOption {id: ID!,
  option_id: ID,
  value: String,
  value_parent: String,
  text: String,
  text_ml: JSON,
  function_desc: String,
  value_level: Int,
  disabled: Boolean,
  script_out: String,
  children: JSON,
  option_code: String,
  xorder: Int,
   
   }

input FieldOptionInput {id: ID,
  option_id: ID,
  value: String,
  value_parent: String,
  text: String,
  text_ml: JSON,
  function_desc: String,
  value_level: Int,
  disabled: Boolean,
  script_out: String,
  children: JSON,
  option_code: String,
  xorder: Int,
   }

`;

const psTypeDefs = [typeDefs]
export default psTypeDefs;

//  2018-01-24 17:32:03.711735+08