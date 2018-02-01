const queryDefs = ` 

sales_yd_amount_in_cm_gb_day(ops_id: [Int!]): [ChartSimpleXY],

sales_yd_amount_in_cy_gb_month(ops_id: [Int!]): [ChartSimpleXY],

sales_yd_amount_in_p12m_gb_month(ops_id: [Int!]): [ChartSimpleXY],

sales_yd_tradercount_in_p12m_gb_month(ops_id: [Int!]): [ChartSimpleXY],

sales_yd_tradercount_in_currentyear(ops_id: [Int!]): Float,

sales_yd_tradercount_in_lastyear(ops_id: [Int!]): Float,

sales_yd_amount_ytd_in_currentyear(ops_id: [Int!]): Float,

sales_yd_amount_ytd_in_lastyear(ops_id: [Int!]): Float,

sales_yd_amount_range_gb_tradercode_mode(ops_id: [Int!], mode: String!, started_at: String!, finished_at: String!): [ChartSimpleXCYY],

sales_yd_amount_range_gb_depart_dest(ops_id: [Int!], mode: String!, started_at: String!, finished_at: String!): [ChartSimpleCY],

sales_yd_amount_range_gb_tradername(ops_id: [Int!], mode: String!, started_at: String!, finished_at: String!): [ChartSimpleCY],

sales_yd_amount_tradername_gb_range(ops_id: [Int!], mode: String!, started_at: String!, finished_at: String!, trader_name: String!): [ChartSimpleXY],

sales_yd_amount_tradername_range_gb_service(ops_id: [Int!], mode: String!, started_at: String!, finished_at: String!, trader_name: String!): [ChartSimpleCY],

sales_yd_amount_service_gb_range(ops_id: [Int!], mode: String!, started_at: String!, finished_at: String!, service_no: String!): [ChartSimpleXY],

sales_yd_amount_service_range_gb_tradername(ops_id: [Int!], mode: String!, started_at: String!, finished_at: String!, service_no: String!): [ChartSimpleCY],

depart_count_in_cm_gb_day(ops_id: [Int!]): [ChartSimpleXY],

order_sales_ops_details(order_id: Int!): JSON,

`;

const biDefsQueryDefs = [queryDefs]
export { biDefsQueryDefs };

/*
ac6001_in_cm_gb_day(ops_id: [Int!]): [ChartSimpleXY],

ac6001_in_cy_gb_month(ops_id: [Int!]): [ChartSimpleXY],

ac4103_in_cm_gb_day(ops_id: [Int!]): [ChartSimpleXY],

ac4103_in_cy_gb_month(ops_id: [Int!]): [ChartSimpleXY],

ac6001_range_gb_status(ops_id: [Int!], mode: String!, started_at: String!, finished_at: String!): [ChartSimpleXCY],

ac6401_range_gb_status(ops_id: [Int!], mode: String!, started_at: String!, finished_at: String!): [ChartSimpleXCY],

ac4103_range_gb_status_ac(ops_id: [Int!], mode: String!, started_at: String!, finished_at: String!): [ChartSimpleXCCY],
*/