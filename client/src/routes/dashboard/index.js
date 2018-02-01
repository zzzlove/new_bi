import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import IncomeAll from './incomePointByCCAll';
import IncomeKey from './incomePointByCCKey';
import { Collapse, Icon, Card, Button, Popover, Tabs } from 'antd';


const Panel = Collapse.Panel;

import ControlCenterTableLine from '../control_center_kh/ControlCenterTableLine';
import ControlCenterTableCity from '../control_center_kh_city/ControlCenterTableCity';
import ControlCenterTableRegion from '../control_center_kh_city/ControlCenterTableRegion';
//import ControlCenterAlter from './controlCenterAlter';



function Dashboard ({ user }) {

  let {username, fin_code, ops_code, sales_code, fin_code_all, ops_code_all, sales_code_all, product_no_all, service_no_all, control_center_all, company_code, control_center_ids} = user;

      console.log(user);

  return (
    <div>
      <Tabs defaultActiveKey="2">
        <Tabs.TabPane tab="集团与区域" key="1">
           <ControlCenterTableRegion/>
        </Tabs.TabPane>
        <Tabs.TabPane tab="运营城市管理" key="2">
           <ControlCenterTableCity/>
        </Tabs.TabPane>
        <Tabs.TabPane tab="线路报表管理" key="3">
           <ControlCenterTableLine/>
        </Tabs.TabPane>

      </Tabs>
    </div>
  )
}

Dashboard.propTypes = {
  user: PropTypes.object,
}

function mapStateToProps(state) {
  return {
    user: state.app.user
  }
}

export default connect(mapStateToProps)(Dashboard)

/*

import IncomeAllWithCE from './incomeBarchartByCE';
import IncomeComparedwithBudget from './incomeLineAccComparedwithBudget';

      <Panel header="线路分类收入与预算" key="3">
        <ul>
           {control_center_ids.map(d=><li key={d}><IncomeAllWithCE control_center_id={d}/>
           <IncomeComparedwithBudget control_center_id={d}/></li> ) }
        </ul>
      </Panel>

  <ul>
     {control_center_ids.map(d=><li key={d}>{d}  </li> ) }
  </ul>
  </div>
*/
