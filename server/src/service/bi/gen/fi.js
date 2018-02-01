import { dbService } from '../../../service/core';
import { EntrySummary, Entry, Account } from '../../../sql';

var EntryService = {
  
   findOne(criteria) { return Entry.findOne(criteria);  },

   findAll(criteria) { return Entry.findAll(criteria);  },

   count(criteria) { return Entry.count(criteria);  },

   create(values) { return Entry.create(values);  },

   update(criteria, values) { return Entry.update(values, criteria);  },

};

var EntrySummaryService = {
  
   findOne(criteria) { return EntrySummary.findOne(criteria);  },

   findAll(criteria) { return EntrySummary.findAll(criteria);  },

   count(criteria) { return EntrySummary.count(criteria);  },

   create(values) { return EntrySummary.create(values);  },

   update(criteria, values) { return EntrySummary.update(values, criteria);  },

};

var AccountService = {
  
   findOne(criteria) { return Account.findOne(criteria);  },

   findAll(criteria) { return Account.findAll(criteria);  },

   count(criteria) { return Account.count(criteria);  },

   create(values) { return Account.create(values);  },

   update(criteria, values) { return Account.update(values, criteria);  },

};

export { EntrySummaryService, EntryService, AccountService };

//  2018-01-25 08:14:33.345891+08