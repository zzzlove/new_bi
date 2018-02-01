import { FieldOptionService } from '../../../../service';

const psMutationResolvers = { 

destroyFieldOption: (obj, {id}, context, info) => { 
  let argsWithAuth = {where: {id: id}};  
  return FieldOptionService.findOne(argsWithAuth)
  .then(d => {if(!d){return false}; d.destroy(); return true;} );  
},

createFieldOption: (obj, {input_content}, context, info) => { return FieldOptionService.create(input_content);  },

upsertFieldOption: (obj, {input_content}, context, info) => { 
  let {id} = input_content; delete input_content.id; 
  if(id){
  let argsWithAuth = {where: {id: id}};  
  return FieldOptionService.findOne(argsWithAuth).then(d => d.update(input_content));  }
  else{return FieldOptionService.create(input_content); }
},

updateFieldOption: (obj, {id, input_content}, context, info) => { 
let argsWithAuth = {where: {id: id}};  
return FieldOptionService.findOne(argsWithAuth).then(d => d.update(input_content));  
},

updateManyFieldOption: (obj, {where_content, input_content}, context, info) => { 
let argsWithAuth = {where: where_content};  
return FieldOptionService.update(input_content, argsWithAuth);  
},

};

export default psMutationResolvers;

//  2017-10-11 15:04:13.492938+08