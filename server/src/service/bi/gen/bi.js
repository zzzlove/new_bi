import { dbService } from '../../../service/core';
import { TimeBreak, TimeRun, Chart, ChartDefs, Cube01, ChartGo, TimeDefs, Cube, CubeDefs, ChartTitle, CubeChart, CubeDataDefs, ChartDataAlias, CubeData, ChartData, CubeChartDefs } from '../../../sql';

var CubeDataService = {
  
   findOne(criteria) { return CubeData.findOne(criteria);  },

   findAll(criteria) { return CubeData.findAll(criteria);  },

   count(criteria) { return CubeData.count(criteria);  },

   create(values) { return CubeData.create(values);  },

   update(criteria, values) { return CubeData.update(values, criteria);  },

};

var ChartDataService = {
  
   findOne(criteria) { return ChartData.findOne(criteria);  },

   findAll(criteria) { return ChartData.findAll(criteria);  },

   count(criteria) { return ChartData.count(criteria);  },

   create(values) { return ChartData.create(values);  },

   update(criteria, values) { return ChartData.update(values, criteria);  },

};

var ChartTitleService = {
  
   findOne(criteria) { return ChartTitle.findOne(criteria);  },

   findAll(criteria) { return ChartTitle.findAll(criteria);  },

   count(criteria) { return ChartTitle.count(criteria);  },

   create(values) { return ChartTitle.create(values);  },

   update(criteria, values) { return ChartTitle.update(values, criteria);  },

};

export { ChartTitleService, CubeDataService, ChartDataService };

//  2017-11-02 13:07:41.442523+08