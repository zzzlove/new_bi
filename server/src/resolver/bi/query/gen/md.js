import { EquipmentActualService, MemberActualService, MemberContractService, SignClientDayMonitoringService, ProfileService, ControlCenterService, RmControlCenterEquipmentService, CityService, ControlCenterStatusService, FinCodeActualService, OpsCodeActualService, ControlCenterAlterService, ControlCenterRmService, ControlCenterActualService, RmControlCenterProfileService, MemberCatServiceService, ControlCenterAlterTypeService, ControlCenterBudgetService } from '../../../../service';

const mdQueryResolvers = { 

control_center_budget_one(obj, args, context, info){
  let modelArgs = {};

  let {finished_at} = args;
  if(finished_at){args.finished_at = {$gte: finished_at[0], $lte: finished_at[1]}; };
    let {started_at} = args;
  if(started_at){args.started_at = {$gte: started_at[0], $lte: started_at[1]}; };

  if (context.user.roles.indexOf('admin') != -1 ){
    
    return ControlCenterBudgetService.findOne({...{where: args}, ...modelArgs,}); 
  } 
  if (context.user.roles.indexOf('ops_kh') != -1 ){
    
    let argsWithAuth = {...args, ...{$and: {control_center_id: context.user.control_center_ids}}};
    
    return ControlCenterBudgetService.findOne({...{where: argsWithAuth}, ...modelArgs,}); 
  } 
  if (context.user.roles.indexOf('headoffice_kh') != -1 ){
    
    return ControlCenterBudgetService.findOne({...{where: args}, ...modelArgs,}); 
  } 
},

control_center_budget(obj, args, context, info){
  let modelArgs = {};
  if(args.limit){modelArgs.limit = args.limit; delete args.limit; }
  if(args.order){modelArgs.order = args.order; delete args.order; }
  if(args.offset){modelArgs.offset = args.offset; delete args.offset; }

  let {finished_at} = args;
  if(finished_at){args.finished_at = {$gte: finished_at[0], $lte: finished_at[1]}; };
    let {started_at} = args;
  if(started_at){args.started_at = {$gte: started_at[0], $lte: started_at[1]}; };

  if (context.user.roles.indexOf('admin') != -1 ){
    
    return ControlCenterBudgetService.findAll({...{where: args}, ...modelArgs,}); 
  } 
  if (context.user.roles.indexOf('ops_kh') != -1 ){
    
    let argsWithAuth = {...args, ...{$and: {control_center_id: context.user.control_center_ids}}};
    
    return ControlCenterBudgetService.findAll({...{where: argsWithAuth}, ...modelArgs,}); 
  } 
  if (context.user.roles.indexOf('headoffice_kh') != -1 ){
    
    return ControlCenterBudgetService.findAll({...{where: args}, ...modelArgs,}); 
  } 
},

rm_control_center_equipment_one(obj, args, context, info){
  let modelArgs = {};



  if (context.user.roles.indexOf('admin') != -1 ){
    
    return RmControlCenterEquipmentService.findOne({...{where: args}, ...modelArgs,}); 
  } 
  if (context.user.roles.indexOf('headoffice_kh') != -1 ){
    
    return RmControlCenterEquipmentService.findOne({...{where: args}, ...modelArgs,}); 
  } 
  if (context.user.roles.indexOf('ops_kh') != -1 ){
    
    let argsWithAuth = {...args, ...{$and: {control_center_id: context.user.control_center_ids}}};
    
    return RmControlCenterEquipmentService.findOne({...{where: argsWithAuth}, ...modelArgs,}); 
  } 
},

rm_control_center_equipment(obj, args, context, info){
  let modelArgs = {};
  if(args.limit){modelArgs.limit = args.limit; delete args.limit; }
  if(args.order){modelArgs.order = args.order; delete args.order; }
  if(args.offset){modelArgs.offset = args.offset; delete args.offset; }



  if (context.user.roles.indexOf('admin') != -1 ){
    
    return RmControlCenterEquipmentService.findAll({...{where: args}, ...modelArgs,}); 
  } 
  if (context.user.roles.indexOf('headoffice_kh') != -1 ){
    
    return RmControlCenterEquipmentService.findAll({...{where: args}, ...modelArgs,}); 
  } 
  if (context.user.roles.indexOf('ops_kh') != -1 ){
    
    let argsWithAuth = {...args, ...{$and: {control_center_id: context.user.control_center_ids}}};
    
    return RmControlCenterEquipmentService.findAll({...{where: argsWithAuth}, ...modelArgs,}); 
  } 
},

member_contract_one(obj, args, context, info){
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
    
    return MemberContractService.findOne({...{where: args}, ...modelArgs,}); 
  } 
  if (context.user.roles.indexOf('ops_kh') != -1 ){
    
    let argsWithAuth = {...args, ...{$and: {service_id: context.user.control_center_ids}}};
    
    return MemberContractService.findOne({...{where: argsWithAuth}, ...modelArgs,}); 
  } 
  if (context.user.roles.indexOf('headoffice_kh') != -1 ){
    
    return MemberContractService.findOne({...{where: args}, ...modelArgs,}); 
  } 
},

