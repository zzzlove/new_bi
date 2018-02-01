import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';

import { Collapse, Icon, Card, Button, Popover } from 'antd';
const Panel = Collapse.Panel;
import Headcount from './Headcount';
import Salary from './Salary';


export default function Dashboard () {
  

  return (
    <div>
    <Collapse bordered={false} defaultActiveKey={['1']}>
      <Panel header="上海天地汇供应链管理有限公司" key="1">
      <h2>周入职人数</h2>
      <Headcount service_no="入职" cat_1st="上海天地汇供应链管理有限公司"/>
      <h2>周离职人数</h2>
      <Headcount service_no="离职" cat_1st="上海天地汇供应链管理有限公司"/>
      </Panel>
      <Panel header="U卡公司" key="2">
      <h2>周入职人数</h2>
      <Headcount service_no="入职" cat_1st="U卡公司"/>
      <h2>周离职人数</h2>
      <Headcount service_no="离职" cat_1st="U卡公司"/>
      </Panel>
      <Panel header="上海天地汇物流科技有限公司" key="3">
      <h2>周入职人数</h2>
      <Headcount service_no="入职" cat_1st="上海天地汇物流科技有限公司"/>
      <h2>周离职人数</h2>
      <Headcount service_no="离职" cat_1st="上海天地汇物流科技有限公司"/>
      </Panel>
      <Panel header="上海百及信息科技有限公司" key="4">
      <h2>周入职人数</h2>
      <Headcount service_no="入职" cat_1st="上海百及信息科技有限公司"/>
      <h2>周离职人数</h2>
      <Headcount service_no="离职" cat_1st="上海百及信息科技有限公司"/>
      </Panel>
      <Panel header="上海天地汇投资管理有限公司" key="5">
      <h2>周入职人数</h2>
      <Headcount service_no="入职" cat_1st="上海天地汇投资管理有限公司"/>
      <h2>周离职人数</h2>
      <Headcount service_no="离职" cat_1st="上海天地汇投资管理有限公司"/>
      </Panel>
      <Panel header="核心发薪主体薪资与人数" key="6">
      <Salary service_no="发薪主体薪资合计" cat_1st="上海天地汇投资管理有限公司"/>
      <Salary service_no="发薪主体薪资合计" cat_1st="上海天地汇供应链管理有限公司"/>
      <Salary service_no="发薪主体薪资合计" cat_1st="上海天地汇物流科技有限公司"/>
      <Salary service_no="发薪主体薪资合计" cat_1st="上海百及信息科技有限公司"/>      
      </Panel>
      </Collapse>
    </div> 
  )
}


