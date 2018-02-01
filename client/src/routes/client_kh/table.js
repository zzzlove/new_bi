import _ from 'lodash';
import { connect } from 'dva';
import React from 'react';
import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';
import { Table, Spin, Icon, Button, Popconfirm, Row, Col, Card, Badge, Popover, DatePicker, Modal, Tag } from 'antd';
import moment from 'moment';
import 'antd/dist/antd.css'; 
import {formatter, getAllValuesFromRecord, getDistinctValues} from '../../utils';
import { DropOption } from '../../components';
const confirm = Modal.confirm



function RenderComponent ({data, dataOption, dispatch, client_kh, pagination, onPageChange, onRowClick, onDeleteItem, onEditItem }) {
  
  const { dataOptiong002, dataOptionsd001, dataOptionsd002 } = dataOption; 
  const { loading, error, dataSource } = data; 
  
  const { modalVisible, fetchPropsModalVisible, searchPropsModalVisible, modalType, searchProps, currentItem, fetchProps, filtersPage, sorterPage, scrollPage, selectedItem } = client_kh;

  if (loading) {
    return (<div><Spin size={'large'} tip={'数据加载中 Loading...'}/></div>)
  }
  if (error) {
    return (<p>{error.message}</p>)
  }        

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

//  render: (text)=><div style={{textAlign: 'right'}}>{text}</div>,

 const columns = [{
  title: '客户编号',
  dataIndex: 'member_id',
  key: '5941',
  width: 60,
  sorter: (a, b) => { let x=a.member_id||0; let y=b.member_id||0; if(x<y) return -1; else if(x>y) return 1; else return 0; },
  sortOrder: sorterPage.columnKey === '5941' && sorterPage.order,
  }, {
  title: '客户名称',
  dataIndex: 'member_name',
  key: '5954',
  width: 130,
  render: (text, record, index) => record.id==selectedItem.id? <Tag color={'blue'}><Icon type="pushpin" />  {text}</Tag>: text,
  sorter: (a, b) => { let x = a.member_name||"0"; let y = b.member_name||"0"; if(x<y) return -1; else if(x>y) return 1; else return 0; },
  sortOrder: sorterPage.columnKey === '5954' && sorterPage.order,
  }, {

  title: '线路名称',
  dataIndex: 'service_name',
  key: '5955',
  width: 60,
  sorter: (a, b) => { let x = a.service_name||"0"; let y = b.service_name||"0"; if(x<y) return -1; else if(x>y) return 1; else return 0; },
  sortOrder: sorterPage.columnKey === '5955' && sorterPage.order,
  }, {
  title: '是否往返',
  dataIndex: 'round_trip',
  key: '5925',
  width: 50,
  sorter: (a, b) => { let x = a.round_trip||"0"; let y = b.round_trip||"0"; if(x<y) return -1; else if(x>y) return 1; else return 0; },
  sortOrder: sorterPage.columnKey === '5925' && sorterPage.order,
  }, {
  title: '承诺车数',
  dataIndex: 'quantity',
  key: '5924',
  width: 50,
  sorter: (a, b) => { let x=a.quantity||0; let y=b.quantity||0; if(x<y) return -1; else if(x>y) return 1; else return 0; },
  sortOrder: sorterPage.columnKey === '5924' && sorterPage.order,
  }, {
  title: '承诺单价',
  dataIndex: 'unit_price',
  key: '5938',
  width: 50,
  sorter: (a, b) => { let x=a.unit_price||0; let y=b.unit_price||0; if(x<y) return -1; else if(x>y) return 1; else return 0; },
  sortOrder: sorterPage.columnKey === '5938' && sorterPage.order,
  }, {
  title: '开始时间',
  dataIndex: 'started_at',
  key: '5923',
  width: 80,
  render: (text, record) => { if(text){ return <span>{formatter.date(new Date(text),'yyyy-MM-dd')}</span> } else { return null;} },
  sorter: (a, b) => { let x=a.started_at||0; let y=b.started_at||0; if(x<y) return -1; else if(x>y) return 1; else return 0; },
  sortOrder: sorterPage.columnKey === '5923' && sorterPage.order,
  }, {
  title: '结束时间',
  dataIndex: 'finished_at',
  key: '5922',
  width: 80,
  render: (text, record) => { if(text){ return <span>{formatter.date(new Date(text),'yyyy-MM-dd')}</span> } else { return null;} },
  sorter: (a, b) => { let x=a.finished_at||0; let y=b.finished_at||0; if(x<y) return -1; else if(x>y) return 1; else return 0; },
  sortOrder: sorterPage.columnKey === '5922' && sorterPage.order,
  }, {

  title: '开发人',
  dataIndex: 'employee_name',
  key: '5956',
  width: 50,

  }, {
  title: '备注',
  dataIndex: 'remarks',
  key: '5917',
  width: 150,


  }];

  
  const dataRender = (!searchProps.field||!searchProps.keyword)?dataSource
   :dataSource.filter((d) => {
    
    let keyword = searchProps.keyword.toUpperCase();

    switch (searchProps.field){
      case 'tableAllColumns': {let xx = getAllValuesFromRecord(d); return xx.indexOf(keyword) != -1}
    }  
   }
  )
 
  
  const tabelDefinition = {
            bordered: true,
            rowKey: 'id',
            pagination: pagination,
            size: 'small',
            dataSource: dataRender,
            onChange: onPageChange,
            columns: columns,
            scroll: scrollPage,
            onRowDoubleClick: onRowClick,
          };
          
 

  return (
     <div>
        <Table {...tabelDefinition}/>
     </div>
    )  
 
}


function mapStateToProps(state) {
  return {
    client_kh: state.client_kh,
    user: state.app.user
  }
}

export default connect(mapStateToProps)(RenderComponent);






