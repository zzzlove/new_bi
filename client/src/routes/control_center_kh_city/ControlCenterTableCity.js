import _ from 'lodash';
import { connect } from 'dva';
import React from 'react';
import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';
import { Table, Spin, Icon, Button, Popconfirm, Row, Col, Card, Badge, Popover, DatePicker, Tabs } from 'antd';
import moment from 'moment';
import 'antd/dist/antd.css';
import { Search } from '../../components';
const { RangePicker } = DatePicker;

import ServiceTable from '../control_center_kh/ServiceTable';
import Formatter from '../../utils/formatter';


function openNewLink(url) {
  window.open(url)
}

class RenderComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
       field: "name",
       name: '',
       };
  }

  handleSearchValueChange(value) {
   let {field, keyword} = value;
   if (field == 'name'){
        this.setState({ name: keyword,  field: 'name' })
    }
  }



 render() {


  const { loading, error, dataSource, dataOptiong006 } = this.props.data;

  const { name, field } = this.state;

  const searchGroupProps = {
    keyword: '',
    size: 'large',
    select: true,
    selectOptions: [{ value: 'name', name: '运营城市' }],
    selectProps: {
      defaultValue: field,
    },
    onSearch: (value) => {
       this.handleSearchValueChange(value)
    },
  }



   const columns = [{
    title: '经营管理',
    dataIndex: 'at_column_action',
    key: 'at_column_action',
    width: 300,
    render: (text, record, index) => (<span>
      <Button onClick={() => openNewLink(`control_center_kh_daily?id=${record.id}`)}>日经营管理 <Icon style={{marginLeft:'1px', padding:'1px', fontSize: 12}} type="line-chart"/></Button> {'  '}
      <Button onClick={() => openNewLink(`control_center_kh_weekly?id=${record.id}`)}>周经营管理 <Icon style={{marginLeft:'1px', padding:'1px', fontSize: 12}} type="bar-chart"/></Button> {'  '}
      <Button onClick={() => openNewLink(`control_center_kh_monthly?id=${record.id}`)}>月经营分析 <Icon style={{marginLeft:'1px', padding:'1px', fontSize: 12}} type="pie-chart"/></Button> {'  '}
     </span>),
    }, {
    title: '运营城市',
    dataIndex: 'name',
    key: '1',
    sorter: (a, b) => { let x = a.name||"0"; let y = b.name||"0"; if(x<y) return -1; else if(x>y) return 1; else return 0; },
    width: 150,
    }, {
    title: '区域',
    dataIndex: 'cat_2nd',
    key: '3',
    width: 150,
    filters: dataOptiong006,
    onFilter: (value, record) => record.cat_2nd === value,
    }, {
    title: '当日产值',
    dataIndex: 'amount_last',
    key: '5',
    width: 100,
    render: (text)=><div style={{textAlign: 'right'}}>{Formatter.money(text, ",")}</div>,
    }, {
    title: '当月产值累计',
    dataIndex: 'amount',
    key: '2172',
    width: 100,
    render: (text)=><div style={{textAlign: 'right'}}>{Formatter.money(text, ",")}</div>,
    }, {
    title: '当年产值累计',
    dataIndex: 'amount_ytd',
    key: '2173',
    render: (text)=><div style={{textAlign: 'right'}}>{Formatter.money(text, ",")}</div>,
    width: 100,
    }];

  if (loading) {
    return (<div><Spin size={'large'} tip={'数据加载中 Loading...'}/></div>)
  }
  if (error) {
    if(error.message.indexOf('Network')!=-1){dispatch(routerRedux.push('/login'))}
    return (<p>{error.message}</p>)
  }

  let dataRender = dataSource.filter((d) => {
    if (field == 'name') {
      return name ? d.name.indexOf(name) != -1 : true
    }

  })

  function showTotal(total, range) {
    return `${range[0]}-${range[1]} / ${total}`;
  }

  var totalRecordNumbers = dataRender.length;

  const tabelDefinition = {
            bordered: false,
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
            <Table {...tabelDefinition} expandedRowRender={record => <ServiceTable control_center_id={record.id}/>}/>

     </div>
    )

 }
}

const QueryToRender = gql`
query MyQuery {
  dataSource: control_center(type: "city") {
    id
		name
    owner
    cat_1st 
    cat_2nd
    amount
    amount_last
    amount_ytd
  }
  dataOptiong006: field_option(option_code: "g006") {
    value
    text
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