member_contract(obj, args, context, info){
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
    
    return MemberContractService.findAll({...{where: args}, ...modelArgs,}); 
  } 
  if (context.user.roles.indexOf('ops_kh') != -1 ){
    
    let argsWithAuth = {...args, ...{$and: {service_id: context.user.control_center_ids}}};
    
    return MemberContractService.findAll({...{where: argsWithAuth}, ...modelArgs,}); 
  } 
  if (context.user.roles.indexOf('headoffice_kh') != -1 ){
    
    return MemberContractService.findAll({...{where: args}, ...modelArgs,}); 
  } 
},

rm_control_center_profile_one(obj, args, context, info){
  let modelArgs = {};

  let {started_at} = args;
  if(started_at){args.started_at = {$gte: started_at[0], $lte: started_at[1]}; };
    let {finished_at} = args;
  if(finished_at){args.finished_at = {$gte: finished_at[0], $lte: finished_at[1]}; };

  if (context.user.roles.indexOf('admin') != -1 ){
    
    return RmControlCenterProfileService.findOne({...{where: args}, ...modelArgs,}); 
  } 
  if (context.user.roles.indexOf('headoffice_kh') != -1 ){
    
    return RmControlCenterProfileService.findOne({...{where: args}, ...modelArgs,}); 
  } 
  if (context.user.roles.indexOf('ops_kh') != -1 ){
    
    let argsWithAuth = {...args, ...{$and: {control_center_id: context.user.control_center_ids}}};
    
    return RmControlCenterProfileService.findOne({...{where: argsWithAuth}, ...modelArgs,}); 
  } 
},

rm_control_center_profile(obj, args, context, info){
  let modelArgs = {};
  if(args.limit){modelArgs.limit = args.limit; delete args.limit; }
  if(args.order){modelArgs.order = args.order; delete args.order; }
  if(args.offset){modelArgs.offset = args.offset; delete args.offset; }

  let {started_at} = args;
  if(started_at){args.started_at = {$gte: started_at[0], $lte: started_at[1]}; };
    let {finished_at} = args;
  if(finished_at){args.finished_at = {$gte: finished_at[0], $lte: finished_at[1]}; };

  if (context.user.roles.indexOf('admin') != -1 ){
    
    return RmControlCenterProfileService.findAll({...{where: args}, ...modelArgs,}); 
  } 
  if (context.user.roles.indexOf('headoffice_kh') != -1 ){
    
    return RmControlCenterProfileService.findAll({...{where: args}, ...modelArgs,}); 
  } 
  if (context.user.roles.indexOf('ops_kh') != -1 ){
    
    let argsWithAuth = {...args, ...{$and: {control_center_id: context.user.control_center_ids}}};
    
    return RmControlCenterProfileService.findAll({...{where: argsWithAuth}, ...modelArgs,}); 
  } 
},

profile_one(obj, args, context, info){
  let modelArgs = {};
  let {started_at} = args;
  if(started_at){args.started_at = {$gte: started_at[0], $lte: started_at[1]}; };
    let {finished_at} = args;
  if(finished_at){args.finished_at = {$gte: finished_at[0], $lte: finished_at[1]}; };
    let {updated_at} = args;
  if(updated_at){args.updated_at = {$gte: updated_at[0], $lte: updated_at[1]}; };
    if(args.deleted_at){args.deleted_at = {$gte: args.deleted_at[0], $lte: args.deleted_at[1]}; modelArgs.paranoid = false };
    let {created_at} = args;
  if(created_at){args.created_at = {$gte: created_at[0], $lte: created_at[1]}; };
    if(args.types){args.types = {$contains: args.types}; };
    if(args.biz_codes){args.biz_codes = {$contains: args.biz_codes}; };
    if(args.concerning_ids){args.concerning_ids = {$contains: args.concerning_ids}; };
    if(args.control_ids){args.control_ids = {$contains: args.control_ids}; };
    if(args.readable){args.readable = {$contains: args.readable}; };

  if (context.user.roles.indexOf('admin') != -1 ){
    return ProfileService.findOne({where: args}); 
  }
},

