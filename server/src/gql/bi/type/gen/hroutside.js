const typeDefs = `

type CubeDataHR {id: Int!,
   cube_no: String,
   fin_code: String,
   ops_code: String,
   cat_4th: String,
   control_element: String,
   cat_3rd: String,
   control_center: String,
   t_run: String,
   count: Int,
   count_distinct: Int,
   trader_no: String,
   employee_no: String,
   biz_code: String,
   cat_5th: String,
   trader_name: String,
   employee_name: String,
   t_time: Float,
   data_i: Int,
   service_no: String,
   sales_code: String,
   amount: Float,
   pct: Float,
   data_f: Float,
   remarks: String,
   cat_1st: String,
   cat_2nd: String,
   }

`;

const hroutsideTypeDefs = [typeDefs]
export default hroutsideTypeDefs;

//  2017-08-02 22:02:24.453802+08