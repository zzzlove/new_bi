import _ from 'lodash';
import { connect } from 'dva';
import React from 'react';
import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';
import { Table, Spin, Icon, Button, Popconfirm, Row, Col, Card, Badge, Popover, DatePicker } from 'antd';
import 'antd/dist/antd.css';



function RenderComponent ({data}) {


  const { loading, error, dataSource} = data;

  if (loading) {
    return (<div><Spin size={'large'} tip={'数据加载中 Loading...'}/></div>)
  }
  if (error) {
    return (<p>{error.message}</p>)
  }

  var ops_code_distinct =  _.sortBy(_.uniqBy(dataSource, 'ops_code').map(d=>{return {value: d.ops_code, text: d.ops_code}}), 'value');

  const columns = [{
    title: '',
    dataIndex: 'id',
    key: 'id',
    width: 10,
    className:'test1',
    //render: (text, record, index) => {return <Badge status={text}/> },
    //fixed: 'left',
    //  render: (text, record, index) => {if(record.remarks){return <Popover content={record.remarks}><Badge status={text}/></Popover>} else {return <Badge status={text}/>}},
  }, {
    title: '发票代码',
    dataIndex: 'invoice_no',
    key: 'invoice_no',
    width: 40,
    sorter: (a, b) => { let x = a.status||"0"; let y = b.status||"0"; if(x<y) return -1; else if(x>y) return 1; else return 0; },
  },
    {
      title: '发票号码',
      dataIndex: 'invoice_code',
      key: 'invoice_code',
      width: 40,
      sorter: (a, b) => { let x = a.status||"0"; let y = b.status||"0"; if(x<y) return -1; else if(x>y) return 1; else return 0; },
    },
    {
      title: '购方企业名称',
      dataIndex: 'buyer_name',
      key: 'buyer_name',
      width: 80,
      sorter: (a, b) => { let x = a.status||"0"; let y = b.status||"0"; if(x<y) return -1; else if(x>y) return 1; else return 0; },
    },
    {
      title: '购方税号',
      dataIndex: 'buyer_tax_no',
      key: 'buyer_tax_no',
      width: 80,
      sorter: (a, b) => { let x = a.status||"0"; let y = b.status||"0"; if(x<y) return -1; else if(x>y) return 1; else return 0; },
    },
    {
      title: '银行账号',
      dataIndex: 'bank_no',
      key: 'bank_no',
      width: 80,
      sorter: (a, b) => { let x = a.status||"0"; let y = b.status||"0"; if(x<y) return -1; else if(x>y) return 1; else return 0; },
    },
    {
      title: '地址电话',
      dataIndex: 'adddress',
      key: 'adddress',
      width: 80,
      sorter: (a, b) => { let x = a.status||"0"; let y = b.status||"0"; if(x<y) return -1; else if(x>y) return 1; else return 0; },
    },
    {
      title: '开票日期',
      dataIndex: 'invoicing_date',
      key: 'invoicing_date',
      width: 40,
      sorter: (a, b) => { let x = a.status||"0"; let y = b.status||"0"; if(x<y) return -1; else if(x>y) return 1; else return 0; },
      render: (text, record) => { if(text){ return <span>{new Date(text).Format('yyyy-MM-dd')}</span> } else { return null;} }
    },
    {
      title: '商品编码版本号',
      dataIndex: 'goods_version',
      key: 'goods_version',
      width: 30,
      sorter: (a, b) => { let x = a.status||"0"; let y = b.status||"0"; if(x<y) return -1; else if(x>y) return 1; else return 0; },
    },
    {
      title: '单据号',
      dataIndex: 'voucher_no',
      key: 'voucher_no',
      width: 20,
      sorter: (a, b) => { let x = a.status||"0"; let y = b.status||"0"; if(x<y) return -1; else if(x>y) return 1; else return 0; },
    },
    {
      title: '商品名称',
      dataIndex: 'goods_name',
      key: 'goods_name',
      width: 100,
      sorter: (a, b) => { let x = a.status||"0"; let y = b.status||"0"; if(x<y) return -1; else if(x>y) return 1; else return 0; },
    },
    {
      title: '规格',
      dataIndex: 'goods_size',
      key: 'goods_size',
      width: 20,
      sorter: (a, b) => { let x = a.status||"0"; let y = b.status||"0"; if(x<y) return -1; else if(x>y) return 1; else return 0; },
    },
    {
      title: '单位',
      dataIndex: 'goods_unit',
      key: 'goods_unit',
      width: 20,
      sorter: (a, b) => { let x = a.status||"0"; let y = b.status||"0"; if(x<y) return -1; else if(x>y) return 1; else return 0; },
    },
    {
      title: '数量',
      dataIndex: 'goods_count',
      key: 'goods_count',
      width: 20,
      sorter: (a, b) => { let x = a.status||"0"; let y = b.status||"0"; if(x<y) return -1; else if(x>y) return 1; else return 0; },
    },
    {
      title: '单价',
      dataIndex: 'goods_price',
      key: 'goods_price',
      width: 20,
      sorter: (a, b) => { let x = a.status||"0"; let y = b.status||"0"; if(x<y) return -1; else if(x>y) return 1; else return 0; },
    },
    {
      title: '金额',
      dataIndex: 'goods_amount',
      key: 'goods_amount',
      width: 40,
      sorter: (a, b) => { let x = a.status||"0"; let y = b.status||"0"; if(x<y) return -1; else if(x>y) return 1; else return 0; },
    },
    {
      title: '税率',
      dataIndex: 'tax_rate',
      key: 'tax_rate',
      width: 20,
      sorter: (a, b) => { let x = a.status||"0"; let y = b.status||"0"; if(x<y) return -1; else if(x>y) return 1; else return 0; },
      render: (text, record) => { if(text){ return text+'%'; } else { return null;} }
    },
    {
      title: '税额',
      dataIndex: 'tax_amount',
      key: 'tax_amount',
      width: 40,
      sorter: (a, b) => { let x = a.status||"0"; let y = b.status||"0"; if(x<y) return -1; else if(x>y) return 1; else return 0; },
    },
    {
      title: '税收分类编码',
      dataIndex: 'tax_no',
      key: 'tax_no',
      width: 60,
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
    scroll: {x: '130%'}
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


export default graphql(QueryToRender, {
  options: (props) => ({ variables: { fin_code: props.fin_code} }),
})(RenderComponent);





