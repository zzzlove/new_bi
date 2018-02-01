
import config from '../../../utils/config';
import React from 'react'
import PropTypes from 'prop-types';

import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import { Collapse, Row, Col, Card, Icon} from 'antd';
const Panel = Collapse.Panel;


import MTI001 from './MTI001';
import MTFT01 from './MTFT01';

import MTIE01 from './MTIE01';
import MTOE01 from './MTOE01';

import MTIE01_pct from './MTIE01_pct';
import MTOE01_pct from './MTOE01_pct';

import MTIE01_A2 from './MTIE01_A2';
import MTOE01_A2 from './MTOE01_A2';

import MTIE01_pct_A2 from './MTIE01_pct_A2';
import MTOE01_pct_A2 from './MTOE01_pct_A2';

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


function RenderComponent ({ user, id,  loading }) {

  const incomeGr1Prop = {control_center_id: id, type: ['city_inc','line_inc','service_inc','region_inc']};
  const incomeGr2Prop = {control_center_id: id, type: ['city_inc2nd','line_inc2nd','service_inc2nd','region_inc2nd']};
  
  var ControlA0A1Show = user.roles.indexOf('admin')!=-1 || user.roles.indexOf('kh_admin')!=-1 || user.roles.indexOf('headoffice_kh')!=-1;
  
  console.log(ControlA0A1Show);

  return (

    <Collapse bordered={false} defaultActiveKey={['1']}>
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
      {ControlA0A1Show&&<Panel header="月分类产值[按A0 A1 A2]"  style={{display:config.isHiddenA012}} key="3">
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
      </Panel>}
      {!ControlA0A1Show&&<Panel header="月分类产值[A2]"  style={{display:config.isHiddenA012}} key="3">
        <Row gutter={24}>
          <Col lg={12} md={24}>
            <Card bordered={false} >
                <MTIE01_A2 {...incomeGr2Prop}/>
             </Card>
          </Col>
          <Col lg={12} md={24}>
            <Card bordered={false} >
                <MTOE01_A2 {...incomeGr2Prop}/>
             </Card>
          </Col>
        </Row>
      </Panel>}
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

    );
}

function mapStateToProps(state) {
  return {
    user: state.app.user,
    id: state.control_center_kh_monthly.id,
    loading: state.loading.models.control_center_kh_monthly,
  }
}

export default connect(mapStateToProps)(RenderComponent)
