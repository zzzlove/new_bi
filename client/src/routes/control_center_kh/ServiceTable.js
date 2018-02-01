import _ from 'lodash';
import { connect } from 'dva';
import React from 'react';
import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';
import { Table, Spin, Icon, Button, Popconfirm, Row, Col, Card } from 'antd';
import 'antd/dist/antd.css'; 
import { Link } from 'dva/router';
import { Checkbox, InputNumber, Input } from 'antd';
import Formatter from '../../utils/formatter';

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
      <Button onClick={() => openNewLink(`control_center_kh_daily?id=${record.children_id}`)}>日经营管理 <Icon style={{marginLeft:'1px', padding:'1px', fontSize: 12}} type="line-chart"/></Button> {'  '}
      <Button onClick={() => openNewLink(`control_center_kh_weekly?id=${record.id}`)}>周经营管理 <Icon style={{marginLeft:'1px', padding:'1px', fontSize: 12}} type="bar-chart"/></Button> {'  '}
      <Button onClick={() => openNewLink(`control_center_kh_monthly?id=${record.children_id}`)}>月经营分析 <Icon style={{marginLeft:'1px', padding:'1px', fontSize: 12}} type="pie-chart"/></Button> {'  '}
     </span>),
    }, {
    title: '线路名称',
    dataIndex: 'SubCenter.name',
    key: '2168',
    width: 200,
    }, {
    title: '当日产值',
    dataIndex: 'SubCenter.amount_last',
    key: '5',
    width: 100,
    render: (text)=><div style={{textAlign: 'right'}}>{Formatter.money(text, ",")}</div>,
    }, {
    title: '当月产值累计',
    dataIndex: 'SubCenter.amount',
    key: '2172',
    width: 100,
    render: (text)=><div style={{textAlign: 'right'}}>{Formatter.money(text, ",")}</div>,
    }, {
    title: '当年产值累计',
    dataIndex: 'SubCenter.amount_ytd',
    key: '2173',
    render: (text)=><div style={{textAlign: 'right'}}>{Formatter.money(text, ",")}</div>,
    width: 100,    
    }];     
/*    
    }, {
    title: '当月收入累计',
    dataIndex: 'SubCenter.amount',
    key: '2172',
    width: 200,
    }, {
    title: '当年收入累计',
    dataIndex: 'SubCenter.amount_ytd',
    key: '2173',
    width: 200,
    }];
*/
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
  dataSource: control_center_rm(control_center_id: $control_center_id) {
    id
    children_id
    control_center_id
    SubCenter {
      id
      name
      amount
      amount_last
      amount_ytd
    }
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