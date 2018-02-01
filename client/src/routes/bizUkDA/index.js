import React, { Component } from 'react';
import { connect } from 'dva';
import { Row, Col, Icon, Card, Tabs, Table, Radio, DatePicker, Tooltip, Menu, Dropdown, Affix, Button, Spin, message, Form, Collapse } from 'antd';
import numeral from 'numeral';
import {
  ChartCard, yuan, MiniArea, MiniBar, MiniProgress, Field, Bar, Pie, TimelineChart,
} from '../../components/Charts';
import Trend from '../../components/Trend';
import NumberInfo from '../../components/NumberInfo';
import { getTimeDistance, formatter } from '../../utils/';
import styles from './Analysis.less';
import { compose, gql, graphql } from 'react-apollo';
const { TabPane } = Tabs;
const { RangePicker, MonthPicker } = DatePicker;
import _ from 'lodash';
import IncomeByTraderCode from './incomeByTraderCode';
import moment from 'moment';
import { routerRedux, Link } from 'dva/router';

const Panel = Collapse.Panel;


import {  Exception } from '../../components';


function RenderComponent({dispatch, user, bizUkDataAnalysis, dataHeader, incomeOverall, }) {
  
  
  if(!user.menu.bizUkDA){
    return (
     <Exception type="403" style={{ minHeight: 500, height: '80%' }} linkElement={Link} />
    )
  }

  
  if (dataHeader.loading||incomeOverall.loading) {
    return (<div><Spin size={'large'} tip={'数据加载中 Loading...'}/></div>)
  }
  if (dataHeader.error) {
    
    if(dataHeader.error.message.indexOf('Network')!=-1){dispatch(routerRedux.push('/login'))}
    
    return message.error(JSON.stringify(dataHeader.error))
  }  
  
  const { sales_uk_all_amount_in_p12m_gb_month, sales_uk_ct_amount_in_p12m_gb_month, sales_uk_uk_amount_in_p12m_gb_month, sales_uk_amount_ytd_gr_year} = dataHeader; 
  const { sales_uk_all_amount_range_gb_bizcode, sales_uk_amount_range_gb_tradername, sales_uk_amount_range_gb_opscode} = incomeOverall; 
  
  const { xType, timeSelectMode, time_started_at, time_finished_at, format_started_at, format_finished_at, incomeTraderNameLevelDownVisible, incomeServiceLevelDownVisible} = bizUkDataAnalysis; 
  



  var amountCurrentMonthTotal = sales_uk_all_amount_in_p12m_gb_month[sales_uk_all_amount_in_p12m_gb_month.length-1].y/10000;
  var termCurrentMonth = sales_uk_all_amount_in_p12m_gb_month[sales_uk_all_amount_in_p12m_gb_month.length-1].x;
  
  var amountLastMonthTotal = sales_uk_all_amount_in_p12m_gb_month[sales_uk_all_amount_in_p12m_gb_month.length-2].y/10000;
  
  var avgComparedToLastMonth = amountLastMonthTotal==0?0:((amountCurrentMonthTotal/amountLastMonthTotal)-1)*100;
  
  var termCurrentYear = sales_uk_amount_ytd_gr_year[sales_uk_amount_ytd_gr_year.length-1].x;
  var termLastYear = sales_uk_amount_ytd_gr_year[0].x;
  
  var amountYtdAllCurrentYear = _.sumBy(_.filter(sales_uk_amount_ytd_gr_year, {x: termCurrentYear}), 'y');
  var amountYtdAllLastYear = _.sumBy(_.filter(sales_uk_amount_ytd_gr_year, {x: termLastYear}), 'y');
  var amountYtdPct = amountYtdAllLastYear?(amountYtdAllCurrentYear/amountYtdAllLastYear-1)*100:0;
  
  var amountYtdCtCurrentYear = _.sumBy(_.filter(sales_uk_amount_ytd_gr_year, {x: termCurrentYear, c: '长途运输'}), 'y');
  var amountYtdCtLastYear = _.sumBy(_.filter(sales_uk_amount_ytd_gr_year, {x: termLastYear, c: '长途运输'}), 'y');
  var amountYtdCtPct = amountYtdCtLastYear?(amountYtdCtCurrentYear/amountYtdCtLastYear-1)*100:0;
  
  var amountYtdUkCurrentYear = _.sumBy(_.filter(sales_uk_amount_ytd_gr_year, {x: termCurrentYear, c: '优卡运输'}), 'y');
  var amountYtdUkLastYear = _.sumBy(_.filter(sales_uk_amount_ytd_gr_year, {x: termLastYear, c: '优卡运输'}), 'y');  
  var amountYtdUkPct = amountYtdUkLastYear?(amountYtdUkCurrentYear/amountYtdUkLastYear-1)*100:0;
  /*
  var indexHightlightLastDay = _.findIndex(sales_yd_amount_in_cm_gb_day, {x: moment().subtract(2, 'days').format('YYYY-MM-DD')});
  var amountHighlightDayLastDay = indexHightlightLastDay==-1?0:sales_yd_amount_in_cm_gb_day[indexHightlightLastDay].y;
  
  //var dateInCurrentMonth = moment().date();
  var dateInCurrentMonth = mgmtDate.date()-1; 
  var dateUsedCalcInCurrentMonth = moment().date()-26;
  //var dateOfLastMonth = moment().subtract(dateInCurrentMonth, 'days').date();
  var dateOfLastMonth = moment().subtract(25, 'days').add(1, 'months').subtract(dateInCurrentMonth+1, 'days').date();
  
  var amountCurrentMonthTotal = _.sumBy(sales_yd_amount_in_cm_gb_day, 'y');
  var indexLastMonth = _.findIndex(sales_yd_amount_in_p12m_gb_month, {x: moment().subtract(dateInCurrentMonth, 'days').format('YYYYMM')});
  var amountLastMonthTotal = indexLastMonth==-1?0:sales_yd_amount_in_p12m_gb_month[indexLastMonth].y;
  

  var amountComparedToLastDay = amountHighlightDayLastDay==0?0:(amountHighlightDay/amountHighlightDayLastDay-1)*100;

  var indexLastYearMonth = _.findIndex(sales_yd_amount_in_p12m_gb_month, {x: moment().subtract(365, 'days').format('YYYYMM')});
  var amountLastYearMonth = indexLastYearMonth==-1?0:sales_yd_amount_in_p12m_gb_month[indexLastYearMonth].y;  
  var dateOfLastYearMonth = moment().subtract(365, 'days').date();
  var avgComparedToLastYearMonth = amountLastYearMonth==0?0:((amountCurrentMonthTotal/dateUsedCalcInCurrentMonth)/(amountLastYearMonth/dateOfLastYearMonth)-1)*100;
  
  var amountYtdCompared = sales_yd_amount_ytd_in_lastyear?(sales_yd_amount_ytd_in_currentyear/sales_yd_amount_ytd_in_lastyear-1)*100:0;
*/
  
    const topColResponsiveProps = {
      xs: 24,
      sm: 12,
      md: 12,
      lg: 12,
      xl: 6,
      style: { marginBottom: 24 },
    };  

   const HeaderCards = () =>   <Row gutter={24}>
          <Col {...topColResponsiveProps}>
            <ChartCard
              bordered={false}
              title={<span>{termCurrentMonth}销售额</span>}
              action={<Tooltip title="含税金额，单位(万元)"><Icon type="info-circle-o" /></Tooltip>}
              total={yuan(amountCurrentMonthTotal)}
              footer={<Field label="上月销售额" value={formatter.money(amountLastMonthTotal, ',')} />}
              contentHeight={46}
            >
              <Trend flag={avgComparedToLastMonth>=0?'up':'down'} style={{ marginRight: 16 }}>
                月环比<span className={styles.trendText}>{avgComparedToLastMonth==0?'数据不存在':<span>{formatter.money(avgComparedToLastMonth, ',', 1)}%</span>}</span>
              </Trend>
            </ChartCard>
          </Col>
          <Col {...topColResponsiveProps}>
            <ChartCard
              bordered={false}
              title={<span>{termCurrentYear}UK销售累计与近12个月趋势</span>}
              action={<Tooltip title="含税金额，单位(万元)"><Icon type="info-circle-o" /></Tooltip>}
              total={yuan(amountYtdUkCurrentYear)}
              footer={
                <div style={{ whiteSpace: 'nowrap', overflow: 'hidden' }}>
                  上年同期累计<span className={styles.trendText}>{formatter.money(amountYtdUkLastYear, ',')}</span>&nbsp;&nbsp;
                  <Trend flag={amountYtdUkPct>0?'up':'down'} style={{ marginRight: 16 }}> 
                   年累计同比<span className={styles.trendText}>{formatter.money(amountYtdUkPct, ',')}%</span>
                  </Trend>
                </div>
              }
              contentHeight={46}
            >
              <MiniBar
                height={46}
                color="#975FE4"
                data={sales_uk_uk_amount_in_p12m_gb_month}
              />
            </ChartCard>
          </Col>
          <Col {...topColResponsiveProps}>
            <ChartCard
              bordered={false}
              title={<span>{termCurrentYear}长途销售累计与近12个月趋势</span>}
              action={<Tooltip title="含税金额，单位(万元)"><Icon type="info-circle-o" /></Tooltip>}
              total={yuan(amountYtdUkCurrentYear)}
              footer={
                <div style={{ whiteSpace: 'nowrap', overflow: 'hidden' }}>
                  上年同期累计<span className={styles.trendText}>{formatter.money(amountYtdCtLastYear, ',')}</span>&nbsp;&nbsp;
                  <Trend flag={amountYtdCtPct>0?'up':'down'} style={{ marginRight: 16 }}> 
                   年累计同比<span className={styles.trendText}>{formatter.money(amountYtdCtPct, ',')}%</span>
                  </Trend>
                </div>
              }
              contentHeight={46}
            >
              <MiniBar
                color="#8EE0A1"
                height={46}
                data={sales_uk_ct_amount_in_p12m_gb_month}
              />
            </ChartCard>

          </Col>
          <Col {...topColResponsiveProps}>
            <ChartCard
              bordered={false}
              title={<span>{termCurrentYear}UK整体累计与近12个月趋势</span>}
              action={<Tooltip title="含税金额，单位(万元)"><Icon type="info-circle-o" /></Tooltip>}
              total={yuan(amountYtdAllCurrentYear)}
              footer={
                <div style={{ whiteSpace: 'nowrap', overflow: 'hidden' }}>
                  上年同期累计<span className={styles.trendText}>{formatter.money(amountYtdAllLastYear, ',')}</span>&nbsp;&nbsp;
                  <Trend flag={amountYtdPct>0?'up':'down'} style={{ marginRight: 16 }}> 
                   年累计同比<span className={styles.trendText}>{formatter.money(amountYtdPct, ',')}%</span>
                  </Trend>
                </div>
              }
              contentHeight={46}
            >
              <MiniBar
                height={46}
                data={sales_uk_all_amount_in_p12m_gb_month}
              />
            </ChartCard>
          </Col>
        </Row> ;

       
   const SalesRank = () =>   <div className={styles.salesRank}>

          <Tabs size="small">
            <Tabs.TabPane tab="城市前15排名" key="service">
              <ul className={styles.rankingList}>
                {
                  sales_uk_amount_range_gb_opscode.map((item, i) => (
                    <li key={item.c}>
                      <span className={(i < 3) && styles.active}>{i + 1}</span>
                      <a >{item.c}</a>
                      <span>{numeral(item.y).format('0,0')}</span>
                    </li>
                  ))
                }
              </ul>
            </Tabs.TabPane>
            <Tabs.TabPane tab="客户销售前15排名" key="trader">
              <ul className={styles.rankingList}>
                {
                  sales_uk_amount_range_gb_tradername.map((item, i) => (
                    <li key={item.c}>
                      <span className={(i < 3) && styles.active}>{i + 1}</span>
                      <a >{item.c}</a>
                      <span>{numeral(item.y).format('0,0')}</span>
                    </li>
                  ))
                }
              </ul>
            </Tabs.TabPane>
          </Tabs>
        </div>;

        
    function handleSalesExtraOk(){
     dispatch({
         type: 'bizUkDataAnalysis/setDetails',  
         payload: {xType: timeSelectMode=='byDay'?'time':'cat', incomeDaFetchProp: {mode: timeSelectMode, started_at: format_started_at, finished_at: format_finished_at}}, 
         })     
    }    

    function handletimeSelectModeChange(e){
      if(e.target.value=='byMonth'){
        dispatch({type: 'bizUkDataAnalysis/setDetails',  payload: {timeSelectMode: e.target.value, format_started_at: time_started_at.format('YYYYMM'), format_finished_at: time_finished_at.format('YYYYMM')}, })
      }
      if(e.target.value=='byDay'){
        dispatch({type: 'bizUkDataAnalysis/setDetails',  payload: {timeSelectMode: e.target.value, format_started_at: time_started_at.format('YYYYMMDD'), format_finished_at: time_finished_at.format('YYYYMMDD')}, })
      }
    }    

    //          <Radio.Button value="byDay">按日</Radio.Button>
    const SalesExtraDay = (<div>
        <Radio.Group defaultValue={timeSelectMode} style={{marginRight: 10}} onChange={handletimeSelectModeChange}>

          <Radio.Button value="byMonth">按月</Radio.Button>
        </Radio.Group>
        <DatePicker allowClear={false} placeholder="开始日期" value={time_started_at} style={{ marginRight: 10, width: 120 }} 
          onChange={(value)=>dispatch({type: 'bizUkDataAnalysis/setDetails',  payload: {time_started_at: value, format_started_at: moment(value).format('YYYYMMDD')}, })}
          disabledDate={(value)=>{if (!time_finished_at || !value) { return false; }  return value.valueOf() > time_finished_at.valueOf();}}
         />
        <DatePicker allowClear={false} placeholder="结束日期" value={time_finished_at} style={{ marginRight: 10, width: 120 }} 
          onChange={(value)=>dispatch({type: 'bizUkDataAnalysis/setDetails',  payload: {time_finished_at: value, format_finished_at: moment(value).format('YYYYMMDD')}, })}
          disabledDate={(value)=>{if (!time_started_at || !value) { return false; }; return value.valueOf() < time_started_at.valueOf();}}
          />
        <Button type="primary" onClick={handleSalesExtraOk}>确定</Button>
      </div>);
      
    const SalesExtraMonth = (<div>
        <Radio.Group defaultValue={timeSelectMode} style={{marginRight: 10}}>
          <Radio.Button value="byMonth">按月</Radio.Button>
        </Radio.Group>
        <MonthPicker allowClear={false} placeholder="开始月份" value={time_started_at} style={{ marginRight: 10, width: 120 }} 
          onChange={(value)=>dispatch({type: 'bizUkDataAnalysis/setDetails',  payload: {time_started_at: value, format_started_at: moment(value).format('YYYYMM')}, })}
          disabledDate={(value)=>{if (!time_finished_at || !value) { return false; }  return value.valueOf() > time_finished_at.valueOf();}}
        />
        <MonthPicker allowClear={false} placeholder="结束月份" value={time_finished_at} style={{ marginRight: 10, width: 120 }} 
          onChange={(value)=>dispatch({type: 'bizUkDataAnalysis/setDetails',  payload: {time_finished_at: value, format_finished_at: moment(value).format('YYYYMM')}, })}
          disabledDate={(value)=>{if (!time_started_at || !value) { return false; }  return value.valueOf() < time_started_at.valueOf();}}
        />
        <Button type="primary" onClick={handleSalesExtraOk}>确定</Button>
      </div>);
 

        
    const IncomeAnalysisByTraderCode = () => (
        <Card
          bordered={false}
          bodyStyle={{ padding: 0 }}
          style={{marginBottom: 10}}
        >
          <div className={styles.salesCard}>
            <Tabs size="large" tabBarStyle={{ marginBottom: 24 }} tabBarExtraContent={SalesExtraMonth} >
              <Tabs.TabPane tab={<span>{user.ops_code}产值分析</span>} key="sales">
                <Row>
                  <Col xl={16} lg={12} md={12} sm={24} xs={24}>
                    <div className={styles.salesBar}>
                      <IncomeByTraderCode
                        dataSource={sales_uk_all_amount_range_gb_bizcode}
                        xType={xType}
                      />
                    </div>
                  </Col>
                  <Col xl={8} lg={12} md={12} sm={24} xs={24}>
                    <SalesRank/>
                  </Col>
                </Row>
              </Tabs.TabPane>
            </Tabs>
          </div>
        </Card> 
    )
        
    return (
    <div> 
      {!dataHeader.loading&&<HeaderCards/>}
      {!incomeOverall.loading&&<IncomeAnalysisByTraderCode/>}

    </div>        
    );
}

