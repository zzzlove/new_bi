import React from 'react'
import PropTypes from 'prop-types';
import { compose, gql, graphql } from 'react-apollo';
import { Form, Input, InputNumber, Radio, Modal, DatePicker, Checkbox, Select, Spin, } from 'antd'
const { RangePicker } = DatePicker;
import moment from 'moment';

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 15,
  },
}


function modal ({ visible, item = {}, onOk, dataOption, onCancel, form: {getFieldDecorator, validateFields, getFieldsValue,} }) {

  if (dataOption.loading) {
    return (<div><Spin size={'large'} tip={'数据加载中 Loading...'}/></div>)
  }
  if (dataOption.error) {
    return message.error(JSON.stringify(dataOption.error))
  }  

const { DtOptnentry_type, DtOptnmanualEntryAccount, DtOptnfin_code, DtOptnops_code } = dataOption;  //153.2

   function handleOk() {

      validateFields((err, values) => {
        
      if(err){return }

      if(!values.transaction_no){delete values.transaction_no; }
      if(!values.type){delete values.type; }
      if(!values.ops_id){delete values.ops_id; }

      onOk(values);
      });
   }

  const modalOpts = {
    title: '查询参数设置 -- 用于从服务器获取数据',
    visible,
    onOk: handleOk,
    onCancel,
    wrapClassName: 'vertical-center-modal',
  }
  
  
  return (
    <Modal {...modalOpts}>
     <Form >
        
        <Form.Item label={'交易号'} {...formItemLayout} >
           {getFieldDecorator('transaction_no', {
                initialValue: item.transaction_no,
              }
            )(
            <Input  />   
            )}
        </Form.Item>         
        <Form.Item label={'类别'} {...formItemLayout} >
           {getFieldDecorator('type', {
                initialValue: item.type,
              }
            )(
            <Select allowClear={true} allowClear={true} optionFilterProp={'title'} optionFilterProp={'title'} showSearch={true} showSearch={true} >
              {DtOptnentry_type.map(d => <Select.Option key={d.value} title={d.text}>{d.text}</Select.Option>)}
            </Select>         
            )}
        </Form.Item>         
        <Form.Item label={'经营主体'} {...formItemLayout} >
           {getFieldDecorator('ops_id', {
                initialValue: item.ops_id,
              }
            )(
            <Select allowClear={true} allowClear={true} optionFilterProp={'title'} optionFilterProp={'title'} showSearch={true} showSearch={true} >
              {DtOptnops_code.map(d => <Select.Option key={d.value} title={d.text}>{d.text}</Select.Option>)}
            </Select>         
            )}
        </Form.Item> 
     </Form>
    </Modal>

   )
  
}


const ModelCreate = Form.create()(modal);

//173.5
const DataOptionQuery = gql`
query MyQuery {
  DtOptnentry_type: field_option(option_code: "entry_type") {value, text}
  DtOptnmanualEntryAccount: account(concerning_biz: "manual"){value: code, text: name}
  DtOptnfin_code: profile(is_fin_code: true){value: id, text: name_abbr}
  DtOptnops_code: profile(is_biz_code: true, biz_code_type: "ops_code"){value: id, text: name_abbr}
}
`;

export default graphql(DataOptionQuery, { name: 'dataOption' })(ModelCreate);