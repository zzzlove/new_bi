import { SessionLogService, FieldOptionService } from '../../../../service';
import {MutationsService, dbService} from '../../../../service';

const psMutationResolvers = { 

destroySessionLog: (obj, {id}, context, info) => { 
  if (context.user.roles.indexOf('admin') != -1 ){
   let argsWithAuth = {where: {id: id}};  
   return SessionLogService.findOne(argsWithAuth)
   .then(d => {if(!d){return false}else{MutationsService.create({obj_id: id, model_name: 'SessionLog', user_id: context.user.profile_id, user_name: context.user.username, type: 'destroy'})}; 
     d.destroy(); 
     return true;
   });
  }
},

createSessionLog: (obj, {input_content}, context, info) => { 
  if (context.user.roles.indexOf('admin') != -1 ){
   return SessionLogService.create(input_content)
   .then(d => {if(d){MutationsService.create({obj_id: d.id, model_name: 'SessionLog', user_id: context.user.profile_id, content: input_content, user_name: context.user.username, type: 'create'})}; 
   return d;
   });   
  } 
},

updateSessionLog: (obj, {id, input_content}, context, info) => { 
  if (context.user.roles.indexOf('admin') != -1 ){
   let argsWithAuth = {where: {id: id}};  
   return SessionLogService.findOne(argsWithAuth)
   .then(d => {if(d){MutationsService.create({obj_id: id, content: input_content, model_name: 'SessionLog', user_id: context.user.profile_id, user_name: context.user.username, type: 'update'})}; 
     return d.update(input_content);
   });  
  } 
},

updateManySessionLog: (obj, {id, input_content}, context, info) => { 
let argsWithAuth = {where: {id: id}};  
return SessionLogService.update(argsWithAuth, input_content);  
},

destroyFieldOption: (obj, {id}, context, info) => { 
  if (context.user.roles.indexOf('admin') != -1 ){
   let argsWithAuth = {where: {id: id}};  
   return FieldOptionService.findOne(argsWithAuth)
   .then(d => {if(!d){return false}else{MutationsService.create({obj_id: id, model_name: 'FieldOption', user_id: context.user.profile_id, user_name: context.user.username, type: 'destroy'})}; 
     d.destroy(); 
     return true;
   });
  }
},

createFieldOption: (obj, {input_content}, context, info) => { 
  if (context.user.roles.indexOf('admin') != -1 ){
   return FieldOptionService.create(input_content)
   .then(d => {if(d){MutationsService.create({obj_id: d.id, model_name: 'FieldOption', user_id: context.user.profile_id, content: input_content, user_name: context.user.username, type: 'create'})}; 
   return d;
   });   
  } 
},

updateFieldOption: (obj, {id, input_content}, context, info) => { 
  if (context.user.roles.indexOf('admin') != -1 ){
   let argsWithAuth = {where: {id: id}};  
   return FieldOptionService.findOne(argsWithAuth)
   .then(d => {if(d){MutationsService.create({obj_id: id, content: input_content, model_name: 'FieldOption', user_id: context.user.profile_id, user_name: context.user.username, type: 'update'})}; 
     return d.update(input_content);
   });  
  } 
},

updateManyFieldOption: (obj, {id, input_content}, context, info) => { 
let argsWithAuth = {where: {id: id}};  
return FieldOptionService.update(argsWithAuth, input_content);  
},

};

export default psMutationResolvers;

//  2018-01-24 17:32:03.711735+08