import { SessionLogService, FieldOptionService } from '../../../../service';

const psQueryResolvers = { 

session_log_one(obj, args, context, info){
  let modelArgs = {};
  let {create_at} = args;
  if(create_at){args.create_at = {$gte: create_at[0], $lte: create_at[1]}; };

  if (context.user.roles.indexOf('admin') != -1 ){
    return SessionLogService.findOne({where: args}); 
  }
},

session_log(obj, args, context, info){
  let modelArgs = {};
  if(args.limit){modelArgs.limit = args.limit; delete args.limit; }
  if(args.order){modelArgs.order = args.order; delete args.order; }
  if(args.offset==0||args.offset){modelArgs.offset = args.offset; delete args.offset; }
  let {create_at} = args;
  if(create_at){args.create_at = {$gte: create_at[0], $lte: create_at[1]}; };

  if (context.user.roles.indexOf('admin') != -1 ){
    return SessionLogService.findAll({...{where: args}, ...modelArgs,}); 
  }
},

countSessionLog(obj, args, context, info){
  let modelArgs = {};
  let {create_at} = args;
  if(create_at){args.create_at = {$gte: create_at[0], $lte: create_at[1]}; };

  if (context.user.roles.indexOf('admin') != -1 ){
    return SessionLogService.count({...{where: args}, ...modelArgs,}); 
  }
},

field_option_one(obj, args, context, info){
  let modelArgs = {};


  if (context.user.roles.indexOf('all') != -1 ){
    return FieldOptionService.findOne({where: args}); 
  }
  if (context.user.roles.indexOf('admin') != -1 ){
    return FieldOptionService.findOne({where: args}); 
  }
},

field_option(obj, args, context, info){
  let modelArgs = {};
  if(args.limit){modelArgs.limit = args.limit; delete args.limit; }
  if(args.order){modelArgs.order = args.order; delete args.order; }
  if(args.offset==0||args.offset){modelArgs.offset = args.offset; delete args.offset; }


  if (context.user.roles.indexOf('all') != -1 ){
    return FieldOptionService.findAll({...{where: args}, ...modelArgs,}); 
  }
  if (context.user.roles.indexOf('admin') != -1 ){
    return FieldOptionService.findAll({...{where: args}, ...modelArgs,}); 
  }
},

countFieldOption(obj, args, context, info){
  let modelArgs = {};


  if (context.user.roles.indexOf('all') != -1 ){
    return FieldOptionService.count({...{where: args}, ...modelArgs,}); 
  }
  if (context.user.roles.indexOf('admin') != -1 ){
    return FieldOptionService.count({...{where: args}, ...modelArgs,}); 
  }
},

};

export default psQueryResolvers;

//  2018-01-24 17:32:03.711735+08