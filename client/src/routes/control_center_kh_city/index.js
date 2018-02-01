import _ from 'lodash';
import { connect } from 'dva';
import React from 'react';
import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';
import { Table, Spin, Icon, Button, Popconfirm, Row, Col, Card, Badge, Popover, DatePicker, Tabs } from 'antd';
import moment from 'moment';
import 'antd/dist/antd.css'; 

import ControlCenterTableCity from './ControlCenterTableCity';
import ControlCenterTableRegion from './ControlCenterTableRegion';

import ControlCenterActualDailyNeedType from '../control_center_kh/ControlCenterActualDailyNeedType';
import ControlCenterActualMonthlyNeedType from '../control_center_kh/ControlCenterActualMonthlyNeedType';


export default function RenderComponent() {


  return (
     <div>
      <Tabs defaultActiveKey="1">
        <Tabs.TabPane tab="集团与区域" key="1">
           <ControlCenterTableRegion/> 
        </Tabs.TabPane>      
        <Tabs.TabPane tab="运营城市管理" key="2">
           <ControlCenterTableCity/>  
        </Tabs.TabPane>
        <Tabs.TabPane tab="运营城市日数据" key="3">
            <ControlCenterActualDailyNeedType type="city_inc"/>  
        </Tabs.TabPane>
        <Tabs.TabPane tab="运营城市月数据" key="4">
            <ControlCenterActualMonthlyNeedType type="city_inc"/>  
        </Tabs.TabPane>
      </Tabs>
     </div>
    )  

}





