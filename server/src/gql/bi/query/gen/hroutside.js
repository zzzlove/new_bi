const queryDefs = `
cube_data_hr(cube_no: [String],
   fin_code: [String],
   ops_code: [String],
   cat_4th: [String],
   control_element: [String],
   cat_3rd: [String],
   cat_1st: [String],   
   control_center: [String],
   t_run: [String],
   trader_no: [String],
   employee_no: [String],
   service_no: [String],   
   biz_code: [String],
   trader_name: String,
   employee_name: String,
   t_time: Float,
   limit: Int,
   order: [String],): [CubeDataHR] 
`;

const hroutsideQueryDefs = [queryDefs]
export default hroutsideQueryDefs;

//  2017-08-02 22:02:24.453802+08