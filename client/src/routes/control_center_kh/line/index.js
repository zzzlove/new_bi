
import config from '../../../utils/config';
import React from 'react'
import PropTypes from 'prop-types';

import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import { Collapse, Row, Col, Card, Icon, Select} from 'antd';
const Panel = Collapse.Panel;
import 'antd/dist/antd.css';

import MTIS01 from './MTIS01';
import MTOS01 from './MTOS01';
import MTTS01 from './MTTS01';

//签约状态的交叉
import ByCusCntrLevel01 from './ByCusCntrLevel01';
import ByCusCntrLevel02 from './ByCusCntrLevel02';
import ByCusCntrHis01 from './ByCusCntrHis01';
import ByCusCntrHis02 from './ByCusCntrHis02';


import MTI001 from '../monthly/MTI001';
import MTFT01 from '../monthly/MTFT01';

import MTIE01 from '../monthly/MTIE01';
import MTIE01_pct from '../monthly/MTIE01_pct';

import MTOE01 from '../monthly/MTOE01';
import MTOE01_pct from '../monthly/MTOE01_pct';

//活跃分类
import MTIT01_pct from '../monthly/MTIT01_pct';
import MTIT01_amount from '../monthly/MTIT01_amount';
import MTTT01_pct from '../monthly/MTTT01_pct';
import MTTT01_amount from '../monthly/MTTT01_amount';

//新老分类
import MTIT02_pct from '../monthly/MTIT02_pct';
import MTIT02_amount from '../monthly/MTIT02_amount';
import MTTT02_pct from '../monthly/MTTT02_pct';
import MTTT02_amount from '../monthly/MTTT02_amount';

//签约分类
import MTIT03_pct from '../monthly/MTIT03_pct';
import MTIT03_amount from '../monthly/MTIT03_amount';
import MTTT03_pct from '../monthly/MTTT03_pct';
import MTTT03_amount from '../monthly/MTTT03_amount';

class RenderComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
         control_element: '总计',
       };
  }

  handleSelectChange(value) {
        this.setState({ control_element: value })
  }



 render() {

  const { id } = this.props.control_center_kh_line;
  const { control_element } = this.state;

  const incomeGr1Prop = {control_center_id: id, type: ['city_inc','line_inc','service_inc','region_inc']};
  const incomeGr2Prop = {control_center_id: id, type: ['city_inc2nd','line_inc2nd','service_inc2nd','region_inc2nd']};



  return (
    <div>
    <Collapse bordered={false} defaultActiveKey={['1']}>
      <Panel header="整体收入与占比变化" key="1">
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
      <Panel header="月分类收入[按定挂 甩挂 外雇]" key="2">
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
      <Panel header="月分类收入[按A0 A1 A2]" style={{display:config.isHiddenA012}} key="3">
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
      </Panel>
      <Panel header="对应单边月收入与运单信息" key="4">
        <Select
          style={{ width: 200 }}
          value={control_element}
          onChange={(value)=>this.handleSelectChange(value)}
        >
          <Select.Option value="总计">总计</Select.Option>
          <Select.Option value="非外雇">非外雇</Select.Option>
          <Select.Option value="外雇">外雇</Select.Option>
          <Select.Option value="定挂">定挂</Select.Option>
          <Select.Option value="甩挂">甩挂</Select.Option>
        </Select>
        <Row gutter={24} >
          <Col lg={12} md={24}>
            <Card bordered={false} >
                <MTIS01 id={id} control_center_pid={id} control_element={control_element}/>
             </Card>
          </Col>
          <Col lg={12} md={24}>
            <Card bordered={false} >
               <MTOS01 id={id} control_center_pid={id} control_element={control_element}/>
            </Card>
          </Col>
        </Row>
        <Row gutter={24} >
          <Col lg={12} md={24}>
            <Card bordered={false} >
                <MTTS01 id={id} control_center_pid={id} control_element={control_element}/>
             </Card>
          </Col>
          <Col lg={12} md={24}>
            <Card bordered={false} >
              {'利润，待完成'}
            </Card>
          </Col>
        </Row>
      </Panel>
      <Panel header="客户分析[非外雇]" key="5">
        <Row gutter={24} >
          <Col lg={12} md={24}>
            <Card bordered={false} >
                <MTIT03_amount control_center_id={id}/>
             </Card>
          </Col>
          <Col lg={12} md={24}>
            <Card bordered={false} >
               <MTIT03_pct control_center_id={id}/>
            </Card>
          </Col>
        </Row>
        <Row gutter={24} >
          <Col lg={12} md={24}>
            <Card bordered={false} >
                <MTTT03_amount control_center_id={id}/>
             </Card>
          </Col>
          <Col lg={12} md={24}>
            <Card bordered={false} >
               <MTTT03_pct control_center_id={id}/>
            </Card>
          </Col>
        </Row>
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
       </Panel>
       <Panel header="签约客户的深入分析" key="6">
        <Row gutter={24} >
          <ByCusCntrLevel01 control_center_id={id}/>
        </Row>
        <Row gutter={24} >
          <ByCusCntrLevel02 control_center_id={id}/>
        </Row>
        <Row gutter={24} >
          <ByCusCntrHis01 control_center_id={id}/>
        </Row>
        <Row gutter={24} >
          <ByCusCntrHis02 control_center_id={id}/>
        </Row>
       </Panel>

       </Collapse>
     </div>
    )
 }
}

function mapStateToProps(state) {
  return {
    control_center_kh_line: state.control_center_kh_line,
    loading: state.loading.models.control_center_kh_line,
  }
}

export default connect(mapStateToProps)(RenderComponent)


