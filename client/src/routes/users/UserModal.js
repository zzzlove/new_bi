import React from 'react'
import PropTypes from 'prop-types';
import  crypto from 'crypto';

import { Form, Input, InputNumber, Radio, Modal } from 'antd'
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
  visible,
  type,
  item = {},
  onOk,
  onCancel,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
  },
}) => {
  function handleOk () {
    validateFields((errors) => {
      if (errors) {
        return
      }
      var values = getFieldsValue()
      if (values.username == item.username) {
        delete values.username
      }
      if (!values.roles) {
        values.roles = []
      } else {
        values.roles = JSON.parse(values.roles)
      }
      if (JSON.stringify(values.roles) == JSON.stringify(item.roles)) {
        delete values.roles
      }
      if (values.password == item.password) {
        delete values.password
      }else{
        //密码加密
        var md5 = crypto.createHash('md5');
        md5.update(values.password);
        values.password = md5.digest('hex');
      }
      if (Object.getOwnPropertyNames(values).length == 0) {
        onCancel()
        return
      }
      const data = {
        ...values,
        key: item.key,
      }
      onOk(data)
    })
  }

  const modalOpts = {
    title: `${type === 'create' ? '新建用户' : '修改用户'}`,
    visible,
    onOk: handleOk,
    onCancel,
    wrapClassName: 'vertical-center-modal',
  }

  return (
    <Modal {...modalOpts}>
      <Form layout="horizontal">
        <FormItem label="用户名：" hasFeedback {...formItemLayout}>
          {getFieldDecorator('username', {
            initialValue: item.username,
            rules: [
              {
                required: true,
                message: '用户名未填写',
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="密码：" hasFeedback {...formItemLayout}>
          {getFieldDecorator('password', {
            initialValue: item.password,
            rules: [
              {
                required: true,
                message: '不能为空',
              },
            ],
          })(<Input type="password" />)}
        </FormItem>
        <FormItem label="角色：" hasFeedback {...formItemLayout}>
          {getFieldDecorator('roles', {
            initialValue: JSON.stringify(item.roles),
          })(<Input />)}
        </FormItem>
      </Form>
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

export default Form.create()(modal)