profile(obj, args, context, info){
  let modelArgs = {};
  if(args.limit){modelArgs.limit = args.limit; delete args.limit; }
  if(args.order){modelArgs.order = args.order; delete args.order; }
  if(args.offset==0||args.offset){modelArgs.offset = args.offset; delete args.offset; }
  let {started_at} = args;
  if(started_at){args.started_at = {$gte: started_at[0], $lte: started_at[1]}; };
    let {finished_at} = args;
  if(finished_at){args.finished_at = {$gte: finished_at[0], $lte: finished_at[1]}; };
    let {updated_at} = args;
  if(updated_at){args.updated_at = {$gte: updated_at[0], $lte: updated_at[1]}; };
    if(args.deleted_at){args.deleted_at = {$gte: args.deleted_at[0], $lte: args.deleted_at[1]}; modelArgs.paranoid = false };
    let {created_at} = args;
  if(created_at){args.created_at = {$gte: created_at[0], $lte: created_at[1]}; };
    if(args.types){args.types = {$contains: args.types}; };
    if(args.biz_codes){args.biz_codes = {$contains: args.biz_codes}; };
    if(args.concerning_ids){args.concerning_ids = {$contains: args.concerning_ids}; };
    if(args.control_ids){args.control_ids = {$contains: args.control_ids}; };
    if(args.readable){args.readable = {$contains: args.readable}; };

  if (context.user.roles.indexOf('admin') != -1 ){
    return ProfileService.findAll({...{where: args}, ...modelArgs,}); 
  }
},

countProfile(obj, args, context, info){
  let modelArgs = {};
  let {started_at} = args;
  if(started_at){args.started_at = {$gte: started_at[0], $lte: started_at[1]}; };
    let {finished_at} = args;
  if(finished_at){args.finished_at = {$gte: finished_at[0], $lte: finished_at[1]}; };
    let {updated_at} = args;
  if(updated_at){args.updated_at = {$gte: updated_at[0], $lte: updated_at[1]}; };
    if(args.deleted_at){args.deleted_at = {$gte: args.deleted_at[0], $lte: args.deleted_at[1]}; modelArgs.paranoid = false };
    let {created_at} = args;
  if(created_at){args.created_at = {$gte: created_at[0], $lte: created_at[1]}; };
    if(args.types){args.types = {$contains: args.types}; };
    if(args.biz_codes){args.biz_codes = {$contains: args.biz_codes}; };
    if(args.concerning_ids){args.concerning_ids = {$contains: args.concerning_ids}; };
    if(args.control_ids){args.control_ids = {$contains: args.control_ids}; };
    if(args.readable){args.readable = {$contains: args.readable}; };

  if (context.user.roles.indexOf('admin') != -1 ){
    return ProfileService.count({...{where: args}, ...modelArgs,}); 
  }
},

control_center_status_one(obj, args, context, info){
  let modelArgs = {};

  let {finished_at} = args;
  if(finished_at){args.finished_at = {$gte: finished_at[0], $lte: finished_at[1]}; };
    let {started_at} = args;
  if(started_at){args.started_at = {$gte: started_at[0], $lte: started_at[1]}; };

  if (context.user.roles.indexOf('admin') != -1 ){
    
    return ControlCenterStatusService.findOne({...{where: args}, ...modelArgs,}); 
  } 
  if (context.user.roles.indexOf('ops_kh') != -1 ){
    
    let argsWithAuth = {...args, ...{$and: {control_center_id: context.user.control_center_ids}}};
    
    return ControlCenterStatusService.findOne({...{where: argsWithAuth}, ...modelArgs,}); 
  } 
  if (context.user.roles.indexOf('headoffice_kh') != -1 ){
    
    return ControlCenterStatusService.findOne({...{where: args}, ...modelArgs,}); 
  } 
},

control_center_status(obj, args, context, info){
  let modelArgs = {};
  if(args.limit){modelArgs.limit = args.limit; delete args.limit; }
  if(args.order){modelArgs.order = args.order; delete args.order; }
  if(args.offset){modelArgs.offset = args.offset; delete args.offset; }

  let {finished_at} = args;
  if(finished_at){args.finished_at = {$gte: finished_at[0], $lte: finished_at[1]}; };
    let {started_at} = args;
  if(started_at){args.started_at = {$gte: started_at[0], $lte: started_at[1]}; };

  if (context.user.roles.indexOf('admin') != -1 ){
    
    return ControlCenterStatusService.findAll({...{where: args}, ...modelArgs,}); 
  } 
  if (context.user.roles.indexOf('ops_kh') != -1 ){
    
    let argsWithAuth = {...args, ...{$and: {control_center_id: context.user.control_center_ids}}};
    
    return ControlCenterStatusService.findAll({...{where: argsWithAuth}, ...modelArgs,}); 
  } 
  if (context.user.roles.indexOf('headoffice_kh') != -1 ){
    
    return ControlCenterStatusService.findAll({...{where: args}, ...modelArgs,}); 
  } 
},

