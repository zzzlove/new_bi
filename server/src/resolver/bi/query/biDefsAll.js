import { MutationsService, dbService, OrderSalesService, BillingService, OrderOpsDepartService, MovementService, ConsignmentService } from '../../../service'
import path from 'path';
import fs from 'fs';

//MovementService.update({where: {id: [1, 2]}}, {order_id: 11});

const biDefsQueryResolversAll = {

sales_yd_amount_in_cm_gb_day_all: (obj, {ops_id}, context, info) => {
  return dbService.query("select x, sum(y) as y from sd.order_sales_yd_amount_gb_day_all where term=to_char(((now() -interval '25 D' )+interval '1 month '), 'yyyyMM') and x<to_char(now(), 'yyyy-MM-dd') and ops_id in (select unnest('{:ops_id}'::integer[])) group by x order by x",
      { replacements: { ops_id: ops_id },  type: dbService.QueryTypes.SELECT });
}, 

// sd.order_sales_yd_amount_gb_day_all
// select ops_id, to_char(started_at, 'yyyyMM') as term, to_char(started_at, 'yyyy-mm-dd') as x, sum(amount) as y from sd.order_sales_ext_kh_all where deleted_at is null and reflection_id in (1, 2) and cat1st = 'A2' group by ops_id, to_char(started_at, 'yyyyMM'), to_char(started_at, 'yyyy-mm-dd')
// sd.order_sales_ext_kh where deleted_at is null and reflection_id in (1, 2) and cat1st = 'A2'

sales_yd_amount_in_cy_gb_month_all: (obj, {ops_id}, context, info) => {
  return dbService.query("select x, sum(y) as y from sd.order_sales_yd_amount_gb_month_all where term=to_char(now(), 'yyyy') and ops_id in (select unnest('{:ops_id}'::integer[])) group by x order by x",
      { replacements: { ops_id: ops_id },  type: dbService.QueryTypes.SELECT });
}, 

sales_yd_amount_in_p12m_gb_month_all: (obj, {ops_id}, context, info) => {
  return dbService.query("select x, sum(y) as y from sd.order_sales_yd_amount_gb_month_all where x<=to_char(now(), 'yyyyMM') and x>=to_char((now()-interval'13 Month'), 'yyyyMM') and ops_id in (select unnest('{:ops_id}'::integer[])) group by x order by x",
      { replacements: { ops_id: ops_id },  type: dbService.QueryTypes.SELECT });
}, 

// sd.order_sales_yd_amount_gb_month_all
// select ops_id, to_char(started_at, 'yyyy') as term, to_char(started_at, 'yyyyMM') as x, sum(amount) as y from sd.order_sales_ext_kh_all where deleted_at is null and reflection_id in (1, 2) and cat1st = 'A2' group by ops_id, to_char(started_at, 'yyyy'), to_char(started_at, 'yyyyMM')
// sd.order_sales_ext_kh where deleted_at is null and reflection_id in (1, 2) and cat1st = 'A2'

sales_yd_tradercount_in_p12m_gb_month_all: (obj, {ops_id}, context, info) => {
  return dbService.query("select x, sum(y) as y from sd.order_sales_yd_distinct_trader_gr_ops_month_all where x<=to_char(now(), 'yyyyMM') and x>=to_char((now()-interval'13 Month'), 'yyyyMM') and ops_id in (select unnest('{:ops_id}'::integer[])) group by x order by x",
      { replacements: { ops_id: ops_id },  type: dbService.QueryTypes.SELECT });
}, 

sales_yd_tradercount_in_currentyear_all: (obj, {ops_id}, context, info) => {
  return dbService.query("select sum(y) as y from sd.order_sales_yd_distinct_trader_ytd_gr_ops_all where term=to_char(now(), 'yyyy') and ops_id in (select unnest('{:ops_id}'::integer[]))",
      { replacements: { ops_id: ops_id },  type: dbService.QueryTypes.SELECT })
      .then(d=>{return d[0].y});
}, 

sales_yd_tradercount_in_lastyear_all: (obj, {ops_id}, context, info) => {
  return dbService.query("select sum(y) as y from sd.order_sales_yd_distinct_trader_ytd_gr_ops_all where term=to_char((now()-interval'1 year'), 'yyyy') and ops_id in (select unnest('{:ops_id}'::integer[]))",
      { replacements: { ops_id: ops_id },  type: dbService.QueryTypes.SELECT })
      .then(d=>{return d[0].y});
}, 

sales_yd_amount_ytd_in_currentyear_all: (obj, {ops_id}, context, info) => {
  return dbService.query("select sum(y) as y from sd.order_sales_yd_amount_gb_month_all where x<=to_char(now(), 'yyyyMM') and term=to_char(now(), 'yyyy') and ops_id in (select unnest('{:ops_id}'::integer[]))",
      { replacements: { ops_id: ops_id },  type: dbService.QueryTypes.SELECT })
      .then(d=>{return d[0].y});
}, 

sales_yd_amount_ytd_in_lastyear_all: (obj, {ops_id}, context, info) => {
  return dbService.query("select sum(y) as y from sd.order_sales_yd_amount_gb_month_all where x<=to_char((now()-interval'1 year'), 'yyyyMM') and term=to_char((now()-interval'1 year'), 'yyyy') and ops_id in (select unnest('{:ops_id}'::integer[]))",
      { replacements: { ops_id: ops_id },  type: dbService.QueryTypes.SELECT })
      .then(d=>{return d[0].y});
}, 

sales_yd_amount_range_gb_tradercode_mode_all: (obj, {ops_id, mode, started_at, finished_at}, context, info) => {
  if(mode=='byMonth') {
  return dbService.query("select x, c, sum(y1) as y1, sum(y2) as y2 from sd.order_sales_yd_amount_gb_month_trader_all where x>=:started_at and x<=:finished_at and ops_id in (select unnest('{:ops_id}'::integer[])) group by x, c order by x",
      { replacements: { ops_id: ops_id, started_at: started_at, finished_at: finished_at },  type: dbService.QueryTypes.SELECT });
  }
  if(mode=='byDay') {
  return dbService.query("select x, c, sum(y1) as y1, sum(y2) as y2 from sd.order_sales_yd_amount_gb_day_trader_all where x>=:started_at and x<=:finished_at and ops_id in (select unnest('{:ops_id}'::integer[])) group by x, c order by x",
      { replacements: { ops_id: ops_id, started_at: started_at, finished_at: finished_at },  type: dbService.QueryTypes.SELECT });
  }
}, 

// sd.order_sales_yd_amount_gb_month_trader
// select ops_id, to_char(started_at, 'yyyy') as term, to_char(started_at, 'yyyyMM') as x, trader_code as c, sum(amount) as y1, count(distinct trader_name) as y2 from sd.order_sales_ext_kh where deleted_at is null and reflection_id in (1, 2) and cat1st = 'A2' group by ops_id, to_char(started_at, 'yyyy'), to_char(started_at, 'yyyyMM'), trader_code

// sd.order_sales_yd_amount_gb_day_trader
// select ops_id, to_char(started_at, 'yyyyMM') as term, to_char(started_at, 'yyyy-mm-dd') as x, trader_code as c, sum(amount) as y1, count(distinct trader_name) as y2 from sd.order_sales_ext_kh where deleted_at is null and reflection_id in (1, 2) and cat1st = 'A2' group by ops_id, to_char(started_at, 'yyyyMM'), to_char(started_at, 'yyyy-mm-dd'), trader_code

// sd.order_sales_ext_kh where deleted_at is null and reflection_id in (1, 2) and cat1st = 'A2'


sales_yd_amount_range_gb_depart_dest_all: (obj, {ops_id, mode, started_at, finished_at}, context, info) => {
  if(mode=='byMonth') {
  return dbService.query("select c, sum(y) as y from sd.order_sales_yd_amount_gb_month_service_all where x>=:started_at and x<=:finished_at and ops_id in (select unnest('{:ops_id}'::integer[])) group by c order by y desc limit 10",
      { replacements: { ops_id: ops_id, started_at: started_at, finished_at: finished_at },  type: dbService.QueryTypes.SELECT });
  }
  if(mode=='byDay') {
  return dbService.query("select c, sum(y) as y from sd.order_sales_yd_amount_gb_day_service_all where x>=:started_at and x<=:finished_at and ops_id in (select unnest('{:ops_id}'::integer[])) group by c order by y desc limit 10",
      { replacements: { ops_id: ops_id, started_at: started_at, finished_at: finished_at },  type: dbService.QueryTypes.SELECT });
  }
}, 

// sd.order_sales_yd_amount_gb_month_service_all
/*
select ops_id, to_char(started_at, 'yyyy') as term, to_char(started_at, 'yyyyMM') as x, service_no as c, sum(amount) as y 
from sd.order_sales_ext_kh_all where deleted_at is null and reflection_id in (1, 2) and cat1st = 'A2' and service_no is not null group by ops_id, to_char(started_at, 'yyyy'), to_char(started_at, 'yyyyMM'), service_no

sd.order_sales_yd_amount_gb_day_service_all
select ops_id, to_char(started_at, 'yyyyMM') as term, to_char(started_at, 'yyyy-mm-dd') as x, service_no as c, sum(amount) as y 
from sd.order_sales_ext_kh_all where deleted_at is null and reflection_id in (1, 2) and cat1st = 'A2' and service_no is not null group by ops_id, to_char(started_at, 'yyyyMM'), to_char(started_at, 'yyyy-mm-dd'), service_no
*/

// service_no as c
// sd.order_sales_ext_kh where deleted_at is null and reflection_id in (1, 2) and cat1st = 'A2'

sales_yd_amount_range_gb_tradername_all: (obj, {ops_id, mode, started_at, finished_at}, context, info) => {
  if(mode=='byMonth') {
  return dbService.query("select c, sum(y) as y from sd.order_sales_yd_amount_gb_month_tradername_all where x>=:started_at and x<=:finished_at and ops_id in (select unnest('{:ops_id}'::integer[])) group by c order by y desc limit 10",
      { replacements: { ops_id: ops_id, started_at: started_at, finished_at: finished_at },  type: dbService.QueryTypes.SELECT });
  }
  if(mode=='byDay') {
  return dbService.query("select c, sum(y) as y from sd.order_sales_yd_amount_gb_day_tradername_all where x>=:started_at and x<=:finished_at and ops_id in (select unnest('{:ops_id}'::integer[])) group by c order by y desc limit 10",
      { replacements: { ops_id: ops_id, started_at: started_at, finished_at: finished_at },  type: dbService.QueryTypes.SELECT });
  } 
}, 

/*
 sd.order_sales_yd_amount_gb_month_tradername_all
select ops_id, to_char(started_at, 'yyyy') as term, to_char(started_at, 'yyyyMM') as x, trader_name as c, sum(amount) as y 
from sd.order_sales_ext_kh_all where deleted_at is null and reflection_id in (1, 2) and cat1st = 'A2' group by ops_id, to_char(started_at, 'yyyy'), to_char(started_at, 'yyyyMM'), trader_name

 sd.order_sales_yd_amount_gb_day_tradername_all
 select ops_id, to_char(started_at, 'yyyyMM') as term, to_char(started_at, 'yyyy-mm-dd') as x, trader_name as c, sum(amount) as y from sd.order_sales_ext_kh_all where deleted_at is null and reflection_id in (1, 2) and cat1st = 'A2' group by ops_id, to_char(started_at, 'yyyyMM'), to_char(started_at, 'yyyy-mm-dd'), trader_name

   sd.order_sales_yd_amount_gb_month_tradername_service_all
select ops_id, to_char(started_at, 'yyyy') as term, to_char(started_at, 'yyyyMM') as x, trader_name as c1, service_no as c2, sum(amount) as y 
from sd.order_sales_ext_kh_all where deleted_at is null and reflection_id in (1, 2) and cat1st = 'A2' group by ops_id, to_char(started_at, 'yyyy'), to_char(started_at, 'yyyyMM'), trader_name, service_no

 sd.order_sales_yd_amount_gb_day_tradername_service_all
 select ops_id, to_char(started_at, 'yyyyMM') as term, to_char(started_at, 'yyyy-mm-dd') as x, trader_name as c1, service_no as c2, sum(amount) as y 
 from sd.order_sales_ext_kh_all where deleted_at is null and reflection_id in (1, 2) and cat1st = 'A2' group by ops_id, to_char(started_at, 'yyyyMM'), to_char(started_at, 'yyyy-mm-dd'), trader_name, service_no
 
 */
// service_no as c
// sd.order_sales_ext_kh where deleted_at is null and reflection_id in (1, 2) and cat1st = 'A2'

// for level 2 breakdown

sales_yd_amount_tradername_gb_range_all: (obj, {ops_id, mode, started_at, finished_at, trader_name}, context, info) => {
  if(mode=='byMonth') {
  return dbService.query("select x, sum(y) as y from sd.order_sales_yd_amount_gb_month_tradername_service_all where c1=:trader_name and x>=:started_at and x<=:finished_at and ops_id in (select unnest('{:ops_id}'::integer[])) group by x order by x",
      { replacements: { ops_id: ops_id, started_at: started_at, finished_at: finished_at, trader_name: trader_name },  type: dbService.QueryTypes.SELECT });
  }
  if(mode=='byDay') {
  return dbService.query("select x, sum(y) as y from sd.order_sales_yd_amount_gb_day_tradername_service_all where c1=:trader_name and x>=:started_at and x<=:finished_at and ops_id in (select unnest('{:ops_id}'::integer[])) group by x order by x",
      { replacements: { ops_id: ops_id, started_at: started_at, finished_at: finished_at, trader_name: trader_name },  type: dbService.QueryTypes.SELECT });
  } 
}, 

sales_yd_amount_tradername_range_gb_service_all: (obj, {ops_id, mode, started_at, finished_at, trader_name}, context, info) => {
  if(mode=='byMonth') {
  return dbService.query("select c2 as c, sum(y) as y from sd.order_sales_yd_amount_gb_month_tradername_service_all where c1=:trader_name and x>=:started_at and x<=:finished_at and ops_id in (select unnest('{:ops_id}'::integer[])) group by c2 order by y desc limit 15",
      { replacements: { ops_id: ops_id, started_at: started_at, finished_at: finished_at, trader_name: trader_name },  type: dbService.QueryTypes.SELECT });
  }
  if(mode=='byDay') {
  return dbService.query("select c2 as c, sum(y) as y from sd.order_sales_yd_amount_gb_day_tradername_service_all where c1=:trader_name and x>=:started_at and x<=:finished_at and ops_id in (select unnest('{:ops_id}'::integer[])) group by c2 order by y desc limit 15",
      { replacements: { ops_id: ops_id, started_at: started_at, finished_at: finished_at, trader_name: trader_name },  type: dbService.QueryTypes.SELECT });
  } 
}, 

sales_yd_amount_service_gb_range_all: (obj, {ops_id, mode, started_at, finished_at, service_no}, context, info) => {
  if(mode=='byMonth') {
  return dbService.query("select x, sum(y) as y from sd.order_sales_yd_amount_gb_month_tradername_service_all where c2=:service_no and x>=:started_at and x<=:finished_at and ops_id in (select unnest('{:ops_id}'::integer[])) group by x order by x",
      { replacements: { ops_id: ops_id, started_at: started_at, finished_at: finished_at, service_no: service_no },  type: dbService.QueryTypes.SELECT });
  }
  if(mode=='byDay') {
  return dbService.query("select x, sum(y) as y from sd.order_sales_yd_amount_gb_day_tradername_service_all where c2=:service_no and x>=:started_at and x<=:finished_at and ops_id in (select unnest('{:ops_id}'::integer[])) group by x order by x",
      { replacements: { ops_id: ops_id, started_at: started_at, finished_at: finished_at, service_no: service_no },  type: dbService.QueryTypes.SELECT });
  } 
}, 

sales_yd_amount_service_range_gb_tradername_all: (obj, {ops_id, mode, started_at, finished_at, service_no}, context, info) => {
  if(mode=='byMonth') {
  return dbService.query("select c1 as c, sum(y) as y from sd.order_sales_yd_amount_gb_month_tradername_service_all where c2=:service_no and x>=:started_at and x<=:finished_at and ops_id in (select unnest('{:ops_id}'::integer[])) group by c1 order by y desc limit 15",
      { replacements: { ops_id: ops_id, started_at: started_at, finished_at: finished_at, service_no: service_no },  type: dbService.QueryTypes.SELECT });
  }
  if(mode=='byDay') {
  return dbService.query("select c1 as c, sum(y) as y from sd.order_sales_yd_amount_gb_day_tradername_service_all where c2=:service_no and x>=:started_at and x<=:finished_at and ops_id in (select unnest('{:ops_id}'::integer[])) group by c1 order by y desc limit 15",
      { replacements: { ops_id: ops_id, started_at: started_at, finished_at: finished_at, service_no: service_no },  type: dbService.QueryTypes.SELECT });
  } 
}, 


depart_count_in_cm_gb_day_all: (obj, {ops_id}, context, info) => {
  return dbService.query("select to_char(started_at, 'yyyy-mm-dd') as x, count(1) as y from sd.order_ops_depart_all where deleted_at is null and type='linehaul' and to_char(started_at, 'yyyyMM')=to_char(now(), 'yyyyMM') and ops_id in (select unnest('{:ops_id}'::integer[])) group by to_char(started_at, 'yyyy-mm-dd') order by to_char(started_at, 'yyyy-mm-dd')",
      { replacements: { ops_id: ops_id },  type: dbService.QueryTypes.SELECT });
}, 

order_sales_ops_details: (obj, {order_id}, context, info) => {
  return dbService.query("select * from sd.order_sales_ops_details_all where order_id = :order_id order by time_at",
      { replacements: { order_id: order_id },  type: dbService.QueryTypes.SELECT });
}, 
/*
ac6001_in_cm_gb_day: (obj, {ops_id}, context, info) => {
  return dbService.query("select to_char(started_at, 'yyyy-mm-dd') as x, sum(amount) as y from fi.entry where account_no = '6001' and to_char(started_at, 'yyyyMM')=to_char(now(), 'yyyyMM') and ops_id in (select unnest('{:ops_id}'::integer[])) group by to_char(started_at, 'yyyy-mm-dd') order by to_char(started_at, 'yyyy-mm-dd')", 
      { replacements: { ops_id: ops_id },  type: dbService.QueryTypes.SELECT });
}, 

ac6001_in_cy_gb_month: (obj, {ops_id}, context, info) => {
  return dbService.query("select to_char(started_at, 'yyyy-mm') as x, sum(amount) as y from fi.entry where account_no = '6001' and to_char(started_at, 'yyyy')=to_char((now()-interval'30 d'), 'yyyy') and ops_id in (select unnest('{:ops_id}'::integer[])) group by to_char(started_at, 'yyyy-mm') order by to_char(started_at, 'yyyy-mm')", 
      { replacements: { ops_id: ops_id },  type: dbService.QueryTypes.SELECT });
}, 

ac4103_in_cm_gb_day: (obj, {ops_id}, context, info) => {
  return dbService.query("select to_char(started_at, 'yyyy-mm-dd') as x, sum(amount_sumup) as y from fi.entry where account_no in ('6001', '6401') and to_char(started_at, 'yyyyMM')=to_char(now(), 'yyyyMM') and ops_id in (select unnest('{:ops_id}'::integer[])) group by to_char(started_at, 'yyyy-mm-dd') order by to_char(started_at, 'yyyy-mm-dd')", 
      { replacements: { ops_id: ops_id },  type: dbService.QueryTypes.SELECT });
}, 

ac4103_in_cy_gb_month: (obj, {ops_id}, context, info) => {
  return dbService.query("select to_char(started_at, 'yyyy-mm') as x, sum(amount_sumup) as y from fi.entry where account_no in ('6001', '6401') and to_char(started_at, 'yyyy')=to_char((now()-interval'30 d'), 'yyyy') and ops_id in (select unnest('{:ops_id}'::integer[])) group by to_char(started_at, 'yyyy-mm') order by to_char(started_at, 'yyyy-mm')", 
      { replacements: { ops_id: ops_id },  type: dbService.QueryTypes.SELECT });
}, 

ac6001_range_gb_status: (obj, {ops_id, mode, started_at, finished_at}, context, info) => {
  if(mode=='byMonth') {
  return dbService.query("select to_char(started_at, 'yyyy-mm') as x, case when status = 'default' then '财务未入账' else '财务已入账' end as c, sum(amount) as y from fi.entry where account_no = '6001' and to_char(started_at, 'yyyyMM')>=:started_at and to_char(started_at, 'yyyyMM')<=:finished_at and ops_id in (select unnest('{:ops_id}'::integer[])) group by to_char(started_at, 'yyyy-mm'), status order by to_char(started_at, 'yyyy-mm')", 
      { replacements: { ops_id: ops_id, started_at: started_at, finished_at: finished_at },  type: dbService.QueryTypes.SELECT });
  }
  if(mode=='byDay') {
  return dbService.query("select to_char(started_at, 'yyyy-mm-dd') as x, case when status = 'default' then '财务未入账' else '财务已入账' end as c, sum(amount) as y from fi.entry where account_no = '6001' and to_char(started_at, 'yyyyMMdd')>=:started_at and to_char(started_at, 'yyyyMMdd')<=:finished_at and ops_id in (select unnest('{:ops_id}'::integer[])) group by to_char(started_at, 'yyyy-mm-dd'), status order by to_char(started_at, 'yyyy-mm-dd')", 
      { replacements: { ops_id: ops_id, started_at: started_at, finished_at: finished_at },  type: dbService.QueryTypes.SELECT });
  }
}, 

ac6401_range_gb_status: (obj, {ops_id, mode, started_at, finished_at}, context, info) => {
  if(mode=='byMonth') {
  return dbService.query("select to_char(started_at, 'yyyy-mm') as x, case when status = 'default' then '财务未入账' else '财务已入账' end as c, sum(amount) as y from fi.entry where account_no = '6401' and to_char(started_at, 'yyyyMM')>=:started_at and to_char(started_at, 'yyyyMM')<=:finished_at and ops_id in (select unnest('{:ops_id}'::integer[])) group by to_char(started_at, 'yyyy-mm'), status order by to_char(started_at, 'yyyy-mm')", 
      { replacements: { ops_id: ops_id, started_at: started_at, finished_at: finished_at },  type: dbService.QueryTypes.SELECT });
  }
  if(mode=='byDay') {
  return dbService.query("select to_char(started_at, 'yyyy-mm-dd') as x, case when status = 'default' then '财务未入账' else '财务已入账' end as c, sum(amount) as y from fi.entry where account_no = '6401' and to_char(started_at, 'yyyyMMdd')>=:started_at and to_char(started_at, 'yyyyMMdd')<=:finished_at and ops_id in (select unnest('{:ops_id}'::integer[])) group by to_char(started_at, 'yyyy-mm-dd'), status order by to_char(started_at, 'yyyy-mm-dd')", 
      { replacements: { ops_id: ops_id, started_at: started_at, finished_at: finished_at },  type: dbService.QueryTypes.SELECT });
  }
}, 

ac4103_range_gb_status_ac: (obj, {ops_id, mode, started_at, finished_at}, context, info) => {
  if(mode=='byMonth') {
  return dbService.query("select to_char(started_at, 'yyyy-mm') as x, status as c1, case when status||account_no = 'default6401' then '成本-未入账' when status||account_no = 'success6401' then '成本-已入账' when status||account_no = 'success6001' then '收入-已入账' else '收入-未入账' end as c2, sum(amount) as y from fi.entry where account_no in ('6001', '6401') and to_char(started_at, 'yyyyMM')>=:started_at and to_char(started_at, 'yyyyMM')<=:finished_at and ops_id in (select unnest('{:ops_id}'::integer[])) group by to_char(started_at, 'yyyy-mm'), status, account_no order by to_char(started_at, 'yyyy-mm')", 
      { replacements: { ops_id: ops_id, started_at: started_at, finished_at: finished_at },  type: dbService.QueryTypes.SELECT });
  }
  if(mode=='byDay') {
  return dbService.query("select to_char(started_at, 'yyyy-mm-dd') as x, status as c1, case when status||account_no = 'default6401' then '成本-未入账' when status||account_no = 'success6401' then '成本-已入账' when status||account_no = 'success6001' then '收入-已入账' else '收入-未入账' end as c2, sum(amount) as y from fi.entry where account_no in ('6001', '6401') and to_char(started_at, 'yyyyMMdd')>=:started_at and to_char(started_at, 'yyyyMMdd')<=:finished_at and ops_id in (select unnest('{:ops_id}'::integer[])) group by to_char(started_at, 'yyyy-mm-dd'), status, account_no order by to_char(started_at, 'yyyy-mm-dd')", 
      { replacements: { ops_id: ops_id, started_at: started_at, finished_at: finished_at },  type: dbService.QueryTypes.SELECT });
  }
}, 
*/
};

export { biDefsQueryResolversAll};


