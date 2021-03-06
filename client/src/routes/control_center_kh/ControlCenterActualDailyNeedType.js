import _ from 'lodash';
import { connect } from 'dva';
import React from 'react';
import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';
import { Table, Spin, Icon, Button, Popconfirm, Row, Col, Card, Badge, Popover, DatePicker } from 'antd';
import moment from 'moment';
import 'antd/dist/antd.css';
import { Search } from '../../components';
import config from '../../utils/config';
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


  const { loading, error, dataSource, dataOptionsd003 } = this.props.data;

  const { type } = this.props.data.variables;

  const { control_center, field } = this.state;

  const user = this.props.user;

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
  filters: dataOptionsd003,
  onFilter: (value, record) => record.control_element === value,
  sorter: (a, b) => { let x = a.control_element||"0"; let y = b.control_element||"0"; if(x<y) return -1; else if(x>y) return 1; else return 0; },
  }, {
  title: '日期',
  dataIndex: 't_run',
  key: '4998',
  width: 150,
  sorter: (a, b) => { let x = a.t_run||"0"; let y = b.t_run||"0"; if(x<y) return -1; else if(x>y) return 1; else return 0; },
  }, {
  title: '日产值',
  dataIndex: 'amount',
  key: '5000',
  width: 150,
  render: (text)=><div style={{textAlign: 'right'}}>{formatter.money(text, ",")}</div>,  
  sorter: (a, b) => { let x=a.amount||0; let y=b.amount||0; if(x<y) return -1; else if(x>y) return 1; else return 0; },
  }, {
  title: '日单数',
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
  title: '月产值累计',
  dataIndex: 'amount_acc',
  key: '5015',
  render: (text)=><div style={{textAlign: 'right'}}>{formatter.money(text, ",")}</div>,  
  width: 150,
  sorter: (a, b) => { let x=a.amount_acc||0; let y=b.amount_acc||0; if(x<y) return -1; else if(x>y) return 1; else return 0; },
  }, {
  title: '当月累计日均',
  dataIndex: 'amount_avg',
  key: '21',
  width: 150,
  render: (text)=><div style={{textAlign: 'right'}}>{formatter.money(text, ",")}</div>,  
  sorter: (a, b) => { let x=a.amount_avg||0; let y=b.amount_avg||0; if(x<y) return -1; else if(x>y) return 1; else return 0; },
  }, {
  title: '上月日均',
  dataIndex: 'amount_compared',
  key: '31',
  width: 150,
  render: (text)=><div style={{textAlign: 'right'}}>{formatter.money(text, ",")}</div>,  
  sorter: (a, b) => { let x=a.amount_compared||0; let y=b.amount_compared||0; if(x<y) return -1; else if(x>y) return 1; else return 0; },
  }, {
  title: '预算累计',
  dataIndex: 'amount_budget_acc',
  key: '4997',
  width: 150,
  render: (text)=><div style={{textAlign: 'right'}}>{formatter.money(text, ",")}</div>,  
  sorter: (a, b) => { let x=a.amount_budget_acc||0; let y=b.amount_budget_acc||0; if(x<y) return -1; else if(x>y) return 1; else return 0; },
  }, {
  title: '累计完成比',
  dataIndex: 'pct',
  key: '11',
  width: 150,
  sorter: (a, b) => { let x=a.pct||0; let y=b.pct||0; if(x<y) return -1; else if(x>y) return 1; else return 0; },
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

   var isShowExport = 'none';
   const showExport = function(){
     user.roles.forEach(function(value, index, array){
       config.exportRole.forEach(function(cvalue, cindex, carray){
         if(value == cvalue){;
           isShowExport = null;
           console.log('-- show --');
         }
       })
     })
     return false;
   } ();

   const doExport = function(){
     var excelId = '';
     if(type == 'service_inc' ){
       excelId = 'controlCenterActualDailyServiceInc';
     }else if(type == 'line_inc'){
       excelId = 'controlCenterActualDailyLineInc';
     }else if(type == 'city_inc'){
       excelId = 'controlCenterActualDailyCityInc';
     }

     var url = config.baseURL+config.baseExcelExportUrl+'?excelId='+excelId;

     if(control_center){
       url=url+'&control_center='+control_center;
     }
     //add default param
     url=url+'&record_type=daily';
     window.open(url);
   }



  return (
     <div>
        <Row gutter={24}>
          <Col span={16}  style={{ marginBottom: 16, textAlign: 'left' }}>
            <Search {...searchGroupProps} />
          </Col>
          <Col span={2} style={{display:isShowExport}}>
            <Button type="primary" icon="download" onClick={doExport}>导出Excel</Button>
          </Col>
        </Row>
        <Table {...tabelDefinition}/>
     </div>
    )

 }
}

const QueryToRender = gql`
query MyQuery($control_center_id: [Int], $type: [String], $control_element: [String], $t_time: [Float]) {
  dataSource: control_center_actual(control_center_id: $control_center_id, t_time: $t_time, type: $type, control_element: $control_element, record_type:"daily", order: ["t_run"]) {
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
 dataOptionsd003: field_option(option_code: "sd003"){value, text}
}
`;

function mapStateToProps(state) {
  return {
    user: state.app.user
  }
}

export default connect(mapStateToProps)(graphql(QueryToRender, {
  options: (props) => ({ variables: { control_center_id: props.control_center_id, type: props.type, t_time: props.t_time, control_element: props.control_element } }),
})(RenderComponent));



