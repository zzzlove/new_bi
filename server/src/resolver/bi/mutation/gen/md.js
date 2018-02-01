import { EquipmentActualService, MemberActualService, MemberContractService, SignClientDayMonitoringService, ProfileService, ControlCenterService, RmControlCenterEquipmentService, CityService, ControlCenterStatusService, FinCodeActualService, OpsCodeActualService, ControlCenterAlterService, ControlCenterRmService, ControlCenterActualService, RmControlCenterProfileService, MemberCatServiceService, ControlCenterAlterTypeService, ControlCenterBudgetService } from '../../../../service';
import {MutationsService, dbService} from '../../../../service';

const mdMutationResolvers = { 

destroyControlCenterBudget: (obj, {id}, context, info) => { 
  let argsWithAuth = {where: {id: id}};  
  return ControlCenterBudgetService.findOne(argsWithAuth)
  .then(d => {if(!d){return false}; d.destroy(); return true;} );  
},

createControlCenterBudget: (obj, {input_content}, context, info) => { return ControlCenterBudgetService.create(input_content);  },

updateControlCenterBudget: (obj, {id, input_content}, context, info) => { 
let argsWithAuth = {where: {id: id}};  
return ControlCenterBudgetService.findOne(argsWithAuth).then(d => d.update(input_content));  
},

updateManyControlCenterBudget: (obj, {where_content, input_content}, context, info) => { 
let argsWithAuth = {where: where_content};  
return ControlCenterBudgetService.update(input_content, argsWithAuth);  
},

destroyRmControlCenterEquipment: (obj, {id}, context, info) => { 
  let argsWithAuth = {where: {id: id}};  
  return RmControlCenterEquipmentService.findOne(argsWithAuth)
  .then(d => {if(!d){return false}; d.destroy(); return true;} );  
},

createRmControlCenterEquipment: (obj, {input_content}, context, info) => { return RmControlCenterEquipmentService.create(input_content);  },

updateRmControlCenterEquipment: (obj, {id, input_content}, context, info) => { 
let argsWithAuth = {where: {id: id}};  
return RmControlCenterEquipmentService.findOne(argsWithAuth).then(d => d.update(input_content));  
},

updateManyRmControlCenterEquipment: (obj, {where_content, input_content}, context, info) => { 
let argsWithAuth = {where: where_content};  
return RmControlCenterEquipmentService.update(input_content, argsWithAuth);  
},

xRmControlCenterEquipmentaddToControlCenter: (obj, {input_content}, context, info) => { return RmControlCenterEquipmentService.addToControlCenter(input_content);  },

destroyMemberContract: (obj, {id}, context, info) => { 
  let argsWithAuth = {where: {id: id}};  
  return MemberContractService.findOne(argsWithAuth)
  .then(d => {if(!d){return false}; d.destroy(); return true;} );  
},

restoreMemberContract: (obj, {id}, context, info) => { 
  let argsWithAuth = {where: {id: id, deleted_at: true}};  
  return MemberContractService.findOne(argsWithAuth)
  .then(d => {if(!d){return false}; d.restore(); return true;} );  
},

createMemberContract: (obj, {input_content}, context, info) => { return MemberContractService.create(input_content);  },

updateMemberContract: (obj, {id, input_content}, context, info) => { 
let argsWithAuth = {where: {id: id}};  
return MemberContractService.findOne(argsWithAuth).then(d => d.update(input_content));  
},

updateManyMemberContract: (obj, {where_content, input_content}, context, info) => { 
let argsWithAuth = {where: where_content};  
return MemberContractService.update(input_content, argsWithAuth);  
},

xMemberContractaddToServicex: (obj, {input_content}, context, info) => { return MemberContractService.addToServicex(input_content);  },

destroyRmControlCenterProfile: (obj, {id}, context, info) => { 
  let argsWithAuth = {where: {id: id}};  
  return RmControlCenterProfileService.findOne(argsWithAuth)
  .then(d => {if(!d){return false}; d.destroy(); return true;} );  
},

createRmControlCenterProfile: (obj, {input_content}, context, info) => { return RmControlCenterProfileService.create(input_content);  },

updateRmControlCenterProfile: (obj, {id, input_content}, context, info) => { 
let argsWithAuth = {where: {id: id}};  
return RmControlCenterProfileService.findOne(argsWithAuth).then(d => d.update(input_content));  
},

updateManyRmControlCenterProfile: (obj, {where_content, input_content}, context, info) => { 
let argsWithAuth = {where: where_content};  
return RmControlCenterProfileService.update(input_content, argsWithAuth);  
},

xRmControlCenterProfileaddToControlCenter: (obj, {input_content}, context, info) => { return RmControlCenterProfileService.addToControlCenter(input_content);  },

destroyProfile: (obj, {id}, context, info) => { 
  if (context.user.roles.indexOf('admin') != -1 ){
   let argsWithAuth = {where: {id: id}};  
   return ProfileService.findOne(argsWithAuth)
   .then(d => {if(!d){return false}else{MutationsService.create({obj_id: id, model_name: 'Profile', user_id: context.user.profile_id, user_name: context.user.username, type: 'destroy'})}; 
     d.destroy(); 
     return true;
   });
  }
},

restoreProfile: (obj, {id}, context, info) => { 
  if (context.user.roles.indexOf('admin') != -1 ){
   let argsWithAuth = {where: {id: id}, paranoid: false};  
   return ProfileService.findOne(argsWithAuth)
   .then(d => {if(d){MutationsService.create({obj_id: id, model_name: 'Profile', user_id: context.user.profile_id, user_name: context.user.username, type: 'update'})}; 
     return d.restore();
   });  
  }
},

createProfile: (obj, {input_content}, context, info) => { 
  if (context.user.roles.indexOf('admin') != -1 ){
   return ProfileService.create(input_content)
   .then(d => {if(d){MutationsService.create({obj_id: d.id, model_name: 'Profile', user_id: context.user.profile_id, content: input_content, user_name: context.user.username, type: 'create'})}; 
   return d;
   });   
  } 
},

updateProfile: (obj, {id, input_content}, context, info) => { 
  if (context.user.roles.indexOf('admin') != -1 ){
   let argsWithAuth = {where: {id: id}};  
   return ProfileService.findOne(argsWithAuth)
   .then(d => {if(d){MutationsService.create({obj_id: id, content: input_content, model_name: 'Profile', user_id: context.user.profile_id, user_name: context.user.username, type: 'update'})}; 
     return d.update(input_content);
   });  
  } 
},

updateManyProfile: (obj, {id, input_content}, context, info) => { 
let argsWithAuth = {where: {id: id}};  
return ProfileService.update(argsWithAuth, input_content);  
},

destroyControlCenterStatus: (obj, {id}, context, info) => { 
  let argsWithAuth = {where: {id: id}};  
  return ControlCenterStatusService.findOne(argsWithAuth)
  .then(d => {if(!d){return false}; d.destroy(); return true;} );  
},

createControlCenterStatus: (obj, {input_content}, context, info) => { return ControlCenterStatusService.create(input_content);  },

updateControlCenterStatus: (obj, {id, input_content}, context, info) => { 
let argsWithAuth = {where: {id: id}};  
return ControlCenterStatusService.findOne(argsWithAuth).then(d => d.update(input_content));  
},

updateManyControlCenterStatus: (obj, {where_content, input_content}, context, info) => { 
let argsWithAuth = {where: where_content};  
return ControlCenterStatusService.update(input_content, argsWithAuth);  
},

destroyControlCenterAlterType: (obj, {id}, context, info) => { 
  if (context.user.roles.indexOf('admin') != -1 ){
   let argsWithAuth = {where: {id: id}};  
   return ControlCenterAlterTypeService.findOne(argsWithAuth)
   .then(d => {if(!d){return false}else{MutationsService.create({obj_id: id, model_name: 'ControlCenterAlterType', user_id: context.user.profile_id, user_name: context.user.username, type: 'destroy'})}; 
     d.destroy(); 
     return true;
   });
  }
},

createControlCenterAlterType: (obj, {input_content}, context, info) => { 
  if (context.user.roles.indexOf('admin') != -1 ){
   return ControlCenterAlterTypeService.create(input_content)
   .then(d => {if(d){MutationsService.create({obj_id: d.id, model_name: 'ControlCenterAlterType', user_id: context.user.profile_id, content: input_content, user_name: context.user.username, type: 'create'})}; 
   return d;
   });   
  } 
},

updateControlCenterAlterType: (obj, {id, input_content}, context, info) => { 
  if (context.user.roles.indexOf('admin') != -1 ){
   let argsWithAuth = {where: {id: id}};  
   return ControlCenterAlterTypeService.findOne(argsWithAuth)
   .then(d => {if(d){MutationsService.create({obj_id: id, content: input_content, model_name: 'ControlCenterAlterType', user_id: context.user.profile_id, user_name: context.user.username, type: 'update'})}; 
     return d.update(input_content);
   });  
  } 
},

updateManyControlCenterAlterType: (obj, {where_content, input_content}, context, info) => { 
let argsWithAuth = {where: where_content};  
return ControlCenterAlterTypeService.update(input_content, argsWithAuth);  
},

destroyMemberCatService: (obj, {id}, context, info) => { 
  if (context.user.roles.indexOf('headoffice_kh') != -1 ){
   let argsWithAuth = {where: {id: id}};  
   return MemberCatServiceService.findOne(argsWithAuth)
   .then(d => {if(!d){return false}else{MutationsService.create({obj_id: id, model_name: 'MemberCatService', user_id: context.user.profile_id, user_name: context.user.username, type: 'destroy'})}; 
     d.destroy(); 
     return true;
   });
  }
  if (context.user.roles.indexOf('admin') != -1 ){
   let argsWithAuth = {where: {id: id}};  
   return MemberCatServiceService.findOne(argsWithAuth)
   .then(d => {if(!d){return false}else{MutationsService.create({obj_id: id, model_name: 'MemberCatService', user_id: context.user.profile_id, user_name: context.user.username, type: 'destroy'})}; 
     d.destroy(); 
     return true;
   });
  }
},

createMemberCatService: (obj, {input_content}, context, info) => { 
  if (context.user.roles.indexOf('headoffice_kh') != -1 ){
   return MemberCatServiceService.create(input_content)
   .then(d => {if(d){MutationsService.create({obj_id: d.id, model_name: 'MemberCatService', user_id: context.user.profile_id, content: input_content, user_name: context.user.username, type: 'create'})}; 
   return d;
   });   
  } 
  if (context.user.roles.indexOf('admin') != -1 ){
   return MemberCatServiceService.create(input_content)
   .then(d => {if(d){MutationsService.create({obj_id: d.id, model_name: 'MemberCatService', user_id: context.user.profile_id, content: input_content, user_name: context.user.username, type: 'create'})}; 
   return d;
   });   
  } 
},

updateMemberCatService: (obj, {id, input_content}, context, info) => { 
  if (context.user.roles.indexOf('headoffice_kh') != -1 ){
   let argsWithAuth = {where: {id: id}};  
   return MemberCatServiceService.findOne(argsWithAuth)
   .then(d => {if(d){MutationsService.create({obj_id: id, content: input_content, model_name: 'MemberCatService', user_id: context.user.profile_id, user_name: context.user.username, type: 'update'})}; 
     return d.update(input_content);
   });  
  } 
  if (context.user.roles.indexOf('admin') != -1 ){
   let argsWithAuth = {where: {id: id}};  
   return MemberCatServiceService.findOne(argsWithAuth)
   .then(d => {if(d){MutationsService.create({obj_id: id, content: input_content, model_name: 'MemberCatService', user_id: context.user.profile_id, user_name: context.user.username, type: 'update'})}; 
     return d.update(input_content);
   });  
  } 
},

updateManyMemberCatService: (obj, {where_content, input_content}, context, info) => { 
let argsWithAuth = {where: where_content};  
return MemberCatServiceService.update(input_content, argsWithAuth);  
},

destroyFinCodeActual: (obj, {id}, context, info) => { 
  let argsWithAuth = {where: {id: id}};  
  return FinCodeActualService.findOne(argsWithAuth)
  .then(d => {if(!d){return false}; d.destroy(); return true;} );  
},

createFinCodeActual: (obj, {input_content}, context, info) => { return FinCodeActualService.create(input_content);  },

updateFinCodeActual: (obj, {id, input_content}, context, info) => { 
let argsWithAuth = {where: {id: id}};  
return FinCodeActualService.findOne(argsWithAuth).then(d => d.update(input_content));  
},

updateManyFinCodeActual: (obj, {where_content, input_content}, context, info) => { 
let argsWithAuth = {where: where_content};  
return FinCodeActualService.update(input_content, argsWithAuth);  
},

destroyControlCenterRm: (obj, {id}, context, info) => { 
  if (context.user.roles.indexOf('admin') != -1 ){
   let argsWithAuth = {where: {id: id}};  
   return ControlCenterRmService.findOne(argsWithAuth)
   .then(d => {if(!d){return false}else{MutationsService.create({obj_id: id, model_name: 'ControlCenterRm', user_id: context.user.profile_id, user_name: context.user.username, type: 'destroy'})}; 
     d.destroy(); 
     return true;
   });
  }
},

createControlCenterRm: (obj, {input_content}, context, info) => { 
  if (context.user.roles.indexOf('admin') != -1 ){
   return ControlCenterRmService.create(input_content)
   .then(d => {if(d){MutationsService.create({obj_id: d.id, model_name: 'ControlCenterRm', user_id: context.user.profile_id, content: input_content, user_name: context.user.username, type: 'create'})}; 
   return d;
   });   
  } 
},

updateControlCenterRm: (obj, {id, input_content}, context, info) => { 
  if (context.user.roles.indexOf('admin') != -1 ){
   let argsWithAuth = {where: {id: id}};  
   return ControlCenterRmService.findOne(argsWithAuth)
   .then(d => {if(d){MutationsService.create({obj_id: id, content: input_content, model_name: 'ControlCenterRm', user_id: context.user.profile_id, user_name: context.user.username, type: 'update'})}; 
     return d.update(input_content);
   });  
  } 
},

updateManyControlCenterRm: (obj, {where_content, input_content}, context, info) => { 
let argsWithAuth = {where: where_content};  
return ControlCenterRmService.update(input_content, argsWithAuth);  
},

destroyOpsCodeActual: (obj, {id}, context, info) => { 
  let argsWithAuth = {where: {id: id}};  
  return OpsCodeActualService.findOne(argsWithAuth)
  .then(d => {if(!d){return false}; d.destroy(); return true;} );  
},

createOpsCodeActual: (obj, {input_content}, context, info) => { return OpsCodeActualService.create(input_content);  },

updateOpsCodeActual: (obj, {id, input_content}, context, info) => { 
let argsWithAuth = {where: {id: id}};  
return OpsCodeActualService.findOne(argsWithAuth).then(d => d.update(input_content));  
},

updateManyOpsCodeActual: (obj, {where_content, input_content}, context, info) => { 
let argsWithAuth = {where: where_content};  
return OpsCodeActualService.update(input_content, argsWithAuth);  
},

destroySignClientDayMonitoring: (obj, {id}, context, info) => { 
  if (context.user.roles.indexOf('admin') != -1 ){
   let argsWithAuth = {where: {id: id}};  
   return SignClientDayMonitoringService.findOne(argsWithAuth)
   .then(d => {if(!d){return false}else{MutationsService.create({obj_id: id, model_name: 'SignClientDayMonitoring', user_id: context.user.profile_id, user_name: context.user.username, type: 'destroy'})}; 
     d.destroy(); 
     return true;
   });
  }
},

createSignClientDayMonitoring: (obj, {input_content}, context, info) => { 
  if (context.user.roles.indexOf('admin') != -1 ){
   return SignClientDayMonitoringService.create(input_content)
   .then(d => {if(d){MutationsService.create({obj_id: d.id, model_name: 'SignClientDayMonitoring', user_id: context.user.profile_id, content: input_content, user_name: context.user.username, type: 'create'})}; 
   return d;
   });   
  } 
},

updateSignClientDayMonitoring: (obj, {id, input_content}, context, info) => { 
  if (context.user.roles.indexOf('admin') != -1 ){
   let argsWithAuth = {where: {id: id}};  
   return SignClientDayMonitoringService.findOne(argsWithAuth)
   .then(d => {if(d){MutationsService.create({obj_id: id, content: input_content, model_name: 'SignClientDayMonitoring', user_id: context.user.profile_id, user_name: context.user.username, type: 'update'})}; 
     return d.update(input_content);
   });  
  } 
},

updateManySignClientDayMonitoring: (obj, {where_content, input_content}, context, info) => { 
let argsWithAuth = {where: where_content};  
return SignClientDayMonitoringService.update(input_content, argsWithAuth);  
},

destroyControlCenter: (obj, {id}, context, info) => { 
  if (context.user.roles.indexOf('admin') != -1 ){
   let argsWithAuth = {where: {id: id}};  
   return ControlCenterService.findOne(argsWithAuth)
   .then(d => {if(!d){return false}else{MutationsService.create({obj_id: id, model_name: 'ControlCenter', user_id: context.user.profile_id, user_name: context.user.username, type: 'destroy'})}; 
     d.destroy(); 
     return true;
   });
  }
},

createControlCenter: (obj, {input_content}, context, info) => { 
  if (context.user.roles.indexOf('admin') != -1 ){
   return ControlCenterService.create(input_content)
   .then(d => {if(d){MutationsService.create({obj_id: d.id, model_name: 'ControlCenter', user_id: context.user.profile_id, content: input_content, user_name: context.user.username, type: 'create'})}; 
   return d;
   });   
  } 
},

updateControlCenter: (obj, {id, input_content}, context, info) => { 
  if (context.user.roles.indexOf('admin') != -1 ){
   let argsWithAuth = {where: {id: id}};  
   return ControlCenterService.findOne(argsWithAuth)
   .then(d => {if(d){MutationsService.create({obj_id: id, content: input_content, model_name: 'ControlCenter', user_id: context.user.profile_id, user_name: context.user.username, type: 'update'})}; 
     return d.update(input_content);
   });  
  } 
},

updateManyControlCenter: (obj, {id, input_content}, context, info) => { 
let argsWithAuth = {where: {id: id}};  
return ControlCenterService.update(argsWithAuth, input_content);  
},

xControlCentersetChildren: (obj, {id, subids}, context, info) => { return ControlCenterService.setChildren(id, subids);  },

xControlCentercreateChildren: (obj, {id, input_content}, context, info) => { return ControlCenterService.createChildren(id, input_content);  }, 

xControlCenterremoveChildren: (obj, {id, subids}, context, info) => { return ControlCenterService.removeChildren(id, subids);  },

xControlCenteraddChildren: (obj, {id, subids}, context, info) => { return ControlCenterService.addChildren(id, subids);  },

destroyControlCenterActual: (obj, {id}, context, info) => { 
  if (context.user.roles.indexOf('admin') != -1 ){
   let argsWithAuth = {where: {id: id}};  
   return ControlCenterActualService.findOne(argsWithAuth)
   .then(d => {if(!d){return false}else{MutationsService.create({obj_id: id, model_name: 'ControlCenterActual', user_id: context.user.profile_id, user_name: context.user.username, type: 'destroy'})}; 
     d.destroy(); 
     return true;
   });
  }
},

createControlCenterActual: (obj, {input_content}, context, info) => { 
  if (context.user.roles.indexOf('admin') != -1 ){
   return ControlCenterActualService.create(input_content)
   .then(d => {if(d){MutationsService.create({obj_id: d.id, model_name: 'ControlCenterActual', user_id: context.user.profile_id, content: input_content, user_name: context.user.username, type: 'create'})}; 
   return d;
   });   
  } 
},

updateControlCenterActual: (obj, {id, input_content}, context, info) => { 
  if (context.user.roles.indexOf('admin') != -1 ){
   let argsWithAuth = {where: {id: id}};  
   return ControlCenterActualService.findOne(argsWithAuth)
   .then(d => {if(d){MutationsService.create({obj_id: id, content: input_content, model_name: 'ControlCenterActual', user_id: context.user.profile_id, user_name: context.user.username, type: 'update'})}; 
     return d.update(input_content);
   });  
  } 
},

updateManyControlCenterActual: (obj, {where_content, input_content}, context, info) => { 
let argsWithAuth = {where: where_content};  
return ControlCenterActualService.update(input_content, argsWithAuth);  
},

destroyCity: (obj, {id}, context, info) => { 
  if (context.user.roles.indexOf('admin') != -1 ){
   let argsWithAuth = {where: {id: id}};  
   return CityService.findOne(argsWithAuth)
   .then(d => {if(!d){return false}else{MutationsService.create({obj_id: id, model_name: 'City', user_id: context.user.profile_id, user_name: context.user.username, type: 'destroy'})}; 
     d.destroy(); 
     return true;
   });
  }
},

createCity: (obj, {input_content}, context, info) => { 
  if (context.user.roles.indexOf('admin') != -1 ){
   return CityService.create(input_content)
   .then(d => {if(d){MutationsService.create({obj_id: d.id, model_name: 'City', user_id: context.user.profile_id, content: input_content, user_name: context.user.username, type: 'create'})}; 
   return d;
   });   
  } 
},

updateCity: (obj, {id, input_content}, context, info) => { 
  if (context.user.roles.indexOf('admin') != -1 ){
   let argsWithAuth = {where: {id: id}};  
   return CityService.findOne(argsWithAuth)
   .then(d => {if(d){MutationsService.create({obj_id: id, content: input_content, model_name: 'City', user_id: context.user.profile_id, user_name: context.user.username, type: 'update'})}; 
     return d.update(input_content);
   });  
  } 
},

updateManyCity: (obj, {id, input_content}, context, info) => { 
let argsWithAuth = {where: {id: id}};  
return CityService.update(argsWithAuth, input_content);  
},

destroyEquipmentActual: (obj, {id}, context, info) => { 
  let argsWithAuth = {where: {id: id}};  
  return EquipmentActualService.findOne(argsWithAuth)
  .then(d => {if(!d){return false}; d.destroy(); return true;} );  
},

createEquipmentActual: (obj, {input_content}, context, info) => { return EquipmentActualService.create(input_content);  },

updateEquipmentActual: (obj, {id, input_content}, context, info) => { 
let argsWithAuth = {where: {id: id}};  
return EquipmentActualService.findOne(argsWithAuth).then(d => d.update(input_content));  
},

updateManyEquipmentActual: (obj, {where_content, input_content}, context, info) => { 
let argsWithAuth = {where: where_content};  
return EquipmentActualService.update(input_content, argsWithAuth);  
},

destroyMemberActual: (obj, {id}, context, info) => { 
  let argsWithAuth = {where: {id: id}};  
  return MemberActualService.findOne(argsWithAuth)
  .then(d => {if(!d){return false}; d.destroy(); return true;} );  
},

createMemberActual: (obj, {input_content}, context, info) => { return MemberActualService.create(input_content);  },

updateMemberActual: (obj, {id, input_content}, context, info) => { 
let argsWithAuth = {where: {id: id}};  
return MemberActualService.findOne(argsWithAuth).then(d => d.update(input_content));  
},

updateManyMemberActual: (obj, {where_content, input_content}, context, info) => { 
let argsWithAuth = {where: where_content};  
return MemberActualService.update(input_content, argsWithAuth);  
},

destroyControlCenterAlter: (obj, {id}, context, info) => { 
  let argsWithAuth = {where: {id: id}};  
  return ControlCenterAlterService.findOne(argsWithAuth)
  .then(d => {if(!d){return false}else{MutationsService.create({obj_id: id, model_name: 'ControlCenterAlter', user_id: context.user.profile_id, user_name: context.user.username, type: 'destroy'})}; 
   d.destroy(); return true;
   });  
},

createControlCenterAlter: (obj, {input_content}, context, info) => { 
return ControlCenterAlterService.create(input_content)
 .then(d => {if(d){MutationsService.create({obj_id: d.id, model_name: 'ControlCenterAlter', user_id: context.user.profile_id, content: input_content, user_name: context.user.username, type: 'create'})}; 
  return d;
 }); 
},

updateControlCenterAlter: (obj, {id, input_content}, context, info) => { 
let argsWithAuth = {where: {id: id}};  
return ControlCenterAlterService.findOne(argsWithAuth)
.then(d => {if(d){MutationsService.create({obj_id: id, content: input_content, model_name: 'ControlCenterAlter', user_id: context.user.profile_id, user_name: context.user.username, type: 'update'})}; 
  return d.update(input_content);
 });
},

updateManyControlCenterAlter: (obj, {where_content, input_content}, context, info) => { 
let argsWithAuth = {where: where_content};  
return ControlCenterAlterService.update(input_content, argsWithAuth);  
},

};

export default mdMutationResolvers;

//  2018-01-25 10:35:57.864287+08