import _ from 'lodash';
import { connect } from 'dva';
import React from 'react';
import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';
import { Table, Spin, Icon, Button, Popconfirm, Row, Col, Card, Badge, Popover, DatePicker } from 'antd';
import moment from 'moment';
import 'antd/dist/antd.css'; 
import { Search } from '../../components';
const { RangePicker } = DatePicker;
import {formatter} from '../../utils';

class RenderComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
         order_no: '',
         trader_name: '',
         service_no: '',
         fin_code: '',
         ops_code: '',
         billing_no: '',
         field: 'order_no',
       };
  } 
 
  handleSearchValueChange(value) {
   let {field, keyword} = value;
   if (field == 'order_no'){
        this.setState({ order_no: keyword,  field: 'order_no' })
    }
   if (field == 'trader_name'){
        this.setState({ trader_name: keyword,  field: 'trader_name' })
    }
   if (field == 'service_no'){
        this.setState({ service_no: keyword,  field: 'service_no' })
    }
   if (field == 'fin_code'){
        this.setState({ fin_code: keyword,  field: 'fin_code' })
    }
   if (field == 'ops_code'){
        this.setState({ ops_code: keyword,  field: 'ops_code' })
    }
   if (field == 'billing_no'){
        this.setState({ billing_no: keyword,  field: 'billing_no' })
    }
  } 


  
 render() {
  
 
  const { order_no, trader_name, field, service_no, fin_code, ops_code, billing_no } = this.state;
  
  const { loading, error, dataSource, countOrderSalesExtKh, dataOptiong003, dataOptiong002, dataOptionsd001, dataOptionsd002, dataOptionsd004 } = this.props.data; 

  const searchGroupProps = {
    keyword: '',
    size: 'large',
    select: true,
    selectOptions: [{ value: 'order_no', name: '单号' }, { value: 'trader_name', name: '会员名称' }, { value: 'service_no', name: '线路' }, { value: 'fin_code', name: '财务主体' }, { value: 'ops_code', name: '运营主体' }, { value: 'billing_no', name: '对账单号' }],
    selectProps: {
      defaultValue: field,
    },
    onSearch: (value) => {
       this.handleSearchValueChange(value)
    },
  }
  

 const columns = [{
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
  key: '1485',
  width: 130,
  sorter: (a, b) => { let x = a.term||"0"; let y = b.term||"0"; if(x<y) return -1; else if(x>y) return 1; else return 0; },
  }, {
  title: '线路',
  dataIndex: 'service_no',
  key: '2164',
  width: 150,
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
  key: '1894',
  width: 150,
  sorter: (a, b) => { let x = a.fin_code||"0"; let y = b.fin_code||"0"; if(x<y) return -1; else if(x>y) return 1; else return 0; },
  }, {
  title: '运营主体',
  dataIndex: 'ops_code',
  key: '1895',
  width: 150,
  sorter: (a, b) => { let x = a.ops_code||"0"; let y = b.ops_code||"0"; if(x<y) return -1; else if(x>y) return 1; else return 0; },
  }, {  
  title: '单号',
  dataIndex: 'order_no',
  key: '1447',
  width: 200,
  sorter: (a, b) => { let x = a.order_no||"0"; let y = b.order_no||"0"; if(x<y) return -1; else if(x>y) return 1; else return 0; },
  }, {
  title: '会员名称',
  dataIndex: 'trader_name',
  key: '1467',
  width: 450,
  sorter: (a, b) => { let x = a.trader_name||"0"; let y = b.trader_name||"0"; if(x<y) return -1; else if(x>y) return 1; else return 0; },
  }, {
  title: '开单时间',
  dataIndex: 'started_at',
  key: '1906',
  width: 250,
  render: (text, record) => { if(text){ return <span>{formatter.date(new Date(text),'yyyy-MM-dd hh:mm:ss')}</span> } else { return null;} },
  sorter: (a, b) => { let x=a.started_at||0; let y=b.started_at||0; if(x<y) return -1; else if(x>y) return 1; else return 0; },
  }, {
  title: '产值',
  dataIndex: 'amount',
  key: '1403',
  width: 150,
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
  width: 250,
  sorter: (a, b) => { let x=a.amount||0; let y=b.amount||0; if(x<y) return -1; else if(x>y) return 1; else return 0; },
  }, {    
  title: '数据来源',
  dataIndex: 'reflection_id',
  key: 'reflection_id',
  width: 120,
  render: (text, record) => { if(text==1){ return <span>新卡航</span> } else { return <span>老卡航</span>;} },
  sorter: (a, b) => { let x=a.amount||0; let y=b.amount||0; if(x<y) return -1; else if(x>y) return 1; else return 0; },
  }];
  


  if (error) {
    return (<p>{error.message}</p>)
  }

    const dataRender = loading?[]: 
        dataSource.filter((d) => {
            if (field == 'order_no') {
              return order_no ? d.order_no.indexOf(order_no) != -1 : true
            }
            if (field == 'trader_name') {
              return trader_name ? d.trader_name.indexOf(trader_name) != -1 : true
            }
            if (field == 'service_no') {
              return service_no ? d.service_no.indexOf(service_no) != -1 : true
            }
            if (field == 'fin_code') {
              return fin_code ? d.fin_code.indexOf(fin_code) != -1 : true
            }
            if (field == 'ops_code') {
              return ops_code ? d.ops_code.indexOf(ops_code) != -1 : true
            }
            if (field == 'billing_no') {
              return billing_no ? d.billing_no.indexOf(billing_no) != -1 : true
            }
          })

 /* 
  let dataRender = dataSource.filter((d) => {
    if (field == 'order_no') {
      return order_no ? d.order_no.indexOf(order_no) != -1 : true
    }
    if (field == 'trader_name') {
      return trader_name ? d.trader_name.indexOf(trader_name) != -1 : true
    }
    if (field == 'service_no') {
      return service_no ? d.service_no.indexOf(service_no) != -1 : true
    }
    if (field == 'fin_code') {
      return fin_code ? d.fin_code.indexOf(fin_code) != -1 : true
    }
    if (field == 'ops_code') {
      return ops_code ? d.ops_code.indexOf(ops_code) != -1 : true
    }
    if (field == 'billing_no') {
      return billing_no ? d.billing_no.indexOf(billing_no) != -1 : true
    }

  })
  
  */
  
  function showTotal(total, range) {
    return `${range[0]}-${range[1]} / ${total}`;
  }

  var totalRecordNumbers = dataRender.length;
  
  
  const tabelDefinition = {
            bordered: true,
            rowKey: 'id',
            pagination: {showSizeChanger: true, total: totalRecordNumbers, showTotal: showTotal, total: countOrderSalesExtKh},
            size: 'small',
            showHeader: true,
            dataSource: dataRender,
            columns: columns,
            loading: loading,
            scroll: {x: 1000}
          };
          
 

  return (
     <div>
        <Row gutter={24}>
          <Col span={16}  style={{ marginBottom: 16, textAlign: 'left' }}>
            <Search {...searchGroupProps} />
          </Col>
        </Row>
        <Table {...tabelDefinition}/>
     </div>
    )  
 }
}


const QueryToRender = gql`
query MyQuery ($control_center_id: [Int], $service_no: [String], $trader_name: String, $started_at: [Float], $term: String, $limit: Int, $offset: Int){
  dataSource: order_sales_ext_kh(service_no: $service_no, term: $term, trader_name: $trader_name, control_center_id: $control_center_id, limit: $limit, offset: $offset,
    started_at: $started_at, reflection_id: [1, 2]) {
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
  }
  countOrderSalesExtKh(service_no: $service_no, term: $term, trader_name: $trader_name, control_center_id: $control_center_id, started_at: $started_at, reflection_id: [1, 2])

  dataOptiong003: field_option(option_code: "g003") {
    value
    text
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
  options: (props) => ({ variables: { control_center_id: props.control_center_id, term: props.term, started_at: props.started_at } }),
})(RenderComponent);





