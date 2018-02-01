import _ from 'lodash';
import { connect } from 'dva';
import React from 'react';
import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';
import { Table, Spin, Progress,Tooltip,Tag,Icon, Button, Popconfirm, Row, Col, Card, Badge, Popover, DatePicker } from 'antd';
import 'antd/dist/antd.css';

import numeral from 'numeral';
import styles from './ControlCenterAlter.less'
import cardStyle from './chartCard.less'
import {ChartCard,Field,Trend,DetailCard}  from '../../components';
import {formatter,getDistinctValues} from '../../utils';



function RenderComponent ({data}) {


  const { loading, error, dataSource} = data;

  if (loading) {
    return (<div><Spin size={'large'} tip={'数据加载中 Loading...'}/></div>)
  }
  if (error) {
    return (<p>{error.message}</p>)
  }

  //var ops_code_distinct =  _.sortBy(_.uniqBy(dataSource, 'ops_code').map(d=>{return {value: d.ops_code, text: d.ops_code}}), 'value');

  const yuan = val => `&yen; ${numeral(val).format('0,0')}`;

  const distValues = getDistinctValues(dataSource, ['control_center', 'alter_type','t_run','type']);

  const columns = [ {
    title: '月份',
    dataIndex: 't_run',
    key: 't_run',
    width: 60,
    filters: distValues.t_run.map(d=>{return {value: d, text: d}}),
    onFilter: (value, record) => record.t_run === value,
    /*sorter: (a, b) => { let x = a.status||"0"; let y = b.status||"0"; if(x<y) return -1; else if(x>y) return 1; else return 0; },*/
    render: (text, it) =>  <div className={styles.listContent}>
      <div>
        <p>{text}</p>
      </div>

    </div>

  },{
    title: '运营主体',
    dataIndex: 'control_center',
    key: 'control_center',
    width: 80,
    filters: distValues.control_center.map(d=>{return {value: d, text: d}}),
    onFilter: (value, record) => record.control_center === value,
    /*sorter: (a, b) => { let x = a.status||"0"; let y = b.status||"0"; if(x<y) return -1; else if(x>y) return 1; else return 0; },*/
    render: (text, it) =>  <div className={styles.listContent}>
      <div>
        <p>{text}</p>
      </div>

    </div>

  },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
      width: 100,
      filters: distValues.alter_type.map(d=>{return {value: d, text: d}}),
      onFilter: (value, record) => record.alter_type === value,
      /*sorter: (a, b) => { let x = a.status||"0"; let y = b.status||"0"; if(x<y) return -1; else if(x>y) return 1; else return 0; },*/
      render: (text, it) =>  <div className={styles.listContent}>
        <div>
          <p>{text}</p>
        </div>

      </div>

    },
    {
      title: '产值',
      dataIndex: 'amount',
      key: 'amount',
      width: 150,
      filters: distValues.type.map(d=>{return {value: d, text: d}}),
      onFilter: (value, record) => record.type === value,
      sorter: (a, b) => { let x = a.status||"0"; let y = b.status||"0"; if(x<y) return -1; else if(x>y) return 1; else return 0; },
      //formatter:function(value){return formatter.money(value, ",")},
      render: (text, it) =>  <div className={styles.listContent}>
        <div>
          <p>{formatter.money(text, ",")}</p>
        </div>

      </div>

    },
    {
      title: '票数',
      dataIndex: 'count',
      key: 'count',
      width: 150,
      filters: distValues.type.map(d=>{return {value: d, text: d}}),
      onFilter: (value, record) => record.type === value,
      sorter: (a, b) => { let x = a.status||"0"; let y = b.status||"0"; if(x<y) return -1; else if(x>y) return 1; else return 0; },

    }

  ];



  if (loading) {
    return (<div><Spin size={'large'} tip={'数据加载中 Loading...'}/></div>)
  }
  if (error) {
    return (<p>{error.message}</p>)
  }

  function showTotal(total, range) {
    return `${range[0]}-${range[1]} / ${total}`;
  }

  var totalRecordNumbers = dataSource.length;


  const tabelDefinition = {
    bordered: true,
    rowKey: 'id',
    pagination: {showSizeChanger: true, total: totalRecordNumbers, showTotal: showTotal},
    size: 'small',
    showHeader: true,
    dataSource: dataSource,
    columns: columns,
    scroll: {x: 800}
  };



  return (
    <div>
      <Table {...tabelDefinition}/>
    </div>
  )

}



const QueryAlter = gql`
query MyQuery{
  dataSource:chart_data(type:"gmv_month", order: ["t_run", ["t_run", "DESC"]]){
   id,
   t_run,
   type,
   amount,
   count,
   control_center
  }
}
`


export default graphql(QueryAlter, {
  options: (props) => ({ variables: { $t_run: '201711'} }),
})(RenderComponent);





