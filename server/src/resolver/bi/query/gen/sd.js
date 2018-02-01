import { ServiceActualService, OrderSalesExtKhService, OrderOpsExtUkService, OrderOpsExtKhService, RmExtOrderBillingService, OrderSalesExtUkService, ServicexService, PricingService } from '../../../../service';

const sdQueryResolvers = { 

pricing_one(obj, args, context, info){
  let modelArgs = {};
  let {started_at} = args;
  if(started_at){args.started_at = {$gte: started_at[0], $lte: started_at[1]}; };
    if(args.deleted_at){args.deleted_at = {$gte: args.deleted_at[0], $lte: args.deleted_at[1]}; modelArgs.paranoid = false };
    let {updated_at} = args;
  if(updated_at){args.updated_at = {$gte: updated_at[0], $lte: updated_at[1]}; };
    let {created_at} = args;
  if(created_at){args.created_at = {$gte: created_at[0], $lte: created_at[1]}; };
    let {finished_at} = args;
  if(finished_at){args.finished_at = {$gte: finished_at[0], $lte: finished_at[1]}; };

  if (context.user.roles.indexOf('admin') != -1 ){
    return PricingService.findOne({where: args}); 
  }
},

pricing(obj, args, context, info){
  let modelArgs = {};
  if(args.limit){modelArgs.limit = args.limit; delete args.limit; }
  if(args.order){modelArgs.order = args.order; delete args.order; }
  if(args.offset==0||args.offset){modelArgs.offset = args.offset; delete args.offset; }
  let {started_at} = args;
  if(started_at){args.started_at = {$gte: started_at[0], $lte: started_at[1]}; };
    if(args.deleted_at){args.deleted_at = {$gte: args.deleted_at[0], $lte: args.deleted_at[1]}; modelArgs.paranoid = false };
    let {updated_at} = args;
  if(updated_at){args.updated_at = {$gte: updated_at[0], $lte: updated_at[1]}; };
    let {created_at} = args;
  if(created_at){args.created_at = {$gte: created_at[0], $lte: created_at[1]}; };
    let {finished_at} = args;
  if(finished_at){args.finished_at = {$gte: finished_at[0], $lte: finished_at[1]}; };

  if (context.user.roles.indexOf('admin') != -1 ){
    return PricingService.findAll({...{where: args}, ...modelArgs,}); 
  }
},

countPricing(obj, args, context, info){
  let modelArgs = {};
  let {started_at} = args;
  if(started_at){args.started_at = {$gte: started_at[0], $lte: started_at[1]}; };
    if(args.deleted_at){args.deleted_at = {$gte: args.deleted_at[0], $lte: args.deleted_at[1]}; modelArgs.paranoid = false };
    let {updated_at} = args;
  if(updated_at){args.updated_at = {$gte: updated_at[0], $lte: updated_at[1]}; };
    let {created_at} = args;
  if(created_at){args.created_at = {$gte: created_at[0], $lte: created_at[1]}; };
    let {finished_at} = args;
  if(finished_at){args.finished_at = {$gte: finished_at[0], $lte: finished_at[1]}; };

  if (context.user.roles.indexOf('admin') != -1 ){
    return PricingService.count({...{where: args}, ...modelArgs,}); 
  }
},

order_sales_ext_kh_one(obj, args, context, info){
  let modelArgs = {};
  if(args.deleted_at){args.deleted_at = {$gte: args.deleted_at[0], $lte: args.deleted_at[1]}; modelArgs.paranoid = false };
    let {updated_at} = args;
  if(updated_at){args.updated_at = {$gte: updated_at[0], $lte: updated_at[1]}; };
    let {created_at} = args;
  if(created_at){args.created_at = {$gte: created_at[0], $lte: created_at[1]}; };
    let {finished_at} = args;
  if(finished_at){args.finished_at = {$gte: finished_at[0], $lte: finished_at[1]}; };
    let {started_at} = args;
  if(started_at){args.started_at = {$gte: started_at[0], $lte: started_at[1]}; };
    if(args.trader_name){args.trader_name = {$like: '%'+args.trader_name+'%'}; };
    if(args.order_no){args.order_no = {$like: '%'+args.order_no+'%'}; };
    let {plan_arrived_time} = args;
  if(plan_arrived_time){args.plan_arrived_time = {$gte: plan_arrived_time[0], $lte: plan_arrived_time[1]}; };
    let {plan_depart_time} = args;
  if(plan_depart_time){args.plan_depart_time = {$gte: plan_depart_time[0], $lte: plan_depart_time[1]}; };
    let {arrived_time} = args;
  if(arrived_time){args.arrived_time = {$gte: arrived_time[0], $lte: arrived_time[1]}; };
    let {depart_time} = args;
  if(depart_time){args.depart_time = {$gte: depart_time[0], $lte: depart_time[1]}; };

  if (context.user.roles.indexOf('headoffice_kh') != -1 ){
    return OrderSalesExtKhService.findOne({where: args}); 
  }
  if (context.user.roles.indexOf('admin') != -1 ){
    return OrderSalesExtKhService.findOne({where: args}); 
  }
  if (context.user.roles.indexOf('ops_kh') != -1 ){
    let argsWithAuth = {...args, ...{$and: {control_center_id: context.user.control_center_ids, cat_1st: "A2"}}};
    return OrderSalesExtKhService.findOne({where: argsWithAuth}); 
  }
},

order_sales_ext_kh(obj, args, context, info){
  let modelArgs = {};
  if(args.limit){modelArgs.limit = args.limit; delete args.limit; }
  if(args.order){modelArgs.order = args.order; delete args.order; }
  if(args.offset==0||args.offset){modelArgs.offset = args.offset; delete args.offset; }
  if(args.deleted_at){args.deleted_at = {$gte: args.deleted_at[0], $lte: args.deleted_at[1]}; modelArgs.paranoid = false };
    let {updated_at} = args;
  if(updated_at){args.updated_at = {$gte: updated_at[0], $lte: updated_at[1]}; };
    let {created_at} = args;
  if(created_at){args.created_at = {$gte: created_at[0], $lte: created_at[1]}; };
    let {finished_at} = args;
  if(finished_at){args.finished_at = {$gte: finished_at[0], $lte: finished_at[1]}; };
    let {started_at} = args;
  if(started_at){args.started_at = {$gte: started_at[0], $lte: started_at[1]}; };
    if(args.trader_name){args.trader_name = {$like: '%'+args.trader_name+'%'}; };
    if(args.order_no){args.order_no = {$like: '%'+args.order_no+'%'}; };
    let {plan_arrived_time} = args;
  if(plan_arrived_time){args.plan_arrived_time = {$gte: plan_arrived_time[0], $lte: plan_arrived_time[1]}; };
    let {plan_depart_time} = args;
  if(plan_depart_time){args.plan_depart_time = {$gte: plan_depart_time[0], $lte: plan_depart_time[1]}; };
    let {arrived_time} = args;
  if(arrived_time){args.arrived_time = {$gte: arrived_time[0], $lte: arrived_time[1]}; };
    let {depart_time} = args;
  if(depart_time){args.depart_time = {$gte: depart_time[0], $lte: depart_time[1]}; };

  if (context.user.roles.indexOf('headoffice_kh') != -1 ){
    return OrderSalesExtKhService.findAll({...{where: args}, ...modelArgs,}); 
  }
  if (context.user.roles.indexOf('admin') != -1 ){
    return OrderSalesExtKhService.findAll({...{where: args}, ...modelArgs,}); 
  }
  if (context.user.roles.indexOf('ops_kh') != -1 ){
    let argsWithAuth = {...args, ...{$and: {control_center_id: context.user.control_center_ids, cat_1st: "A2"}}};
    return OrderSalesExtKhService.findAll({...{where: argsWithAuth}, ...modelArgs,}); 
  }
},

countOrderSalesExtKh(obj, args, context, info){
  let modelArgs = {};
  if(args.deleted_at){args.deleted_at = {$gte: args.deleted_at[0], $lte: args.deleted_at[1]}; modelArgs.paranoid = false };
    let {updated_at} = args;
  if(updated_at){args.updated_at = {$gte: updated_at[0], $lte: updated_at[1]}; };
    let {created_at} = args;
  if(created_at){args.created_at = {$gte: created_at[0], $lte: created_at[1]}; };
    let {finished_at} = args;
  if(finished_at){args.finished_at = {$gte: finished_at[0], $lte: finished_at[1]}; };
    let {started_at} = args;
  if(started_at){args.started_at = {$gte: started_at[0], $lte: started_at[1]}; };
    if(args.trader_name){args.trader_name = {$like: '%'+args.trader_name+'%'}; };
    if(args.order_no){args.order_no = {$like: '%'+args.order_no+'%'}; };
    let {plan_arrived_time} = args;
  if(plan_arrived_time){args.plan_arrived_time = {$gte: plan_arrived_time[0], $lte: plan_arrived_time[1]}; };
    let {plan_depart_time} = args;
  if(plan_depart_time){args.plan_depart_time = {$gte: plan_depart_time[0], $lte: plan_depart_time[1]}; };
    let {arrived_time} = args;
  if(arrived_time){args.arrived_time = {$gte: arrived_time[0], $lte: arrived_time[1]}; };
    let {depart_time} = args;
  if(depart_time){args.depart_time = {$gte: depart_time[0], $lte: depart_time[1]}; };

  if (context.user.roles.indexOf('admin') != -1 ){
    return OrderSalesExtKhService.count({...{where: args}, ...modelArgs,}); 
  }
  if (context.user.roles.indexOf('headoffice_kh') != -1 ){
    return OrderSalesExtKhService.count({...{where: args}, ...modelArgs,}); 
  }
  if (context.user.roles.indexOf('ops_kh') != -1 ){
    let argsWithAuth = {...args, ...{$and: {control_center_id: context.user.control_center_ids, cat_1st: "A2"}}};
    return OrderSalesExtKhService.count({...{where: argsWithAuth}, ...modelArgs,}); 
  }
},

rm_ext_order_billing_one(obj, args, context, info){
  let modelArgs = {};

  if(args.deleted_at){args.deleted_at = {$ne: null}; modelArgs.paranoid = false };
    let {updated_at} = args;
  if(updated_at){args.updated_at = {$gte: updated_at[0], $lte: updated_at[1]}; };
    let {created_at} = args;
  if(created_at){args.created_at = {$gte: created_at[0], $lte: created_at[1]}; };

  if (context.user.roles.indexOf('admin') != -1 ){
    
    return RmExtOrderBillingService.findOne({...{where: args}, ...modelArgs,}); 
  } 
},

rm_ext_order_billing(obj, args, context, info){
  let modelArgs = {};
  if(args.limit){modelArgs.limit = args.limit; delete args.limit; }
  if(args.order){modelArgs.order = args.order; delete args.order; }
  if(args.offset){modelArgs.offset = args.offset; delete args.offset; }

  if(args.deleted_at){args.deleted_at = {$ne: null}; modelArgs.paranoid = false };
    let {updated_at} = args;
  if(updated_at){args.updated_at = {$gte: updated_at[0], $lte: updated_at[1]}; };
    let {created_at} = args;
  if(created_at){args.created_at = {$gte: created_at[0], $lte: created_at[1]}; };

  if (context.user.roles.indexOf('admin') != -1 ){
    
    return RmExtOrderBillingService.findAll({...{where: args}, ...modelArgs,}); 
  } 
},

order_ops_ext_uk_one(obj, args, context, info){
  let modelArgs = {};

  if(args.deleted_at){args.deleted_at = {$ne: null}; modelArgs.paranoid = false };
    let {updated_at} = args;
  if(updated_at){args.updated_at = {$gte: updated_at[0], $lte: updated_at[1]}; };
    let {created_at} = args;
  if(created_at){args.created_at = {$gte: created_at[0], $lte: created_at[1]}; };
    let {finished_at} = args;
  if(finished_at){args.finished_at = {$gte: finished_at[0], $lte: finished_at[1]}; };
    let {started_at} = args;
  if(started_at){args.started_at = {$gte: started_at[0], $lte: started_at[1]}; };
    let {unload_time} = args;
  if(unload_time){args.unload_time = {$gte: unload_time[0], $lte: unload_time[1]}; };
    let {operation_check_time} = args;
  if(operation_check_time){args.operation_check_time = {$gte: operation_check_time[0], $lte: operation_check_time[1]}; };
    let {resource_check_time} = args;
  if(resource_check_time){args.resource_check_time = {$gte: resource_check_time[0], $lte: resource_check_time[1]}; };
    let {actual_arrival_date} = args;
  if(actual_arrival_date){args.actual_arrival_date = {$gte: actual_arrival_date[0], $lte: actual_arrival_date[1]}; };
    let {planned_arrival_date} = args;
  if(planned_arrival_date){args.planned_arrival_date = {$gte: planned_arrival_date[0], $lte: planned_arrival_date[1]}; };

  if (context.user.roles.indexOf('admin') != -1 ){
    
    return OrderOpsExtUkService.findOne({...{where: args}, ...modelArgs,}); 
  } 
  if (context.user.roles.indexOf('headoffice_kh') != -1 ){
    
    return OrderOpsExtUkService.findOne({...{where: args}, ...modelArgs,}); 
  } 
  if (context.user.roles.indexOf('ops_kh') != -1 ){
    
    let argsWithAuth = {...args, ...{$and: {control_center_id: context.user.control_center_ids}}};
    
    return OrderOpsExtUkService.findOne({...{where: argsWithAuth}, ...modelArgs,}); 
  } 
},

order_ops_ext_uk(obj, args, context, info){
  let modelArgs = {};
  if(args.limit){modelArgs.limit = args.limit; delete args.limit; }
  if(args.order){modelArgs.order = args.order; delete args.order; }
  if(args.offset){modelArgs.offset = args.offset; delete args.offset; }

  if(args.deleted_at){args.deleted_at = {$ne: null}; modelArgs.paranoid = false };
    let {updated_at} = args;
  if(updated_at){args.updated_at = {$gte: updated_at[0], $lte: updated_at[1]}; };
    let {created_at} = args;
  if(created_at){args.created_at = {$gte: created_at[0], $lte: created_at[1]}; };
    let {finished_at} = args;
  if(finished_at){args.finished_at = {$gte: finished_at[0], $lte: finished_at[1]}; };
    let {started_at} = args;
  if(started_at){args.started_at = {$gte: started_at[0], $lte: started_at[1]}; };
    let {unload_time} = args;
  if(unload_time){args.unload_time = {$gte: unload_time[0], $lte: unload_time[1]}; };
    let {operation_check_time} = args;
  if(operation_check_time){args.operation_check_time = {$gte: operation_check_time[0], $lte: operation_check_time[1]}; };
    let {resource_check_time} = args;
  if(resource_check_time){args.resource_check_time = {$gte: resource_check_time[0], $lte: resource_check_time[1]}; };
    let {actual_arrival_date} = args;
  if(actual_arrival_date){args.actual_arrival_date = {$gte: actual_arrival_date[0], $lte: actual_arrival_date[1]}; };
    let {planned_arrival_date} = args;
  if(planned_arrival_date){args.planned_arrival_date = {$gte: planned_arrival_date[0], $lte: planned_arrival_date[1]}; };

  if (context.user.roles.indexOf('admin') != -1 ){
    
    return OrderOpsExtUkService.findAll({...{where: args}, ...modelArgs,}); 
  } 
  if (context.user.roles.indexOf('headoffice_kh') != -1 ){
    
    return OrderOpsExtUkService.findAll({...{where: args}, ...modelArgs,}); 
  } 
  if (context.user.roles.indexOf('ops_kh') != -1 ){
    
    let argsWithAuth = {...args, ...{$and: {control_center_id: context.user.control_center_ids}}};
    
    return OrderOpsExtUkService.findAll({...{where: argsWithAuth}, ...modelArgs,}); 
  } 
},

service_actual_one(obj, args, context, info){
  let modelArgs = {};

  let {t_time} = args;
  if(t_time){args.t_time = {$gte: t_time[0], $lte: t_time[1]}; };

  if (context.user.roles.indexOf('admin') != -1 ){
    
    return ServiceActualService.findOne({...{where: args}, ...modelArgs,}); 
  } 
  if (context.user.roles.indexOf('ops_kh') != -1 ){
    
    let argsWithAuth = {...args, ...{$and: {control_center_id: context.user.control_center_ids}}};
    
    return ServiceActualService.findOne({...{where: argsWithAuth}, ...modelArgs,}); 
  } 
  if (context.user.roles.indexOf('headoffice_kh') != -1 ){
    
    return ServiceActualService.findOne({...{where: args}, ...modelArgs,}); 
  } 
},

service_actual(obj, args, context, info){
  let modelArgs = {};
  if(args.limit){modelArgs.limit = args.limit; delete args.limit; }
  if(args.order){modelArgs.order = args.order; delete args.order; }
  if(args.offset){modelArgs.offset = args.offset; delete args.offset; }

  let {t_time} = args;
  if(t_time){args.t_time = {$gte: t_time[0], $lte: t_time[1]}; };

  if (context.user.roles.indexOf('admin') != -1 ){
    
    return ServiceActualService.findAll({...{where: args}, ...modelArgs,}); 
  } 
  if (context.user.roles.indexOf('ops_kh') != -1 ){
    
    let argsWithAuth = {...args, ...{$and: {control_center_id: context.user.control_center_ids}}};
    
    return ServiceActualService.findAll({...{where: argsWithAuth}, ...modelArgs,}); 
  } 
  if (context.user.roles.indexOf('headoffice_kh') != -1 ){
    
    return ServiceActualService.findAll({...{where: args}, ...modelArgs,}); 
  } 
},

service_one(obj, args, context, info){
  let modelArgs = {};



  if (context.user.roles.indexOf('admin') != -1 ){
    
    return ServicexService.findOne({...{where: args}, ...modelArgs,}); 
  } 
},

service(obj, args, context, info){
  let modelArgs = {};
  if(args.limit){modelArgs.limit = args.limit; delete args.limit; }
  if(args.order){modelArgs.order = args.order; delete args.order; }
  if(args.offset){modelArgs.offset = args.offset; delete args.offset; }



  if (context.user.roles.indexOf('admin') != -1 ){
    
    return ServicexService.findAll({...{where: args}, ...modelArgs,}); 
  } 
},

order_sales_ext_uk_one(obj, args, context, info){
  let modelArgs = {};

  if(args.deleted_at){args.deleted_at = {$ne: null}; modelArgs.paranoid = false };
    let {updated_at} = args;
  if(updated_at){args.updated_at = {$gte: updated_at[0], $lte: updated_at[1]}; };
    let {created_at} = args;
  if(created_at){args.created_at = {$gte: created_at[0], $lte: created_at[1]}; };
    let {finished_at} = args;
  if(finished_at){args.finished_at = {$gte: finished_at[0], $lte: finished_at[1]}; };
    let {started_at} = args;
  if(started_at){args.started_at = {$gte: started_at[0], $lte: started_at[1]}; };

  if (context.user.roles.indexOf('admin') != -1 ){
    
    return OrderSalesExtUkService.findOne({...{where: args}, ...modelArgs,}); 
  } 
  if (context.user.roles.indexOf('ops_kh') != -1 ){
    
    let argsWithAuth = {...args, ...{$and: {control_center_id: context.user.control_center_ids}}};
    
    return OrderSalesExtUkService.findOne({...{where: argsWithAuth}, ...modelArgs,}); 
  } 
  if (context.user.roles.indexOf('headoffice_kh') != -1 ){
    
    return OrderSalesExtUkService.findOne({...{where: args}, ...modelArgs,}); 
  } 
},

order_sales_ext_uk(obj, args, context, info){
  let modelArgs = {};
  if(args.limit){modelArgs.limit = args.limit; delete args.limit; }
  if(args.order){modelArgs.order = args.order; delete args.order; }
  if(args.offset){modelArgs.offset = args.offset; delete args.offset; }

  if(args.deleted_at){args.deleted_at = {$ne: null}; modelArgs.paranoid = false };
    let {updated_at} = args;
  if(updated_at){args.updated_at = {$gte: updated_at[0], $lte: updated_at[1]}; };
    let {created_at} = args;
  if(created_at){args.created_at = {$gte: created_at[0], $lte: created_at[1]}; };
    let {finished_at} = args;
  if(finished_at){args.finished_at = {$gte: finished_at[0], $lte: finished_at[1]}; };
    let {started_at} = args;
  if(started_at){args.started_at = {$gte: started_at[0], $lte: started_at[1]}; };

  if (context.user.roles.indexOf('admin') != -1 ){
    
    return OrderSalesExtUkService.findAll({...{where: args}, ...modelArgs,}); 
  } 
  if (context.user.roles.indexOf('ops_kh') != -1 ){
    
    let argsWithAuth = {...args, ...{$and: {control_center_id: context.user.control_center_ids}}};
    
    return OrderSalesExtUkService.findAll({...{where: argsWithAuth}, ...modelArgs,}); 
  } 
  if (context.user.roles.indexOf('headoffice_kh') != -1 ){
    
    return OrderSalesExtUkService.findAll({...{where: args}, ...modelArgs,}); 
  } 
},

order_ops_ext_kh_one(obj, args, context, info){
  let modelArgs = {};

  if(args.deleted_at){args.deleted_at = {$ne: null}; modelArgs.paranoid = false };
    let {updated_at} = args;
  if(updated_at){args.updated_at = {$gte: updated_at[0], $lte: updated_at[1]}; };
    let {created_at} = args;
  if(created_at){args.created_at = {$gte: created_at[0], $lte: created_at[1]}; };
    let {finished_at} = args;
  if(finished_at){args.finished_at = {$gte: finished_at[0], $lte: finished_at[1]}; };
    let {started_at} = args;
  if(started_at){args.started_at = {$gte: started_at[0], $lte: started_at[1]}; };

  if (context.user.roles.indexOf('admin') != -1 ){
    
    return OrderOpsExtKhService.findOne({...{where: args}, ...modelArgs,}); 
  } 
  if (context.user.roles.indexOf('headoffice_kh') != -1 ){
    
    return OrderOpsExtKhService.findOne({...{where: args}, ...modelArgs,}); 
  } 
  if (context.user.roles.indexOf('ops_kh') != -1 ){
    
    let argsWithAuth = {...args, ...{$and: {control_center_id: context.user.control_center_ids}}};
    
    return OrderOpsExtKhService.findOne({...{where: argsWithAuth}, ...modelArgs,}); 
  } 
},

order_ops_ext_kh(obj, args, context, info){
  let modelArgs = {};
  if(args.limit){modelArgs.limit = args.limit; delete args.limit; }
  if(args.order){modelArgs.order = args.order; delete args.order; }
  if(args.offset){modelArgs.offset = args.offset; delete args.offset; }

  if(args.deleted_at){args.deleted_at = {$ne: null}; modelArgs.paranoid = false };
    let {updated_at} = args;
  if(updated_at){args.updated_at = {$gte: updated_at[0], $lte: updated_at[1]}; };
    let {created_at} = args;
  if(created_at){args.created_at = {$gte: created_at[0], $lte: created_at[1]}; };
    let {finished_at} = args;
  if(finished_at){args.finished_at = {$gte: finished_at[0], $lte: finished_at[1]}; };
    let {started_at} = args;
  if(started_at){args.started_at = {$gte: started_at[0], $lte: started_at[1]}; };

  if (context.user.roles.indexOf('admin') != -1 ){
    
    return OrderOpsExtKhService.findAll({...{where: args}, ...modelArgs,}); 
  } 
  if (context.user.roles.indexOf('headoffice_kh') != -1 ){
    
    return OrderOpsExtKhService.findAll({...{where: args}, ...modelArgs,}); 
  } 
  if (context.user.roles.indexOf('ops_kh') != -1 ){
    
    let argsWithAuth = {...args, ...{$and: {control_center_id: context.user.control_center_ids}}};
    
    return OrderOpsExtKhService.findAll({...{where: argsWithAuth}, ...modelArgs,}); 
  } 
},

};

export default sdQueryResolvers;

//  2018-01-29 11:04:50.534518+00