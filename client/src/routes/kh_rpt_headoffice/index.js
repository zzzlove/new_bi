import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';

import { Collapse, Row, Col, Icon, Card, Button, Popover } from 'antd';
const Panel = Collapse.Panel;

import DTIE01 from '../control_center_kh/daily/DTIE01';
import DTOE01 from '../control_center_kh/daily/DTOE01';

import IncomePointTop30CCKey from './IncomePointTop30CCKey';
import IncomePointTop30CCAll from './IncomePointTop30CCAll';
import IncomeBarchartByCEAll from '../control_center_kh_byid/incomeBarchartByCEAll';

import MTI001 from '../control_center_kh/monthly/MTI001';
import MTFT01 from '../control_center_kh/monthly/MTFT01';

import MTIE01 from '../control_center_kh/monthly/MTIE01';
import MTOE01 from '../control_center_kh/monthly/MTOE01';

import MTIT01_pct from '../control_center_kh/monthly/MTIT01_pct';
import MTIT01_amount from '../control_center_kh/monthly/MTIT01_amount';
import MTIT02_pct from '../control_center_kh/monthly/MTIT02_pct';
import MTIT02_amount from '../control_center_kh/monthly/MTIT02_amount';

import MFIT01_1 from '../control_center_kh/monthly/MFIT01_1';
import MFIT01_2 from '../control_center_kh/monthly/MFIT01_2';


// control_center_id = 1 特指集团总部

export default function Dashboard () {



  return (
    <div>
    <Collapse bordered={false} defaultActiveKey={['1']}>
      <Panel header="日收入" key="1">
        <Row gutter={24} >
          <Col lg={12} md={24}>
            <Card bordered={false} >
                <DTIE01 control_center_id={1}/>
             </Card>
          </Col>
          <Col lg={12} md={24}>
            <Card bordered={false} >
                <DTOE01 control_center_id={1}/>
            </Card>
          </Col>
        </Row>
      </Panel>
      <Panel header="核心线路日运单数与收入(全部运单)" key="2" style={{display:'none'}}>
        <IncomePointTop30CCAll/>
      </Panel>
      <Panel header="核心线路日运单数与收入(非外雇运单)" key="3" style={{display:'none'}}>
        <IncomePointTop30CCKey/>
      </Panel>
      <Panel header="月收入与相关基本信息" key="4">
        <Row gutter={24} >
          <Col lg={12} md={24}>
            <Card bordered={false} >
                <MTI001 control_center_id={1}/>
             </Card>
          </Col>
          <Col lg={12} md={24}>
            <Card bordered={false} >
               <MTFT01 control_center_id={1}/>
            </Card>
          </Col>
        </Row>
        <Row gutter={24} >
          <Col lg={12} md={24}>
            <Card bordered={false} >
                <MTIE01 control_center_id={1}/>
             </Card>
          </Col>
          <Col lg={12} md={24}>
            <Card bordered={false} >
               <MTOE01 control_center_id={1}/>
            </Card>
          </Col>
        </Row>
      </Panel>
      <Panel header="客户分析" key="5">
        <Row gutter={24} >
          <Col lg={12} md={24}>
            <Card bordered={false} >
                <MTIT01_amount control_center_id={1}/>
             </Card>
          </Col>
          <Col lg={12} md={24}>
            <Card bordered={false} >
               <MTIT01_pct control_center_id={1}/>
            </Card>
          </Col>
        </Row>
        <Row gutter={24} >
          <Col lg={12} md={24}>
            <Card bordered={false} >
                <MTIT02_amount control_center_id={1}/>
             </Card>
          </Col>
          <Col lg={12} md={24}>
            <Card bordered={false} >
               <MTIT02_pct control_center_id={1}/>
            </Card>
          </Col>
        </Row>
      </Panel>
      <Panel header="近3个月交易频率分析" key="6" style={{display:'none'}}>
        <Row gutter={24} >
          <Col lg={24} md={24}>
            <Card bordered={false} >
                <MFIT01_1 control_center_id={1}/>
             </Card>
          </Col>
          <Col lg={24} md={24}>
            <Card bordered={false} >
               <MFIT01_2 control_center_id={1}/>
            </Card>
          </Col>
        </Row>
      </Panel>
    </Collapse>
    </div>
  )
}


