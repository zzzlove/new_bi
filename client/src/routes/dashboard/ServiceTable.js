import _ from 'lodash';
import { connect } from 'dva';
import React from 'react';
import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';
import { Table, Spin, Icon, Button, Popconfirm, Row, Col, Card } from 'antd';
import 'antd/dist/antd.css'; 
import { Link } from 'dva/router';
import { Checkbox, InputNumber, Input } from 'antd';

function openNewLink(url) {  
  window.open(url)
}


function RenderComponent({data}) {

   const { loading, error, dataSource } = data; 


   const columns = [{
    title: '单边线路看板',
    dataIndex: 'at_column_action',
    key: 'at_column_action',
    width: 250,
    render: (text, record, index) => (<span>
      <Button onClick={() => openNewLink(`service_no_kh_details?service_no=${record.service_no}`)}>单边线路看板 <Icon style={{marginLeft:'1px', padding:'1px', fontSize: 12}} type="dot-chart"/></Button> 
     </span>),
    }, {
    title: '线路名称',
    dataIndex: 'service_no',
    key: '2168',
    width: 200,
    }, {
    title: '线路类型',
    dataIndex: 'type',
    key: '2172',
    width: 200,
    }];

  if (loading) {
    return (<div><Spin size={'large'} tip={'数据加载中 Loading...'}/></div>)
  }
  if (error) {
    return (<p>{error.message}</p>)
  }

   const tabelDefinition = {
            rowKey: 'id',
            pagination: false,
            size: 'small',
            dataSource: dataSource,
            columns: columns,
            scroll: {x: 600},
            showHeader: false,
          };
  
  return (
     <div>
     <Table {...tabelDefinition}/>
     </div>
    )  
}


const QueryToRender = gql`
query MyQuery($control_center_id: [Int]) {
  dataSource: service(control_center_id: $control_center_id) {
    id
    service_no
    type
    status
  }
}
`;

/*
export default graphql(QueryToRender, {
  options: { variables: { control_center_id: 45 } },
})(RenderComponent);


export default graphql(QueryToRender, {
  options: (props) => ({ variables: { control_center_id: props.control_center_id } }),
})(RenderComponent);

*/

export default graphql(QueryToRender, {
  options: (props) => ({ variables: { control_center_id: props.control_center_id } }),
})(RenderComponent);


// script end at 2017-07-25 11:28:05.102275+08