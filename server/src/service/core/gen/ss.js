import { dbService } from '../../../service/core';
import { ElementAuth, LoginHistory, Mutations } from '../../../sql';

var MutationsService = {
  
   findOne(criteria) { return Mutations.findOne(criteria);  },

   findAll(criteria) { return Mutations.findAll(criteria);  },

   count(criteria) { return Mutations.count(criteria);  },

   create(values) { return Mutations.create(values);  },

   update(criteria, values) { return Mutations.update(values, criteria);  },

};

var LoginHistoryService = {
  
   findOne(criteria) { return LoginHistory.findOne(criteria);  },

   findAll(criteria) { return LoginHistory.findAll(criteria);  },

   count(criteria) { return LoginHistory.count(criteria);  },

   create(values) { return LoginHistory.create(values);  },

   update(criteria, values) { return LoginHistory.update(values, criteria);  },

};

var ElementAuthService = {
  
   findOne(criteria) { return ElementAuth.findOne(criteria);  },

   findAll(criteria) { return ElementAuth.findAll(criteria);  },

   count(criteria) { return ElementAuth.count(criteria);  },

   create(values) { return ElementAuth.create(values);  },

   update(criteria, values) { return ElementAuth.update(values, criteria);  },

};

export { ElementAuthService, LoginHistoryService, MutationsService };

//  2018-01-24 17:37:05.099404+08