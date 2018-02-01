import _ from 'lodash';
import { connect } from 'dva';
import React from 'react';
import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';
import { Table, Spin, Icon, Button, Popconfirm, Row, Col, Card, Badge, Popover, DatePicker } from 'antd';
import moment from 'moment';
import 'antd/dist/antd.css'; 
import {formatter} from '../../utils';



function RenderComponent ({data}) {
  

  const { loading, error, dataSource, dataOptiong002, dataOptionsd001, dataOptionsd002, dataOptionsd004 } = data; 
  
  if (loading) {
    return (<div><Spin size={'large'} tip={'数据加载中 Loading...'}/></div>)
  }
  if (error) {
    return (<p>{error.message}</p>)
  }


  var fin_code_distinct =  _.sortBy(_.uniqBy(dataSource, 'fin_code').map(d=>{return {value: d.fin_code, text: d.fin_code}}), 'value');
  var service_no_distinct =  _.sortBy(_.uniqBy(dataSource, 'service_no'), 'service_no').map(d=>{return {value: d.service_no, text: d.service_no}});
  var term_distinct =  _.sortBy(_.uniqBy(dataSource, 'term').map(d=>{return {value: d.term, text: d.term}}), 'value');
  var ops_code_distinct =  _.sortBy(_.uniqBy(dataSource, 'ops_code').map(d=>{return {value: d.ops_code, text: d.ops_code}}), 'value');  

  
 const columns = [{
//  title: '',
//  dataIndex: 'status',
//  key: '2179',
//  width: 40,
//  render: (text, record, index) => {return <Badge status={text}/> },
//  fixed: 'left',
  //  render: (text, record, index) => {if(record.remarks){return <Popover content={record.remarks}><Badge status={text}/></Popover>} else {return <Badge status={text}/>}},
//  filters: dataOptiong002,
//  onFilter: (value, record) => record.status === value,
//  }, {
  title: '状态',
  dataIndex: 'processing_status',
  key: 'processing_status',
  width: 120,
  filters: dataOptionsd001,
  onFilter: (value, record) => record.processing_status === value,
  render: (text, record, index) => {let i = _.findIndex(dataOptionsd001, {value: text}); if (i>=0){ return dataOptionsd001[i].text; } else {return text}},
  sorter: (a, b) => { let x = a.status||"0"; let y = b.status||"0"; if(x<y) return -1; else if(x>y) return 1; else return 0; },
  }, {
  title: '月份',
  dataIndex: 'term',
  className: 'align-left',
  filters: term_distinct,
  onFilter: (value, record) => record.term === value,
  key: '1485',
  width: 120,
  sorter: (a, b) => { let x = a.term||"0"; let y = b.term||"0"; if(x<y) return -1; else if(x>y) return 1; else return 0; },
  }, {
  title: '线路',
  dataIndex: 'service_no',
  key: '2164',
  filters: service_no_distinct,
  onFilter: (value, record) => record.service_no === value,  
  width: 130,
  sorter: (a, b) => { let x = a.service_no||"0"; let y = b.service_no||"0"; if(x<y) return -1; else if(x>y) return 1; else return 0; },
  }, {
  title: '运作方式',
  dataIndex: 'control_element',
  key: 'control_element',
  filters: dataOptionsd002,
  onFilter: (value, record) => record.control_element === value,
  width: 150,
  sorter: (a, b) => { let x = a.service_no||"0"; let y = b.service_no||"0"; if(x<y) return -1; else if(x>y) return 1; else return 0; },
  }, {
  title: '财务主体',
  dataIndex: 'fin_code',
  filters: fin_code_distinct,
  onFilter: (value, record) => record.fin_code === value,
  key: '1894',
  width: 150,
  sorter: (a, b) => { let x = a.fin_code||"0"; let y = b.fin_code||"0"; if(x<y) return -1; else if(x>y) return 1; else return 0; },
  }, {
  title: '运营主体',
  dataIndex: 'ops_code',
  filters: ops_code_distinct,
  onFilter: (value, record) => record.ops_code === value,
  key: '1895',
  width: 150,
  sorter: (a, b) => { let x = a.ops_code||"0"; let y = b.ops_code||"0"; if(x<y) return -1; else if(x>y) return 1; else return 0; },
  }, {
  title: '单号',
  dataIndex: 'order_no',
  key: '1447',
  width: 180,
  sorter: (a, b) => { let x = a.order_no||"0"; let y = b.order_no||"0"; if(x<y) return -1; else if(x>y) return 1; else return 0; },
  }, {
  title: '会员名称',
  dataIndex: 'trader_name',
  key: '1467',
  width: 350,
  sorter: (a, b) => { let x = a.trader_name||"0"; let y = b.trader_name||"0"; if(x<y) return -1; else if(x>y) return 1; else return 0; },
  }, {
  title: '开单时间',
  dataIndex: 'started_at',
  key: '1906',
  width: 200,
  //render: (text, record) => { if(text){ return <span>{new Date(text).toLocaleString()}</span> } else { return null;} },
  render: (text, record) => { if(text){ return <span>{formatter.date(new Date(text),'yyyy-MM-dd hh:mm:ss')}</span> } else { return null;} },
  sorter: (a, b) => { let x=a.started_at||0; let y=b.started_at||0; if(x<y) return -1; else if(x>y) return 1; else return 0; },
  }, {
  title: '产值',
  dataIndex: 'amount',
  key: '1403',
  width: 130,
  render: (text)=><div style={{textAlign: 'right'}}>{formatter.money(text, ",")}</div>,     
  sorter: (a, b) => { let x=a.amount||0; let y=b.amount||0; if(x<y) return -1; else if(x>y) return 1; else return 0; },
  }, {
  title: '毛利',
  dataIndex: 'gross_margin',
  key: 'gross_margin',
  width: 150,
  render: (text)=><div style={{textAlign: 'right'}}>{formatter.money(text, ",")}</div>,     
  sorter: (a, b) => { let x=a.amount||0; let y=b.amount||0; if(x<y) return -1; else if(x>y) return 1; else return 0; },
  }, {
  title: '业务方式',
  dataIndex: 'cat_1st',
  key: 'cat_1st',
  render: (text, record, index) => {let i = _.findIndex(dataOptionsd004, {value: text}); if (i>=0){ return dataOptionsd004[i].text; } else {return text}},
  filters: dataOptionsd004,
  onFilter: (value, record) => record.cat_1st === value,
  width: 150,
  sorter: (a, b) => { let x = a.cat_1st||"0"; let y = b.cat_1st||"0"; if(x<y) return -1; else if(x>y) return 1; else return 0; },
  }, {
 title: '对账单号',
  dataIndex: 'billing_no',
  key: 'billing_no',
  width: 200,
  }, {
 title: '货物名称',
  dataIndex: 'cargo_name',
  key: 'cargo_name',
  width: 200,
  }, {
 title: '承运商',
  dataIndex: 'carrier_name',
  key: 'carrier_name',
  width: 350,
  }, {
 title: '实际发货方',
  dataIndex: 'trader_name_act',
  key: 'trader_name_act',
  width: 350,
  }, {
  title: '车牌号',
  dataIndex: 'plate_no',
  key: 'plate_no',
  width: 200,
  }, {
 title: '客户经理',
  dataIndex: 'manager_name',
  key: 'manager_name',
  width: 200,
  }, {
  title: '数据来源',
  dataIndex: 'reflection_id',
  key: 'reflection_id',
  width: 120,
  render: (text, record) => { if(text==1){ return <span>新卡航</span> } else { return <span>老卡航</span>;} },
  sorter: (a, b) => { let x=a.amount||0; let y=b.amount||0; if(x<y) return -1; else if(x>y) return 1; else return 0; },
  }];
  



  
  
  
  function showTotal(total, range) {
    return `${range[0]}-${range[1]} / ${total}`;
  }

  var totalRecordNumbers = dataSource.length;
  
  
  const tabelDefinition = {
            bordered: true,
            rowKey: 'id',
            pagination: {showSizeChanger: true, total: totalRecordNumbers, showTotal: showTotal},
            size: 'small',
            dataSource: dataSource,
            columns: columns,
            scroll: {x: '170%'}
          };
          
 

  return (
     <div>
        <Table {...tabelDefinition}/>
     </div>
    )  
 
}


