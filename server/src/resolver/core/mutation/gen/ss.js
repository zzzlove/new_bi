import { ElementAuthService, LoginHistoryService } from '../../../../service';
import {MutationsService, dbService} from '../../../../service';

const ssMutationResolvers = { 

destroyMutations: (obj, {id}, context, info) => { 
  if (context.user.roles.indexOf('admin') != -1 ){
   let argsWithAuth = {where: {id: id}};  
   return MutationsService.findOne(argsWithAuth)
   .then(d => {if(!d){return false}else{MutationsService.create({obj_id: id, model_name: 'Mutations', user_id: context.user.profile_id, user_name: context.user.username, type: 'destroy'})}; 
     d.destroy(); 
     return true;
   });
  }
},

createMutations: (obj, {input_content}, context, info) => { 
  if (context.user.roles.indexOf('admin') != -1 ){
   return MutationsService.create(input_content)
   .then(d => {if(d){MutationsService.create({obj_id: d.id, model_name: 'Mutations', user_id: context.user.profile_id, content: input_content, user_name: context.user.username, type: 'create'})}; 
   return d;
   });   
  } 
},

updateMutations: (obj, {id, input_content}, context, info) => { 
  if (context.user.roles.indexOf('admin') != -1 ){
   let argsWithAuth = {where: {id: id}};  
   return MutationsService.findOne(argsWithAuth)
   .then(d => {if(d){MutationsService.create({obj_id: id, content: input_content, model_name: 'Mutations', user_id: context.user.profile_id, user_name: context.user.username, type: 'update'})}; 
     return d.update(input_content);
   });  
  } 
},

updateManyMutations: (obj, {id, input_content}, context, info) => { 
let argsWithAuth = {where: {id: id}};  
return MutationsService.update(argsWithAuth, input_content);  
},

destroyLoginHistory: (obj, {id}, context, info) => { 
  let argsWithAuth = {where: {id: id}};  
  return LoginHistoryService.findOne(argsWithAuth)
  .then(d => {if(!d){return false}; d.destroy(); return true;} );  
},

createLoginHistory: (obj, {input_content}, context, info) => { return LoginHistoryService.create(input_content);  },

updateLoginHistory: (obj, {id, input_content}, context, info) => { 
let argsWithAuth = {where: {id: id}};  
return LoginHistoryService.findOne(argsWithAuth).then(d => d.update(input_content));  
},

updateManyLoginHistory: (obj, {where_content, input_content}, context, info) => { 
let argsWithAuth = {where: where_content};  
return LoginHistoryService.update(input_content, argsWithAuth);  
},

destroyElementAuth: (obj, {id}, context, info) => { 
  if (context.user.roles.indexOf('admin') != -1 ){
   let argsWithAuth = {where: {id: id}};  
   return ElementAuthService.findOne(argsWithAuth)
   .then(d => {if(!d){return false}else{MutationsService.create({obj_id: id, model_name: 'ElementAuth', user_id: context.user.profile_id, user_name: context.user.username, type: 'destroy'})}; 
     d.destroy(); 
     return true;
   });
  }
},

restoreElementAuth: (obj, {id}, context, info) => { 
  if (context.user.roles.indexOf('admin') != -1 ){
   let argsWithAuth = {where: {id: id}, paranoid: false};  
   return ElementAuthService.findOne(argsWithAuth)
   .then(d => {if(d){MutationsService.create({obj_id: id, model_name: 'ElementAuth', user_id: context.user.profile_id, user_name: context.user.username, type: 'update'})}; 
     return d.restore();
   });  
  }
},

createElementAuth: (obj, {input_content}, context, info) => { 
  if (context.user.roles.indexOf('admin') != -1 ){
   return ElementAuthService.create(input_content)
   .then(d => {if(d){MutationsService.create({obj_id: d.id, model_name: 'ElementAuth', user_id: context.user.profile_id, content: input_content, user_name: context.user.username, type: 'create'})}; 
   return d;
   });   
  } 
},

updateElementAuth: (obj, {id, input_content}, context, info) => { 
  if (context.user.roles.indexOf('admin') != -1 ){
   let argsWithAuth = {where: {id: id}};  
   return ElementAuthService.findOne(argsWithAuth)
   .then(d => {if(d){MutationsService.create({obj_id: id, content: input_content, model_name: 'ElementAuth', user_id: context.user.profile_id, user_name: context.user.username, type: 'update'})}; 
     return d.update(input_content);
   });  
  } 
},

updateManyElementAuth: (obj, {id, input_content}, context, info) => { 
let argsWithAuth = {where: {id: id}};  
return ElementAuthService.update(argsWithAuth, input_content);  
},

};

export default ssMutationResolvers;

//  2018-01-24 17:37:05.099404+08