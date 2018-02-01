import _ from 'lodash';
import { connect } from 'dva';
import React from 'react';
import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';
import { Table, Spin, Icon, Button, Popconfirm, Row, Col, Card, Badge, Popover, DatePicker, Tabs } from 'antd';
import moment from 'moment';
import 'antd/dist/antd.css'; 

import ControlCenterActual from '../ControlCenterActual';
import ControlCenterActualDaily from '../ControlCenterActualDaily';
import OrderTable from '../OrderTable';


function RenderComponent ({ control_center_kh_daily_data, data }) {

  const { id, t_time, started_at, type } = control_center_kh_daily_data;

  const {control_center_one, loading, error} = data;
  
  if (loading) {
    return (<div><Spin size={'large'} tip={'数据加载中 Loading...'}/></div>)
  }
  if (error) {
    return (<p>{error.message}</p>)
  }
  
  const fetchProps = {control_center_id: id, t_time: t_time, type: type}  
  
  return (
     <div>
     <ControlCenterActual {...fetchProps}/>
      <Tabs defaultActiveKey="1">
        <Tabs.TabPane tab="运单明细" key="1">
            <OrderTable control_center_id={control_center_one.children_ids} started_at={started_at}/>
        </Tabs.TabPane>

      </Tabs>
     </div>
    )  

}



const QueryToRender = gql`
query MyQuery ($id: ID){
  control_center_one(id: $id) {
    id
    children_ids
  }
}
`;



const ComponentWithData = graphql(QueryToRender, {
  options: (props) => {
    return { variables: { id: props.control_center_kh_daily_data.id } }
  }
})(RenderComponent);


function mapStateToProps(state) {
  return {
    control_center_kh_daily_data: state.control_center_kh_daily_data,
    loading: state.loading.models.control_center_kh_daily_data,
  }
}

export default connect(mapStateToProps)(ComponentWithData)