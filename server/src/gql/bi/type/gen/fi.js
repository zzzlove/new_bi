const typeDefs = ` 
scalar JSON

type Entry {id: ID!,
  entry_no: String,
  account_no: String,
  account_name: String,
  type: String,
  amount: Float,
  status: String,
  locked_status: String,
  fin_id: ID,
  ops_id: ID,
  trader_id: ID,
  trader_name: String,
  voucher_desc: String,
  posting_at: Float,
  started_at: Float,
  created_at: Float,
  updated_at: Float,
  reference_type: String,
  reference_id: ID,
  reference_no: String,
  transaction_no: String,
  report_period: String,
  deleted_at: Float,
  started_by: String,
  deleted_by: String,
  amount_sumup: Float,
  related_item: [String],
   
   }

input EntryInput {id: ID,
  entry_no: String,
  account_no: String,
  account_name: String,
  type: String,
  amount: Float,
  status: String,
  locked_status: String,
  fin_id: ID,
  ops_id: ID,
  trader_id: ID,
  trader_name: String,
  voucher_desc: String,
  posting_at: Float,
  started_at: Float,
  created_at: Float,
  updated_at: Float,
  reference_type: String,
  reference_id: ID,
  reference_no: String,
  transaction_no: String,
  report_period: String,
  deleted_at: Float,
  started_by: String,
  deleted_by: String,
  amount_sumup: Float,
  related_item: [String],
   }

type EntrySummary {id: ID!,
  fin_id: ID,
  ops_id: ID,
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
   
   }

input EntrySummaryInput {id: ID,
  fin_id: ID,
  ops_id: ID,
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
   }

type Account {id: ID!,
  code: String,
  type: String,
  name: String,
  parent_id: ID,
  sub_type: String,
  concerning_biz: [String],
   
   }

input AccountInput {id: ID,
  code: String,
  type: String,
  name: String,
  parent_id: ID,
  sub_type: String,
  concerning_biz: [String],
   }

`;

const fiTypeDefs = [typeDefs]
export default fiTypeDefs;

//  2018-01-25 08:14:33.345891+08