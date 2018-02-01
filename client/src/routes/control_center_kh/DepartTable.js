
import React from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Table, Spin, Icon, Button, Popconfirm } from 'antd';
import 'antd/dist/antd.css'; 
import DepartPointMini from './DepartPointMini';

function openNewLink(url) {  
  window.open(url)
}

function RenderComponent({data}) {

   const { loading, error, dataSource } = data; 

   var dateRange = [new Date().getTime() - 30*24*60*60*1000, new Date().getTime()];
   
   const columns = [{
    title: '车牌号',
    dataIndex: 'equipment.equipment_no',
    key: 'equipment_no',
    sorter: (a, b) => { let x = a.equipment.equipment_no||"0"; let y = b.equipment.equipment_no||"0"; if(x<y) return -1; else if(x>y) return 1; else return 0; },
    width: 250,
    }, {
    title: '30日内发车',
    dataIndex: 'equipment.equipment_no',
    key: '50',
    width: 400,
    render: (text, record, index) => { return <DepartPointMini equipment_no={text} started_at={dateRange}/>},
    //filters: dataSource.profile,
    //onFilter: (value, record) => record.profile_id === value,
    }];    
    

   if (loading) {
      return (<div><Spin size={'large'} tip={'数据加载中 Loading...'}/></div>)
   }
   
   if (error) {
      return (<p>{error.message}</p>)
   }

   const tabelDefinition = {
            rowKey: 'id',
            pagination: {showSizeChanger: true},
            size: 'small',
            dataSource: dataSource,
            columns: columns,
          };
   
   return (
      <div>
        <Table {...tabelDefinition}  />
      </div>
   );

}


const QueryToRender = gql`
query MyQuery($control_center_id: [Int]) {
  dataSource: rm_control_center_equipment(control_center_id: $control_center_id) {
    id
    control_center_id
    equipment_id
    equipment {
      equipment_no
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


