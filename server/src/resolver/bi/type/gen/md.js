import { EquipmentActualService, MemberActualService, MemberContractService, SignClientDayMonitoringService, ProfileService, ControlCenterService, RmControlCenterEquipmentService, CityService, ControlCenterStatusService, FinCodeActualService, OpsCodeActualService, ControlCenterAlterService, ControlCenterRmService, ControlCenterActualService, RmControlCenterProfileService, MemberCatServiceService, ControlCenterAlterTypeService, ControlCenterBudgetService } from '../../../../service';

const mdTypeResolvers = { 

RmControlCenterEquipment: {
   ControlCenter(obj, args, context){ return obj.getControlCenter({where: args}); }
},

MemberContract: {
   Servicex(obj, args, context){ return obj.getServicex({where: args}); }
},

RmControlCenterProfile: {
   ControlCenter(obj, args, context){ return obj.getControlCenter({where: args}); }
},

ControlCenterRm: {
   SubCenter(obj, args, context){ return obj.getSubCenter({where: args}); },
   Parent(obj, args, context){ return obj.getParent({where: args}); }
},

ControlCenter: {
   ControlCenterActual(obj, args, context){ return obj.getControlCenterActual({where: args}); },
   CityParent(obj, args, context){ return obj.getCityParent({where: args}); },
   LineParent(obj, args, context){ return obj.getLineParent({where: args}); },
   Children(obj, args, context){ return obj.getChildren({where: args}); },
   Servicex(obj, args, context){ return obj.getServicex({where: args}); },
   ControlCenterBudget(obj, args, context){ return obj.getControlCenterBudget({where: args}); }
},

};

export default mdTypeResolvers;

//  2018-01-25 10:35:57.864287+08