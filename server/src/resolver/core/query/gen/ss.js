import { ElementAuthService, LoginHistoryService } from '../../../../service';

const ssQueryResolvers = { 

mutations_one(obj, args, context, info){
  let modelArgs = {};
  let {created_at} = args;
  if(created_at){args.created_at = {$gte: created_at[0], $lte: created_at[1]}; };
    let {updated_at} = args;
  if(updated_at){args.updated_at = {$gte: updated_at[0], $lte: updated_at[1]}; };

  if (context.user.roles.indexOf('admin') != -1 ){
    return MutationsService.findOne({where: args}); 
  }
},

mutations(obj, args, context, info){
  let modelArgs = {};
  if(args.limit){modelArgs.limit = args.limit; delete args.limit; }
  if(args.order){modelArgs.order = args.order; delete args.order; }
  if(args.offset==0||args.offset){modelArgs.offset = args.offset; delete args.offset; }
  let {created_at} = args;
  if(created_at){args.created_at = {$gte: created_at[0], $lte: created_at[1]}; };
    let {updated_at} = args;
  if(updated_at){args.updated_at = {$gte: updated_at[0], $lte: updated_at[1]}; };

  if (context.user.roles.indexOf('admin') != -1 ){
    return MutationsService.findAll({...{where: args}, ...modelArgs,}); 
  }
},

countMutations(obj, args, context, info){
  let modelArgs = {};
  let {created_at} = args;
  if(created_at){args.created_at = {$gte: created_at[0], $lte: created_at[1]}; };
    let {updated_at} = args;
  if(updated_at){args.updated_at = {$gte: updated_at[0], $lte: updated_at[1]}; };

  if (context.user.roles.indexOf('admin') != -1 ){
    return MutationsService.count({...{where: args}, ...modelArgs,}); 
  }
},

login_history_one(obj, args, context, info){
  let modelArgs = {};

  let {login_time} = args;
  if(login_time){args.login_time = {$gte: login_time[0], $lte: login_time[1]}; };

  if (context.user.roles.indexOf('admin') != -1 ){
    
    return LoginHistoryService.findOne({...{where: args}, ...modelArgs,}); 
  } 
},

login_history(obj, args, context, info){
  let modelArgs = {};
  if(args.limit){modelArgs.limit = args.limit; delete args.limit; }
  if(args.order){modelArgs.order = args.order; delete args.order; }
  if(args.offset){modelArgs.offset = args.offset; delete args.offset; }

  let {login_time} = args;
  if(login_time){args.login_time = {$gte: login_time[0], $lte: login_time[1]}; };

  if (context.user.roles.indexOf('admin') != -1 ){
    
    return LoginHistoryService.findAll({...{where: args}, ...modelArgs,}); 
  } 
},

element_auth_one(obj, args, context, info){
  let modelArgs = {};
  if(args.deleted_at){args.deleted_at = {$gte: args.deleted_at[0], $lte: args.deleted_at[1]}; modelArgs.paranoid = false };
    let {updated_at} = args;
  if(updated_at){args.updated_at = {$gte: updated_at[0], $lte: updated_at[1]}; };
    let {created_at} = args;
  if(created_at){args.created_at = {$gte: created_at[0], $lte: created_at[1]}; };

  if (context.user.roles.indexOf('admin') != -1 ){
    return ElementAuthService.findOne({where: args}); 
  }
},

element_auth(obj, args, context, info){
  let modelArgs = {};
  if(args.limit){modelArgs.limit = args.limit; delete args.limit; }
  if(args.order){modelArgs.order = args.order; delete args.order; }
  if(args.offset==0||args.offset){modelArgs.offset = args.offset; delete args.offset; }
  if(args.deleted_at){args.deleted_at = {$gte: args.deleted_at[0], $lte: args.deleted_at[1]}; modelArgs.paranoid = false };
    let {updated_at} = args;
  if(updated_at){args.updated_at = {$gte: updated_at[0], $lte: updated_at[1]}; };
    let {created_at} = args;
  if(created_at){args.created_at = {$gte: created_at[0], $lte: created_at[1]}; };

  if (context.user.roles.indexOf('admin') != -1 ){
    return ElementAuthService.findAll({...{where: args}, ...modelArgs,}); 
  }
},

countElementAuth(obj, args, context, info){
  let modelArgs = {};
  if(args.deleted_at){args.deleted_at = {$gte: args.deleted_at[0], $lte: args.deleted_at[1]}; modelArgs.paranoid = false };
    let {updated_at} = args;
  if(updated_at){args.updated_at = {$gte: updated_at[0], $lte: updated_at[1]}; };
    let {created_at} = args;
  if(created_at){args.created_at = {$gte: created_at[0], $lte: created_at[1]}; };

  if (context.user.roles.indexOf('admin') != -1 ){
    return ElementAuthService.count({...{where: args}, ...modelArgs,}); 
  }
},

};

export default ssQueryResolvers;

//  2018-01-24 17:37:05.099404+08