import { ServiceActualService, OrderSalesExtKhService, OrderOpsExtUkService, OrderOpsExtKhService, RmExtOrderBillingService, OrderSalesExtUkService, ServicexService, PricingService } from '../../../../service';
import {MutationsService, dbService} from '../../../../service';

const sdMutationResolvers = { 

destroyPricing: (obj, {id}, context, info) => { 
  if (context.user.roles.indexOf('admin') != -1 ){
   let argsWithAuth = {where: {id: id}};  
   return PricingService.findOne(argsWithAuth)
   .then(d => {if(!d){return false}else{MutationsService.create({obj_id: id, model_name: 'Pricing', user_id: context.user.profile_id, user_name: context.user.username, type: 'destroy'})}; 
     d.destroy(); 
     return true;
   });
  }
},

restorePricing: (obj, {id}, context, info) => { 
  if (context.user.roles.indexOf('admin') != -1 ){
   let argsWithAuth = {where: {id: id}, paranoid: false};  
   return PricingService.findOne(argsWithAuth)
   .then(d => {if(d){MutationsService.create({obj_id: id, model_name: 'Pricing', user_id: context.user.profile_id, user_name: context.user.username, type: 'update'})}; 
     return d.restore();
   });  
  }
},

createPricing: (obj, {input_content}, context, info) => { 
  if (context.user.roles.indexOf('admin') != -1 ){
   return PricingService.create(input_content)
   .then(d => {if(d){MutationsService.create({obj_id: d.id, model_name: 'Pricing', user_id: context.user.profile_id, content: input_content, user_name: context.user.username, type: 'create'})}; 
   return d;
   });   
  } 
},

updatePricing: (obj, {id, input_content}, context, info) => { 
  if (context.user.roles.indexOf('admin') != -1 ){
   let argsWithAuth = {where: {id: id}};  
   return PricingService.findOne(argsWithAuth)
   .then(d => {if(d){MutationsService.create({obj_id: id, content: input_content, model_name: 'Pricing', user_id: context.user.profile_id, user_name: context.user.username, type: 'update'})}; 
     return d.update(input_content);
   });  
  } 
},

updateManyPricing: (obj, {id, input_content}, context, info) => { 
let argsWithAuth = {where: {id: id}};  
return PricingService.update(argsWithAuth, input_content);  
},

destroyOrderSalesExtKh: (obj, {id}, context, info) => { 
  if (context.user.roles.indexOf('admin') != -1 ){
   let argsWithAuth = {where: {id: id}};  
   return OrderSalesExtKhService.findOne(argsWithAuth)
   .then(d => {if(!d){return false}else{MutationsService.create({obj_id: id, model_name: 'OrderSalesExtKh', user_id: context.user.profile_id, user_name: context.user.username, type: 'destroy'})}; 
     d.destroy(); 
     return true;
   });
  }
},

restoreOrderSalesExtKh: (obj, {id}, context, info) => { 
  if (context.user.roles.indexOf('admin') != -1 ){
   let argsWithAuth = {where: {id: id}, paranoid: false};  
   return OrderSalesExtKhService.findOne(argsWithAuth)
   .then(d => {if(d){MutationsService.create({obj_id: id, model_name: 'OrderSalesExtKh', user_id: context.user.profile_id, user_name: context.user.username, type: 'update'})}; 
     return d.restore();
   });  
  }
},

createOrderSalesExtKh: (obj, {input_content}, context, info) => { 
  if (context.user.roles.indexOf('admin') != -1 ){
   return OrderSalesExtKhService.create(input_content)
   .then(d => {if(d){MutationsService.create({obj_id: d.id, model_name: 'OrderSalesExtKh', user_id: context.user.profile_id, content: input_content, user_name: context.user.username, type: 'create'})}; 
   return d;
   });   
  } 
},

updateOrderSalesExtKh: (obj, {id, input_content}, context, info) => { 
  if (context.user.roles.indexOf('admin') != -1 ){
   let argsWithAuth = {where: {id: id}};  
   return OrderSalesExtKhService.findOne(argsWithAuth)
   .then(d => {if(d){MutationsService.create({obj_id: id, content: input_content, model_name: 'OrderSalesExtKh', user_id: context.user.profile_id, user_name: context.user.username, type: 'update'})}; 
     return d.update(input_content);
   });  
  } 
},

updateManyOrderSalesExtKh: (obj, {id, input_content}, context, info) => { 
let argsWithAuth = {where: {id: id}};  
return OrderSalesExtKhService.update(argsWithAuth, input_content);  
},

destroyRmExtOrderBilling: (obj, {id}, context, info) => { 
  let argsWithAuth = {where: {id: id}};  
  return RmExtOrderBillingService.findOne(argsWithAuth)
  .then(d => {if(!d){return false}else{MutationsService.create({obj_id: id, model_name: 'RmExtOrderBilling', user_id: context.user.profile_id, user_name: context.user.username, type: 'destroy'})}; 
   d.destroy(); return true;
   });  
},

restoreRmExtOrderBilling: (obj, {id}, context, info) => { 
  let argsWithAuth = {where: {id: id, deleted_at: true}};  
  return RmExtOrderBillingService.findOne(argsWithAuth)
  .then(d => {if(!d){return false}; d.restore(); return true;} );  
},

createRmExtOrderBilling: (obj, {input_content}, context, info) => { 
return RmExtOrderBillingService.create(input_content)
 .then(d => {if(d){MutationsService.create({obj_id: d.id, model_name: 'RmExtOrderBilling', user_id: context.user.profile_id, content: input_content, user_name: context.user.username, type: 'create'})}; 
  return d;
 }); 
},

updateRmExtOrderBilling: (obj, {id, input_content}, context, info) => { 
let argsWithAuth = {where: {id: id}};  
return RmExtOrderBillingService.findOne(argsWithAuth)
.then(d => {if(d){MutationsService.create({obj_id: id, content: input_content, model_name: 'RmExtOrderBilling', user_id: context.user.profile_id, user_name: context.user.username, type: 'update'})}; 
  return d.update(input_content);
 });
},

updateManyRmExtOrderBilling: (obj, {where_content, input_content}, context, info) => { 
let argsWithAuth = {where: where_content};  
return RmExtOrderBillingService.update(input_content, argsWithAuth);  
},

destroyOrderOpsExtUk: (obj, {id}, context, info) => { 
  let argsWithAuth = {where: {id: id}};  
  return OrderOpsExtUkService.findOne(argsWithAuth)
  .then(d => {if(!d){return false}; d.destroy(); return true;} );  
},

restoreOrderOpsExtUk: (obj, {id}, context, info) => { 
  let argsWithAuth = {where: {id: id, deleted_at: true}};  
  return OrderOpsExtUkService.findOne(argsWithAuth)
  .then(d => {if(!d){return false}; d.restore(); return true;} );  
},

createOrderOpsExtUk: (obj, {input_content}, context, info) => { return OrderOpsExtUkService.create(input_content);  },

updateOrderOpsExtUk: (obj, {id, input_content}, context, info) => { 
let argsWithAuth = {where: {id: id}};  
return OrderOpsExtUkService.findOne(argsWithAuth).then(d => d.update(input_content));  
},

updateManyOrderOpsExtUk: (obj, {where_content, input_content}, context, info) => { 
let argsWithAuth = {where: where_content};  
return OrderOpsExtUkService.update(input_content, argsWithAuth);  
},

destroyServiceActual: (obj, {id}, context, info) => { 
  let argsWithAuth = {where: {id: id}};  
  return ServiceActualService.findOne(argsWithAuth)
  .then(d => {if(!d){return false}; d.destroy(); return true;} );  
},

createServiceActual: (obj, {input_content}, context, info) => { return ServiceActualService.create(input_content);  },

updateServiceActual: (obj, {id, input_content}, context, info) => { 
let argsWithAuth = {where: {id: id}};  
return ServiceActualService.findOne(argsWithAuth).then(d => d.update(input_content));  
},

updateManyServiceActual: (obj, {where_content, input_content}, context, info) => { 
let argsWithAuth = {where: where_content};  
return ServiceActualService.update(input_content, argsWithAuth);  
},

destroyServicex: (obj, {id}, context, info) => { 
  let argsWithAuth = {where: {id: id}};  
  return ServicexService.findOne(argsWithAuth)
  .then(d => {if(!d){return false}; d.destroy(); return true;} );  
},

createServicex: (obj, {input_content}, context, info) => { return ServicexService.create(input_content);  },

updateServicex: (obj, {id, input_content}, context, info) => { 
let argsWithAuth = {where: {id: id}};  
return ServicexService.findOne(argsWithAuth).then(d => d.update(input_content));  
},

updateManyServicex: (obj, {where_content, input_content}, context, info) => { 
let argsWithAuth = {where: where_content};  
return ServicexService.update(input_content, argsWithAuth);  
},

xServicexaddToControlCenter: (obj, {input_content}, context, info) => { return ServicexService.addToControlCenter(input_content);  },

xServicexdestroyChildren: (obj, {id}, context, info) => { return ServicexService.destroyChildren(id);  },

xServicexcreateChildren: (obj, {id, input_content}, context, info) => { return ServicexService.createChildren(id, input_content);  }, 

xServicexupdateChildren: (obj, {id, input_content}, context, info) => { return ServicexService.updateChildren(id, input_content);  },

xServicexremoveChildren: (obj, {input_content}, context, info) => { return ServicexService.removeChildren(input_content);  },

xServicexaddToChildren: (obj, {input_content}, context, info) => { return ServicexService.addToChildren(input_content);  },

destroyOrderSalesExtUk: (obj, {id}, context, info) => { 
  let argsWithAuth = {where: {id: id}};  
  return OrderSalesExtUkService.findOne(argsWithAuth)
  .then(d => {if(!d){return false}; d.destroy(); return true;} );  
},

restoreOrderSalesExtUk: (obj, {id}, context, info) => { 
  let argsWithAuth = {where: {id: id, deleted_at: true}};  
  return OrderSalesExtUkService.findOne(argsWithAuth)
  .then(d => {if(!d){return false}; d.restore(); return true;} );  
},

createOrderSalesExtUk: (obj, {input_content}, context, info) => { return OrderSalesExtUkService.create(input_content);  },

updateOrderSalesExtUk: (obj, {id, input_content}, context, info) => { 
let argsWithAuth = {where: {id: id}};  
return OrderSalesExtUkService.findOne(argsWithAuth).then(d => d.update(input_content));  
},

updateManyOrderSalesExtUk: (obj, {where_content, input_content}, context, info) => { 
let argsWithAuth = {where: where_content};  
return OrderSalesExtUkService.update(input_content, argsWithAuth);  
},

destroyOrderOpsExtKh: (obj, {id}, context, info) => { 
  let argsWithAuth = {where: {id: id}};  
  return OrderOpsExtKhService.findOne(argsWithAuth)
  .then(d => {if(!d){return false}; d.destroy(); return true;} );  
},

restoreOrderOpsExtKh: (obj, {id}, context, info) => { 
  let argsWithAuth = {where: {id: id, deleted_at: true}};  
  return OrderOpsExtKhService.findOne(argsWithAuth)
  .then(d => {if(!d){return false}; d.restore(); return true;} );  
},

createOrderOpsExtKh: (obj, {input_content}, context, info) => { return OrderOpsExtKhService.create(input_content);  },

updateOrderOpsExtKh: (obj, {id, input_content}, context, info) => { 
let argsWithAuth = {where: {id: id}};  
return OrderOpsExtKhService.findOne(argsWithAuth).then(d => d.update(input_content));  
},

updateManyOrderOpsExtKh: (obj, {where_content, input_content}, context, info) => { 
let argsWithAuth = {where: where_content};  
return OrderOpsExtKhService.update(input_content, argsWithAuth);  
},

};

export default sdMutationResolvers;

//  2018-01-29 11:04:50.534518+00