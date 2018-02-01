import React from 'react'
import PropTypes from 'prop-types';

import { Form, Input, InputNumber, Radio, Modal, DatePicker, Switch } from 'antd'
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


function pagePropsModal ({ visible, item = {}, onOk, onCancel, form: {getFieldDecorator, validateFields, getFieldsValue,} }) {


   function handleOk() {

      validateFields((err, values) => {
        
      if(err){return }

      if(values.showInPage == item.showInPage){delete values.showInPage; }
  
      if(values.showInPage != item.showInPage){ 
          if(values.showInPage){ values.pagination = {
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) => `${range[0]}-${range[1]} / ${total}`,
            pageSizeOptions: ['10', '20', '40', '100'],
            defaultPageSize: 10,
            pageSize: 10,
            current: 1,
            } 
          }else{values.pagination = false}
      }

      if(values.sizePage == item.sizePage){delete values.sizePage; }
      if(values.footerPage == item.footerPage){delete values.footerPage; }

     
      onOk(values);
      });
   }

  const modalOpts = {
    title: '页面显示设置',
    visible,
    onOk: handleOk,
    onCancel,
    wrapClassName: 'vertical-center-modal',
  }
  
  
  return (
    <Modal {...modalOpts}>
     <Form >
        <Form.Item label="分页显示"  {...formItemLayout} >
           {getFieldDecorator('showInPage', {
              initialValue: item.showInPage, valuePropName: 'checked' 
              }
            )(
            <Switch/>
            )}
        </Form.Item>
        <Form.Item label="表格大小"  {...formItemLayout} >
           {getFieldDecorator('sizePage', {
              initialValue: item.sizePage,
              }
            )(
            <Radio.Group size="default">
                <Radio.Button value="big">大</Radio.Button>
                <Radio.Button value="middle">中</Radio.Button>
                <Radio.Button value="small">小</Radio.Button>
            </Radio.Group>
            )}
        </Form.Item>        
        <Form.Item label="尾部显示"  {...formItemLayout} >
           {getFieldDecorator('footerPage', {
              initialValue: item.footerPage, valuePropName: 'checked' 
              }
            )(
            <Switch/>
            )}
        </Form.Item> 
     </Form>
    </Modal>

   )
  
}



export default Form.create()(pagePropsModal);