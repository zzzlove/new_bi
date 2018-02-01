import { dbService } from '../../../service/core';
import { SessionLog, FieldOption } from '../../../sql';

var SessionLogService = {
  
   findOne(criteria) { return SessionLog.findOne(criteria);  },

   findAll(criteria) { return SessionLog.findAll(criteria);  },

   count(criteria) { return SessionLog.count(criteria);  },

   create(values) { return SessionLog.create(values);  },

   update(criteria, values) { return SessionLog.update(values, criteria);  },

};

var FieldOptionService = {
  
   findOne(criteria) { return FieldOption.findOne(criteria);  },

   findAll(criteria) { return FieldOption.findAll(criteria);  },

   count(criteria) { return FieldOption.count(criteria);  },

   create(values) { return FieldOption.create(values);  },

   update(criteria, values) { return FieldOption.update(values, criteria);  },

};

export { SessionLogService, FieldOptionService };

//  2018-01-24 17:32:03.711735+08