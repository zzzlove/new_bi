import { ChartTitleService, CubeDataService, ChartDataService } from '../../../../service';

const biQueryResolvers = { 

cube_data_one(obj, args, context, info){
  let modelArgs = {};

  let {t_time} = args;
  if(t_time){args.t_time = {$gte: t_time[0], $lte: t_time[1]}; };

  if (context.user.roles.indexOf('admin') != -1 ){
    
    return CubeDataService.findOne({...{where: args}, ...modelArgs,}); 
  } 
  if (context.user.roles.indexOf('ops_kh') != -1 ){
    
    let argsWithAuth = {...args, ...{$and: {control_center_id: context.user.control_center_ids}}};
    
    return CubeDataService.findOne({...{where: argsWithAuth}, ...modelArgs,}); 
  } 
  if (context.user.roles.indexOf('headoffice_kh') != -1 ){
    
    return CubeDataService.findOne({...{where: args}, ...modelArgs,}); 
  } 
},

cube_data(obj, args, context, info){
  let modelArgs = {};
  if(args.limit){modelArgs.limit = args.limit; delete args.limit; }
  if(args.order){modelArgs.order = args.order; delete args.order; }
  if(args.offset){modelArgs.offset = args.offset; delete args.offset; }

  let {t_time} = args;
  if(t_time){args.t_time = {$gte: t_time[0], $lte: t_time[1]}; };

  if (context.user.roles.indexOf('admin') != -1 ){
    
    return CubeDataService.findAll({...{where: args}, ...modelArgs,}); 
  } 
  if (context.user.roles.indexOf('ops_kh') != -1 ){
    
    let argsWithAuth = {...args, ...{$and: {control_center_id: context.user.control_center_ids}}};
    
    return CubeDataService.findAll({...{where: argsWithAuth}, ...modelArgs,}); 
  } 
  if (context.user.roles.indexOf('headoffice_kh') != -1 ){
    
    return CubeDataService.findAll({...{where: args}, ...modelArgs,}); 
  } 
},

chart_data_one(obj, args, context, info){
  let modelArgs = {};

  let {t_time} = args;
  if(t_time){args.t_time = {$gte: t_time[0], $lte: t_time[1]}; };

  if (context.user.roles.indexOf('admin') != -1 ){
    
    return ChartDataService.findOne({...{where: args}, ...modelArgs,}); 
  } 
  if (context.user.roles.indexOf('ops_kh') != -1 ){
    
    let argsWithAuth = {...args, ...{$and: {control_center_id: context.user.control_center_ids}}};
    
    return ChartDataService.findOne({...{where: argsWithAuth}, ...modelArgs,}); 
  } 
  if (context.user.roles.indexOf('headoffice_kh') != -1 ){
    
    return ChartDataService.findOne({...{where: args}, ...modelArgs,}); 
  } 
},

chart_data(obj, args, context, info){
  let modelArgs = {};
  if(args.limit){modelArgs.limit = args.limit; delete args.limit; }
  if(args.order){modelArgs.order = args.order; delete args.order; }
  if(args.offset){modelArgs.offset = args.offset; delete args.offset; }

  let {t_time} = args;
  if(t_time){args.t_time = {$gte: t_time[0], $lte: t_time[1]}; };

  if (context.user.roles.indexOf('admin') != -1 ){
    
    return ChartDataService.findAll({...{where: args}, ...modelArgs,}); 
  } 
  if (context.user.roles.indexOf('ops_kh') != -1 ){
    
    let argsWithAuth = {...args, ...{$and: {control_center_id: context.user.control_center_ids}}};
    
    return ChartDataService.findAll({...{where: argsWithAuth}, ...modelArgs,}); 
  } 
  if (context.user.roles.indexOf('headoffice_kh') != -1 ){
    
    return ChartDataService.findAll({...{where: args}, ...modelArgs,}); 
  } 
},

chart_title_one(obj, args, context, info){
  let modelArgs = {};



  if (context.user.roles.indexOf('admin') != -1 ){
    
    return ChartTitleService.findOne({...{where: args}, ...modelArgs,}); 
  } 
  return ChartTitleService.findOne({...{where: args}, ...modelArgs,}); 
},

chart_title(obj, args, context, info){
  let modelArgs = {};
  if(args.limit){modelArgs.limit = args.limit; delete args.limit; }
  if(args.order){modelArgs.order = args.order; delete args.order; }
  if(args.offset){modelArgs.offset = args.offset; delete args.offset; }



  if (context.user.roles.indexOf('admin') != -1 ){
    
    return ChartTitleService.findAll({...{where: args}, ...modelArgs,}); 
  } 
  return ChartTitleService.findAll({...{where: args}, ...modelArgs,}); 
},

};

export default biQueryResolvers;

//  2017-11-02 13:07:41.442523+08