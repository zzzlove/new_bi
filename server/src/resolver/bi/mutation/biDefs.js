import { dbService } from '../../../service'
import path from 'path';
import fs from 'fs';

//MovementService.update({where: {id: [1, 2]}}, {order_id: 11});

const biDefsMutationResolvers = { 


initiate_entry_summary_by_month: (obj, {month}, context, info) => { 

  return dbService.query("SELECT fi.initiate_entry_summary_by_month(:month)", { replacements: { month: month }, type: dbService.QueryTypes.SELECT });

},


calculate_entry_summary_by_month: (obj, {month}, context, info) => { 

  return dbService.query("SELECT fi.calculate_entry_summary_by_month(:month)", { replacements: { month: month }, type: dbService.QueryTypes.SELECT });

},


lock_entry_summary_by_month: (obj, {month}, context, info) => { 

  return dbService.query("SELECT fi.lock_entry_summary_by_month(:month, :ops_by)", { replacements: { month: month, ops_by: context.user.name }, type: dbService.QueryTypes.SELECT });

},

};

export { biDefsMutationResolvers};