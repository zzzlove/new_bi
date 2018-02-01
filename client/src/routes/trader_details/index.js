

import React from 'react'
import PropTypes from 'prop-types';

import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import { Collapse, } from 'antd';
const Panel = Collapse.Panel;

import TraderBarline from './TraderBarline';



function TraderDetailsDashboard ({ user, id,  loading }) {

  
  return (
    <TraderBarline profile_id={id}/>
    );
}

function mapStateToProps(state) {
  return {
    user: state.app.user,
    id: state.trader_details.id,
    loading: state.loading.models.trader_details,
  }
}

export default connect(mapStateToProps)(TraderDetailsDashboard)


/*

    <Collapse bordered={false} defaultActiveKey={['1']}>
      <Panel header="线路单程日发车数(便于观察线路往返对流平衡)" key="1">
        <CountBarByServiceNo control_center_id={id}/>    
      </Panel>
      <Panel header="线路日收入及预算对比" key="2">
        <IncomeBarchartByCEAll control_center_id={id}/>
        <IncomeLineAccComparedwithBudget control_center_id={id}/>
        <IncomeLineAvgCompardLastMonth control_center_id={id}/>   
      </Panel>
      <Panel header="客户列表与汇总分析" key="3">
        <TraderTable control_center_id={id}/>
      </Panel>
      <Panel header="车辆列表与汇总分析" key="4">
        <DepartTable control_center_id={id}/>
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

export default ControlCenterKHDashboard;

*/

