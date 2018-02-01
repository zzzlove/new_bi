const queryDefs = ` 

mutations_one(
   id: ID,
   model_id: Int,
   model_name: String,
   user_id: Int,
   user_name: String,
   created_at: [Float],
   type: [String],
   obj_id: Int,
   obj_cid: String,
   updated_at: [Float], ): Mutations 

mutations(
   id: [ID],
   model_id: Int,
   model_name: String,
   user_id: Int,
   user_name: String,
   created_at: [Float],
   type: [String],
   obj_id: Int,
   obj_cid: String,
   updated_at: [Float],
   offset: Int,
   limit: Int,
   order: JSON,): [Mutations] 

countMutations(
   id: [ID],
   model_id: Int,
   model_name: String,
   user_id: Int,
   user_name: String,
   created_at: [Float],
   type: [String],
   obj_id: Int,
   obj_cid: String,
   updated_at: [Float],): Int

login_history_one(
   id: ID,
   user_id: Int,
   login_name: String,
   host_name: String,
   login_time: [Float], ): LoginHistory 

login_history(
   id: ID,
   user_id: Int,
   login_name: String,
   host_name: String,
   login_time: [Float],
   offset: Int,
   limit: Int,
   order: JSON,): [LoginHistory] 

element_auth_one(
   id: ID,
   frame_id: Int,
   element_id: Int,
   role_applied: [String],
   element_code: String,
   permitted: Boolean,
   created_at: [Float],
   updated_at: [Float],
   deleted_at: [Float],
   type: [String],
   client_id: Int, ): ElementAuth 

element_auth(
   id: [ID],
   frame_id: Int,
   element_id: Int,
   role_applied: [String],
   element_code: String,
   permitted: Boolean,
   created_at: [Float],
   updated_at: [Float],
   deleted_at: [Float],
   type: [String],
   client_id: Int,
   offset: Int,
   limit: Int,
   order: JSON,): [ElementAuth] 

countElementAuth(
   id: [ID],
   frame_id: Int,
   element_id: Int,
   role_applied: [String],
   element_code: String,
   permitted: Boolean,
   created_at: [Float],
   updated_at: [Float],
   deleted_at: [Float],
   type: [String],
   client_id: Int,): Int

`;

const ssQueryDefs = [queryDefs]
export default ssQueryDefs;

//  2018-01-24 17:37:05.099404+08