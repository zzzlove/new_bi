import { EntrySummaryService, EntryService, AccountService } from '../../../../service';

const fiQueryResolvers = { 

entry_one(obj, args, context, info){
  let modelArgs = {};
  let {updated_at} = args;
  if(updated_at){args.updated_at = {$gte: updated_at[0], $lte: updated_at[1]}; };
    let {created_at} = args;
  if(created_at){args.created_at = {$gte: created_at[0], $lte: created_at[1]}; };
    let {started_at} = args;
  if(started_at){args.started_at = {$gte: started_at[0], $lte: started_at[1]}; };
    let {posting_at} = args;
  if(posting_at){args.posting_at = {$gte: posting_at[0], $lte: posting_at[1]}; };
    if(args.deleted_at){args.deleted_at = {$gte: args.deleted_at[0], $lte: args.deleted_at[1]}; modelArgs.paranoid = false };
    if(args.related_item){args.related_item = {$contains: args.related_item}; };

  if (context.user.roles.indexOf('admin') != -1 ){
    return EntryService.findOne({where: args}); 
  }
},

entry(obj, args, context, info){
  let modelArgs = {};
  if(args.limit){modelArgs.limit = args.limit; delete args.limit; }
  if(args.order){modelArgs.order = args.order; delete args.order; }
  if(args.offset==0||args.offset){modelArgs.offset = args.offset; delete args.offset; }
  let {updated_at} = args;
  if(updated_at){args.updated_at = {$gte: updated_at[0], $lte: updated_at[1]}; };
    let {created_at} = args;
  if(created_at){args.created_at = {$gte: created_at[0], $lte: created_at[1]}; };
    let {started_at} = args;
  if(started_at){args.started_at = {$gte: started_at[0], $lte: started_at[1]}; };
    let {posting_at} = args;
  if(posting_at){args.posting_at = {$gte: posting_at[0], $lte: posting_at[1]}; };
    if(args.deleted_at){args.deleted_at = {$gte: args.deleted_at[0], $lte: args.deleted_at[1]}; modelArgs.paranoid = false };
    if(args.related_item){args.related_item = {$contains: args.related_item}; };

  if (context.user.roles.indexOf('admin') != -1 ){
    return EntryService.findAll({...{where: args}, ...modelArgs,}); 
  }
},

countEntry(obj, args, context, info){
  let modelArgs = {};
  let {updated_at} = args;
  if(updated_at){args.updated_at = {$gte: updated_at[0], $lte: updated_at[1]}; };
    let {created_at} = args;
  if(created_at){args.created_at = {$gte: created_at[0], $lte: created_at[1]}; };
    let {started_at} = args;
  if(started_at){args.started_at = {$gte: started_at[0], $lte: started_at[1]}; };
    let {posting_at} = args;
  if(posting_at){args.posting_at = {$gte: posting_at[0], $lte: posting_at[1]}; };
    if(args.deleted_at){args.deleted_at = {$gte: args.deleted_at[0], $lte: args.deleted_at[1]}; modelArgs.paranoid = false };
    if(args.related_item){args.related_item = {$contains: args.related_item}; };

  if (context.user.roles.indexOf('admin') != -1 ){
    return EntryService.count({...{where: args}, ...modelArgs,}); 
  }
},

entry_summary_one(obj, args, context, info){
  let modelArgs = {};


  if (context.user.roles.indexOf('admin') != -1 ){
    return EntrySummaryService.findOne({where: args}); 
  }
},

entry_summary(obj, args, context, info){
  let modelArgs = {};
  if(args.limit){modelArgs.limit = args.limit; delete args.limit; }
  if(args.order){modelArgs.order = args.order; delete args.order; }
  if(args.offset==0||args.offset){modelArgs.offset = args.offset; delete args.offset; }


  if (context.user.roles.indexOf('admin') != -1 ){
    return EntrySummaryService.findAll({...{where: args}, ...modelArgs,}); 
  }
},

countEntrySummary(obj, args, context, info){
  let modelArgs = {};


  if (context.user.roles.indexOf('admin') != -1 ){
    return EntrySummaryService.count({...{where: args}, ...modelArgs,}); 
  }
},

account_one(obj, args, context, info){
  let modelArgs = {};
  if(args.concerning_biz){args.concerning_biz = {$contains: args.concerning_biz}; };

  if (context.user.roles.indexOf('admin') != -1 ){
    return AccountService.findOne({where: args}); 
  }
},

account(obj, args, context, info){
  let modelArgs = {};
  if(args.limit){modelArgs.limit = args.limit; delete args.limit; }
  if(args.order){modelArgs.order = args.order; delete args.order; }
  if(args.offset==0||args.offset){modelArgs.offset = args.offset; delete args.offset; }
  if(args.concerning_biz){args.concerning_biz = {$contains: args.concerning_biz}; };

  if (context.user.roles.indexOf('admin') != -1 ){
    return AccountService.findAll({...{where: args}, ...modelArgs,}); 
  }
},

countAccount(obj, args, context, info){
  let modelArgs = {};
  if(args.concerning_biz){args.concerning_biz = {$contains: args.concerning_biz}; };

  if (context.user.roles.indexOf('admin') != -1 ){
    return AccountService.count({...{where: args}, ...modelArgs,}); 
  }
},

};

export default fiQueryResolvers;

//  2018-01-25 08:14:33.345891+08