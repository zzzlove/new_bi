import { dbService } from '../../../service'
import path from 'path';
import fs from 'fs';



const ukDefsQueryResolvers = { 

sales_uk_all_amount_in_p12m_gb_month: (obj, {ops_id}, context, info) => {
  return dbService.query("select x, sum(y) as y from fi.invoice_fin_uk_gb_bizcode where x<=to_char(now(), 'yyyyMM') and x>=to_char((now()-interval'13 Month'), 'yyyyMM') group by x order by x", 
      { replacements: { ops_id: ops_id },  type: dbService.QueryTypes.SELECT });
}, 

sales_uk_ct_amount_in_p12m_gb_month: (obj, {ops_id}, context, info) => {
  return dbService.query("select x, sum(y) as y from fi.invoice_fin_uk_gb_bizcode where x<=to_char(now(), 'yyyyMM') and x>=to_char((now()-interval'13 Month'), 'yyyyMM') and c = '长途运输' group by x order by x", 
      { replacements: { ops_id: ops_id },  type: dbService.QueryTypes.SELECT });
}, 


sales_uk_uk_amount_in_p12m_gb_month: (obj, {ops_id}, context, info) => {
  return dbService.query("select x, sum(y) as y from fi.invoice_fin_uk_gb_bizcode where x<=to_char(now(), 'yyyyMM') and x>=to_char((now()-interval'13 Month'), 'yyyyMM') and c = '优卡运输' group by x order by x", 
      { replacements: { ops_id: ops_id },  type: dbService.QueryTypes.SELECT });
}, 

sales_uk_amount_ytd_gr_year: (obj, {ops_id}, context, info) => {
  return dbService.query("select x, c, y from fi.invoice_fin_uk_ytd_gb_bizcode order by x", 
      { replacements: { ops_id: ops_id },  type: dbService.QueryTypes.SELECT });
}, 

sales_uk_all_amount_range_gb_bizcode: (obj, {ops_id, mode, started_at, finished_at}, context, info) => {
  return dbService.query("select x, c, y from fi.invoice_fin_uk_gb_bizcode where  x>=:started_at and x<=:finished_at order by x", 
      { replacements: { ops_id: ops_id, started_at: started_at, finished_at: finished_at },  type: dbService.QueryTypes.SELECT });
}, 

sales_uk_amount_range_gb_tradername: (obj, {ops_id, mode, started_at, finished_at}, context, info) => {
  return dbService.query("select c, sum(y) as y from fi.invoice_fin_uk_gb_trader_name where x>=:started_at and x<=:finished_at group by c order by y desc limit 15", 
      { replacements: { ops_id: ops_id, started_at: started_at, finished_at: finished_at },  type: dbService.QueryTypes.SELECT });
}, 

sales_uk_amount_range_gb_opscode: (obj, {ops_id, mode, started_at, finished_at}, context, info) => {
  return dbService.query("select c, sum(y) as y from fi.invoice_fin_uk_gb_opscode where x>=:started_at and x<=:finished_at group by c order by y desc limit 15", 
      { replacements: { ops_id: ops_id, started_at: started_at, finished_at: finished_at },  type: dbService.QueryTypes.SELECT });
}, 


};

export { ukDefsQueryResolvers};



