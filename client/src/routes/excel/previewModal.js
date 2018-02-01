import React from 'react'
import PropTypes from 'prop-types';
import OrderList from './finOrderList';

import {Table, Form, Spin, Input, InputNumber, Radio, Modal, DatePicker, message, Row, Col} from 'antd';

import moment from 'moment';

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
}

const modal = ({
                 visible,
                 onOk,
                 item = {},
                 onCancel,
                 form: {
                   getFieldDecorator,
                   validateFields,
                   getFieldsValue,
                 },
                 tableData,
                 loading
               }) => {
  function handleOk() {

    console.log('call onOk');
    onOk();
    validateFields((err, values) => {
      if (err) {
        return
      }
    })
  }



  if (loading) {
    return (<div><Spin size={'large'} tip={'数据加载中 Loading...'}/></div>)
  }

  //拼装数据
  console.log(tableData);
  console.log(typeof tableData);
  var tmpData = JSON.parse(tableData).sheet1;
  var dataSource = [];

  tmpData.forEach(function(value, index, array) {
    var tmpDSElement = new Object();
    tmpDSElement.id = index;
    tmpDSElement.invoice_no = value.发票代码;
    tmpDSElement.invoice_code = value.发票号码;
    tmpDSElement.buyer_name = value.购方企业名称;
    tmpDSElement.buyer_tax_no = value.购方税号;
    tmpDSElement.bank_no = value.银行账号;
    tmpDSElement.adddress = value.地址电话;
    tmpDSElement.invoicing_date = value.开票日期;
    tmpDSElement.goods_version = value.商品编码版本号;
    tmpDSElement.voucher_no = value.单据号;
    tmpDSElement.goods_name = value.商品名称;
    tmpDSElement.goods_size = value.规格;
    tmpDSElement.goods_count = value.数量;
    tmpDSElement.goods_price = value.单价;
    tmpDSElement.goods_amount = value.金额;
    tmpDSElement.tax_rate = value.税率;
    tmpDSElement.tax_amount = value.税额;
    tmpDSElement.tax_no = value.税收分类编码;
    dataSource.push(tmpDSElement);
  });



  const modalOpts = {
    title: '预览',
    visible,
    onOk: handleOk,
    onCancel,
    wrapClassName: 'vertical-center-modal',
  }

  function showTotal(total, range) {
    return `${range[0]}-${range[1]} / ${total}`;
  }

  var totalRecordNumbers = dataSource.length;
  console.log(totalRecordNumbers);

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
    <Modal {...modalOpts}>
      <Table {...tabelDefinition}/>
    </Modal>
  )
}

modal.propTypes = {
  form: PropTypes.object.isRequired,
  visible: PropTypes.bool,
  type: PropTypes.string,
  item: PropTypes.object,
  onCancel: PropTypes.func,
  onOk: PropTypes.func,
}

export default Form.create()(modal);





