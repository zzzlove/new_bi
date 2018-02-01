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
       field: "control_center",
       control_center: '',
       };
  } 
 
  handleSearchValueChange(value) {
   let {field, keyword} = value;
   if (field == 'control_center'){
        this.setState({ control_center: keyword,  field: 'control_center' })
    }
  } 


  
 render() {
  
 
  const { loading, error, dataSource, } = this.props.data; 

  const { control_center, field } = this.state;   
  
  const searchGroupProps = {
    keyword: '',
    size: 'large',
    select: true,
    selectOptions: [{ value: 'control_center', name: '线路|城市' }],
    selectProps: {
      defaultValue: field,
    },
    onSearch: (value) => {
       this.handleSearchValueChange(value)
    },
  }  
  
  
  
  const columns = [{
  title: '线路/城市',
  dataIndex: 'control_center',
  key: '5035',
  width: 150,
  sorter: (a, b) => { let x = a.control_center||"0"; let y = b.control_center||"0"; if(x<y) return -1; else if(x>y) return 1; else return 0; },
  }, {
  title: '运作方式',
  dataIndex: 'control_element',
  key: '5022',
  width: 150,
  sorter: (a, b) => { let x = a.control_element||"0"; let y = b.control_element||"0"; if(x<y) return -1; else if(x>y) return 1; else return 0; },
  }, {
  title: '月份',
  dataIndex: 't_run',
  key: '4998',
  width: 150,
  sorter: (a, b) => { let x = a.t_run||"0"; let y = b.t_run||"0"; if(x<y) return -1; else if(x>y) return 1; else return 0; },
  }, {
  title: '产值',
  dataIndex: 'amount',
  key: '5000',
  render: (text)=><div style={{textAlign: 'right'}}>{formatter.money(text, ",")}</div>,
  width: 150,
  sorter: (a, b) => { let x=a.amount||0; let y=b.amount||0; if(x<y) return -1; else if(x>y) return 1; else return 0; },
  }, {
  title: '单数',
  dataIndex: 'count',
  key: '5004',
  width: 150,
  sorter: (a, b) => { let x=a.count||0; let y=b.count||0; if(x<y) return -1; else if(x>y) return 1; else return 0; },
  }, {
  title: '单价',
  dataIndex: 'amount_avg',
  key: '99',
  width: 150,
  render: (text)=><div style={{textAlign: 'right'}}>{formatter.money(text, ",")}</div>,
  sorter: (a, b) => { let x=a.amount_avg||0; let y=b.amount_avg||0; if(x<y) return -1; else if(x>y) return 1; else return 0; },
  }, {
  title: '客户数',
  dataIndex: 'count_distinct',
  key: '5041',
  width: 150,
  sorter: (a, b) => { let x=a.count_distinct||0; let y=b.count_distinct||0; if(x<y) return -1; else if(x>y) return 1; else return 0; },
  }, {
  title: '年产值累计',
  dataIndex: 'amount_acc',
  key: '5015',
  width: 150,
  render: (text)=><div style={{textAlign: 'right'}}>{formatter.money(text, ",")}</div>,
  sorter: (a, b) => { let x=a.amount_acc||0; let y=b.amount_acc||0; if(x<y) return -1; else if(x>y) return 1; else return 0; },
  }, {
  title: '占本月产值比',
  dataIndex: 'pct',
  key: '5045',
  width: 150,
  sorter: (a, b) => { let x=a.pct||0; let y=b.pct||0; if(x<y) return -1; else if(x>y) return 1; else return 0; },
  }, {
  title: '预算累计',
  dataIndex: 'amount_budget_acc',
  render: (text)=><div style={{textAlign: 'right'}}>{formatter.money(text, ",")}</div>,
  key: '4997',
  width: 150,
  sorter: (a, b) => { let x=a.amount_budget_acc||0; let y=b.amount_budget_acc||0; if(x<y) return -1; else if(x>y) return 1; else return 0; },
  }, {
  title: '当月预算',
  dataIndex: 'amount_budget',
  key: '5014',
  width: 150,
  render: (text)=><div style={{textAlign: 'right'}}>{formatter.money(text, ",")}</div>,
  sorter: (a, b) => { let x=a.amount_budget||0; let y=b.amount_budget||0; if(x<y) return -1; else if(x>y) return 1; else return 0; },

  }];

  if (loading) {
    return (<div><Spin size={'large'} tip={'数据加载中 Loading...'}/></div>)
  }
  if (error) {
    return (<p>{error.message}</p>)
  }
  
  let dataRender = dataSource.filter((d) => {
    if (field == 'control_center') {
      return control_center ? d.control_center.indexOf(control_center) != -1 : true
    }
  })   
  
  function showTotal(total, range) {
    return `${range[0]}-${range[1]} / ${total}`;
  }

  var totalRecordNumbers = dataRender.length;
  
  const tabelDefinition = {
            bordered: true,
            rowKey: 'id',
            pagination: {showSizeChanger: true, total: totalRecordNumbers, showTotal: showTotal},
            size: 'small',
            showHeader: true,
            dataSource: dataRender,
            columns: columns,
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
query MyQuery($control_center_id: [Int], $t_run: String) {
  dataSource: control_center_actual(control_center_id: $control_center_id, t_run: $t_run, type:["city_inc2nd","line_inc2nd","service_inc2nd","region_inc2nd"],record_type:"monthly",) {
    id
    t_run
    type
    t_time
    amount
    count
    amount_avg
    amount_acc
    t_run_gr
    amount_budget_acc
    amount_budget
    control_center_id
    control_element
    control_center
    amount_compared
    amount_compared1
    amount_compared2
    count_distinct
    record_type
    pct
    xorder
  }
}
`;

export default graphql(QueryToRender, {
  options: (props) => ({ variables: { control_center_id: props.control_center_id, t_run: props.t_run } }),
})(RenderComponent);



