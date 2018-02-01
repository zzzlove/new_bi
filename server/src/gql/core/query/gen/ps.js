const queryDefs = ` 

fieldoption_one(
   id: Int,
   option_id: Int,
   value: String,
   value_parent: String,
   text: String,
   function_desc: String,
   value_level: Int,
   disabled: Boolean,
   script_out: String,
   option_code: String,
   xorder: Int, ): FieldOption 

fieldoption(
   id: [Int],
   option_id: Int,
   value: String,
   value_parent: String,
   text: String,
   function_desc: String,
   value_level: Int,
   disabled: Boolean,
   script_out: String,
   option_code: String,
   xorder: Int,
   likeValue: String,
   likeColumns: [String],
   offset: Int,
   limit: Int,
   order: [String],): [FieldOption] 

`;

const psQueryDefs = [queryDefs]
export default psQueryDefs;

//  2017-10-11 15:04:13.492938+08