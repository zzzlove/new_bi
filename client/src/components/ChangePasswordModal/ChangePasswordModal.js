import React from 'react'
import PropTypes from 'prop-types';
import  crypto from 'crypto';

import { Form, Input, Modal } from 'antd'
const FormItem = Form.Item

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
}

const modal = ({
  user,
  visible,
  onOk,
  onCancel,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
    getFieldValue,
  },
}) => {
  function handleOk () {
    validateFields((errors) => {
      if (errors) {
        return
      }
      var values = getFieldsValue()
      if (values.password == '******') {
        delete values.password
      }
      if (Object.getOwnPropertyNames(values).length == 0) {
        onCancel()
        return
      }
      if (values.password != values.confirm) {
        onCancel()
        return
      }

      //密码加密
      var md5 = crypto.createHash('md5');
      md5.update(values.password);
      values.password = md5.digest('hex');

      const data = {
        password: values.password,
        id: user.id,
      }
      onOk(data)
    })
  }

  function checkPasswordRule (rule, value, callback){
    if (value.length < 6) {
      callback('输入的密码位数不能少于6位!');
    } else {
      callback();
    }
  }

  function checkPassword (rule, value, callback){
    if (value && value !== getFieldValue('password')) {
      callback('输入的密码不一致!');
    } else {
      callback();
    }
  }

  const modalOpts = {
    title: '更改当前用户密码',
    visible,
    onOk: handleOk,
    onCancel,
    wrapClassName: 'vertical-center-modal',
  }

  return (
    <Modal {...modalOpts}>
      <Form layout="horizontal">
        <FormItem label="输入密码：" hasFeedback {...formItemLayout}>
          {getFieldDecorator('password', {
            rules: [
              { required: true, message: '不能为空', },
              { validator: checkPasswordRule,}
            ],
          })(<Input type="password" />)}
        </FormItem>
        <FormItem label="确认密码：" hasFeedback {...formItemLayout}>
          {getFieldDecorator('confirm', {
            rules: [
              { required: true,  message: '不能为空',  },
              { validator: checkPassword,}
            ],
          })(<Input type="password" />)}
        </FormItem>
        </Form>
    </Modal>
  )
}

modal.propTypes = {
  form: PropTypes.object.isRequired,
  user: PropTypes.object,
  visible: PropTypes.bool,
  onCancel: PropTypes.func,
  onOk: PropTypes.func,
}

export default Form.create()(modal)
