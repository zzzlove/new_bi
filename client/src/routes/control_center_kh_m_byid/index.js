

import React from 'react'
import PropTypes from 'prop-types';

import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import { Collapse, } from 'antd';
const Panel = Collapse.Panel;
import IncomeBarCE from './IncomeBarCE';
import TraderBarline from './TraderBarline';
import TraderPointGr1 from './TraderPointGr1';
import TraderPointGr2 from './TraderPointGr2';
import TradingFreqLast1M from './TradingFreqLast1M';
import TradingFreqLast2M from './TradingFreqLast2M';
import TradingFreqLast3M from './TradingFreqLast3M';

function ControlCenterKHMonthDashboard ({ user, id,  loading }) {

  
  return (
    <Collapse bordered={false} defaultActiveKey={['1']}>
      <Panel header="月收入/客户数/交易频率总览" key="1">
        <IncomeBarCE control_center_id={id}/> 
        <TraderBarline control_center_id={id}/>        
      </Panel>
      <Panel header="客户活跃度的趋势" key="2">
        <TraderPointGr1 control_center_id={id}/>
      </Panel>
      <Panel header="客户首次交易后趋势(按首次交易时间分类)" key="3">
        <TraderPointGr2 control_center_id={id}/>        
      </Panel>
      <Panel header="近3个月客户交易频率的分析" key="4">
        <TradingFreqLast1M control_center_id={id}/>  
        <TradingFreqLast2M control_center_id={id}/>  
        <TradingFreqLast3M control_center_id={id}/>  
      </Panel>
    </Collapse>
    );
}

function mapStateToProps(state) {
  return {
    user: state.app.user,
    id: state.control_center_kh_m_byid.id,
    loading: state.loading.models.control_center_kh_m_byid,
  }
}

export default connect(mapStateToProps)(ControlCenterKHMonthDashboard)


/*

    <Collapse bordered={false} defaultActiveKey={['1']}>
      <Panel header="线路单程日发车数(便于观察线路往返对流平衡)" key="1">
        <CountBarByServiceNo control_center_id={45}/>    
      </Panel>
      <Panel header="线路日收入及预算对比" key="2">
        <IncomeBarchartByCEAll control_center_id={45}/>
        <IncomeLineAccComparedwithBudget control_center_id={45}/>
        <IncomeLineAvgCompardLastMonth control_center_id={45}/>   
      </Panel>

    </Collapse>

function mapStateToProps(state) {
  return {
    user: state.app.user,
    id: state.control_center_kh_byid.id,
    loading: state.loading.models.control_center_kh_byid,
  }
}

export default connect(mapStateToProps)(ControlCenterKHMonthDashboard)

export default ControlCenterKHMonthDashboard;

*/

