import { ChartTitleService, CubeDataService, ChartDataService } from '../../../../service';
import {MutationsService} from '../../../../service';

const biMutationResolvers = { 

destroyCubeData: (obj, {id}, context, info) => { 
  let argsWithAuth = {where: {id: id}};  
  return CubeDataService.findOne(argsWithAuth)
  .then(d => {if(!d){return false}; d.destroy(); return true;} );  
},

createCubeData: (obj, {input_content}, context, info) => { return CubeDataService.create(input_content);  },

updateCubeData: (obj, {id, input_content}, context, info) => { 
let argsWithAuth = {where: {id: id}};  
return CubeDataService.findOne(argsWithAuth).then(d => d.update(input_content));  
},

updateManyCubeData: (obj, {where_content, input_content}, context, info) => { 
let argsWithAuth = {where: where_content};  
return CubeDataService.update(input_content, argsWithAuth);  
},

destroyChartData: (obj, {id}, context, info) => { 
  let argsWithAuth = {where: {id: id}};  
  return ChartDataService.findOne(argsWithAuth)
  .then(d => {if(!d){return false}; d.destroy(); return true;} );  
},

createChartData: (obj, {input_content}, context, info) => { return ChartDataService.create(input_content);  },

updateChartData: (obj, {id, input_content}, context, info) => { 
let argsWithAuth = {where: {id: id}};  
return ChartDataService.findOne(argsWithAuth).then(d => d.update(input_content));  
},

updateManyChartData: (obj, {where_content, input_content}, context, info) => { 
let argsWithAuth = {where: where_content};  
return ChartDataService.update(input_content, argsWithAuth);  
},

destroyChartTitle: (obj, {id}, context, info) => { 
  let argsWithAuth = {where: {id: id}};  
  return ChartTitleService.findOne(argsWithAuth)
  .then(d => {if(!d){return false}; d.destroy(); return true;} );  
},

createChartTitle: (obj, {input_content}, context, info) => { return ChartTitleService.create(input_content);  },

updateChartTitle: (obj, {id, input_content}, context, info) => { 
let argsWithAuth = {where: {id: id}};  
return ChartTitleService.findOne(argsWithAuth).then(d => d.update(input_content));  
},

updateManyChartTitle: (obj, {where_content, input_content}, context, info) => { 
let argsWithAuth = {where: where_content};  
return ChartTitleService.update(input_content, argsWithAuth);  
},

};

export default biMutationResolvers;

//  2017-11-02 13:07:41.442523+08