import { dbService } from '../../../service/core';
import { EquipmentActual, MemberActual, MemberContract, SignClientDayMonitoring, Profile, ControlCenter, RmControlCenterEquipment, City, ControlCenterStatus, FinCodeActual, OpsCodeActual, ControlCenterAlter, ControlCenterRm, Servicex, ControlCenterActual, RmControlCenterProfile, MemberCatService, ControlCenterAlterType, ControlCenterBudget } from '../../../sql';

var ControlCenterBudgetService = {
  
   findOne(criteria) { return ControlCenterBudget.findOne(criteria);  },

   findAll(criteria) { return ControlCenterBudget.findAll(criteria);  },

   count(criteria) { return ControlCenterBudget.count(criteria);  },

   create(values) { return ControlCenterBudget.create(values);  },

   update(criteria, values) { return ControlCenterBudget.update(values, criteria);  },

};

var RmControlCenterEquipmentService = {
  
   findOne(criteria) { return RmControlCenterEquipment.findOne(criteria);  },

   findAll(criteria) { return RmControlCenterEquipment.findAll(criteria);  },

   count(criteria) { return RmControlCenterEquipment.count(criteria);  },

   create(values) { return RmControlCenterEquipment.create(values);  },

   update(criteria, values) { return RmControlCenterEquipment.update(values, criteria);  },

   addToControlCenter(id, values) { return RmControlCenterEquipment.findById(id)
       .then(data_instance =>{ return data_instance.addTbrAssociatedAlias(values); }) },

};

var MemberContractService = {
  
   findOne(criteria) { return MemberContract.findOne(criteria);  },

   findAll(criteria) { return MemberContract.findAll(criteria);  },

   count(criteria) { return MemberContract.count(criteria);  },

   create(values) { return MemberContract.create(values);  },

   update(criteria, values) { return MemberContract.update(values, criteria);  },

   addToServicex(id, values) { return MemberContract.findById(id)
       .then(data_instance =>{ return data_instance.addTbrAssociatedAlias(values); }) },

};

var RmControlCenterProfileService = {
  
   findOne(criteria) { return RmControlCenterProfile.findOne(criteria);  },

   findAll(criteria) { return RmControlCenterProfile.findAll(criteria);  },

   count(criteria) { return RmControlCenterProfile.count(criteria);  },

   create(values) { return RmControlCenterProfile.create(values);  },

   update(criteria, values) { return RmControlCenterProfile.update(values, criteria);  },

   addToControlCenter(id, values) { return RmControlCenterProfile.findById(id)
       .then(data_instance =>{ return data_instance.addTbrAssociatedAlias(values); }) },

};

var ProfileService = {
  
   findOne(criteria) { return Profile.findOne(criteria);  },

   findAll(criteria) { return Profile.findAll(criteria);  },

   count(criteria) { return Profile.count(criteria);  },

   create(values) { return Profile.create(values);  },

   update(criteria, values) { return Profile.update(values, criteria);  },

};

var ControlCenterStatusService = {
  
   findOne(criteria) { return ControlCenterStatus.findOne(criteria);  },

   findAll(criteria) { return ControlCenterStatus.findAll(criteria);  },

   count(criteria) { return ControlCenterStatus.count(criteria);  },

   create(values) { return ControlCenterStatus.create(values);  },

   update(criteria, values) { return ControlCenterStatus.update(values, criteria);  },

};

var ControlCenterAlterTypeService = {
  
   findOne(criteria) { return ControlCenterAlterType.findOne(criteria);  },

   findAll(criteria) { return ControlCenterAlterType.findAll(criteria);  },

   count(criteria) { return ControlCenterAlterType.count(criteria);  },

   create(values) { return ControlCenterAlterType.create(values);  },

   update(criteria, values) { return ControlCenterAlterType.update(values, criteria);  },

};

var MemberCatServiceService = {
  
   findOne(criteria) { return MemberCatService.findOne(criteria);  },

   findAll(criteria) { return MemberCatService.findAll(criteria);  },

   count(criteria) { return MemberCatService.count(criteria);  },

   create(values) { return MemberCatService.create(values);  },

   update(criteria, values) { return MemberCatService.update(values, criteria);  },

};

var FinCodeActualService = {
  
   findOne(criteria) { return FinCodeActual.findOne(criteria);  },

   findAll(criteria) { return FinCodeActual.findAll(criteria);  },

   count(criteria) { return FinCodeActual.count(criteria);  },

   create(values) { return FinCodeActual.create(values);  },

   update(criteria, values) { return FinCodeActual.update(values, criteria);  },

};

