
import config from '../../../utils/config';
import React from 'react'
import PropTypes from 'prop-types';

import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import { Collapse, Row, Col, Card, Icon} from 'antd';
const Panel = Collapse.Panel;


//import WTI001 from './WTI001';
//import WTFT01 from './WTFT01';

import WTIE01 from './WTIE01';
import WTIE01_A2 from './WTIE01_A2';
import WTOE01 from './WTOE01';

import WTIT01_pct from './WTIT01_pct';
import WTIT01_amount from './WTIT01_amount';
import WTTT01_pct from './WTTT01_pct';
import WTTT01_amount from './WTTT01_amount';

import WTIT02_pct from './WTIT02_pct';
import WTIT02_amount from './WTIT02_amount';
import WTTT02_pct from './WTTT02_pct';
import WTTT02_amount from './WTTT02_amount';




function RenderComponent ({ user, id,  loading }) {

  const incomeGr1Prop = {control_center_id: id, type: ['city_inc','line_inc','service_inc','region_inc']};
  const incomeGr2Prop = {control_center_id: id, type: ['city_inc2nd','line_inc2nd','service_inc2nd','region_inc2nd']};
  
  var ControlA0A1Show = user.roles.indexOf('admin')!=-1 || user.roles.indexOf('kh_admin')!=-1 || user.roles.indexOf('headoffice_kh')!=-1;
  
  return (

    <Collapse bordered={false} defaultActiveKey={['1']}>
      <Panel header="周分类产值[按定挂 甩挂 外雇]" key="1">
        <Row gutter={24} >
          <Col lg={12} md={24}>
            <Card bordered={false} >
                <WTIE01 {...incomeGr1Prop}/>
             </Card>
          </Col>
          <Col lg={12} md={24}>
            <Card bordered={false} >
               <WTOE01 {...incomeGr1Prop}/>
            </Card>
          </Col>
        </Row>
      </Panel>
      {ControlA0A1Show&&<Panel header="周分类产值" style={{display:config.isHiddenA012}} key="2">
        <Row gutter={24} >
          <Col lg={12} md={24}>
            <Card bordered={false} >
                <WTIE01 {...incomeGr2Prop}/>
             </Card>
          </Col>
          <Col lg={12} md={24}>
            <Card bordered={false} >
               <WTOE01 {...incomeGr2Prop}/>
            </Card>
          </Col>
        </Row>
      </Panel>}
      {!ControlA0A1Show&&<Panel header="周分类产值" style={{display:config.isHiddenA012}} key="2">
        <Row gutter={24} >
          <Col lg={12} md={24}>
            <Card bordered={false} >
                <WTIE01_A2 {...incomeGr2Prop}/>
             </Card>
          </Col>
          <Col lg={12} md={24}>
            <Card bordered={false} >
               <WTOE01 {...incomeGr2Prop}/>
            </Card>
          </Col>
        </Row>
      </Panel>}
      <Panel header="客户分析[非外雇]" key="3">
        <Row gutter={24} >
          <Col lg={12} md={24}>
            <Card bordered={false} >
                <WTIT01_amount control_center_id={id}/>
             </Card>
          </Col>
          <Col lg={12} md={24}>
            <Card bordered={false} >
               <WTIT01_pct control_center_id={id}/>
            </Card>
          </Col>
        </Row>
        <Row gutter={24} >
          <Col lg={12} md={24}>
            <Card bordered={false} >
                <WTTT01_amount control_center_id={id}/>
             </Card>
          </Col>
          <Col lg={12} md={24}>
            <Card bordered={false} >
               <WTTT01_pct control_center_id={id}/>
            </Card>
          </Col>
        </Row>
        <Row gutter={24} >
          <Col lg={12} md={24}>
            <Card bordered={false} >
                <WTIT02_amount control_center_id={id}/>
             </Card>
          </Col>
          <Col lg={12} md={24}>
            <Card bordered={false} >
               <WTIT02_pct control_center_id={id}/>
            </Card>
          </Col>
        </Row>
        <Row gutter={24} >
          <Col lg={12} md={24}>
            <Card bordered={false} >
                <WTTT02_amount control_center_id={id}/>
             </Card>
          </Col>
          <Col lg={12} md={24}>
            <Card bordered={false} >
               <WTTT02_pct control_center_id={id}/>
            </Card>
          </Col>
        </Row>
      </Panel>
    </Collapse>

    );
}

function mapStateToProps(state) {
  return {
    user: state.app.user,
    id: state.control_center_kh_weekly.id,
    loading: state.loading.models.control_center_kh_weekly,
  }
}

export default connect(mapStateToProps)(RenderComponent)