const QueryToRender = gql`
query MyQuery($control_center_id: [Int], $service_no: [String], $fin_code: [String], $ops_code: [String], $trader_name: String, $order_no: String, $started_at: [Float], $term: String, $limit: Int) {
  dataSource: order_sales_ext_kh(service_no: $service_no, fin_code: $fin_code, ops_code: $ops_code, term: $term, trader_name: $trader_name, order_no: $order_no, control_center_id: $control_center_id, started_at: $started_at, limit: $limit, reflection_id: [1, 2]) {
    id
    order_no
    type
    biz_code
    fin_code
    ops_code
    trader_code
    trader_name
    status
    processing_status
    started_at
    term
    billing_no
    amount
    biz_type
    service_no
    reflection_id
    control_center
    control_element
    related_no
    billing_status
    gross_margin
    remarks
    cat_1st
    cargo_name
    trader_name_act
    manager_name
    plate_no
    carrier_name
  }
  dataOptiong002: field_option(option_code: "g002") {
    value
    text
  }
  dataOptionsd001: field_option(option_code: "sd001") {
    value
    text
  }
  dataOptionsd002: field_option(option_code: "sd002") {
    value
    text
  }
  dataOptionsd004: field_option(option_code: "sd004") {
    value
    text
  }
}

`;



export default graphql(QueryToRender, {
  options: (props) => ({ variables: { control_center_id: props.control_center_id, term: props.term, started_at: props.started_at, fin_code: props.fin_code , ops_code: props.ops_code , order_no: props.order_no, trader_name: props.trader_name, limit: props.limit  } }),
})(RenderComponent);





