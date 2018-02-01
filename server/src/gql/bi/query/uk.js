const queryDefs = ` 

sales_uk_all_amount_in_p12m_gb_month(ops_id: [Int!]): [ChartSimpleXY],

sales_uk_ct_amount_in_p12m_gb_month(ops_id: [Int!]): [ChartSimpleXY],

sales_uk_uk_amount_in_p12m_gb_month(ops_id: [Int!]): [ChartSimpleXY],

sales_uk_amount_ytd_gr_year(ops_id: [Int!]): [ChartSimpleXCY],

sales_uk_all_amount_range_gb_bizcode(ops_id: [Int!], mode: String!, started_at: String!, finished_at: String!): [ChartSimpleXCY],

sales_uk_amount_range_gb_tradername(ops_id: [Int!], mode: String!, started_at: String!, finished_at: String!): [ChartSimpleCY],

sales_uk_amount_range_gb_opscode(ops_id: [Int!], mode: String!, started_at: String!, finished_at: String!): [ChartSimpleCY],

`;

const ukDefsQueryDefs = [queryDefs]
export { ukDefsQueryDefs };

