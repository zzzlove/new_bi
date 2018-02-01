import { EntrySummaryService, EntryService, AccountService } from '../../../../service';
import {MutationsService, dbService} from '../../../../service';

const fiMutationResolvers = { 

destroyEntry: (obj, {id}, context, info) => { 
  if (context.user.roles.indexOf('admin') != -1 ){
   let argsWithAuth = {where: {id: id}};  
   return EntryService.findOne(argsWithAuth)
   .then(d => {if(!d){return false}else{MutationsService.create({obj_id: id, model_name: 'Entry', user_id: context.user.profile_id, user_name: context.user.username, type: 'destroy'})}; 
     d.destroy(); 
     return true;
   });
  }
},

restoreEntry: (obj, {id}, context, info) => { 
  if (context.user.roles.indexOf('admin') != -1 ){
   let argsWithAuth = {where: {id: id}, paranoid: false};  
   return EntryService.findOne(argsWithAuth)
   .then(d => {if(d){MutationsService.create({obj_id: id, model_name: 'Entry', user_id: context.user.profile_id, user_name: context.user.username, type: 'update'})}; 
     return d.restore();
   });  
  }
},

createEntry: (obj, {input_content}, context, info) => { 
  if (context.user.roles.indexOf('admin') != -1 ){
   return EntryService.create(input_content)
   .then(d => {if(d){MutationsService.create({obj_id: d.id, model_name: 'Entry', user_id: context.user.profile_id, content: input_content, user_name: context.user.username, type: 'create'})}; 
   return d;
   });   
  } 
},

updateEntry: (obj, {id, input_content}, context, info) => { 
  if (context.user.roles.indexOf('admin') != -1 ){
   let argsWithAuth = {where: {id: id}};  
   return EntryService.findOne(argsWithAuth)
   .then(d => {if(d){MutationsService.create({obj_id: id, content: input_content, model_name: 'Entry', user_id: context.user.profile_id, user_name: context.user.username, type: 'update'})}; 
     return d.update(input_content);
   });  
  } 
},

updateManyEntry: (obj, {id, input_content}, context, info) => { 
let argsWithAuth = {where: {id: id}};  
return EntryService.update(argsWithAuth, input_content);  
},

destroyEntrySummary: (obj, {id}, context, info) => { 
  if (context.user.roles.indexOf('admin') != -1 ){
   let argsWithAuth = {where: {id: id}};  
   return EntrySummaryService.findOne(argsWithAuth)
   .then(d => {if(!d){return false}else{MutationsService.create({obj_id: id, model_name: 'EntrySummary', user_id: context.user.profile_id, user_name: context.user.username, type: 'destroy'})}; 
     d.destroy(); 
     return true;
   });
  }
},

createEntrySummary: (obj, {input_content}, context, info) => { 
  if (context.user.roles.indexOf('admin') != -1 ){
   return EntrySummaryService.create(input_content)
   .then(d => {if(d){MutationsService.create({obj_id: d.id, model_name: 'EntrySummary', user_id: context.user.profile_id, content: input_content, user_name: context.user.username, type: 'create'})}; 
   return d;
   });   
  } 
},

updateEntrySummary: (obj, {id, input_content}, context, info) => { 
  if (context.user.roles.indexOf('admin') != -1 ){
   let argsWithAuth = {where: {id: id}};  
   return EntrySummaryService.findOne(argsWithAuth)
   .then(d => {if(d){MutationsService.create({obj_id: id, content: input_content, model_name: 'EntrySummary', user_id: context.user.profile_id, user_name: context.user.username, type: 'update'})}; 
     return d.update(input_content);
   });  
  } 
},

updateManyEntrySummary: (obj, {id, input_content}, context, info) => { 
let argsWithAuth = {where: {id: id}};  
return EntrySummaryService.update(argsWithAuth, input_content);  
},

destroyAccount: (obj, {id}, context, info) => { 
  if (context.user.roles.indexOf('admin') != -1 ){
   let argsWithAuth = {where: {id: id}};  
   return AccountService.findOne(argsWithAuth)
   .then(d => {if(!d){return false}else{MutationsService.create({obj_id: id, model_name: 'Account', user_id: context.user.profile_id, user_name: context.user.username, type: 'destroy'})}; 
     d.destroy(); 
     return true;
   });
  }
},

createAccount: (obj, {input_content}, context, info) => { 
  if (context.user.roles.indexOf('admin') != -1 ){
   return AccountService.create(input_content)
   .then(d => {if(d){MutationsService.create({obj_id: d.id, model_name: 'Account', user_id: context.user.profile_id, content: input_content, user_name: context.user.username, type: 'create'})}; 
   return d;
   });   
  } 
},

updateAccount: (obj, {id, input_content}, context, info) => { 
  if (context.user.roles.indexOf('admin') != -1 ){
   let argsWithAuth = {where: {id: id}};  
   return AccountService.findOne(argsWithAuth)
   .then(d => {if(d){MutationsService.create({obj_id: id, content: input_content, model_name: 'Account', user_id: context.user.profile_id, user_name: context.user.username, type: 'update'})}; 
     return d.update(input_content);
   });  
  } 
},

updateManyAccount: (obj, {id, input_content}, context, info) => { 
let argsWithAuth = {where: {id: id}};  
return AccountService.update(argsWithAuth, input_content);  
},

};

export default fiMutationResolvers;

//  2018-01-25 08:14:33.345891+08