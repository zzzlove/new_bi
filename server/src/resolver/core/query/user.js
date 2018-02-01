import { isEmptyObject, wildcardMatch } from '../../../utils';
import { userService } from '../../../service'


const userQueryResolvers = {
  user(obj, args, context, info){
    let modelArgs = {};
    if(args.limit){modelArgs.limit = args.limit; delete args.limit; }
    if(args.order){modelArgs.order = args.order; delete args.order; }
    if(args.offset){modelArgs.offset = args.offset; delete args.offset; }

    let {started_at} = args;
    if(started_at){args.started_at = {$gte: started_at[0], $lte: started_at[1]}; };
      let {finished_at} = args;
    if(finished_at){args.finished_at = {$gte: finished_at[0], $lte: finished_at[1]}; };
      let {created_at} = args;
    if(created_at){args.created_at = {$gte: created_at[0], $lte: created_at[1]}; };
      let {updated_at} = args;
    if(updated_at){args.updated_at = {$gte: updated_at[0], $lte: updated_at[1]}; };
      if(args.deleted_at){args.deleted_at = {$ne: null}; modelArgs.paranoid = false };

    if(args.roles){args.roles = {$contains: args.roles}; };
      
    if (context.user.roles.indexOf('admin') != -1 ){
      return userService.findAll({...{where: args}, ...modelArgs,}); 
    } 
  },
};

export default userQueryResolvers;
