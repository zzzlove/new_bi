import { CubeDataHR } from '../../../../sql'

//CubeDataHR.findOne().then(item => console.log(JSON.stringify(item)));

const hroutsideQueryResolvers = { 
cube_data_hr(obj, args, context, info){

  let {limit, order} = args;


  delete args.limit;
  delete args.order;

  return CubeDataHR.findAll({...{where: args}, ...{limit}, ...{order}}); 


  },


};

export default hroutsideQueryResolvers;

//  2017-08-02 22:02:24.453802+08