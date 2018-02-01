
import React from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Table, Spin, Icon, Button, Popconfirm } from 'antd';
import 'antd/dist/antd.css'; 


function openNewLink(url) {  
  window.open(url)
}

const destroyButton = ({ id, mutate }) => {
  const handleDestroy = (evt) => {
    mutate({
      variables: { id },
      refetchQueries: [ { query: QueryToRender }],        
    })
  }
  return (
    <Button onClick={handleDestroy}>Remove</Button>
  )
};

const destroyMutatation = gql`
mutation thisDestroy($id: Int!) {
  destroyRmControlCenterProfile(id: $id)
}
`;

const ActiveDestroyButton = graphql(destroyMutatation)(destroyButton);

function RenderComponent({data}) {

   const { loading, error, dataSource } = data; 

   var dateRange = [new Date().getTime() - 30*24*60*60*1000, new Date().getTime()];
   
   const columns = [{
    title: '删除',
    dataIndex: 'profile_id',
    key: '30',
    width: 180,
    render: (text, record, index) => <ActiveDestroyButton id={record.id}/>,
    }, {
    title: '会员',
    dataIndex: 'profile.name',
    key: 'profile_name',
    sorter: (a, b) => { let x = a.profile.name||"0"; let y = b.profile.name||"0"; if(x<y) return -1; else if(x>y) return 1; else return 0; },
    width: 250,
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
query ($control_center_id: [Int]) {
  dataSource: rm_control_center_profile(control_center_id: $control_center_id, order: "id") {
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
  options: { variables: { control_center_id: 45 } },
})(RenderComponent);


