const queryDefs = ` 

session_log_one(
   id: ID,
   user_name: String,
   model: String,
   create_at: [String],
   token: String,
   is_active: Int,
   active_time: Int, ): SessionLog 

session_log(
   id: [ID],
   user_name: String,
   model: String,
   create_at: [String],
   token: String,
   is_active: Int,
   active_time: Int,
   offset: Int,
   limit: Int,
   order: JSON,): [SessionLog] 

countSessionLog(
   id: [ID],
   user_name: String,
   model: String,
   create_at: [String],
   token: String,
   is_active: Int,
   active_time: Int,): Int

field_option_one(
   id: ID,
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

field_option(
   id: [ID],
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
   offset: Int,
   limit: Int,
   order: JSON,): [FieldOption] 

countFieldOption(
   id: [ID],
   option_id: Int,
   value: String,
   value_parent: String,
   text: String,
   function_desc: String,
   value_level: Int,
   disabled: Boolean,
   script_out: String,
   option_code: String,
   xorder: Int,): Int

`;

const psQueryDefs = [queryDefs]
export default psQueryDefs;

//  2018-01-24 17:32:03.711735+08