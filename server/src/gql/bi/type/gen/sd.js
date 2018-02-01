const typeDefs = ` 
scalar JSON

type OrderSalesExtKh {id: ID!,
  order_no: String,
  type: String,
  biz_code: String,
  profile_id: ID,
  ops_id: ID,
  fin_code: String,
  ops_code: String,
  sales_code: String,
  profile_name: String,
  trader_id: ID,
  trader_code: String,
  trader_name: String,
  payment_method: String,
  payment_period: String,
  billing_id: ID,
  status: String,
  processing_status: String,
  is_internal: Boolean,
  started_at: Float,
  finished_at: Float,
  remarks: String,
  created_at: Float,
  updated_at: Float,
  deleted_at: Float,
  term: String,
  billing_no: String,
  amount: Float,
  biz_type: String,
  locked_status: String,
  service_no: String,
  voucher_id: ID,
  voucher_status: String,
  reflection_id: ID,
  control_center: String,
  related_no: String,
  control_element: String,
  is_deleted: Int,
  billing_status: String,
  amount_acc: Float,
  gross_margin: Float,
  equipment_no: String,
  data_f: Float,
  status_desc: String,
  bi_status: String,
  control_center_id: ID,
  ext_iid: Int,
  ext_cid: String,
  data_source: String,
  status_1: String,
  status_2: String,
  days_open: Int,
  temp_1: String,
  temp_2: String,
  temp_3: String,
  status_syn: String,
  control_center_pid: Int,
  t_run: String,
  bi_element: String,
  bi_2nd: String,
  cat_1st: String,
  cat_2nd: String,
  depart_branch_id: ID,
  target_branch_id: ID,
  trader_id_act: Int,
  trader_code_act: String,
  trader_name_act: String,
  depart_no: String,
  cargo_name: String,
  cargo_weight: Float,
  cargo_volumn: Float,
  cargo_count: Int,
  plate_no: String,
  carrier_id: ID,
  carrier_code: String,
  carrier_name: String,
  manager_id: ID,
  manager_code: String,
  manager_name: String,
  plate_no1: String,
  remark: String,
  depart_id: ID,
  fin_id: ID,
  sales_id: ID,
  branch_id: ID,
  line_id: ID,
  line_name: String,
  consignee_code: String,
  consignee_name: String,
  depart_time: Float,
  arrived_time: Float,
  plan_depart_time: Float,
  plan_arrived_time: Float,
  dest_id: ID,
  depart_city_id: ID,
  target_city_id: ID,
  qty: Int,
  weight: Int,
  volume: Float,
  trans_type_cd: String,
  trans_type: String,
  clean_freight: Float,
  declare_value: Float,
  insured_rates: Float,
  insured: Float,
  remote_pickup_charges: Float,
  remote_delivery_charges: Float,
  multipoint_pickup_charges: Float,
  multipoint_delivery_charges: Float,
  charge_data: JSON,
   
   }

input OrderSalesExtKhInput {id: ID,
  order_no: String,
  type: String,
  biz_code: String,
  profile_id: ID,
  ops_id: ID,
  fin_code: String,
  ops_code: String,
  sales_code: String,
  profile_name: String,
  trader_id: ID,
  trader_code: String,
  trader_name: String,
  payment_method: String,
  payment_period: String,
  billing_id: ID,
  status: String,
  processing_status: String,
  is_internal: Boolean,
  started_at: Float,
  finished_at: Float,
  remarks: String,
  created_at: Float,
  updated_at: Float,
  deleted_at: Float,
  term: String,
  billing_no: String,
  amount: Float,
  biz_type: String,
  locked_status: String,
  service_no: String,
  voucher_id: ID,
  voucher_status: String,
  reflection_id: ID,
  control_center: String,
  related_no: String,
  control_element: String,
  is_deleted: Int,
  billing_status: String,
  amount_acc: Float,
  gross_margin: Float,
  equipment_no: String,
  data_f: Float,
  status_desc: String,
  bi_status: String,
  control_center_id: ID,
  ext_iid: Int,
  ext_cid: String,
  data_source: String,
  status_1: String,
  status_2: String,
  days_open: Int,
  temp_1: String,
  temp_2: String,
  temp_3: String,
  status_syn: String,
  control_center_pid: Int,
  t_run: String,
  bi_element: String,
  bi_2nd: String,
  cat_1st: String,
  cat_2nd: String,
  depart_branch_id: ID,
  target_branch_id: ID,
  trader_id_act: Int,
  trader_code_act: String,
  trader_name_act: String,
  depart_no: String,
  cargo_name: String,
  cargo_weight: Float,
  cargo_volumn: Float,
  cargo_count: Int,
  plate_no: String,
  carrier_id: ID,
  carrier_code: String,
  carrier_name: String,
  manager_id: ID,
  manager_code: String,
  manager_name: String,
  plate_no1: String,
  remark: String,
  depart_id: ID,
  fin_id: ID,
  sales_id: ID,
  branch_id: ID,
  line_id: ID,
  line_name: String,
  consignee_code: String,
  consignee_name: String,
  depart_time: Float,
  arrived_time: Float,
  plan_depart_time: Float,
  plan_arrived_time: Float,
  dest_id: ID,
  depart_city_id: ID,
  target_city_id: ID,
  qty: Int,
  weight: Int,
  volume: Float,
  trans_type_cd: String,
  trans_type: String,
  clean_freight: Float,
  declare_value: Float,
  insured_rates: Float,
  insured: Float,
  remote_pickup_charges: Float,
  remote_delivery_charges: Float,
  multipoint_pickup_charges: Float,
  multipoint_delivery_charges: Float,
  charge_data: JSON,
   }

type RmExtOrderBilling {id: ID!,
  data_source: String,
  billing_no: String,
  link_id: ID,
  billing_id: ID,
  order_id: ID,
  order_no: String,
  ext_iid: Int,
  ext_cid: String,
  created_at: Float,
  updated_at: Float,
  deleted_at: Float,
  is_deleted: Int,
  ext_billing_id: ID,
   
   }

input RmExtOrderBillingInput {id: ID,
  data_source: String,
  billing_no: String,
  link_id: ID,
  billing_id: ID,
  order_id: ID,
  order_no: String,
  ext_iid: Int,
  ext_cid: String,
  created_at: Float,
  updated_at: Float,
  deleted_at: Float,
  is_deleted: Int,
  ext_billing_id: ID,
   }

type OrderOpsExtUk {id: ID!,
  order_no: String,
  type: String,
  biz_code: String,
  profile_id: ID,
  ops_id: ID,
  fin_code: String,
  ops_code: String,
  sales_code: String,
  profile_name: String,
  trader_id: ID,
  trader_code: String,
  trader_name: String,
  payment_method: String,
  payment_period: String,
  billing_id: ID,
  status: String,
  processing_status: String,
  is_internal: Boolean,
  started_at: Float,
  finished_at: Float,
  remarks: String,
  created_at: Float,
  updated_at: Float,
  deleted_at: Float,
  term: String,
  billing_no: String,
  amount: Float,
  biz_type: String,
  locked_status: String,
  service_no: String,
  voucher_id: ID,
  voucher_status: String,
  reflection_id: ID,
  control_center: String,
  related_no: String,
  control_element: String,
  is_deleted: Int,
  billing_status: String,
  amount_acc: Float,
  gross_margin: Float,
  equipment_no: String,
  data_f: Float,
  status_desc: String,
  bi_status: String,
  control_center_id: ID,
  ext_iid: Int,
  ext_cid: String,
  distance: Int,
  ops_method: String,
  ops_owner: String,
  status_syn: String,
  control_center_pid: Int,
  t_run: String,
  bi_element: String,
  bi_2nd: String,
  cat_1st: String,
  cat_2nd: String,
  shunt_branch: Int,
  tk_id: ID,
  tktype_cd: String,
  plate_no: String,
  driver_name: String,
  driver_tel: String,
  paid_type: String,
  driver_paid_charge: Float,
  shunt_branch_charge: Float,
  cash: Float,
  bank_card: Float,
  petroleum_card: Float,
  fuel_charge: Float,
  etc: Float,
  service_charge_rate: Float,
  planned_arrival_date: Float,
  actual_arrival_date: Float,
  resource_check: String,
  resource_check_by: String,
  shunt_subsidy: Float,
  remark: String,
  resource_check_time: Float,
  operation_check: String,
  operation_check_by: String,
  operation_check_time: Float,
  version: Int,
  driver_collection_charge: Float,
  driver_payment_charge: Float,
  driver_returned_fee: Float,
  driver_remain_fee: Float,
  driver_should_fee: Float,
  driver_already_fee: Float,
  driver_debt_fee: Float,
  print: Int,
  inform: Int,
  collection_fee: Float,
  payment_fee: Float,
  branch_surplus_fee: Float,
  unload_charge: Float,
  load_charge: Float,
  shunt_volume_charge: Float,
  shunt_car_charge: Float,
  load_quantity_total: Int,
  load_weight_total: Float,
  load_volume_total: Float,
  load_ship_amount: Int,
  depart_type_cd: String,
  flight_no: String,
  total_charge_total: Float,
  rebate_total: Float,
  actual_charge_total: Float,
  unload_time: Float,
  d_driver_name: String,
  d_driver_tel: String,
   
   }

input OrderOpsExtUkInput {id: ID,
  order_no: String,
  type: String,
  biz_code: String,
  profile_id: ID,
  ops_id: ID,
  fin_code: String,
  ops_code: String,
  sales_code: String,
  profile_name: String,
  trader_id: ID,
  trader_code: String,
  trader_name: String,
  payment_method: String,
  payment_period: String,
  billing_id: ID,
  status: String,
  processing_status: String,
  is_internal: Boolean,
  started_at: Float,
  finished_at: Float,
  remarks: String,
  created_at: Float,
  updated_at: Float,
  deleted_at: Float,
  term: String,
  billing_no: String,
  amount: Float,
  biz_type: String,
  locked_status: String,
  service_no: String,
  voucher_id: ID,
  voucher_status: String,
  reflection_id: ID,
  control_center: String,
  related_no: String,
  control_element: String,
  is_deleted: Int,
  billing_status: String,
  amount_acc: Float,
  gross_margin: Float,
  equipment_no: String,
  data_f: Float,
  status_desc: String,
  bi_status: String,
  control_center_id: ID,
  ext_iid: Int,
  ext_cid: String,
  distance: Int,
  ops_method: String,
  ops_owner: String,
  status_syn: String,
  control_center_pid: Int,
  t_run: String,
  bi_element: String,
  bi_2nd: String,
  cat_1st: String,
  cat_2nd: String,
  shunt_branch: Int,
  tk_id: ID,
  tktype_cd: String,
  plate_no: String,
  driver_name: String,
  driver_tel: String,
  paid_type: String,
  driver_paid_charge: Float,
  shunt_branch_charge: Float,
  cash: Float,
  bank_card: Float,
  petroleum_card: Float,
  fuel_charge: Float,
  etc: Float,
  service_charge_rate: Float,
  planned_arrival_date: Float,
  actual_arrival_date: Float,
  resource_check: String,
  resource_check_by: String,
  shunt_subsidy: Float,
  remark: String,
  resource_check_time: Float,
  operation_check: String,
  operation_check_by: String,
  operation_check_time: Float,
  version: Int,
  driver_collection_charge: Float,
  driver_payment_charge: Float,
  driver_returned_fee: Float,
  driver_remain_fee: Float,
  driver_should_fee: Float,
  driver_already_fee: Float,
  driver_debt_fee: Float,
  print: Int,
  inform: Int,
  collection_fee: Float,
  payment_fee: Float,
  branch_surplus_fee: Float,
  unload_charge: Float,
  load_charge: Float,
  shunt_volume_charge: Float,
  shunt_car_charge: Float,
  load_quantity_total: Int,
  load_weight_total: Float,
  load_volume_total: Float,
  load_ship_amount: Int,
  depart_type_cd: String,
  flight_no: String,
  total_charge_total: Float,
  rebate_total: Float,
  actual_charge_total: Float,
  unload_time: Float,
  d_driver_name: String,
  d_driver_tel: String,
   }

type ServiceActual {id: ID!,
  service_id: ID,
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
  control_center_id: ID,
  status: String,
  remarks: String,
  service_no: String,
  control_center: String,
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

input ServiceActualInput {id: ID,
  service_id: ID,
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
  control_center_id: ID,
  status: String,
  remarks: String,
  service_no: String,
  control_center: String,
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

type Servicex {id: ID!,
  service_no: String,
  name: String,
  name_ml: JSON,
  name_en: String,
  type: String,
  disabled: Boolean,
  control_center: String,
  depart_id: ID,
  depart_name: String,
  destination_id: ID,
  destination_name: String,
  distance: Int,
  cat_1st: String,
  cat_2nd: String,
  cat_3rd: String,
  cat_4th: String,
  status: String,
  status_id: ID,
  player_id: ID,
  player: String,
  xorder: Int,
  ops_code: String,
  owner: String,
  service_gr: String,
  amount: Float,
  rank: Int,
  rank_gr: String,
  parent_id: ID,
  control_center_id: ID,
   ControlCenter: ControlCenter,
   Children(service_no: [String], type: [String], control_center: [String], cat_1st: [String], cat_2nd: [String], cat_3rd: [String], cat_4th: [String], ops_code: [String], control_center_id: [Int]): [Servicex]
   }

input ServicexInput {id: ID,
  service_no: String,
  name: String,
  name_ml: JSON,
  name_en: String,
  type: String,
  disabled: Boolean,
  control_center: String,
  depart_id: ID,
  depart_name: String,
  destination_id: ID,
  destination_name: String,
  distance: Int,
  cat_1st: String,
  cat_2nd: String,
  cat_3rd: String,
  cat_4th: String,
  status: String,
  status_id: ID,
  player_id: ID,
  player: String,
  xorder: Int,
  ops_code: String,
  owner: String,
  service_gr: String,
  amount: Float,
  rank: Int,
  rank_gr: String,
  parent_id: ID,
  control_center_id: ID,
   }

type OrderSalesExtUk {id: ID!,
  order_no: String,
  type: String,
  biz_code: String,
  profile_id: ID,
  ops_id: ID,
  fin_code: String,
  ops_code: String,
  sales_code: String,
  profile_name: String,
  trader_id: ID,
  trader_code: String,
  trader_name: String,
  payment_method: String,
  payment_period: String,
  billing_id: ID,
  status: String,
  processing_status: String,
  is_internal: Boolean,
  started_at: Float,
  finished_at: Float,
  remarks: String,
  created_at: Float,
  updated_at: Float,
  deleted_at: Float,
  term: String,
  billing_no: String,
  amount: Float,
  biz_type: String,
  locked_status: String,
  service_no: String,
  voucher_id: ID,
  voucher_status: String,
  reflection_id: ID,
  control_center: String,
  related_no: String,
  control_element: String,
  is_deleted: Int,
  billing_status: String,
  amount_acc: Float,
  gross_margin: Float,
  equipment_no: String,
  data_f: Float,
  status_desc: String,
  bi_status: String,
  control_center_id: ID,
  ext_iid: Int,
  ext_cid: String,
  data_source: String,
  status_1: String,
  status_2: String,
  days_open: Int,
  temp_1: String,
  temp_2: String,
  temp_3: String,
  status_syn: String,
  control_center_pid: Int,
  t_run: String,
  bi_element: String,
  bi_2nd: String,
  cat_1st: String,
  cat_2nd: String,
  payment_method_cd: String,
  payment_current: Float,
  payment_arrived: Float,
  payment_monthly: Float,
  payment_multiple: Float,
  payment_arrear: Float,
  payment_hdq: Float,
  payment_detain_cargo: Float,
  rebate_total: Float,
  rebate_paid: Float,
  rebate_remain: Float,
  actual_charge: Float,
  cargo_name: String,
  cargo_weight: Float,
  cargo_volumn: Float,
  cargo_count: Int,
  carrier_id: ID,
  carrier_code: String,
  carrier_name: String,
  sub_order_no: String,
  service_amount: Float,
  other_amount1: Float,
  other_amount2: Float,
  depart_branch_id: ID,
  depart_branch: String,
  target_branch_id: ID,
  target_branch: String,
   
   }

input OrderSalesExtUkInput {id: ID,
  order_no: String,
  type: String,
  biz_code: String,
  profile_id: ID,
  ops_id: ID,
  fin_code: String,
  ops_code: String,
  sales_code: String,
  profile_name: String,
  trader_id: ID,
  trader_code: String,
  trader_name: String,
  payment_method: String,
  payment_period: String,
  billing_id: ID,
  status: String,
  processing_status: String,
  is_internal: Boolean,
  started_at: Float,
  finished_at: Float,
  remarks: String,
  created_at: Float,
  updated_at: Float,
  deleted_at: Float,
  term: String,
  billing_no: String,
  amount: Float,
  biz_type: String,
  locked_status: String,
  service_no: String,
  voucher_id: ID,
  voucher_status: String,
  reflection_id: ID,
  control_center: String,
  related_no: String,
  control_element: String,
  is_deleted: Int,
  billing_status: String,
  amount_acc: Float,
  gross_margin: Float,
  equipment_no: String,
  data_f: Float,
  status_desc: String,
  bi_status: String,
  control_center_id: ID,
  ext_iid: Int,
  ext_cid: String,
  data_source: String,
  status_1: String,
  status_2: String,
  days_open: Int,
  temp_1: String,
  temp_2: String,
  temp_3: String,
  status_syn: String,
  control_center_pid: Int,
  t_run: String,
  bi_element: String,
  bi_2nd: String,
  cat_1st: String,
  cat_2nd: String,
  payment_method_cd: String,
  payment_current: Float,
  payment_arrived: Float,
  payment_monthly: Float,
  payment_multiple: Float,
  payment_arrear: Float,
  payment_hdq: Float,
  payment_detain_cargo: Float,
  rebate_total: Float,
  rebate_paid: Float,
  rebate_remain: Float,
  actual_charge: Float,
  cargo_name: String,
  cargo_weight: Float,
  cargo_volumn: Float,
  cargo_count: Int,
  carrier_id: ID,
  carrier_code: String,
  carrier_name: String,
  sub_order_no: String,
  service_amount: Float,
  other_amount1: Float,
  other_amount2: Float,
  depart_branch_id: ID,
  depart_branch: String,
  target_branch_id: ID,
  target_branch: String,
   }

type OrderOpsExtKh {id: ID!,
  order_no: String,
  type: String,
  biz_code: String,
  profile_id: ID,
  ops_id: ID,
  fin_code: String,
  ops_code: String,
  sales_code: String,
  profile_name: String,
  trader_id: ID,
  trader_code: String,
  trader_name: String,
  payment_method: String,
  payment_period: String,
  billing_id: ID,
  status: String,
  processing_status: String,
  is_internal: Boolean,
  started_at: Float,
  finished_at: Float,
  remarks: String,
  created_at: Float,
  updated_at: Float,
  deleted_at: Float,
  term: String,
  billing_no: String,
  amount: Float,
  biz_type: String,
  locked_status: String,
  service_no: String,
  voucher_id: ID,
  voucher_status: String,
  reflection_id: ID,
  control_center: String,
  related_no: String,
  control_element: String,
  is_deleted: Int,
  billing_status: String,
  amount_acc: Float,
  gross_margin: Float,
  equipment_no: String,
  data_f: Float,
  status_desc: String,
  bi_status: String,
  control_center_id: ID,
  ext_iid: Int,
  ext_cid: String,
  distance: Int,
  ops_method: String,
  ops_owner: String,
  route_id: ID,
  status_syn: String,
  control_center_pid: Int,
  t_run: String,
  bi_element: String,
  bi_2nd: String,
  cat_1st: String,
  cat_2nd: String,
   
   }

input OrderOpsExtKhInput {id: ID,
  order_no: String,
  type: String,
  biz_code: String,
  profile_id: ID,
  ops_id: ID,
  fin_code: String,
  ops_code: String,
  sales_code: String,
  profile_name: String,
  trader_id: ID,
  trader_code: String,
  trader_name: String,
  payment_method: String,
  payment_period: String,
  billing_id: ID,
  status: String,
  processing_status: String,
  is_internal: Boolean,
  started_at: Float,
  finished_at: Float,
  remarks: String,
  created_at: Float,
  updated_at: Float,
  deleted_at: Float,
  term: String,
  billing_no: String,
  amount: Float,
  biz_type: String,
  locked_status: String,
  service_no: String,
  voucher_id: ID,
  voucher_status: String,
  reflection_id: ID,
  control_center: String,
  related_no: String,
  control_element: String,
  is_deleted: Int,
  billing_status: String,
  amount_acc: Float,
  gross_margin: Float,
  equipment_no: String,
  data_f: Float,
  status_desc: String,
  bi_status: String,
  control_center_id: ID,
  ext_iid: Int,
  ext_cid: String,
  distance: Int,
  ops_method: String,
  ops_owner: String,
  route_id: ID,
  status_syn: String,
  control_center_pid: Int,
  t_run: String,
  bi_element: String,
  bi_2nd: String,
  cat_1st: String,
  cat_2nd: String,
   }

type Pricing {id: ID!,
  name: String,
  profile_id: ID,
  type: String,
  sub_type: String,
  status: String,
  service_id: ID,
  service_code: String,
  dest_id: ID,
  dest_code: String,
  unit_method: String,
  qty_unit: Float,
  ftl_unit: Float,
  weight_unit: Float,
  volume_unit: Float,
  internal_discount: Float,
  started_at: Float,
  finished_at: Float,
  created_at: Float,
  updated_at: Float,
  deleted_at: Float,
  created_by: String,
  started_by: String,
  finished_by: String,
  remarks: String,
   
   }

input PricingInput {id: ID,
  name: String,
  profile_id: ID,
  type: String,
  sub_type: String,
  status: String,
  service_id: ID,
  service_code: String,
  dest_id: ID,
  dest_code: String,
  unit_method: String,
  qty_unit: Float,
  ftl_unit: Float,
  weight_unit: Float,
  volume_unit: Float,
  internal_discount: Float,
  started_at: Float,
  finished_at: Float,
  created_at: Float,
  updated_at: Float,
  deleted_at: Float,
  created_by: String,
  started_by: String,
  finished_by: String,
  remarks: String,
   }

`;

const sdTypeDefs = [typeDefs]
export default sdTypeDefs;

//  2018-01-29 11:04:50.534518+00