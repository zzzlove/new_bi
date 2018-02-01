import React from 'react'
import PropTypes from 'prop-types';

import {Form, Input, InputNumber, Radio, Modal, DatePicker, message, Row, Col} from 'antd';

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
  function handleOk() {

    console.log('call onOk');
    onOk();
    validateFields((err, values) => {
      if (err) {
        return
      }
    })
  }

  const modalOpts = {
    title: `${type === 'create' ? '新建' : '修改'}`,
    visible,
    onOk: handleOk,
    onCancel,
    wrapClassName: 'vertical-center-modal',
  }


  return (
    <Modal {...modalOpts}>
      <Form layout="horizontal">
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item label="运单号" hasFeedback {...formItemLayout} >
              {getFieldDecorator('order_no', {
                  initialValue: item.order_no,
                }
              )(
                <Input/>
              )}
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item label="月份" hasFeedback {...formItemLayout} >
              {getFieldDecorator('term', {
                  initialValue: item.term,
                }
              )(
                <Input/>
              )}
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={8}>
            <Form.Item label="线路名称" hasFeedback {...formItemLayout} >
              {getFieldDecorator('service_no', {
                  initialValue: item.service_no,
                }
              )(
                <Input/>
              )}
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item label="财务主体" hasFeedback {...formItemLayout} >
              {getFieldDecorator('fin_code', {
                  initialValue: item.fin_code,
                }
              )(
                <Input/>
              )}
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={8}>
            <Form.Item label="运营主体" hasFeedback {...formItemLayout} >
              {getFieldDecorator('ops_code', {
                  initialValue: item.ops_code,
                }
              )(
                <Input/>
              )}
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="客户名称" hasFeedback {...formItemLayout} >
              {getFieldDecorator('trader_name', {
                  initialValue: item.trader_name,
                }
              )(
                <Input/>
              )}
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={8}>
            <Form.Item label="开单时间" hasFeedback {...formItemLayout} >
              {getFieldDecorator('started_at', {
                  initialValue: item.started_at ? moment(item.started_at) : null,
                }
              )(
                <DatePicker/>
              )}
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item label="金额" hasFeedback {...formItemLayout} >
              {getFieldDecorator('amount', {
                  initialValue: item.amount,
                }
              )(
                <InputNumber/>
              )}
            </Form.Item>
          </Col>
        </Row>
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

export default Form.create()(modal);





