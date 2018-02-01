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

  console.log(distValues);

  const topColResponsiveProps = {
    xs: 24,
    sm: 12,
    md: 12,
    lg: 12,
    xl: 6,
    style: { marginBottom: 24 },
  };

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
      dataIndex: 'alter_type',
      key: 'alter_type',
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
      title: '环比比值',
      dataIndex: 'pct',
      key: 'pct',
      width: 150,
      filters: distValues.type.map(d=>{return {value: d, text: d}}),
      onFilter: (value, record) => record.type === value,
      /*sorter: (a, b) => { let x = a.status||"0"; let y = b.status||"0"; if(x<y) return -1; else if(x>y) return 1; else return 0; },*/
      render:(text,it) => <div>
        <Tag color={ it.type== '大幅上升' || it.type=='明细上升'?'orange':it.type == '严重下滑'||it.type=='明细下滑'?'green':'blue'}>{it.type}</Tag>&nbsp;&nbsp;&nbsp;
        <Trend flag={it.pct >= 0 ? 'up' : 'down'} style={{ marginRight: 16 }}>
          <span className={styles.trendText}>{it.pct}%</span>
        </Trend>
      </div>
    },
    {
      title: '明细',
      dataIndex: 'id',
      key: 'id',
      width: 150,
      className:'{styles.selfSize}',
      /*sorter: (a, b) => { let x = a.status||"0"; let y = b.status||"0"; if(x<y) return -1; else if(x>y) return 1; else return 0; },*/
      //format: function(text,it){console.log(it);return text;},
      render:function(text,it,index) {
        data.rowData = it;
        return <DetailCard {...data}/>
      },


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


const QueryToRender = gql`
query MyQuery{
  dataSource:fin_invoice_manual{
    id,invoice_no,invoice_code,buyer_name,buyer_tax_no,bank_no,adddress,invoicing_date,goods_version,voucher_no,goods_name,goods_size,goods_unit,goods_count,goods_price,goods_amount,tax_rate,tax_amount,tax_no
  }
}

`;

const QueryAlter = gql`
query MyQuery($t_run: String){
  dataSource:control_center_alter(t_run:$t_run, order: ["control_center_id", ["t_run", "DESC"],"alter_type"]){
   id,
   t_run,
   type,
   amount_1,
   amount_2,
   pct,
   count,
   record_type,
   status,
   alter_type,
   message,
   control_center_id,
   chart_1st,
   chart_2nd,
   control_center
  }
}
`


export default graphql(QueryAlter, {
  options: (props) => ({ variables: { $t_run: '201711'} }),
})(RenderComponent);