control_center_alter_type_one(obj, args, context, info){
  let modelArgs = {};


  if (context.user.roles.indexOf('admin') != -1 ){
    return ControlCenterAlterTypeService.findOne({where: args}); 
  }
},

control_center_alter_type(obj, args, context, info){
  let modelArgs = {};
  if(args.limit){modelArgs.limit = args.limit; delete args.limit; }
  if(args.order){modelArgs.order = args.order; delete args.order; }
  if(args.offset==0||args.offset){modelArgs.offset = args.offset; delete args.offset; }


  if (context.user.roles.indexOf('admin') != -1 ){
    return ControlCenterAlterTypeService.findAll({...{where: args}, ...modelArgs,}); 
  }
},

countControlCenterAlterType(obj, args, context, info){
  let modelArgs = {};


  if (context.user.roles.indexOf('admin') != -1 ){
    return ControlCenterAlterTypeService.count({...{where: args}, ...modelArgs,}); 
  }
},

member_cat_service_one(obj, args, context, info){
  let modelArgs = {};
  let {date2} = args;
  if(date2){args.date2 = {$gte: date2[0], $lte: date2[1]}; };
    let {date1} = args;
  if(date1){args.date1 = {$gte: date1[0], $lte: date1[1]}; };

  if (context.user.roles.indexOf('headoffice_kh') != -1 ){
    return MemberCatServiceService.findOne({where: args}); 
  }
  if (context.user.roles.indexOf('admin') != -1 ){
    return MemberCatServiceService.findOne({where: args}); 
  }
},

member_cat_service(obj, args, context, info){
  let modelArgs = {};
  if(args.limit){modelArgs.limit = args.limit; delete args.limit; }
  if(args.order){modelArgs.order = args.order; delete args.order; }
  if(args.offset==0||args.offset){modelArgs.offset = args.offset; delete args.offset; }
  let {date2} = args;
  if(date2){args.date2 = {$gte: date2[0], $lte: date2[1]}; };
    let {date1} = args;
  if(date1){args.date1 = {$gte: date1[0], $lte: date1[1]}; };

  if (context.user.roles.indexOf('headoffice_kh') != -1 ){
    return MemberCatServiceService.findAll({...{where: args}, ...modelArgs,}); 
  }
  if (context.user.roles.indexOf('admin') != -1 ){
    return MemberCatServiceService.findAll({...{where: args}, ...modelArgs,}); 
  }
},

countMemberCatService(obj, args, context, info){
  let modelArgs = {};
  let {date2} = args;
  if(date2){args.date2 = {$gte: date2[0], $lte: date2[1]}; };
    let {date1} = args;
  if(date1){args.date1 = {$gte: date1[0], $lte: date1[1]}; };

  if (context.user.roles.indexOf('headoffice_kh') != -1 ){
    return MemberCatServiceService.count({...{where: args}, ...modelArgs,}); 
  }
  if (context.user.roles.indexOf('admin') != -1 ){
    return MemberCatServiceService.count({...{where: args}, ...modelArgs,}); 
  }
},

fin_code_actual_one(obj, args, context, info){
  let modelArgs = {};

  let {t_time} = args;
  if(t_time){args.t_time = {$gte: t_time[0], $lte: t_time[1]}; };

  if (context.user.roles.indexOf('admin') != -1 ){
    
    return FinCodeActualService.findOne({...{where: args}, ...modelArgs,}); 
  } 
  if (context.user.roles.indexOf('ops_kh') != -1 ){
    
    let argsWithAuth = {...args, ...{$and: {fin_code: context.user.fin_code_all}}};
    
    return FinCodeActualService.findOne({...{where: argsWithAuth}, ...modelArgs,}); 
  } 
  if (context.user.roles.indexOf('headoffice_kh') != -1 ){
    
    return FinCodeActualService.findOne({...{where: args}, ...modelArgs,}); 
  } 
},