var ControlCenterRmService = {
  
   findOne(criteria) { return ControlCenterRm.findOne(criteria);  },

   findAll(criteria) { return ControlCenterRm.findAll(criteria);  },

   count(criteria) { return ControlCenterRm.count(criteria);  },

   create(values) { return ControlCenterRm.create(values);  },

   update(criteria, values) { return ControlCenterRm.update(values, criteria);  },

};

var SignClientDayMonitoringService = {
  
   findOne(criteria) { return SignClientDayMonitoring.findOne(criteria);  },

   findAll(criteria) { return SignClientDayMonitoring.findAll(criteria);  },

   count(criteria) { return SignClientDayMonitoring.count(criteria);  },

   create(values) { return SignClientDayMonitoring.create(values);  },

   update(criteria, values) { return SignClientDayMonitoring.update(values, criteria);  },

};

var ControlCenterService = {
  
   findOne(criteria) { return ControlCenter.findOne(criteria);  },

   findAll(criteria) { return ControlCenter.findAll(criteria);  },

   count(criteria) { return ControlCenter.count(criteria);  },

   create(values) { return ControlCenter.create(values);  },

   update(criteria, values) { return ControlCenter.update(values, criteria);  },

   setChildren(id, subids) { 
     return ControlCenter.findById(id).then(masRd =>{ ControlCenter.findAll({where: {id: subids}}).then(d => masRd.setChildren(d)); return masRd; }) 
    },

   createChildren(id, values) { 
     return ControlCenter.create(values).then(newRd =>{ ControlCenter.findById(id).then(d => d.addChildren(newRd)); return newRd; }) 
    },

   removeChildren(id, subids) { 
     return ControlCenter.findById(id).then(masRd =>{ ControlCenter.findAll({where: {id: subids}}).then(d => masRd.removeChildren(d)); return masRd; }) 
    },

   addChildren(id, subids) { 
     return ControlCenter.findById(id).then(masRd =>{ ControlCenter.findAll({where: {id: subids}}).then(d => masRd.addChildren(d)); return masRd; }) 
    },

};

var ControlCenterActualService = {
  
   findOne(criteria) { return ControlCenterActual.findOne(criteria);  },

   findAll(criteria) { return ControlCenterActual.findAll(criteria);  },

   count(criteria) { return ControlCenterActual.count(criteria);  },

   create(values) { return ControlCenterActual.create(values);  },

   update(criteria, values) { return ControlCenterActual.update(values, criteria);  },

};

var CityService = {
  
   findOne(criteria) { return City.findOne(criteria);  },

   findAll(criteria) { return City.findAll(criteria);  },

   count(criteria) { return City.count(criteria);  },

   create(values) { return City.create(values);  },

   update(criteria, values) { return City.update(values, criteria);  },

};

var EquipmentActualService = {
  
   findOne(criteria) { return EquipmentActual.findOne(criteria);  },

   findAll(criteria) { return EquipmentActual.findAll(criteria);  },

   count(criteria) { return EquipmentActual.count(criteria);  },

   create(values) { return EquipmentActual.create(values);  },

   update(criteria, values) { return EquipmentActual.update(values, criteria);  },

};

var MemberActualService = {
  
   findOne(criteria) { return MemberActual.findOne(criteria);  },

   findAll(criteria) { return MemberActual.findAll(criteria);  },

   count(criteria) { return MemberActual.count(criteria);  },

   create(values) { return MemberActual.create(values);  },

   update(criteria, values) { return MemberActual.update(values, criteria);  },

};

var OpsCodeActualService = {
  
   findOne(criteria) { return OpsCodeActual.findOne(criteria);  },

   findAll(criteria) { return OpsCodeActual.findAll(criteria);  },

   count(criteria) { return OpsCodeActual.count(criteria);  },

   create(values) { return OpsCodeActual.create(values);  },

   update(criteria, values) { return OpsCodeActual.update(values, criteria);  },

};

var ControlCenterAlterService = {
  
   findOne(criteria) { return ControlCenterAlter.findOne(criteria);  },

   findAll(criteria) { return ControlCenterAlter.findAll(criteria);  },

   count(criteria) { return ControlCenterAlter.count(criteria);  },

   create(values) { return ControlCenterAlter.create(values);  },

   update(criteria, values) { return ControlCenterAlter.update(values, criteria);  },

};

export { EquipmentActualService, MemberActualService, MemberContractService, SignClientDayMonitoringService, ProfileService, ControlCenterService, RmControlCenterEquipmentService, CityService, ControlCenterStatusService, FinCodeActualService, OpsCodeActualService, ControlCenterAlterService, ControlCenterRmService, ControlCenterActualService, RmControlCenterProfileService, MemberCatServiceService, ControlCenterAlterTypeService, ControlCenterBudgetService };

//  2018-01-25 10:35:57.864287+08