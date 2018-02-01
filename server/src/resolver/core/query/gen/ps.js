import { FieldOptionService } from '../../../../service';

const psQueryResolvers = { 

fieldoption_one(obj, args, context, info){



  if (context.user.roles.indexOf('admin') != -1 ){
    
    return FieldOptionService.findOne({...{where: args}, }); 
  } 
  return FieldOptionService.findOne({...{where: args}, }); 
},

fieldoption(obj, args, context, info){
  let {limit, order, offset} = args;
  delete args.limit;
  delete args.offset;
  delete args.order;



  if (context.user.roles.indexOf('admin') != -1 ){
    
    return FieldOptionService.findAll({...{where: args}, ...{limit}, ...{offset}, ...{order}}); 
  } 
  return FieldOptionService.findAll({...{where: args}, ...{limit}, ...{offset}, ...{order}}); 
},

};

export default psQueryResolvers;

//  2017-10-11 15:04:13.492938+08