import { ServiceActualService, OrderSalesExtKhService, OrderOpsExtUkService, OrderOpsExtKhService, RmExtOrderBillingService, OrderSalesExtUkService, ServicexService, PricingService } from '../../../../service';

const sdTypeResolvers = { 

Servicex: {
   Children(obj, args, context){ return obj.getChildren({where: args}); },
   ControlCenter(obj, args, context){ return obj.getControlCenter({where: args}); }
},

};

export default sdTypeResolvers;

//  2018-01-29 11:04:50.534518+00