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
import IncomeTraderNameLevelDown from './incomeTraderNameLevelDown';
import IncomeServiceLevelDown from './incomeServiceLevelDown';
const Panel = Collapse.Panel;


import MTI001 from './MTI001';
import MTFT01 from './MTFT01';

import MTIE01 from './MTIE01';
import MTOE01 from './MTOE01';

import MTIE01_pct from './MTIE01_pct';
import MTOE01_pct from './MTOE01_pct';

import MTIT01_pct from './MTIT01_pct';
import MTIT01_amount from './MTIT01_amount';
import MTTT01_pct from './MTTT01_pct';
import MTTT01_amount from './MTTT01_amount';

import MTIT02_pct from './MTIT02_pct';
import MTIT02_amount from './MTIT02_amount';
import MTTT02_pct from './MTTT02_pct';
import MTTT02_amount from './MTTT02_amount';


import MFIT01_1 from './MFIT01_1';
import MFIT01_2 from './MFIT01_2';
import MTAC01 from './MTAC01';


import {  Exception } from '../../components';


function RenderComponent({dispatch, user, bizDataAnalysis, dataHeader, incomeOverall, }) {


  if(!user.menu.bizDA){
    return (
     <Exception type="403" style={{ minHeight: 500, height: '80%' }} linkElement={Link} />
    )
  }

  var id = user.ops_id;

  const incomeGr1Prop = {control_center_id: id, type: ['city_inc','line_inc','service_inc','region_inc']};
  const incomeGr2Prop = {control_center_id: id, type: ['city_inc2nd','line_inc2nd','service_inc2nd','region_inc2nd']};

  if (dataHeader.loading||incomeOverall.loading) {
    return (<div><Spin size={'large'} tip={'数据加载中 Loading...'}/></div>)
  }
  if (dataHeader.error) {

    if(dataHeader.error.message.indexOf('Network')!=-1){dispatch(routerRedux.push('/login'))}

    return message.error(JSON.stringify(dataHeader.error))
  }

  const { sales_yd_amount_in_cm_gb_day, sales_yd_amount_in_p12m_gb_month, sales_yd_tradercount_in_p12m_gb_month, sales_yd_tradercount_in_currentyear, sales_yd_tradercount_in_lastyear, sales_yd_amount_ytd_in_currentyear, sales_yd_amount_ytd_in_lastyear} = dataHeader;
  const { sales_yd_amount_range_gb_tradercode_mode, sales_yd_amount_range_gb_depart_dest, sales_yd_amount_range_gb_tradername} = incomeOverall;

  const { xType, timeSelectMode, time_started_at, time_finished_at, format_started_at, format_finished_at, incomeTraderNameLevelDownVisible, incomeServiceLevelDownVisible} = bizDataAnalysis;


  var mgmtDate = moment().subtract(25, 'days').add(1, 'months');




  var indexHightlightDay = _.findIndex(sales_yd_amount_in_cm_gb_day, {x: moment().subtract(1, 'days').format('YYYY-MM-DD')});
  var amountHighlightDay = indexHightlightDay==-1?0:sales_yd_amount_in_cm_gb_day[indexHightlightDay].y;

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

  var avgComparedToLastMonth = amountLastMonthTotal==0?0:((amountCurrentMonthTotal/dateUsedCalcInCurrentMonth)/(amountLastMonthTotal/dateOfLastMonth)-1)*100;
  var amountComparedToLastDay = amountHighlightDayLastDay==0?0:(amountHighlightDay/amountHighlightDayLastDay-1)*100;

  var indexLastYearMonth = _.findIndex(sales_yd_amount_in_p12m_gb_month, {x: moment().subtract(365, 'days').format('YYYYMM')});
  var amountLastYearMonth = indexLastYearMonth==-1?0:sales_yd_amount_in_p12m_gb_month[indexLastYearMonth].y;
  var dateOfLastYearMonth = moment().subtract(365, 'days').date();
  var avgComparedToLastYearMonth = amountLastYearMonth==0?0:((amountCurrentMonthTotal/dateUsedCalcInCurrentMonth)/(amountLastYearMonth/dateOfLastYearMonth)-1)*100;

  var amountYtdCompared = sales_yd_amount_ytd_in_lastyear?(sales_yd_amount_ytd_in_currentyear/sales_yd_amount_ytd_in_lastyear-1)*100:0;


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
              title={<span>{moment().subtract(1, 'days').format('YYYY-MM-DD')}销售额</span>}
              action={<Tooltip title="本月日均不含今天数据"><Icon type="info-circle-o" /></Tooltip>}
              total={yuan(amountHighlightDay)}
              footer={<Field label="本月日均销售额" value={formatter.money(amountCurrentMonthTotal/dateInCurrentMonth, ',')} />}
              contentHeight={46}
            >
              <Trend flag={avgComparedToLastMonth>=0?'up':'down'} style={{ marginRight: 16 }}>
                日均月环比<span className={styles.trendText}>{avgComparedToLastMonth==0?'数据不存在':<span>{formatter.money(avgComparedToLastMonth, ',', 1)}%</span>}</span>
              </Trend>
              <Trend flag={amountComparedToLastDay>=0?'up':'down'}>
                日环比<span className={styles.trendText}>{amountComparedToLastDay==0?'数据不存在':<span>{formatter.money(amountComparedToLastDay, ',', 1)}%</span>}</span>
              </Trend>
            </ChartCard>
          </Col>
          <Col {...topColResponsiveProps}>
            <ChartCard
              bordered={false}
              title="当月日销售趋势与月累计"
              action={<Tooltip title="含税金额"><Icon type="info-circle-o" /></Tooltip>}
              total={yuan(amountCurrentMonthTotal)}
              footer={
                <div style={{ whiteSpace: 'nowrap', overflow: 'hidden' }}>
                  <Trend flag={avgComparedToLastMonth>=0?'up':'down'} style={{ marginRight: 16 }}>
                    日均月环比<span className={styles.trendText}>{avgComparedToLastMonth==0?'数据不存在':<span>{formatter.money(avgComparedToLastMonth, ',', 1)}%</span>}</span>
                  </Trend>
                  <Trend flag={avgComparedToLastYearMonth>=0?'up':'down'}>
                    日均月同比<span className={styles.trendText}>{avgComparedToLastYearMonth==0?'数据不存在':<span>{formatter.money(avgComparedToLastYearMonth, ',', 1)}%</span>}</span>
                  </Trend>
                </div>
              }
              contentHeight={46}
            >
              <MiniArea
                color="#975FE4"
                height={46}
                data={sales_yd_amount_in_cm_gb_day}
              />
            </ChartCard>
          </Col>
          <Col {...topColResponsiveProps}>
            <ChartCard
              bordered={false}
              title={<span>{moment().format('YYYYMM')}客户数与近12个月客户数趋势</span>}
              action={<Tooltip title="包含签约客户与非签约客户，年累计客户数的计算截至到当前时间"><Icon type="info-circle-o" /></Tooltip>}
              total={sales_yd_tradercount_in_p12m_gb_month[sales_yd_tradercount_in_p12m_gb_month.length-1].y}
              footer={
                <div style={{ whiteSpace: 'nowrap', overflow: 'hidden' }}>
                    年累计客户数<span className={styles.trendText}>{sales_yd_tradercount_in_currentyear}</span>&nbsp;&nbsp;
                    上年累计客户数<span className={styles.trendText}>{sales_yd_tradercount_in_lastyear}</span>
                </div>
              }
              contentHeight={46}
            >
              <MiniBar
                color="#8EE0A1"
                height={46}
                data={sales_yd_tradercount_in_p12m_gb_month}
              />
            </ChartCard>

          </Col>
          <Col {...topColResponsiveProps}>
            <ChartCard
              bordered={false}
              title="当年销售累计与近12个月销售趋势"
              action={<Tooltip title="含税金额"><Icon type="info-circle-o" /></Tooltip>}
              total={yuan(sales_yd_amount_ytd_in_currentyear)}
              footer={
                <div style={{ whiteSpace: 'nowrap', overflow: 'hidden' }}>
                  上年同期累计<span className={styles.trendText}>{sales_yd_amount_ytd_in_lastyear?formatter.money(sales_yd_amount_ytd_in_lastyear, ','):'数据不存在'}</span>
                  {sales_yd_amount_ytd_in_lastyear&&<Trend flag={amountYtdCompared>=0?'up':'down'} style={{ marginRight: 16 }}>&nbsp;&nbsp;
                    年累计同比<span className={styles.trendText}>{formatter.money(amountYtdCompared, ',', 1)}%</span>
                  </Trend>}
                </div>
              }
              contentHeight={46}
            >
              <MiniBar
                height={46}
                data={sales_yd_amount_in_p12m_gb_month}
              />
            </ChartCard>
          </Col>
        </Row> ;


   const SalesRank = () =>   <div className={styles.salesRank}>

          <Tabs size="small">
            <Tabs.TabPane tab="线路销售前10排名" key="service">
              <ul className={styles.rankingList}>
                {
                  sales_yd_amount_range_gb_depart_dest.map((item, i) => (
                    <li key={item.c}>
                      <span className={(i < 3) && styles.active}>{i + 1}</span>
                      <a onClick={() => dispatch({type: 'bizDataAnalysis/showServiceDetails', payload: {service_no: item.c}, }) }>{item.c}</a>
                      <span>{numeral(item.y).format('0,0')}</span>
                    </li>
                  ))
                }
              </ul>
            </Tabs.TabPane>
            <Tabs.TabPane tab="客户销售前10排名" key="trader">
              <ul className={styles.rankingList}>
                {
                  sales_yd_amount_range_gb_tradername.map((item, i) => (
                    <li key={item.c}>
                      <span className={(i < 3) && styles.active}>{i + 1}</span>
                      <a onClick={() => dispatch({type: 'bizDataAnalysis/showTraderNameDetails', payload: {trader_name: item.c}, }) }>{item.c}</a>
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
         type: 'bizDataAnalysis/setDetails',
         payload: {xType: timeSelectMode=='byDay'?'time':'cat', incomeDaFetchProp: {mode: timeSelectMode, started_at: format_started_at, finished_at: format_finished_at}},
         })
    }

    function handletimeSelectModeChange(e){
      if(e.target.value=='byMonth'){
        dispatch({type: 'bizDataAnalysis/setDetails',  payload: {timeSelectMode: e.target.value, format_started_at: time_started_at.format('YYYYMM'), format_finished_at: time_finished_at.format('YYYYMM')}, })
      }
      if(e.target.value=='byDay'){
        dispatch({type: 'bizDataAnalysis/setDetails',  payload: {timeSelectMode: e.target.value, format_started_at: time_started_at.format('YYYYMMDD'), format_finished_at: time_finished_at.format('YYYYMMDD')}, })
      }
    }


    const SalesExtraDay = (<div>
        <Radio.Group defaultValue={timeSelectMode} style={{marginRight: 10}} onChange={handletimeSelectModeChange}>
          <Radio.Button value="byDay">按日</Radio.Button>
          <Radio.Button value="byMonth">按月</Radio.Button>
        </Radio.Group>
        <DatePicker allowClear={false} placeholder="开始日期" value={time_started_at} style={{ marginRight: 10, width: 120 }}
          onChange={(value)=>dispatch({type: 'bizDataAnalysis/setDetails',  payload: {time_started_at: value, format_started_at: moment(value).format('YYYYMMDD')}, })}
          disabledDate={(value)=>{if (!time_finished_at || !value) { return false; }  return value.valueOf() > time_finished_at.valueOf();}}
         />
        <DatePicker allowClear={false} placeholder="结束日期" value={time_finished_at} style={{ marginRight: 10, width: 120 }}
          onChange={(value)=>dispatch({type: 'bizDataAnalysis/setDetails',  payload: {time_finished_at: value, format_finished_at: moment(value).format('YYYYMMDD')}, })}
          disabledDate={(value)=>{if (!time_started_at || !value) { return false; }; return value.valueOf() < time_started_at.valueOf();}}
          />
        <Button type="primary" onClick={handleSalesExtraOk}>确定</Button>
      </div>);

    const SalesExtraMonth = (<div>
        <Radio.Group defaultValue={timeSelectMode} style={{marginRight: 10}} onChange={handletimeSelectModeChange}>
          <Radio.Button value="byDay">按日</Radio.Button>
          <Radio.Button value="byMonth">按月</Radio.Button>
        </Radio.Group>
        <MonthPicker allowClear={false} placeholder="开始月份" value={time_started_at} style={{ marginRight: 10, width: 120 }}
          onChange={(value)=>dispatch({type: 'bizDataAnalysis/setDetails',  payload: {time_started_at: value, format_started_at: moment(value).format('YYYYMM')}, })}
          disabledDate={(value)=>{if (!time_finished_at || !value) { return false; }  return value.valueOf() > time_finished_at.valueOf();}}
        />
        <MonthPicker allowClear={false} placeholder="结束月份" value={time_finished_at} style={{ marginRight: 10, width: 120 }}
          onChange={(value)=>dispatch({type: 'bizDataAnalysis/setDetails',  payload: {time_finished_at: value, format_finished_at: moment(value).format('YYYYMM')}, })}
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
            <Tabs size="large" tabBarStyle={{ marginBottom: 24 }} tabBarExtraContent={timeSelectMode=='byDay'?SalesExtraDay:SalesExtraMonth} >
              <Tabs.TabPane tab={<span>{user.ops_code}产值分析</span>} key="sales">
                <Row>
                  <Col xl={16} lg={12} md={12} sm={24} xs={24}>
                    <div className={styles.salesBar}>
                      <IncomeByTraderCode
                        dataSource={sales_yd_amount_range_gb_tradercode_mode}
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
      {incomeTraderNameLevelDownVisible&&<IncomeTraderNameLevelDown/>}
      {incomeServiceLevelDownVisible&&<IncomeServiceLevelDown/>}
    <Collapse bordered={false} >
      <Panel header="月整体产值与相关基本信息" key="1">
        <Row gutter={24} >
          <Col lg={12} md={24}>
            <Card bordered={false} >
                <MTI001 control_center_id={id}/>
             </Card>
          </Col>
          <Col lg={12} md={24}>
            <Card bordered={false} >
               <MTFT01 control_center_id={id}/>
            </Card>
          </Col>
        </Row>
      </Panel>
      <Panel header="月分类产值[按定挂 甩挂 外雇]" key="2">
        <Row gutter={24} >
          <Col lg={12} md={24}>
            <Card bordered={false} >
                <MTIE01 {...incomeGr1Prop}/>
             </Card>
          </Col>
          <Col lg={12} md={24}>
            <Card bordered={false} >
               <MTIE01_pct {...incomeGr1Prop}/>
            </Card>
          </Col>
        </Row>
        <Row gutter={24} >
          <Col lg={12} md={24}>
            <Card bordered={false} >
                <MTOE01 {...incomeGr1Prop}/>
             </Card>
          </Col>
          <Col lg={12} md={24}>
            <Card bordered={false} >
               <MTOE01_pct {...incomeGr1Prop}/>
            </Card>
          </Col>
        </Row>
      </Panel>
      <Panel header="月分类产值[按A0 A1 A2]"  key="3">
        <Row gutter={24} >
          <Col lg={12} md={24}>
            <Card bordered={false} >
                <MTIE01 {...incomeGr2Prop}/>
             </Card>
          </Col>
          <Col lg={12} md={24}>
            <Card bordered={false} >
               <MTIE01_pct {...incomeGr2Prop}/>
            </Card>
          </Col>
        </Row>
        <Row gutter={24} >
          <Col lg={12} md={24}>
            <Card bordered={false} >
                <MTOE01 {...incomeGr2Prop}/>
             </Card>
          </Col>
          <Col lg={12} md={24}>
            <Card bordered={false} >
               <MTOE01_pct {...incomeGr2Prop}/>
            </Card>
          </Col>
        </Row>
      </Panel>
      <Panel header="客户分析[非外雇]" key="4">
        <Row gutter={24} >
          <Col lg={12} md={24}>
            <Card bordered={false} >
                <MTIT01_amount control_center_id={id}/>
             </Card>
          </Col>
          <Col lg={12} md={24}>
            <Card bordered={false} >
               <MTIT01_pct control_center_id={id}/>
            </Card>
          </Col>
        </Row>
        <Row gutter={24} >
          <Col lg={12} md={24}>
            <Card bordered={false} >
                <MTTT01_amount control_center_id={id}/>
             </Card>
          </Col>
          <Col lg={12} md={24}>
            <Card bordered={false} >
               <MTTT01_pct control_center_id={id}/>
            </Card>
          </Col>
        </Row>
        <Row gutter={24} >
          <Col lg={12} md={24}>
            <Card bordered={false} >
                <MTIT02_amount control_center_id={id}/>
             </Card>
          </Col>
          <Col lg={12} md={24}>
            <Card bordered={false} >
               <MTIT02_pct control_center_id={id}/>
            </Card>
          </Col>
        </Row>
        <Row gutter={24} >
          <Col lg={12} md={24}>
            <Card bordered={false} >
                <MTTT02_amount control_center_id={id}/>
             </Card>
          </Col>
          <Col lg={12} md={24}>
            <Card bordered={false} >
               <MTTT02_pct control_center_id={id}/>
            </Card>
          </Col>
        </Row>
        <Row gutter={24} >
            <Card bordered={false} >
               <MTAC01 control_center_id={id} />
            </Card>
        </Row>
        </Panel>
    </Collapse>
    </div>
    );
}