fin_code_actual(obj, args, context, info){
  let modelArgs = {};
  if(args.limit){modelArgs.limit = args.limit; delete args.limit; }
  if(args.order){modelArgs.order = args.order; delete args.order; }
  if(args.offset){modelArgs.offset = args.offset; delete args.offset; }

  let {t_time} = args;
  if(t_time){args.t_time = {$gte: t_time[0], $lte: t_time[1]}; };

  if (context.user.roles.indexOf('admin') != -1 ){
    
    return FinCodeActualService.findAll({...{where: args}, ...modelArgs,}); 
  } 
  if (context.user.roles.indexOf('ops_kh') != -1 ){
    
    let argsWithAuth = {...args, ...{$and: {fin_code: context.user.fin_code_all}}};
    
    return FinCodeActualService.findAll({...{where: argsWithAuth}, ...modelArgs,}); 
  } 
  if (context.user.roles.indexOf('headoffice_kh') != -1 ){
    
    return FinCodeActualService.findAll({...{where: args}, ...modelArgs,}); 
  } 
},

control_center_rm_one(obj, args, context, info){
  let modelArgs = {};


  if (context.user.roles.indexOf('headoffice_kh') != -1 ){
    return ControlCenterRmService.findOne({where: args}); 
  }
  if (context.user.roles.indexOf('admin') != -1 ){
    return ControlCenterRmService.findOne({where: args}); 
  }
  if (context.user.roles.indexOf('ops_kh') != -1 ){
    let argsWithAuth = {...args, ...{$and: {control_center_id: context.user.control_center_ids}}};
    return ControlCenterRmService.findOne({where: argsWithAuth}); 
  }
},

control_center_rm(obj, args, context, info){
  let modelArgs = {};
  if(args.limit){modelArgs.limit = args.limit; delete args.limit; }
  if(args.order){modelArgs.order = args.order; delete args.order; }
  if(args.offset==0||args.offset){modelArgs.offset = args.offset; delete args.offset; }


  if (context.user.roles.indexOf('headoffice_kh') != -1 ){
    return ControlCenterRmService.findAll({...{where: args}, ...modelArgs,}); 
  }
  if (context.user.roles.indexOf('admin') != -1 ){
    return ControlCenterRmService.findAll({...{where: args}, ...modelArgs,}); 
  }
  if (context.user.roles.indexOf('ops_kh') != -1 ){
    let argsWithAuth = {...args, ...{$and: {control_center_id: context.user.control_center_ids}}};
    return ControlCenterRmService.findAll({...{where: argsWithAuth}, ...modelArgs,}); 
  }
},

countControlCenterRm(obj, args, context, info){
  let modelArgs = {};


  if (context.user.roles.indexOf('admin') != -1 ){
    return ControlCenterRmService.count({...{where: args}, ...modelArgs,}); 
  }
  if (context.user.roles.indexOf('headoffice_kh') != -1 ){
    return ControlCenterRmService.count({...{where: args}, ...modelArgs,}); 
  }
  if (context.user.roles.indexOf('ops_kh') != -1 ){
    let argsWithAuth = {...args, ...{$and: {control_center_id: context.user.control_center_ids}}};
    return ControlCenterRmService.count({...{where: argsWithAuth}, ...modelArgs,}); 
  }
},

ops_code_actual_one(obj, args, context, info){
  let modelArgs = {};

  let {t_time} = args;
  if(t_time){args.t_time = {$gte: t_time[0], $lte: t_time[1]}; };

  if (context.user.roles.indexOf('admin') != -1 ){
    
    return OpsCodeActualService.findOne({...{where: args}, ...modelArgs,}); 
  } 
  if (context.user.roles.indexOf('ops_kh') != -1 ){
    
    let argsWithAuth = {...args, ...{$and: {ops_code: context.user.ops_code_all}}};
    
    return OpsCodeActualService.findOne({...{where: argsWithAuth}, ...modelArgs,}); 
  } 
  if (context.user.roles.indexOf('headoffice_kh') != -1 ){
    
    return OpsCodeActualService.findOne({...{where: args}, ...modelArgs,}); 
  } 
},

ops_code_actual(obj, args, context, info){
  let modelArgs = {};
  if(args.limit){modelArgs.limit = args.limit; delete args.limit; }
  if(args.order){modelArgs.order = args.order; delete args.order; }
  if(args.offset){modelArgs.offset = args.offset; delete args.offset; }

  let {t_time} = args;
  if(t_time){args.t_time = {$gte: t_time[0], $lte: t_time[1]}; };

  if (context.user.roles.indexOf('admin') != -1 ){
    
    return OpsCodeActualService.findAll({...{where: args}, ...modelArgs,}); 
  } 
  if (context.user.roles.indexOf('ops_kh') != -1 ){
    
    let argsWithAuth = {...args, ...{$and: {ops_code: context.user.ops_code_all}}};
    
    return OpsCodeActualService.findAll({...{where: argsWithAuth}, ...modelArgs,}); 
  } 
  if (context.user.roles.indexOf('headoffice_kh') != -1 ){
    
    return OpsCodeActualService.findAll({...{where: args}, ...modelArgs,}); 
  } 
},