const HeaderQuery = gql`
query MyQuery($ops_id: [Int!]) {
  sales_uk_all_amount_in_p12m_gb_month(ops_id: $ops_id){x, y}
  sales_uk_ct_amount_in_p12m_gb_month(ops_id: $ops_id){x, y}
  sales_uk_uk_amount_in_p12m_gb_month(ops_id: $ops_id){x, y}
  sales_uk_amount_ytd_gr_year(ops_id: $ops_id){x, c, y}
}
`;



const IncomeOverallQuery = gql`
query MyQuery($ops_id: [Int!], $mode: String!, $started_at: String!, $finished_at: String!) {
  sales_uk_all_amount_range_gb_bizcode(ops_id: $ops_id, mode: $mode, started_at: $started_at, finished_at: $finished_at){x, c, y}
  sales_uk_amount_range_gb_tradername(ops_id: $ops_id, mode: $mode, started_at: $started_at, finished_at: $finished_at){c, y}
  sales_uk_amount_range_gb_opscode(ops_id: $ops_id, mode: $mode, started_at: $started_at, finished_at: $finished_at){c, y}
}
`;



const RenderComponentWithMutations = compose(
  graphql(HeaderQuery, { name: 'dataHeader', options: (props) => {return { variables: { ops_id: props.user.ops_id } }} }),
  graphql(IncomeOverallQuery, { name: 'incomeOverall', options: (props) => {return { variables: { ops_id: props.user.ops_id, ...props.bizUkDataAnalysis.incomeDaFetchProp } }} }),
)(RenderComponent);

function mapStateToProps(state) {
  return {
    bizUkDataAnalysis: state.bizUkDataAnalysis,
    user: state.app.user
  }
}

export default connect(mapStateToProps)(RenderComponentWithMutations);