const HeaderQuery = gql`
query MyQuery($ops_id: [Int!]) {
  sales_yd_amount_in_cm_gb_day:sales_yd_amount_in_cm_gb_day_all(ops_id: $ops_id){x, y}
  sales_yd_amount_in_p12m_gb_month:sales_yd_amount_in_p12m_gb_month_all(ops_id: $ops_id){x, y}
  sales_yd_tradercount_in_p12m_gb_month:sales_yd_tradercount_in_p12m_gb_month_all(ops_id: $ops_id){x, y}
  sales_yd_tradercount_in_currentyear:sales_yd_tradercount_in_currentyear_all(ops_id: $ops_id)
  sales_yd_tradercount_in_lastyear:sales_yd_tradercount_in_lastyear_all(ops_id: $ops_id)
  sales_yd_amount_ytd_in_currentyear:sales_yd_amount_ytd_in_currentyear_all(ops_id: $ops_id)
  sales_yd_amount_ytd_in_lastyear:sales_yd_amount_ytd_in_lastyear_all(ops_id: $ops_id)
}
`;



const IncomeOverallQuery = gql`
query MyQuery($ops_id: [Int!], $mode: String!, $started_at: String!, $finished_at: String!) {
  sales_yd_amount_range_gb_depart_dest:sales_yd_amount_range_gb_depart_dest_all(ops_id: $ops_id, mode: $mode, started_at: $started_at, finished_at: $finished_at){c, y}
  sales_yd_amount_range_gb_tradername:sales_yd_amount_range_gb_tradername_all(ops_id: $ops_id, mode: $mode, started_at: $started_at, finished_at: $finished_at){c, y}
  sales_yd_amount_range_gb_tradercode_mode:sales_yd_amount_range_gb_tradercode_mode_all(ops_id: $ops_id, mode: $mode, started_at: $started_at, finished_at: $finished_at){x,c,y1, y2}
}
`;



const RenderComponentWithMutations = compose(
  graphql(HeaderQuery, { name: 'dataHeader', options: (props) => {return { variables: { ops_id: props.user.ops_id } }} }),
  graphql(IncomeOverallQuery, { name: 'incomeOverall', options: (props) => {return { variables: { ops_id: props.user.ops_id, ...props.bizDataAnalysis.incomeDaFetchProp } }} }),
)(RenderComponent);

function mapStateToProps(state) {
  return {
    bizDataAnalysis: state.bizDataAnalysis,
    user: state.app.user
  }
}

export default connect(mapStateToProps)(RenderComponentWithMutations);
