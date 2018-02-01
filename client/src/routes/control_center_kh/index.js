import _ from 'lodash';
import { connect } from 'dva';
import React from 'react';
import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';
import { Table, Spin, Icon, Button, Popconfirm, Row, Col, Card, Badge, Popover, DatePicker, Tabs } from 'antd';
import moment from 'moment';
import 'antd/dist/antd.css'; 

import ControlCenterTableLine from './ControlCenterTableLine';
import ControlCenterActualDailyNeedType from './ControlCenterActualDailyNeedType';
import ControlCenterActualMonthlyNeedType from './ControlCenterActualMonthlyNeedType';



export default function RenderComponent() {


  return (
     <div>
           <ControlCenterTableLine/>  
     </div>
    )  

}

/*
      <Tabs defaultActiveKey="1">
        <Tabs.TabPane tab="线路报表管理" key="1">
           <ControlCenterTableLine/>  
        </Tabs.TabPane>
        <Tabs.TabPane tab="线路(往返)月数据" key="2">
            <ControlCenterActualMonthlyNeedType type="line_inc"/>  
        </Tabs.TabPane>
        <Tabs.TabPane tab="线路(往返)日数据" key="3">
            <ControlCenterActualDailyNeedType type="line_inc"/>  
        </Tabs.TabPane>
        <Tabs.TabPane tab="线路(单边)月数据" key="4">
            <ControlCenterActualMonthlyNeedType type="service_inc"/>  
        </Tabs.TabPane>
        <Tabs.TabPane tab="线路(单边)日数据" key="5">
            <ControlCenterActualDailyNeedType type="service_inc"/>  
        </Tabs.TabPane>
      </Tabs>
*/



