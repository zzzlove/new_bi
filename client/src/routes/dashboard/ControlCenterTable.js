
import React from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Table, Spin, Icon, Button, Popconfirm } from 'antd';
import 'antd/dist/antd.css'; 
import ServiceTable from './ServiceTable';

function openNewLink(url) {  
  window.open(url)
}

function buttonMapping(array) {  
  array.map(item => <Button>item.name</Button>)
}

function RenderComponent({data}) {

   const { loading, error, dataSource } = data; 

   var dateRange = [new Date().getTime() - 30*24*60*60*1000, new Date().getTime()];

   const columns = [{
    title: '经营管理',
    dataIndex: 'at_column_action',
    key: 'at_column_action',
    width: 300,
    render: (text, record, index) => (<span>
      <Button onClick={() => openNewLink(`control_center_kh_daily?id=${record.id}`)}>日经营分析 <Icon style={{marginLeft:'1px', padding:'1px', fontSize: 12}} type="line-chart"/></Button> {'  '}
      <Button onClick={() => openNewLink(`control_center_kh_monthly?id=${record.id}`)}>月经营汇总 <Icon style={{marginLeft:'1px', padding:'1px', fontSize: 12}} type="pie-chart"/></Button> {'  '}
     </span>),
    }, {
    title: '线路名称(往返)',
    dataIndex: 'name',
    key: '1',
    sorter: (a, b) => { let x = a.name||"0"; let y = b.name||"0"; if(x<y) return -1; else if(x>y) return 1; else return 0; },
    width: 150,
    }, {
    title: '负责人',
    dataIndex: 'owner',
    sorter: (a, b) => { let x = a.owner||"0"; let y = b.owner||"0"; if(x<y) return -1; else if(x>y) return 1; else return 0; },
    key: '2',
    width: 150,
    }, {
    title: '发展阶段',
    dataIndex: 'cat_2nd',
    key: '3',
    width: 150,
    }, {
    title: '类别',
    dataIndex: 'cat_1st',
    key: '4',
    width: 150,
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
          };
   //expandedRowRender={record => <p>{record.description}</p>}
   return (
      <div>
        <Table {...tabelDefinition} expandedRowRender={record => <ServiceTable control_center_id={record.id}/>} />
      </div>
   );
   
}


const QueryToRender = gql`
query MyQuery($control_center_id: [Int]) {
  dataSource: control_center(id: $control_center_id) {
    id
		name
    owner
    cat_1st 
    cat_2nd    
    service {
      id
      service_no
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


