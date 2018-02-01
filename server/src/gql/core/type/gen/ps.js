const typeDefs = ` 
scalar JSON

type FieldOption {id: Int!,
  option_id: Int,
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

input FieldOptionInput {id: Int,
  option_id: Int,
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

//  2017-10-11 15:04:13.492938+08