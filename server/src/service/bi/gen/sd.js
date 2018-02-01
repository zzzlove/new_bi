import { dbService } from '../../../service/core';
import { Profile, ControlCenter, ServiceActual, OrderSalesExtKh, OrderOpsExtUk, OrderOpsExtKh, RmExtOrderBilling, OrderSalesExtUk, Servicex, Pricing } from '../../../sql';

var PricingService = {
  
   findOne(criteria) { return Pricing.findOne(criteria);  },

   findAll(criteria) { return Pricing.findAll(criteria);  },

   count(criteria) { return Pricing.count(criteria);  },

   create(values) { return Pricing.create(values);  },

   update(criteria, values) { return Pricing.update(values, criteria);  },

};

var OrderSalesExtKhService = {
  
   findOne(criteria) { return OrderSalesExtKh.findOne(criteria);  },

   findAll(criteria) { return OrderSalesExtKh.findAll(criteria);  },

   count(criteria) { return OrderSalesExtKh.count(criteria);  },

   create(values) { return OrderSalesExtKh.create(values);  },

   update(criteria, values) { return OrderSalesExtKh.update(values, criteria);  },

};

var RmExtOrderBillingService = {
  
   findOne(criteria) { return RmExtOrderBilling.findOne(criteria);  },

   findAll(criteria) { return RmExtOrderBilling.findAll(criteria);  },

   count(criteria) { return RmExtOrderBilling.count(criteria);  },

   create(values) { return RmExtOrderBilling.create(values);  },

   update(criteria, values) { return RmExtOrderBilling.update(values, criteria);  },

};

var ServiceActualService = {
  
   findOne(criteria) { return ServiceActual.findOne(criteria);  },

   findAll(criteria) { return ServiceActual.findAll(criteria);  },

   count(criteria) { return ServiceActual.count(criteria);  },

   create(values) { return ServiceActual.create(values);  },

   update(criteria, values) { return ServiceActual.update(values, criteria);  },

};

var OrderOpsExtUkService = {
  
   findOne(criteria) { return OrderOpsExtUk.findOne(criteria);  },

   findAll(criteria) { return OrderOpsExtUk.findAll(criteria);  },

   count(criteria) { return OrderOpsExtUk.count(criteria);  },

   create(values) { return OrderOpsExtUk.create(values);  },

   update(criteria, values) { return OrderOpsExtUk.update(values, criteria);  },

};

var ServicexService = {
  
   findOne(criteria) { return Servicex.findOne(criteria);  },

   findAll(criteria) { return Servicex.findAll(criteria);  },

   count(criteria) { return Servicex.count(criteria);  },

   create(values) { return Servicex.create(values);  },

   update(criteria, values) { return Servicex.update(values, criteria);  },

   addToControlCenter(id, values) { return Servicex.findById(id)
       .then(data_instance =>{ return data_instance.addTbrAssociatedAlias(values); }) },

   destroyChildren(subid) { return Servicex.destroy({ where: { id: subid } }); },

   createChildren(id, values) { return Servicex.findById(id)
       .then(data_instance =>{ return data_instance.createTbrAssociatedAlias(values); }) },

   updateChildren(subid, values) { return Servicex.update(values, { where: { id: subid } });  },

   removeChildren(id, values) { return Servicex.findById(id)
       .then(data_instance =>{ return data_instance.removeTbrAssociatedAlias(values); }) },

   addToChildren(id, values) { return Servicex.findById(id)
       .then(data_instance =>{ return data_instance.addTbrAssociatedAlias(values); }) },

};

var OrderSalesExtUkService = {
  
   findOne(criteria) { return OrderSalesExtUk.findOne(criteria);  },

   findAll(criteria) { return OrderSalesExtUk.findAll(criteria);  },

   count(criteria) { return OrderSalesExtUk.count(criteria);  },

   create(values) { return OrderSalesExtUk.create(values);  },

   update(criteria, values) { return OrderSalesExtUk.update(values, criteria);  },

};

var OrderOpsExtKhService = {
  
   findOne(criteria) { return OrderOpsExtKh.findOne(criteria);  },

   findAll(criteria) { return OrderOpsExtKh.findAll(criteria);  },

   count(criteria) { return OrderOpsExtKh.count(criteria);  },

   create(values) { return OrderOpsExtKh.create(values);  },

   update(criteria, values) { return OrderOpsExtKh.update(values, criteria);  },

};

export { ServiceActualService, OrderSalesExtKhService, OrderOpsExtUkService, OrderOpsExtKhService, RmExtOrderBillingService, OrderSalesExtUkService, ServicexService, PricingService };

//  2018-01-29 11:04:50.534518+00