const typeDefs = ` 
scalar JSON

type ControlCenterBudget {id: ID!,
  started_at: Float,
  control_center_id: ID,
  amount: Float,
  disabled: Boolean,
  t_month: String,
  finished_at: Float,
   
   }

input ControlCenterBudgetInput {id: ID,
  started_at: Float,
  control_center_id: ID,
  amount: Float,
  disabled: Boolean,
  t_month: String,
  finished_at: Float,
   }

type RmControlCenterEquipment {id: ID!,
  control_center_id: ID,
  equipment_id: ID,
   ControlCenter: ControlCenter
   }

input RmControlCenterEquipmentInput {id: ID,
  control_center_id: ID,
  equipment_id: ID,
   }

type MemberContract {id: ID!,
  member_id: ID,
  service_id: ID,
  employee_id: ID,
  type: String,
  round_trip: String,
  quantity: Int,
  unit_price: Float,
  started_at: Float,
  finished_at: Float,
  created_at: Float,
  updated_at: Float,
  deleted_at: Float,
  disabled: Boolean,
  remarks: String,
  member_name: String,
  service_name: String,
  employee_name: String,
   Servicex: Servicex
   }

input MemberContractInput {id: ID,
  member_id: ID,
  service_id: ID,
  employee_id: ID,
  type: String,
  round_trip: String,
  quantity: Int,
  unit_price: Float,
  started_at: Float,
  finished_at: Float,
  created_at: Float,
  updated_at: Float,
  deleted_at: Float,
  disabled: Boolean,
  remarks: String,
  member_name: String,
  service_name: String,
  employee_name: String,
   }

type RmControlCenterProfile {id: ID!,
  client_id: ID,
  profile_id: ID,
  control_center_id: ID,
  cat_2nd: String,
  cat_1st: String,
  client_name: String,
  disabled: Boolean,
  started_at: Float,
  finished_at: Float,
   ControlCenter: ControlCenter
   }

input RmControlCenterProfileInput {id: ID,
  client_id: ID,
  profile_id: ID,
  control_center_id: ID,
  cat_2nd: String,
  cat_1st: String,
  client_name: String,
  disabled: Boolean,
  started_at: Float,
  finished_at: Float,
   }

type Profile {id: ID!,
  name: String,
  name_ml: JSON,
  name_en: String,
  profile_no: String,
  type: String,
  status: String,
  fin_code: String,
  sales_code: String,
  ops_code: String,
  started_at: Float,
  finished_at: Float,
  created_at: Float,
  updated_at: Float,
  deleted_at: Float,
  locked_status: String,
  icon: String,
  name_abbr: String,
  cat_1st: String,
  cat_2nd: String,
  cat_3rd: String,
  ext_iid: Int,
  is_fin_code: Boolean,
  is_biz_code: Boolean,
  biz_code_type: String,
  biz_code_sub_type: String,
  types: [String],
  biz_codes: [String],
  full_name: String,
  grade: String,
  readable: [String],
  parent_id: ID,
  created_by: String,
  city_id: ID,
  fin_id: ID,
  ops_id: ID,
  sales_id: ID,
  address: String,
  sys_client_id: ID,
  uid: String,
  control_ids: [String],
  concerning_ids: [String],
   
   }

input ProfileInput {id: ID,
  name: String,
  name_ml: JSON,
  name_en: String,
  profile_no: String,
  type: String,
  status: String,
  fin_code: String,
  sales_code: String,
  ops_code: String,
  started_at: Float,
  finished_at: Float,
  created_at: Float,
  updated_at: Float,
  deleted_at: Float,
  locked_status: String,
  icon: String,
  name_abbr: String,
  cat_1st: String,
  cat_2nd: String,
  cat_3rd: String,
  ext_iid: Int,
  is_fin_code: Boolean,
  is_biz_code: Boolean,
  biz_code_type: String,
  biz_code_sub_type: String,
  types: [String],
  biz_codes: [String],
  full_name: String,
  grade: String,
  readable: [String],
  parent_id: ID,
  created_by: String,
  city_id: ID,
  fin_id: ID,
  ops_id: ID,
  sales_id: ID,
  address: String,
  sys_client_id: ID,
  uid: String,
  control_ids: [String],
  concerning_ids: [String],
   }

type ControlCenterStatus {id: ID!,
  control_center_id: ID,
  status: String,
  started_at: Float,
  finished_at: Float,
  remarks: String,
  term: String,
  control_center: String,
   
   }

input ControlCenterStatusInput {id: ID,
  control_center_id: ID,
  status: String,
  started_at: Float,
  finished_at: Float,
  remarks: String,
  term: String,
  control_center: String,
   }

type ControlCenterAlterType {id: ID!,
  defs_no: String,
  fit_area: String,
  amount_start: Float,
  amount_finish: Float,
  alter_type: String,
  xorder: Int,
   
   }

input ControlCenterAlterTypeInput {id: ID,
  defs_no: String,
  fit_area: String,
  amount_start: Float,
  amount_finish: Float,
  alter_type: String,
  xorder: Int,
   }

type MemberCatService {id: ID!,
  member_id: ID,
  service_id: ID,
  member_name: String,
  service_name: String,
  type: String,
  t_run: String,
  cat_1st: String,
  cat_2nd: String,
  cat_3rd: String,
  date1: Float,
  date2: Float,
  int1: Int,
  int2: Int,
  int3: Int,
  char1: String,
  char2: String,
  bi_element: String,
  bi_contral_center_id: ID,
  bi_contral_center_name: String,
  data_f: Int,
  int4: Int,
  num1: Float,
   
   }

input MemberCatServiceInput {id: ID,
  member_id: ID,
  service_id: ID,
  member_name: String,
  service_name: String,
  type: String,
  t_run: String,
  cat_1st: String,
  cat_2nd: String,
  cat_3rd: String,
  date1: Float,
  date2: Float,
  int1: Int,
  int2: Int,
  int3: Int,
  char1: String,
  char2: String,
  bi_element: String,
  bi_contral_center_id: ID,
  bi_contral_center_name: String,
  data_f: Int,
  int4: Int,
  num1: Float,
   }

type FinCodeActual {id: ID!,
  fin_code_id: ID,
  t_run: String,
  type: String,
  t_time: Float,
  amount: Float,
  count: Int,
  amount_avg: Float,
  amount_acc: Float,
  t_run_gr: String,
  amount_budget_acc: Float,
  amount_budget: Float,
  amount_compared: Float,
  amount_compared1: Float,
  amount_compared2: Float,
  count_distinct: Int,
  record_type: String,
  pct: Float,
  xorder: Int,
  fin_code: String,
  status: String,
  remarks: String,
  data_set: String,
  count_pct: Float,
  yoy_compared: Float,
  pop_compared: Float,
  control_center_id: ID,
  control_center_pid: Int,
  count_avg: Float,
  count_p50: Float,
  data_f: [String],
   
   }

input FinCodeActualInput {id: ID,
  fin_code_id: ID,
  t_run: String,
  type: String,
  t_time: Float,
  amount: Float,
  count: Int,
  amount_avg: Float,
  amount_acc: Float,
  t_run_gr: String,
  amount_budget_acc: Float,
  amount_budget: Float,
  amount_compared: Float,
  amount_compared1: Float,
  amount_compared2: Float,
  count_distinct: Int,
  record_type: String,
  pct: Float,
  xorder: Int,
  fin_code: String,
  status: String,
  remarks: String,
  data_set: String,
  count_pct: Float,
  yoy_compared: Float,
  pop_compared: Float,
  control_center_id: ID,
  control_center_pid: Int,
  count_avg: Float,
  count_p50: Float,
  data_f: [String],
   }

type ControlCenterRm {id: ID!,
  rm_type: String,
  children_id: ID,
  control_center_id: ID,
   SubCenter: ControlCenter,
   Parent: ControlCenter
   }

input ControlCenterRmInput {id: ID,
  rm_type: String,
  children_id: ID,
  control_center_id: ID,
   }

type OpsCodeActual {id: ID!,
  fin_code_id: ID,
  t_run: String,
  type: String,
  t_time: Float,
  amount: Float,
  count: Int,
  amount_avg: Float,
  amount_acc: Float,
  t_run_gr: String,
  amount_budget_acc: Float,
  amount_budget: Float,
  amount_compared: Float,
  amount_compared1: Float,
  amount_compared2: Float,
  count_distinct: Int,
  record_type: String,
  pct: Float,
  xorder: Int,
  ops_code: String,
  status: String,
  remarks: String,
  data_set: String,
  count_pct: Float,
  yoy_compared: Float,
  pop_compared: Float,
  control_center_id: ID,
  control_center_pid: Int,
  count_avg: Float,
  count_p50: Float,
  data_f: [String],
   
   }

input OpsCodeActualInput {id: ID,
  fin_code_id: ID,
  t_run: String,
  type: String,
  t_time: Float,
  amount: Float,
  count: Int,
  amount_avg: Float,
  amount_acc: Float,
  t_run_gr: String,
  amount_budget_acc: Float,
  amount_budget: Float,
  amount_compared: Float,
  amount_compared1: Float,
  amount_compared2: Float,
  count_distinct: Int,
  record_type: String,
  pct: Float,
  xorder: Int,
  ops_code: String,
  status: String,
  remarks: String,
  data_set: String,
  count_pct: Float,
  yoy_compared: Float,
  pop_compared: Float,
  control_center_id: ID,
  control_center_pid: Int,
  count_avg: Float,
  count_p50: Float,
  data_f: [String],
   }

type SignClientDayMonitoring {id: ID!,
  route_id: ID,
  route_name: String,
  line_id: ID,
  line_name: String,
  plan_team: Float,
  single_team_conf: Int,
  truck_head_num: Int,
  deploy_team_num: Float,
  trader_name: String,
  act_shp_num: Int,
  shipment_date: String,
  created_time_at: Float,
   
   }

input SignClientDayMonitoringInput {id: ID,
  route_id: ID,
  route_name: String,
  line_id: ID,
  line_name: String,
  plan_team: Float,
  single_team_conf: Int,
  truck_head_num: Int,
  deploy_team_num: Float,
  trader_name: String,
  act_shp_num: Int,
  shipment_date: String,
  created_time_at: Float,
   }

type ControlCenter {id: ID!,
  xorder: Int,
  owner: String,
  pct_done: Int,
  pct_done_acc: Int,
  pct_done_ytd: Int,
  type: String,
  status: String,
  amount: Float,
  amount_last: Float,
  amount_ytd: Float,
  children_ids: [String],
  amount_t1: Float,
  amount_t2: Float,
  show_title_ml: JSON,
  disabled: Boolean,
  code: String,
  cat_2nd: String,
  cat_3rd: String,
  cat_4th: String,
  name: String,
  show_title: String,
  cat_1st: String,
  finished_at: Float,
  started_at: Float,
   Servicex(service_no: [String], type: [String], control_center: [String], cat_1st: [String], cat_2nd: [String], cat_3rd: [String], cat_4th: [String], ops_code: [String], control_center_id: [Int]): [Servicex],
   Children(id: [ID], type: [String], status: [String]): [ControlCenter],
   ControlCenterBudget(control_center_id: [Int]): [ControlCenterBudget],
   LineParent: ControlCenterRm,
   CityParent: ControlCenterRm,
   ControlCenterActual(type: [String], control_center_id: [Int], control_element: [String], control_center: [String], record_type: [String]): [ControlCenterActual]
   }

input ControlCenterInput {id: ID,
  xorder: Int,
  owner: String,
  pct_done: Int,
  pct_done_acc: Int,
  pct_done_ytd: Int,
  type: String,
  status: String,
  amount: Float,
  amount_last: Float,
  amount_ytd: Float,
  children_ids: [String],
  amount_t1: Float,
  amount_t2: Float,
  show_title_ml: JSON,
  disabled: Boolean,
  code: String,
  cat_2nd: String,
  cat_3rd: String,
  cat_4th: String,
  name: String,
  show_title: String,
  cat_1st: String,
  finished_at: Float,
  started_at: Float,
   }

type ControlCenterActual {id: ID!,
  t_run: String,
  type: String,
  t_time: Float,
  amount: Float,
  count: Int,
  amount_avg: Float,
  amount_acc: Float,
  t_run_gr: String,
  amount_budget_acc: Float,
  amount_budget: Float,
  control_center_id: ID,
  control_element: String,
  control_center: String,
  amount_compared: Float,
  amount_compared1: Float,
  amount_compared2: Float,
  count_distinct: Int,
  record_type: String,
  pct: Float,
  xorder: Int,
  status: String,
  remarks: String,
  budget_acc_pct: Float,
  budget_pct: Float,
  data_set: String,
  count_pct: Float,
  yoy_compared: Float,
  pop_compared: Float,
  control_center_pid: Int,
  count_avg: Float,
  count_p50: Float,
  data_f: [String],
  cat_1st: String,
  cat_2nd: String,
  amount_bak: Int,
  count_bak: Float,
   
   }

input ControlCenterActualInput {id: ID,
  t_run: String,
  type: String,
  t_time: Float,
  amount: Float,
  count: Int,
  amount_avg: Float,
  amount_acc: Float,
  t_run_gr: String,
  amount_budget_acc: Float,
  amount_budget: Float,
  control_center_id: ID,
  control_element: String,
  control_center: String,
  amount_compared: Float,
  amount_compared1: Float,
  amount_compared2: Float,
  count_distinct: Int,
  record_type: String,
  pct: Float,
  xorder: Int,
  status: String,
  remarks: String,
  budget_acc_pct: Float,
  budget_pct: Float,
  data_set: String,
  count_pct: Float,
  yoy_compared: Float,
  pop_compared: Float,
  control_center_pid: Int,
  count_avg: Float,
  count_p50: Float,
  data_f: [String],
  cat_1st: String,
  cat_2nd: String,
  amount_bak: Int,
  count_bak: Float,
   }

type City {id: ID!,
  code: Int,
  name: String,
  location_detail: String,
  parent_id: ID,
  province: String,
  city: String,
  full_name: String,
  full_search_name: String,
  readable_pfids: [String],
  level: String,
  detail_name: String,
  full_py_name: String,
   
   }

input CityInput {id: ID,
  code: Int,
  name: String,
  location_detail: String,
  parent_id: ID,
  province: String,
  city: String,
  full_name: String,
  full_search_name: String,
  readable_pfids: [String],
  level: String,
  detail_name: String,
  full_py_name: String,
   }

type EquipmentActual {id: ID!,
  t_run: String,
  type: String,
  t_time: Float,
  amount: Float,
  count: Int,
  amount_avg: Float,
  amount_acc: Float,
  t_run_gr: String,
  amount_budget_acc: Float,
  amount_budget: Float,
  equipment_id: ID,
  record_type: String,
  pct: Float,
  xorder: Int,
  control_center_id: ID,
  ops_code: String,
  status: String,
  remarks: String,
  data_set: String,
  count_pct: Float,
  yoy_compared: Float,
  pop_compared: Float,
  control_center_pid: Int,
  count_avg: Float,
  count_p50: Float,
  data_f: [String],
  cat_1st: String,
   
   }

input EquipmentActualInput {id: ID,
  t_run: String,
  type: String,
  t_time: Float,
  amount: Float,
  count: Int,
  amount_avg: Float,
  amount_acc: Float,
  t_run_gr: String,
  amount_budget_acc: Float,
  amount_budget: Float,
  equipment_id: ID,
  record_type: String,
  pct: Float,
  xorder: Int,
  control_center_id: ID,
  ops_code: String,
  status: String,
  remarks: String,
  data_set: String,
  count_pct: Float,
  yoy_compared: Float,
  pop_compared: Float,
  control_center_pid: Int,
  count_avg: Float,
  count_p50: Float,
  data_f: [String],
  cat_1st: String,
   }

type MemberActual {id: ID!,
  member_id: ID,
  t_run: String,
  type: String,
  t_time: Float,
  amount: Float,
  count: Int,
  amount_avg: Float,
  amount_acc: Float,
  t_run_gr: String,
  amount_budget_acc: Float,
  amount_budget: Float,
  record_type: String,
  name: String,
  count_acc: Int,
  pct: Float,
  xorder: Int,
  status: String,
  remarks: String,
  data_set: String,
  count_pct: Float,
  yoy_compared: Float,
  pop_compared: Float,
  control_center_id: ID,
  cat_1st: String,
  cat_2nd: String,
  cat_3rd: String,
  control_center_pid: Int,
  count_avg: Float,
  count_p50: Float,
  data_f: [String],
   
   }

input MemberActualInput {id: ID,
  member_id: ID,
  t_run: String,
  type: String,
  t_time: Float,
  amount: Float,
  count: Int,
  amount_avg: Float,
  amount_acc: Float,
  t_run_gr: String,
  amount_budget_acc: Float,
  amount_budget: Float,
  record_type: String,
  name: String,
  count_acc: Int,
  pct: Float,
  xorder: Int,
  status: String,
  remarks: String,
  data_set: String,
  count_pct: Float,
  yoy_compared: Float,
  pop_compared: Float,
  control_center_id: ID,
  cat_1st: String,
  cat_2nd: String,
  cat_3rd: String,
  control_center_pid: Int,
  count_avg: Float,
  count_p50: Float,
  data_f: [String],
   }

type ControlCenterAlter {id: ID!,
  t_run: String,
  type: String,
  amount_1: Float,
  amount_2: Float,
  pct: Float,
  count: Int,
  record_type: String,
  status: String,
  alter_type: String,
  message: String,
  control_center_id: ID,
  chart_1st: String,
  chart_2nd: String,
  control_center: String,
   
   }

input ControlCenterAlterInput {id: ID,
  t_run: String,
  type: String,
  amount_1: Float,
  amount_2: Float,
  pct: Float,
  count: Int,
  record_type: String,
  status: String,
  alter_type: String,
  message: String,
  control_center_id: ID,
  chart_1st: String,
  chart_2nd: String,
  control_center: String,
   }

`;

const mdTypeDefs = [typeDefs]
export default mdTypeDefs;

//  2018-01-25 10:35:57.864287+08