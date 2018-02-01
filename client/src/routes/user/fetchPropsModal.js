import React from 'react'
import PropTypes from 'prop-types';

import { Form, Input, InputNumber, Radio, Modal, DatePicker, Checkbox, Select,  } from 'antd'
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


function modal ({ visible, item = {}, onOk, onCancel, form: {getFieldDecorator, validateFields, getFieldsValue,} }) {


   function handleOk() {

      validateFields((err, values) => {
        
      if(err){return }

      if(!values.id){delete values.id; }

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
        
        <Form.Item label="编号"  {...formItemLayout} >
           {getFieldDecorator('id', {
                initialValue: item.id,
              }
            )(
            <InputNumber  />   
            )}
        </Form.Item> 
     </Form>
    </Modal>

   )
  
}


modal.propTypes = {
  form: PropTypes.object.isRequired,
  visible: PropTypes.bool,
  item: PropTypes.object,
  onCancel: PropTypes.func,
  onOk: PropTypes.func,
}


export default Form.create()(modal);