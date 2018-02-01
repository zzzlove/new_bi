import _ from 'lodash';
import { connect } from 'dva';
import React from 'react';
import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';
import { Table, Spin, Icon, Button, Popconfirm, Row, Col, Card, Badge, Popover, DatePicker, Modal } from 'antd';
import moment from 'moment';
import 'antd/dist/antd.css'; 
import {formatter, getAllValuesFromRecord, getDistinctValues} from '../../utils';
import { DropOption } from '../../components';
const confirm = Modal.confirm



function RenderComponent ({data }) {
  
  const { loading, error, dataSource } = data; 
  
  if (loading) {
    return (<div><Spin size={'large'} tip={'数据加载中 Loading...'}/></div>)
  }
  if (error) {
    return (<p>{error.message}</p>)
  }        
/*
  const distValues = getDistinctValues(dataSource, ['ops_code', 'fin_code']);
      
  
  const handleMenuClick = (record, e) => {
    if (e.key === '1') {
      onEditItem(record)
    } else if (e.key === '2') {
      confirm({
        title: '您确定要删除这条记录吗?',
        onOk () {
          onDeleteItem(record.id)
        },
      })
    }
  }   

  function filterFomatter(d) {
   return {value: d, text: d};
  }
*/

  const columns = [{
  title: '客户名称',
  dataIndex: 'member_name',
  key: '6006',
  width: 150,
  sorter: (a, b) => { let x = a.member_name||"0"; let y = b.member_name||"0"; if(x<y) return -1; else if(x>y) return 1; else return 0; },
  }, {
  title: '线路名称',
  dataIndex: 'service_name',
  key: '6005',
  width: 150,
  sorter: (a, b) => { let x = a.service_name||"0"; let y = b.service_name||"0"; if(x<y) return -1; else if(x>y) return 1; else return 0; },
  }, {
  title: '月份',
  dataIndex: 't_run',
  key: '6004',
  width: 80,
  sorter: (a, b) => { let x = a.t_run||"0"; let y = b.t_run||"0"; if(x<y) return -1; else if(x>y) return 1; else return 0; },
  }, {
  title: '实际发车数',
  dataIndex: 'int1',
  key: '5998',
  width: 80,
  sorter: (a, b) => { let x=a.int1||0; let y=b.int1||0; if(x<y) return -1; else if(x>y) return 1; else return 0; },
  }, {
  title: '实际价格',
  dataIndex: 'int2',
  key: '5997',
  width: 80,
  sorter: (a, b) => { let x=a.int2||0; let y=b.int2||0; if(x<y) return -1; else if(x>y) return 1; else return 0; },
  }, {
  title: '当月履约率',
  dataIndex: 'int3',
  key: '5996',
  width: 80,
  sorter: (a, b) => { let x=a.int3||0; let y=b.int3||0; if(x<y) return -1; else if(x>y) return 1; else return 0; },
  }];

/*  
  const dataRender = (!searchProps.field||!searchProps.keyword)?dataSource
   :dataSource.filter((d) => {
    
    let keyword = searchProps.keyword.toUpperCase();

    switch (searchProps.field){
      case 'tableAllColumns': {let xx = getAllValuesFromRecord(d); return xx.indexOf(keyword) != -1}
    }  
   }
  )
*/ 
  
  const tabelDefinition = {
            bordered: true,
            rowKey: 'id',
            pagination: false,
            size: 'small',
            dataSource: dataSource,
            columns: columns,
            scroll: {x: 700},
          };
          
 

  return (
     <div>
        <Table {...tabelDefinition}/>
     </div>
    )  
 
}

const QueryToRender = gql`
query MyQuery ($service_id: Int, $member_name: String){
  dataSource: member_cat_service (service_id: $service_id, member_name: $member_name){
    id
    member_id
    service_id
    member_name
    service_name
    type
    t_run
    cat_1st
    cat_2nd
    cat_3rd
    date1
    date2
    int1
    int2
    int3
    char1
    char2
  }
}
`;



export default graphql(QueryToRender, {
  options: (props) => ({ variables: { service_id: props.service_id, member_name: props.member_name, } }),
  })(RenderComponent);  






