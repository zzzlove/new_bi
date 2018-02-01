const queryDefs = ` 

control_center_budget_one(
   id: ID,
   started_at: [Float],
   control_center_id: [Int],
   amount: Float,
   disabled: Boolean,
   t_month: String,
   finished_at: [Float], ): ControlCenterBudget 

control_center_budget(
   id: ID,
   started_at: [Float],
   control_center_id: [Int],
   amount: Float,
   disabled: Boolean,
   t_month: String,
   finished_at: [Float],
   offset: Int,
   limit: Int,
   order: JSON,): [ControlCenterBudget] 

rm_control_center_equipment_one(
   id: ID,
   control_center_id: [Int],
   equipment_id: Int, ): RmControlCenterEquipment 

rm_control_center_equipment(
   id: ID,
   control_center_id: [Int],
   equipment_id: Int,
   offset: Int,
   limit: Int,
   order: JSON,): [RmControlCenterEquipment] 

member_contract_one(
   id: ID,
   member_id: Int,
   service_id: Int,
   employee_id: Int,
   type: [String],
   round_trip: String,
   quantity: Int,
   unit_price: Float,
   started_at: [Float],
   finished_at: [Float],
   created_at: [Float],
   updated_at: [Float],
   deleted_at: [Boolean],
   disabled: Boolean,
   remarks: String,
   member_name: String,
   service_name: String,
   employee_name: String, ): MemberContract 

member_contract(
   id: ID,
   member_id: Int,
   service_id: Int,
   employee_id: Int,
   type: [String],
   round_trip: String,
   quantity: Int,
   unit_price: Float,
   started_at: [Float],
   finished_at: [Float],
   created_at: [Float],
   updated_at: [Float],
   deleted_at: [Boolean],
   disabled: Boolean,
   remarks: String,
   member_name: String,
   service_name: String,
   employee_name: String,
   offset: Int,
   limit: Int,
   order: JSON,): [MemberContract] 

rm_control_center_profile_one(
   id: ID,
   client_id: Int,
   profile_id: Int,
   control_center_id: [Int],
   cat_2nd: String,
   cat_1st: String,
   client_name: String,
   started_at: [Float],
   finished_at: [Float],
   disabled: Boolean, ): RmControlCenterProfile 

rm_control_center_profile(
   id: ID,
   client_id: Int,
   profile_id: Int,
   control_center_id: [Int],
   cat_2nd: String,
   cat_1st: String,
   client_name: String,
   started_at: [Float],
   finished_at: [Float],
   disabled: Boolean,
   offset: Int,
   limit: Int,
   order: JSON,): [RmControlCenterProfile] 

profile_one(
   id: ID,
   name: String,
   name_en: String,
   profile_no: String,
   type: [String],
   status: [String],
   fin_code: [String],
   sales_code: [String],
   ops_code: [String],
   started_at: [Float],
   finished_at: [Float],
   created_at: [Float],
   updated_at: [Float],
   deleted_at: [Float],
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
   biz_codes: [Int],
   full_name: String,
   grade: String,
   readable: [Int],
   parent_id: Int,
   created_by: String,
   city_id: Int,
   fin_id: [Int],
   ops_id: [Int],
   sales_id: [Int],
   address: String,
   sys_client_id: Int,
   uid: String,
   control_ids: [Int],
   concerning_ids: [Int], ): Profile 

profile(
   id: [ID],
   name: String,
   name_en: String,
   profile_no: String,
   type: [String],
   status: [String],
   fin_code: [String],
   sales_code: [String],
   ops_code: [String],
   started_at: [Float],
   finished_at: [Float],
   created_at: [Float],
   updated_at: [Float],
   deleted_at: [Float],
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
   biz_codes: [Int],
   full_name: String,
   grade: String,
   readable: [Int],
   parent_id: Int,
   created_by: String,
   city_id: Int,
   fin_id: [Int],
   ops_id: [Int],
   sales_id: [Int],
   address: String,
   sys_client_id: Int,
   uid: String,
   control_ids: [Int],
   concerning_ids: [Int],
   offset: Int,
   limit: Int,
   order: JSON,): [Profile] 

countProfile(
   id: [ID],
   name: String,
   name_en: String,
   profile_no: String,
   type: [String],
   status: [String],
   fin_code: [String],
   sales_code: [String],
   ops_code: [String],
   started_at: [Float],
   finished_at: [Float],
   created_at: [Float],
   updated_at: [Float],
   deleted_at: [Float],
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
   biz_codes: [Int],
   full_name: String,
   grade: String,
   readable: [Int],
   parent_id: Int,
   created_by: String,
   city_id: Int,
   fin_id: [Int],
   ops_id: [Int],
   sales_id: [Int],
   address: String,
   sys_client_id: Int,
   uid: String,
   control_ids: [Int],
   concerning_ids: [Int],): Int

control_center_status_one(
   id: ID,
   control_center_id: Int,
   status: String,
   started_at: [Float],
   finished_at: [Float],
   remarks: String,
   term: String,
   control_center: String, ): ControlCenterStatus 

control_center_status(
   id: ID,
   control_center_id: Int,
   status: String,
   started_at: [Float],
   finished_at: [Float],
   remarks: String,
   term: String,
   control_center: String,
   offset: Int,
   limit: Int,
   order: JSON,): [ControlCenterStatus] 

control_center_alter_type_one(
   id: ID,
   defs_no: String,
   fit_area: String,
   amount_start: Float,
   amount_finish: Float,
   alter_type: String,
   xorder: Int, ): ControlCenterAlterType 

control_center_alter_type(
   id: ID,
   defs_no: String,
   fit_area: String,
   amount_start: Float,
   amount_finish: Float,
   alter_type: String,
   xorder: Int,
   offset: Int,
   limit: Int,
   order: JSON,): [ControlCenterAlterType] 

countControlCenterAlterType(
   id: ID,
   defs_no: String,
   fit_area: String,
   amount_start: Float,
   amount_finish: Float,
   alter_type: String,
   xorder: Int,): Int

member_cat_service_one(
   id: ID,
   member_id: Int,
   service_id: Int,
   member_name: String,
   service_name: String,
   type: [String],
   t_run: String,
   cat_1st: String,
   cat_2nd: String,
   cat_3rd: String,
   date1: [Float],
   date2: [Float],
   int1: Int,
   int2: Int,
   int3: Int,
   char1: String,
   char2: String,
   bi_element: String,
   bi_contral_center_id: Int,
   bi_contral_center_name: String,
   data_f: Int,
   int4: Int,
   num1: Float, ): MemberCatService 

member_cat_service(
   id: ID,
   member_id: Int,
   service_id: Int,
   member_name: String,
   service_name: String,
   type: [String],
   t_run: String,
   cat_1st: String,
   cat_2nd: String,
   cat_3rd: String,
   date1: [Float],
   date2: [Float],
   int1: Int,
   int2: Int,
   int3: Int,
   char1: String,
   char2: String,
   bi_element: String,
   bi_contral_center_id: Int,
   bi_contral_center_name: String,
   data_f: Int,
   int4: Int,
   num1: Float,
   offset: Int,
   limit: Int,
   order: JSON,): [MemberCatService] 

countMemberCatService(
   id: ID,
   member_id: Int,
   service_id: Int,
   member_name: String,
   service_name: String,
   type: [String],
   t_run: String,
   cat_1st: String,
   cat_2nd: String,
   cat_3rd: String,
   date1: [Float],
   date2: [Float],
   int1: Int,
   int2: Int,
   int3: Int,
   char1: String,
   char2: String,
   bi_element: String,
   bi_contral_center_id: Int,
   bi_contral_center_name: String,
   data_f: Int,
   int4: Int,
   num1: Float,): Int

fin_code_actual_one(
   id: ID,
   fin_code_id: Int,
   t_run: String,
   type: [String],
   t_time: [Float],
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
   record_type: [String],
   pct: Float,
   xorder: Int,
   fin_code: [String],
   status: String,
   remarks: String,
   data_set: String,
   count_pct: Float,
   yoy_compared: Float,
   pop_compared: Float,
   control_center_id: Int,
   control_center_pid: Int,
   count_avg: Float,
   count_p50: Float,
   data_f: [String], ): FinCodeActual 

fin_code_actual(
   id: ID,
   fin_code_id: Int,
   t_run: String,
   type: [String],
   t_time: [Float],
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
   record_type: [String],
   pct: Float,
   xorder: Int,
   fin_code: [String],
   status: String,
   remarks: String,
   data_set: String,
   count_pct: Float,
   yoy_compared: Float,
   pop_compared: Float,
   control_center_id: Int,
   control_center_pid: Int,
   count_avg: Float,
   count_p50: Float,
   data_f: [String],
   offset: Int,
   limit: Int,
   order: JSON,): [FinCodeActual] 

control_center_rm_one(
   id: ID,
   rm_type: [String],
   children_id: Int,
   control_center_id: [Int], ): ControlCenterRm 

control_center_rm(
   id: ID,
   rm_type: [String],
   children_id: Int,
   control_center_id: [Int],
   offset: Int,
   limit: Int,
   order: JSON,): [ControlCenterRm] 

countControlCenterRm(
   id: ID,
   rm_type: [String],
   children_id: Int,
   control_center_id: [Int],): Int

ops_code_actual_one(
   id: ID,
   fin_code_id: Int,
   t_run: String,
   type: [String],
   t_time: [Float],
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
   record_type: [String],
   pct: Float,
   xorder: Int,
   ops_code: [String],
   status: String,
   remarks: String,
   data_set: String,
   count_pct: Float,
   yoy_compared: Float,
   pop_compared: Float,
   control_center_id: Int,
   control_center_pid: Int,
   count_avg: Float,
   count_p50: Float,
   data_f: [String], ): OpsCodeActual 

ops_code_actual(
   id: ID,
   fin_code_id: Int,
   t_run: String,
   type: [String],
   t_time: [Float],
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
   record_type: [String],
   pct: Float,
   xorder: Int,
   ops_code: [String],
   status: String,
   remarks: String,
   data_set: String,
   count_pct: Float,
   yoy_compared: Float,
   pop_compared: Float,
   control_center_id: Int,
   control_center_pid: Int,
   count_avg: Float,
   count_p50: Float,
   data_f: [String],
   offset: Int,
   limit: Int,
   order: JSON,): [OpsCodeActual] 

sign_client_day_monitoring_one(
   id: ID,
   route_id: Int,
   route_name: String,
   line_id: Int,
   line_name: String,
   plan_team: Float,
   single_team_conf: Int,
   truck_head_num: Int,
   deploy_team_num: Float,
   trader_name: String,
   act_shp_num: Int,
   shipment_date: [String],
   created_time_at: [Float], ): SignClientDayMonitoring 

sign_client_day_monitoring(
   id: ID,
   route_id: Int,
   route_name: String,
   line_id: Int,
   line_name: String,
   plan_team: Float,
   single_team_conf: Int,
   truck_head_num: Int,
   deploy_team_num: Float,
   trader_name: String,
   act_shp_num: Int,
   shipment_date: [String],
   created_time_at: [Float],
   offset: Int,
   limit: Int,
   order: JSON,): [SignClientDayMonitoring] 

countSignClientDayMonitoring(
   id: ID,
   route_id: Int,
   route_name: String,
   line_id: Int,
   line_name: String,
   plan_team: Float,
   single_team_conf: Int,
   truck_head_num: Int,
   deploy_team_num: Float,
   trader_name: String,
   act_shp_num: Int,
   shipment_date: [String],
   created_time_at: [Float],): Int

control_center_one(
   id: ID,
   xorder: Int,
   owner: String,
   pct_done: Int,
   pct_done_acc: Int,
   pct_done_ytd: Int,
   type: [String],
   status: [String],
   amount: Float,
   amount_last: Float,
   amount_ytd: Float,
   children_ids: [Int],
   amount_t1: Float,
   amount_t2: Float,
   finished_at: [Float],
   started_at: [Float],
   cat_2nd: String,
   disabled: Boolean,
   cat_3rd: String,
   cat_4th: String,
   name: String,
   code: String,
   show_title: String,
   cat_1st: String, ): ControlCenter 

control_center(
   id: [ID],
   xorder: Int,
   owner: String,
   pct_done: Int,
   pct_done_acc: Int,
   pct_done_ytd: Int,
   type: [String],
   status: [String],
   amount: Float,
   amount_last: Float,
   amount_ytd: Float,
   children_ids: [Int],
   amount_t1: Float,
   amount_t2: Float,
   finished_at: [Float],
   started_at: [Float],
   cat_2nd: String,
   disabled: Boolean,
   cat_3rd: String,
   cat_4th: String,
   name: String,
   code: String,
   show_title: String,
   cat_1st: String,
   offset: Int,
   limit: Int,
   order: JSON,): [ControlCenter] 

countControlCenter(
   id: [ID],
   xorder: Int,
   owner: String,
   pct_done: Int,
   pct_done_acc: Int,
   pct_done_ytd: Int,
   type: [String],
   status: [String],
   amount: Float,
   amount_last: Float,
   amount_ytd: Float,
   children_ids: [Int],
   amount_t1: Float,
   amount_t2: Float,
   finished_at: [Float],
   started_at: [Float],
   cat_2nd: String,
   disabled: Boolean,
   cat_3rd: String,
   cat_4th: String,
   name: String,
   code: String,
   show_title: String,
   cat_1st: String,): Int

control_center_actual_one(
   id: ID,
   t_run: String,
   type: [String],
   t_time: [Float],
   amount: Float,
   count: Int,
   amount_avg: Float,
   amount_acc: Float,
   t_run_gr: String,
   amount_budget_acc: Float,
   amount_budget: Float,
   control_center_id: [Int],
   control_element: [String],
   control_center: [String],
   amount_compared: Float,
   amount_compared1: Float,
   amount_compared2: Float,
   count_distinct: Int,
   record_type: [String],
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
   data_f: [Int],
   cat_1st: String,
   cat_2nd: String,
   amount_bak: Int,
   count_bak: Float, ): ControlCenterActual 

control_center_actual(
   id: ID,
   t_run: String,
   type: [String],
   t_time: [Float],
   amount: Float,
   count: Int,
   amount_avg: Float,
   amount_acc: Float,
   t_run_gr: String,
   amount_budget_acc: Float,
   amount_budget: Float,
   control_center_id: [Int],
   control_element: [String],
   control_center: [String],
   amount_compared: Float,
   amount_compared1: Float,
   amount_compared2: Float,
   count_distinct: Int,
   record_type: [String],
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
   data_f: [Int],
   cat_1st: String,
   cat_2nd: String,
   amount_bak: Int,
   count_bak: Float,
   offset: Int,
   limit: Int,
   order: JSON,): [ControlCenterActual] 

countControlCenterActual(
   id: ID,
   t_run: String,
   type: [String],
   t_time: [Float],
   amount: Float,
   count: Int,
   amount_avg: Float,
   amount_acc: Float,
   t_run_gr: String,
   amount_budget_acc: Float,
   amount_budget: Float,
   control_center_id: [Int],
   control_element: [String],
   control_center: [String],
   amount_compared: Float,
   amount_compared1: Float,
   amount_compared2: Float,
   count_distinct: Int,
   record_type: [String],
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
   data_f: [Int],
   cat_1st: String,
   cat_2nd: String,
   amount_bak: Int,
   count_bak: Float,): Int

city_one(
   id: ID,
   code: Int,
   name: String,
   location_detail: String,
   parent_id: Int,
   province: String,
   city: String,
   full_name: String,
   full_search_name: String,
   readable_pfids: [Int],
   level: String,
   detail_name: String,
   full_py_name: String, ): City 

city(
   id: [ID],
   code: Int,
   name: String,
   location_detail: String,
   parent_id: Int,
   province: String,
   city: String,
   full_name: String,
   full_search_name: String,
   readable_pfids: [Int],
   level: String,
   detail_name: String,
   full_py_name: String,
   offset: Int,
   limit: Int,
   order: JSON,): [City] 

countCity(
   id: [ID],
   code: Int,
   name: String,
   location_detail: String,
   parent_id: Int,
   province: String,
   city: String,
   full_name: String,
   full_search_name: String,
   readable_pfids: [Int],
   level: String,
   detail_name: String,
   full_py_name: String,): Int

equipment_actual_one(
   id: ID,
   t_run: String,
   type: [String],
   t_time: [Float],
   amount: Float,
   count: Int,
   amount_avg: Float,
   amount_acc: Float,
   t_run_gr: String,
   amount_budget_acc: Float,
   amount_budget: Float,
   equipment_id: Int,
   record_type: [String],
   pct: Float,
   xorder: Int,
   control_center_id: Int,
   ops_code: [String],
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
   cat_1st: String, ): EquipmentActual 

equipment_actual(
   id: ID,
   t_run: String,
   type: [String],
   t_time: [Float],
   amount: Float,
   count: Int,
   amount_avg: Float,
   amount_acc: Float,
   t_run_gr: String,
   amount_budget_acc: Float,
   amount_budget: Float,
   equipment_id: Int,
   record_type: [String],
   pct: Float,
   xorder: Int,
   control_center_id: Int,
   ops_code: [String],
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
   offset: Int,
   limit: Int,
   order: JSON,): [EquipmentActual] 

member_actual_one(
   id: ID,
   member_id: Int,
   t_run: String,
   type: [String],
   t_time: [Float],
   amount: Float,
   count: Int,
   amount_avg: Float,
   amount_acc: Float,
   t_run_gr: String,
   amount_budget_acc: Float,
   amount_budget: Float,
   record_type: [String],
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
   control_center_id: Int,
   cat_1st: String,
   cat_2nd: String,
   cat_3rd: String,
   control_center_pid: Int,
   count_avg: Float,
   count_p50: Float,
   data_f: [String], ): MemberActual 

member_actual(
   id: ID,
   member_id: Int,
   t_run: String,
   type: [String],
   t_time: [Float],
   amount: Float,
   count: Int,
   amount_avg: Float,
   amount_acc: Float,
   t_run_gr: String,
   amount_budget_acc: Float,
   amount_budget: Float,
   record_type: [String],
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
   control_center_id: Int,
   cat_1st: String,
   cat_2nd: String,
   cat_3rd: String,
   control_center_pid: Int,
   count_avg: Float,
   count_p50: Float,
   data_f: [String],
   offset: Int,
   limit: Int,
   order: JSON,): [MemberActual] 

control_center_alter_one(
   id: ID,
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
   control_center_id: Int,
   chart_1st: String,
   chart_2nd: String,
   control_center: String, ): ControlCenterAlter 

control_center_alter(
   id: ID,
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
   control_center_id: Int,
   chart_1st: String,
   chart_2nd: String,
   control_center: String,
   offset: Int,
   limit: Int,
   order: JSON,): [ControlCenterAlter] 

`;

const mdQueryDefs = [queryDefs]
export default mdQueryDefs;

//  2018-01-25 10:35:57.864287+08