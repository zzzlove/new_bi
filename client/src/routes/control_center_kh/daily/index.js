
import config from '../../../utils/config';
import React from 'react'
import PropTypes from 'prop-types';

import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import { Collapse, Row, Col, Card, Icon} from 'antd';
const Panel = Collapse.Panel;

import DTIE01 from './DTIE01';
import DTOE01 from './DTOE01';
import DTOS01 from './DTOS01';
import DTEST from './DTEST';

import DTIE01_A2 from './DTIE01_A2';
import DTOE01_A2 from './DTOE01_A2';

function RenderComponent ({ user, id,  loading }) {

  const incomeGr1Prop = {control_center_id: id, type: ['city_inc','line_inc','service_inc','region_inc']};
  const incomeGr2Prop = {control_center_id: id, type: ['city_inc2nd','line_inc2nd','service_inc2nd','region_inc2nd']};
  
  var ControlA0A1Show = user.roles.indexOf('admin')!=-1 || user.roles.indexOf('kh_admin')!=-1 || user.roles.indexOf('headoffice_kh')!=-1;

  return (
    <Collapse bordered={false} defaultActiveKey={['1']}>
      <Panel header="线路日产值[按定挂 甩挂 外雇]" key="1">
        <Row gutter={24} >
          <Col lg={12} md={24}>
            <Card bordered={false} >
                <DTIE01 {...incomeGr1Prop}/>
             </Card>
          </Col>
          <Col lg={12} md={24}>
            <Card bordered={false} >
                <DTOE01 {...incomeGr1Prop}/>
            </Card>
          </Col>
        </Row>

      </Panel>
      {ControlA0A1Show&&<Panel header="线路日产值[按A0 A1 A2]" style={{display:config.isHiddenA012}} key="2">
        <Row gutter={24} >
          <Col lg={12} md={24}>
            <Card bordered={false} >
                <DTIE01 {...incomeGr2Prop}/>
             </Card>
          </Col>
          <Col lg={12} md={24}>
            <Card bordered={false} >
                <DTOE01 {...incomeGr2Prop}/>
            </Card>
          </Col>
        </Row>
      </Panel>}
      {!ControlA0A1Show&&<Panel header="线路日产值" style={{display:config.isHiddenA012}} key="2">
        <Row gutter={24} >
          <Col lg={12} md={24}>
            <Card bordered={false} >
                <DTIE01_A2 {...incomeGr2Prop}/>
             </Card>
          </Col>
          <Col lg={12} md={24}>
            <Card bordered={false} >
                <DTOE01_A2 {...incomeGr2Prop}/>
            </Card>
          </Col>
        </Row>
      </Panel>}


    </Collapse>
    );
}

/*

      <Panel header="非外" key="3">
        <Row gutter={24} >
          <Col lg={12} md={24}>
            <Card bordered={false} >
              <DTEST {...incomeGr2Prop}/>
            </Card>
          </Col>
          <Col lg={12} md={24}>
            <Card bordered={false} >
              <DTEST {...incomeGr2Prop}/>
            </Card>
          </Col>
        </Row>
      </Panel>
*/      

function mapStateToProps(state) {
  return {
    user: state.app.user,
    id: state.control_center_kh_daily.id,
    loading: state.loading.models.control_center_kh_daily,
  }
}

export default connect(mapStateToProps)(RenderComponent)


