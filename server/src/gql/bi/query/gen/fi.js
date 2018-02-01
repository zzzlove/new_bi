const queryDefs = ` 

entry_one(
   id: ID,
   entry_no: String,
   account_no: String,
   account_name: String,
   type: [String],
   amount: Float,
   status: [String],
   locked_status: String,
   fin_id: [Int],
   ops_id: [Int],
   trader_id: Int,
   trader_name: String,
   voucher_desc: String,
   posting_at: [Float],
   started_at: [Float],
   created_at: [Float],
   updated_at: [Float],
   reference_type: String,
   reference_id: Int,
   reference_no: String,
   transaction_no: String,
   report_period: String,
   deleted_at: [Float],
   started_by: String,
   deleted_by: String,
   amount_sumup: Float,
   related_item: [String], ): Entry 

entry(
   id: [ID],
   entry_no: String,
   account_no: String,
   account_name: String,
   type: [String],
   amount: Float,
   status: [String],
   locked_status: String,
   fin_id: [Int],
   ops_id: [Int],
   trader_id: Int,
   trader_name: String,
   voucher_desc: String,
   posting_at: [Float],
   started_at: [Float],
   created_at: [Float],
   updated_at: [Float],
   reference_type: String,
   reference_id: Int,
   reference_no: String,
   transaction_no: String,
   report_period: String,
   deleted_at: [Float],
   started_by: String,
   deleted_by: String,
   amount_sumup: Float,
   related_item: [String],
   offset: Int,
   limit: Int,
   order: JSON,): [Entry] 

countEntry(
   id: [ID],
   entry_no: String,
   account_no: String,
   account_name: String,
   type: [String],
   amount: Float,
   status: [String],
   locked_status: String,
   fin_id: [Int],
   ops_id: [Int],
   trader_id: Int,
   trader_name: String,
   voucher_desc: String,
   posting_at: [Float],
   started_at: [Float],
   created_at: [Float],
   updated_at: [Float],
   reference_type: String,
   reference_id: Int,
   reference_no: String,
   transaction_no: String,
   report_period: String,
   deleted_at: [Float],
   started_by: String,
   deleted_by: String,
   amount_sumup: Float,
   related_item: [String],): Int

entry_summary_one(
   id: ID,
   fin_id: [Int],
   ops_id: [Int],
   ops_code: String,
   report_period: String,
   item: String,
   amount_init: Float,
   amount_actual: Float,
   amount: Float,
   amount_adj: Float,
   amount_ytd: Float,
   amount_posted: Float,
   amount_unposted: Float,
   account_no: String, ): EntrySummary 

entry_summary(
   id: [ID],
   fin_id: [Int],
   ops_id: [Int],
   ops_code: String,
   report_period: String,
   item: String,
   amount_init: Float,
   amount_actual: Float,
   amount: Float,
   amount_adj: Float,
   amount_ytd: Float,
   amount_posted: Float,
   amount_unposted: Float,
   account_no: String,
   offset: Int,
   limit: Int,
   order: JSON,): [EntrySummary] 

countEntrySummary(
   id: [ID],
   fin_id: [Int],
   ops_id: [Int],
   ops_code: String,
   report_period: String,
   item: String,
   amount_init: Float,
   amount_actual: Float,
   amount: Float,
   amount_adj: Float,
   amount_ytd: Float,
   amount_posted: Float,
   amount_unposted: Float,
   account_no: String,): Int

account_one(
   id: ID,
   code: String,
   type: [String],
   name: String,
   parent_id: Int,
   sub_type: String,
   concerning_biz: [String], ): Account 

account(
   id: [ID],
   code: String,
   type: [String],
   name: String,
   parent_id: Int,
   sub_type: String,
   concerning_biz: [String],
   offset: Int,
   limit: Int,
   order: JSON,): [Account] 

countAccount(
   id: [ID],
   code: String,
   type: [String],
   name: String,
   parent_id: Int,
   sub_type: String,
   concerning_biz: [String],): Int

`;

const fiQueryDefs = [queryDefs]
export default fiQueryDefs;

//  2018-01-25 08:14:33.345891+08