sign_client_day_monitoring_one(obj, args, context, info){
  let modelArgs = {};
  let {created_time_at} = args;
  if(created_time_at){args.created_time_at = {$gte: created_time_at[0], $lte: created_time_at[1]}; };

  if (context.user.roles.indexOf('admin') != -1 ){
    return SignClientDayMonitoringService.findOne({where: args}); 
  }
},

sign_client_day_monitoring(obj, args, context, info){
  let modelArgs = {};
  if(args.limit){modelArgs.limit = args.limit; delete args.limit; }
  if(args.order){modelArgs.order = args.order; delete args.order; }
  if(args.offset==0||args.offset){modelArgs.offset = args.offset; delete args.offset; }
  let {created_time_at} = args;
  if(created_time_at){args.created_time_at = {$gte: created_time_at[0], $lte: created_time_at[1]}; };

  if (context.user.roles.indexOf('admin') != -1 ){
    return SignClientDayMonitoringService.findAll({...{where: args}, ...modelArgs,}); 
  }
},

countSignClientDayMonitoring(obj, args, context, info){
  let modelArgs = {};
  let {created_time_at} = args;
  if(created_time_at){args.created_time_at = {$gte: created_time_at[0], $lte: created_time_at[1]}; };

  if (context.user.roles.indexOf('admin') != -1 ){
    return SignClientDayMonitoringService.count({...{where: args}, ...modelArgs,}); 
  }
},

control_center_one(obj, args, context, info){
  let modelArgs = {};
  let {started_at} = args;
  if(started_at){args.started_at = {$gte: started_at[0], $lte: started_at[1]}; };
    let {finished_at} = args;
  if(finished_at){args.finished_at = {$gte: finished_at[0], $lte: finished_at[1]}; };
    if(args.children_ids){args.children_ids = {$contains: args.children_ids}; };

  if (context.user.roles.indexOf('headoffice_kh') != -1 ){
    return ControlCenterService.findOne({where: args}); 
  }
  if (context.user.roles.indexOf('admin') != -1 ){
    return ControlCenterService.findOne({where: args}); 
  }
  if (context.user.roles.indexOf('ops_kh') != -1 ){
    let argsWithAuth = {...args, ...{$and: {id: context.user.service_no_all}}};
    return ControlCenterService.findOne({where: argsWithAuth}); 
  }
},

control_center(obj, args, context, info){
  let modelArgs = {};
  if(args.limit){modelArgs.limit = args.limit; delete args.limit; }
  if(args.order){modelArgs.order = args.order; delete args.order; }
  if(args.offset==0||args.offset){modelArgs.offset = args.offset; delete args.offset; }
  let {started_at} = args;
  if(started_at){args.started_at = {$gte: started_at[0], $lte: started_at[1]}; };
    let {finished_at} = args;
  if(finished_at){args.finished_at = {$gte: finished_at[0], $lte: finished_at[1]}; };
    if(args.children_ids){args.children_ids = {$contains: args.children_ids}; };

  if (context.user.roles.indexOf('headoffice_kh') != -1 ){
    return ControlCenterService.findAll({...{where: args}, ...modelArgs,}); 
  }
  if (context.user.roles.indexOf('admin') != -1 ){
    return ControlCenterService.findAll({...{where: args}, ...modelArgs,}); 
  }
  if (context.user.roles.indexOf('ops_kh') != -1 ){
    let argsWithAuth = {...args, ...{$and: {id: context.user.service_no_all}}};
    return ControlCenterService.findAll({...{where: argsWithAuth}, ...modelArgs,}); 
  }
},

countControlCenter(obj, args, context, info){
  let modelArgs = {};
  let {started_at} = args;
  if(started_at){args.started_at = {$gte: started_at[0], $lte: started_at[1]}; };
    let {finished_at} = args;
  if(finished_at){args.finished_at = {$gte: finished_at[0], $lte: finished_at[1]}; };
    if(args.children_ids){args.children_ids = {$contains: args.children_ids}; };

  if (context.user.roles.indexOf('headoffice_kh') != -1 ){
    return ControlCenterService.count({...{where: args}, ...modelArgs,}); 
  }
  if (context.user.roles.indexOf('admin') != -1 ){
    return ControlCenterService.count({...{where: args}, ...modelArgs,}); 
  }
  if (context.user.roles.indexOf('ops_kh') != -1 ){
    let argsWithAuth = {...args, ...{$and: {id: context.user.service_no_all}}};
    return ControlCenterService.count({...{where: argsWithAuth}, ...modelArgs,}); 
  }
},

