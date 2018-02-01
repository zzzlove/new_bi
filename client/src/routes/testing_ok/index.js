

import React from 'react'
import PropTypes from 'prop-types';

import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import { Collapse, } from 'antd';
const Panel = Collapse.Panel;

import IncomeBarchartByCEAll from './incomeBarchartByCEAll';
import IncomeLineAccComparedwithBudget from './incomeLineAccComparedwithBudget';
import CountBarByServiceNo from './countBarByServiceNo';
import IncomeLineAvgCompardLastMonth from './incomeLineAvgCompardLastMonth';
import TraderTable from './TraderTable';



function ControlCenterKHDashboard ({ user, id,  loading }) {

  
  return (
    <Collapse bordered={false} defaultActiveKey={['1']}>
      <Panel header="线路单程日发车数(便于观察线路往返对流平衡)" key="1">
        <CountBarByServiceNo control_center_id={45}/>    
      </Panel>
      <Panel header="线路日收入及预算对比" key="2">
        <IncomeBarchartByCEAll control_center_id={45}/>
        <IncomeLineAccComparedwithBudget control_center_id={45}/>
        <IncomeLineAvgCompardLastMonth control_center_id={45}/>   
      </Panel>
      <Panel header="客户列表与汇总分析" key="3">
        <TraderTable control_center_id={45}/>
      </Panel>
    </Collapse>
    );
}


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

export default connect(mapStateToProps)(ControlCenterKHDashboard)

*/

export default ControlCenterKHDashboard;