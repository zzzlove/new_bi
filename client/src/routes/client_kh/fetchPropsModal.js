import React from 'react'
import PropTypes from 'prop-types';

import { Form, Input, InputNumber, Radio, Modal, DatePicker } from 'antd'
const FormItem = Form.Item
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


function fetchPropsModal ({ visible, item = {}, onOk, onCancel, form: {getFieldDecorator, validateFields, getFieldsValue,} }) {


   function handleOk() {

      validateFields((err, values) => {
        
      if(err){return }

        if(!values.order_no){delete values.order_no; }
        if(!values.fin_code){delete values.fin_code; }
        if(!values.ops_code){delete values.ops_code; }
        if(!values.trader_name){delete values.trader_name; }
        if(!values.started_at||!values.started_at[0]){delete values.started_at; }
        else{ values.started_at=[values.started_at[0].valueOf(), values.started_at[1].valueOf()]}
/*        
        if (Object.getOwnPropertyNames(values).length == 0) {
          onCancel()
          return
        } 
        
        const data = {
          ...values,
          reflection_id: [1, 2],  //default value built-in, 不一定需要
        }
*/

      
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
        <Form.Item label="运单号" hasFeedback {...formItemLayout} >
           {getFieldDecorator('order_no', {
              initialValue: item.order_no,
              }
            )(
            <Input/>
            )}
        </Form.Item>
        <Form.Item label="财务主体" hasFeedback {...formItemLayout} >
           {getFieldDecorator('fin_code', {
              initialValue: item.fin_code,
              }
            )(
            <Input/>
            )}
        </Form.Item>        
        <Form.Item label="运营主体" hasFeedback {...formItemLayout} >
           {getFieldDecorator('ops_code', {
              initialValue: item.ops_code,
              }
            )(
            <Input/>
            )}
        </Form.Item> 
        <Form.Item label="客户名称" hasFeedback {...formItemLayout} >
           {getFieldDecorator('trader_name', {
              initialValue: item.trader_name,
              }
            )(
            <Input/>
            )}
        </Form.Item> 
        <Form.Item label="开单时间" {...formItemLayout} >
           {getFieldDecorator('started_at', {
              initialValue: item.started_at? [moment(item.started_at[0]), moment(item.started_at[1])]: null,
              }
            )(
            <RangePicker showTime={{defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('00:00:00', 'HH:mm:ss')]}} format="YYYY-MM-DD HH:mm:ss"/>
            )}
        </Form.Item> 
     </Form>
    </Modal>

   )
  
}

/*
modal.propTypes = {
  form: PropTypes.object.isRequired,
  visible: PropTypes.bool,
  type: PropTypes.string,
  item: PropTypes.object,
  onCancel: PropTypes.func,
  onOk: PropTypes.func,
}
*/

export default Form.create()(fetchPropsModal);
