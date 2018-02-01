import { userService, MutationsService } from '../../../service'

const userMutationResolvers = {
  destroyUser: (obj, {id}, context, info) => { 
   if (context.user.roles.indexOf('admin') != -1 ){
    let argsWithAuth = {where: {id: id}};  
    return userService.findOne(argsWithAuth)
    .then(d => {if(!d){return false}else{MutationsService.create({obj_id: id, model_name: 'User', user_id: context.user.profile_id, user_name: context.user.username, type: 'destroy'})}; 
     d.destroy(); return true;
     });
   } 
   return null;
  },

  restoreUser: (obj, {id}, context, info) => { 
   if (context.user.roles.indexOf('admin') != -1 ){
    let argsWithAuth = {where: {id: id, deleted_at: true}};  
    return userService.findOne(argsWithAuth)
    .then(d => {if(!d){return false}; d.restore(); return true;} ); 
   } 
   return null;    
  },

  createUser: (obj, {input_content}, context, info) => { 
   if (context.user.roles.indexOf('admin') != -1 ){
    return userService.create(input_content)
     .then(d => {if(d){MutationsService.create({obj_id: d.id, model_name: 'User', user_id: context.user.profile_id, content: input_content, user_name: context.user.username, type: 'create'})}; 
      return d;
     }); 
   } 
   return null; 
  },

  updateUser: (obj, {id, input_content}, context, info) => { 
   if (context.user.roles.indexOf('admin') != -1 ){
    let argsWithAuth = {where: {id: id}};  
    return userService.findOne(argsWithAuth)
    .then(d => {if(d){MutationsService.create({obj_id: id, content: input_content, model_name: 'User', user_id: context.user.profile_id, user_name: context.user.username, type: 'update'})}; 
      return d.update(input_content);
     });
   } 
   return null; 
  },
  
  changeUserDefaultCode: (obj, {id, input_content}, context, info) => { 

    let argsWithAuth = {where: {id: id}};  
    return userService.findOne(argsWithAuth)
    .then(d => {
      return d.update(input_content);
     });
  },
};

export default userMutationResolvers;