control_center_actual_one(obj, args, context, info){
  let modelArgs = {};
  let {t_time} = args;
  if(t_time){args.t_time = {$gte: t_time[0], $lte: t_time[1]}; };
    if(args.data_f){args.data_f = {$contains: args.data_f}; };

  if (context.user.roles.indexOf('headoffice_kh') != -1 ){
    return ControlCenterActualService.findOne({where: args}); 
  }
  if (context.user.roles.indexOf('admin') != -1 ){
    return ControlCenterActualService.findOne({where: args}); 
  }
  if (context.user.roles.indexOf('ops_kh') != -1 ){
    let argsWithAuth = {...args, ...{$and: {control_center_id: context.user.control_center_ids}}};
    return ControlCenterActualService.findOne({where: argsWithAuth}); 
  }
},

control_center_actual(obj, args, context, info){
  let modelArgs = {};
  if(args.limit){modelArgs.limit = args.limit; delete args.limit; }
  if(args.order){modelArgs.order = args.order; delete args.order; }
  if(args.offset==0||args.offset){modelArgs.offset = args.offset; delete args.offset; }
  let {t_time} = args;
  if(t_time){args.t_time = {$gte: t_time[0], $lte: t_time[1]}; };
    if(args.data_f){args.data_f = {$contains: args.data_f}; };

  if (context.user.roles.indexOf('headoffice_kh') != -1 ){
    return ControlCenterActualService.findAll({...{where: args}, ...modelArgs,}); 
  }
  if (context.user.roles.indexOf('admin') != -1 ){
    return ControlCenterActualService.findAll({...{where: args}, ...modelArgs,}); 
  }
  if (context.user.roles.indexOf('ops_kh') != -1 ){
    let argsWithAuth = {...args, ...{$and: {control_center_id: context.user.control_center_ids}}};
    return ControlCenterActualService.findAll({...{where: argsWithAuth}, ...modelArgs,}); 
  }
},

countControlCenterActual(obj, args, context, info){
  let modelArgs = {};
  let {t_time} = args;
  if(t_time){args.t_time = {$gte: t_time[0], $lte: t_time[1]}; };
    if(args.data_f){args.data_f = {$contains: args.data_f}; };

  if (context.user.roles.indexOf('headoffice_kh') != -1 ){
    return ControlCenterActualService.count({...{where: args}, ...modelArgs,}); 
  }
  if (context.user.roles.indexOf('admin') != -1 ){
    return ControlCenterActualService.count({...{where: args}, ...modelArgs,}); 
  }
  if (context.user.roles.indexOf('ops_kh') != -1 ){
    let argsWithAuth = {...args, ...{$and: {control_center_id: context.user.control_center_ids}}};
    return ControlCenterActualService.count({...{where: argsWithAuth}, ...modelArgs,}); 
  }
},

city_one(obj, args, context, info){
  let modelArgs = {};
  if(args.readable_pfids){args.readable_pfids = {$contains: args.readable_pfids}; };

  if (context.user.roles.indexOf('admin') != -1 ){
    return CityService.findOne({where: args}); 
  }
},

city(obj, args, context, info){
  let modelArgs = {};
  if(args.limit){modelArgs.limit = args.limit; delete args.limit; }
  if(args.order){modelArgs.order = args.order; delete args.order; }
  if(args.offset==0||args.offset){modelArgs.offset = args.offset; delete args.offset; }
  if(args.readable_pfids){args.readable_pfids = {$contains: args.readable_pfids}; };

  if (context.user.roles.indexOf('admin') != -1 ){
    return CityService.findAll({...{where: args}, ...modelArgs,}); 
  }
},

countCity(obj, args, context, info){
  let modelArgs = {};
  if(args.readable_pfids){args.readable_pfids = {$contains: args.readable_pfids}; };

  if (context.user.roles.indexOf('admin') != -1 ){
    return CityService.count({...{where: args}, ...modelArgs,}); 
  }
},

equipment_actual_one(obj, args, context, info){
  let modelArgs = {};

  let {t_time} = args;
  if(t_time){args.t_time = {$gte: t_time[0], $lte: t_time[1]}; };

  if (context.user.roles.indexOf('admin') != -1 ){
    
    return EquipmentActualService.findOne({...{where: args}, ...modelArgs,}); 
  } 
  if (context.user.roles.indexOf('headoffice_kh') != -1 ){
    
    return EquipmentActualService.findOne({...{where: args}, ...modelArgs,}); 
  } 
  if (context.user.roles.indexOf('ops_kh') != -1 ){
    
    let argsWithAuth = {...args, ...{$and: {ops_code: context.user.ops_code_all}}};
    
    return EquipmentActualService.findOne({...{where: argsWithAuth}, ...modelArgs,}); 
  } 
},

