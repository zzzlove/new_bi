
import React from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Table, Spin, Icon, Button, Popconfirm } from 'antd';
import 'antd/dist/antd.css'; 
import TraderPointMini from './TraderPointMini';

function openNewLink(url) {  
  window.open(url)
}

function RenderComponent({data}) {

   const { loading, error, dataSource } = data; 

   var dateRange = [new Date().getTime() - 30*24*60*60*1000, new Date().getTime()];
   
   const columns = [{
    title: '汇总分析',
    dataIndex: 'profile_id',
    key: '30',
    width: 180,
    render: (text, record, index) => (<span>
      <Button onClick={() => openNewLink(`service_no_kh_details?service_no=${record.service_no}`)}>汇总分析 <Icon style={{marginLeft:'1px', padding:'1px', fontSize: 12}} type="line-chart"/></Button> {'  '}
     </span>),
    }, {
    title: '会员',
    dataIndex: 'profile.name',
    key: 'profile_name',
    sorter: (a, b) => { let x = a.profile.name||"0"; let y = b.profile.name||"0"; if(x<y) return -1; else if(x>y) return 1; else return 0; },
    width: 250,
    }, {
    title: '30日内交易',
    dataIndex: 'profile_id',
    key: 'profile_id',
    width: 400,
    render: (text, record, index) => { return <TraderPointMini trader_id={text} started_at={dateRange}/>},
    //filters: dataSource.profile,
    //onFilter: (value, record) => record.profile_id === value,
    }];    
    

   if (loading) {
      return (<div><Spin size={'large'} tip={'数据加载中 Loading...'}/></div>)
   }
   
   if (error) {
      return (<p>{error.message}</p>)
   }

   
   return (
      <div>
        <Table rowKey={'id'} size={'small'} dataSource={dataSource} columns={columns}  />
      </div>
   );

}


const QueryToRender = gql`
query MyQuery($control_center_id: [Int]) {
  dataSource: rm_control_center_profile(control_center_id: $control_center_id) {
    id
    control_center_id
    profile_id
    profile {
        name
    }
  }
}
`;



/*
关联表的参数注入方案

query MyQuery($control_center_id: [Int]){
  rm_control_center_profile(control_center_id: $control_center_id) {
    id
    control_center{
      control_center_id: id
      id
      name
    }
    profile{
      id
      name
    }
  }
}

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