equipment_actual(obj, args, context, info){
  let modelArgs = {};
  if(args.limit){modelArgs.limit = args.limit; delete args.limit; }
  if(args.order){modelArgs.order = args.order; delete args.order; }
  if(args.offset){modelArgs.offset = args.offset; delete args.offset; }

  let {t_time} = args;
  if(t_time){args.t_time = {$gte: t_time[0], $lte: t_time[1]}; };

  if (context.user.roles.indexOf('admin') != -1 ){
    
    return EquipmentActualService.findAll({...{where: args}, ...modelArgs,}); 
  } 
  if (context.user.roles.indexOf('headoffice_kh') != -1 ){
    
    return EquipmentActualService.findAll({...{where: args}, ...modelArgs,}); 
  } 
  if (context.user.roles.indexOf('ops_kh') != -1 ){
    
    let argsWithAuth = {...args, ...{$and: {ops_code: context.user.ops_code_all}}};
    
    return EquipmentActualService.findAll({...{where: argsWithAuth}, ...modelArgs,}); 
  } 
},

member_actual_one(obj, args, context, info){
  let modelArgs = {};

  let {t_time} = args;
  if(t_time){args.t_time = {$gte: t_time[0], $lte: t_time[1]}; };

  if (context.user.roles.indexOf('admin') != -1 ){
    
    return MemberActualService.findOne({...{where: args}, ...modelArgs,}); 
  } 
  if (context.user.roles.indexOf('ops_kh') != -1 ){
    
    let argsWithAuth = {...args, ...{$and: {control_center_id: context.user.control_center_ids}}};
    
    return MemberActualService.findOne({...{where: argsWithAuth}, ...modelArgs,}); 
  } 
  if (context.user.roles.indexOf('headoffice_kh') != -1 ){
    
    return MemberActualService.findOne({...{where: args}, ...modelArgs,}); 
  } 
},

member_actual(obj, args, context, info){
  let modelArgs = {};
  if(args.limit){modelArgs.limit = args.limit; delete args.limit; }
  if(args.order){modelArgs.order = args.order; delete args.order; }
  if(args.offset){modelArgs.offset = args.offset; delete args.offset; }

  let {t_time} = args;
  if(t_time){args.t_time = {$gte: t_time[0], $lte: t_time[1]}; };

  if (context.user.roles.indexOf('admin') != -1 ){
    
    return MemberActualService.findAll({...{where: args}, ...modelArgs,}); 
  } 
  if (context.user.roles.indexOf('ops_kh') != -1 ){
    
    let argsWithAuth = {...args, ...{$and: {control_center_id: context.user.control_center_ids}}};
    
    return MemberActualService.findAll({...{where: argsWithAuth}, ...modelArgs,}); 
  } 
  if (context.user.roles.indexOf('headoffice_kh') != -1 ){
    
    return MemberActualService.findAll({...{where: args}, ...modelArgs,}); 
  } 
},

control_center_alter_one(obj, args, context, info){
  let modelArgs = {};



  if (context.user.roles.indexOf('admin') != -1 ){
    
    return ControlCenterAlterService.findOne({...{where: args}, ...modelArgs,}); 
  } 
  if (context.user.roles.indexOf('headoffice_kh') != -1 ){
    
    return ControlCenterAlterService.findOne({...{where: args}, ...modelArgs,}); 
  } 
  if (context.user.roles.indexOf('ops_kh') != -1 ){
    
    let argsWithAuth = {...args, ...{$and: {control_center_id: context.user.control_center_ids}}};
    
    return ControlCenterAlterService.findOne({...{where: argsWithAuth}, ...modelArgs,}); 
  } 
},

control_center_alter(obj, args, context, info){
  let modelArgs = {};
  if(args.limit){modelArgs.limit = args.limit; delete args.limit; }
  if(args.order){modelArgs.order = args.order; delete args.order; }
  if(args.offset){modelArgs.offset = args.offset; delete args.offset; }



  if (context.user.roles.indexOf('admin') != -1 ){
    
    return ControlCenterAlterService.findAll({...{where: args}, ...modelArgs,}); 
  } 
  if (context.user.roles.indexOf('headoffice_kh') != -1 ){
    
    return ControlCenterAlterService.findAll({...{where: args}, ...modelArgs,}); 
  } 
  if (context.user.roles.indexOf('ops_kh') != -1 ){
    
    let argsWithAuth = {...args, ...{$and: {control_center_id: context.user.control_center_ids}}};
    
    return ControlCenterAlterService.findAll({...{where: argsWithAuth}, ...modelArgs,}); 
  } 
},

};

export default mdQueryResolvers;

//  2018-01-25 10:35:57.864287+08