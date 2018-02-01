import React from 'react'
import PropTypes from 'prop-types';

import { Form, Input, InputNumber, Radio, Modal, DatePicker, message } from 'antd';

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
  console.log('item: '+JSON.stringify(item));   
  function handleOk () {
      validateFields((err, values) => {

      if(err){return }

      if(values.order_no == item.order_no){delete values.order_no; }
      if(values.term == item.term){delete values.term; }
      if(values.service_no == item.service_no){delete values.service_no; }
      if(values.fin_code == item.fin_code){delete values.fin_code; }
      if(values.ops_code == item.ops_code){delete values.ops_code; }
      if(values.trader_name == item.trader_name){delete values.trader_name; }
      if(values.started_at == item.started_at){delete values.started_at; }
        else{values.started_at=values.started_at.valueOf(); }
      if(values.amount == item.amount){delete values.amount; }      
      
      if (Object.getOwnPropertyNames(values).length == 0) {
        onCancel()
        return
      }
      const data = {
        ...values,
        reflection_id: 1,  //default value built-in, 不一定需要
      }

      onOk(data)      

/*      
      mutate({
        variables: { input_content:  data},
      })
      .then((d)=> {if(d){message.success(`${type === 'create' ? '新建成功' : '修改成功'}`)}})
      .catch((error) => {message.error('存在错误，未执行成功'+JSON.stringify(error)) })
    
      onCancel()
*/
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
        <Form.Item label="运单号" hasFeedback {...formItemLayout} >
           {getFieldDecorator('order_no', {
              initialValue: item.order_no,
              }
            )(
            <Input/>
            )}
        </Form.Item>
        <Form.Item label="月份" hasFeedback {...formItemLayout} >
           {getFieldDecorator('term', {
              initialValue: item.term,
              }
            )(
            <Input/>
            )}
        </Form.Item>        
        <Form.Item label="线路名称" hasFeedback {...formItemLayout} >
           {getFieldDecorator('service_no', {
              initialValue: item.service_no,
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
        <Form.Item label="开单时间" hasFeedback {...formItemLayout} >
           {getFieldDecorator('started_at', {
              initialValue: item.started_at? moment(item.started_at): null,
              }
            )(
            <DatePicker/>
            )}
        </Form.Item> 
        <Form.Item label="金额" hasFeedback {...formItemLayout} >
           {getFieldDecorator('amount', {
              initialValue: item.amount,
              }
            )(
            <InputNumber/>
            )}
        </Form.Item> 
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

/*

const upsertFunc = gql`
mutation thisUpsert($input_content: OrdersUpdatedInput) {
  upsertOrdersUpdated(input_content: $input_content) {
    id
    order_no
    type
    biz_code
    fin_code
    ops_code
    trader_code
    trader_name
    status
    processing_status
    started_at
    term
    billing_no
    amount
    biz_type
    service_no
    reflection_id
    control_center
    control_element
    related_no
    billing_status
    gross_margin
    remarks
    __typename
  }
}
`;



const query = gql`{ todos { ... } }`

export default graphql(gql`
  mutation ($text: String!) {
    createTodo(text: $text) { ... }
  }
`, {
  options: {
    update: (proxy, { data: { createTodo } }) => {
      const data = proxy.readQuery({ query });
      data.todos.push(createTodo);
      proxy.writeQuery({ query, data });
    },
  },
})(MyComponent);

, {
  options: {
    update: (proxy, { data: { upsertOrdersUpdated } }) => {
      const data = proxy.readQuery({ TableMasterQuery });
      data.dataSource.push(upsertOrdersUpdated);
      proxy.writeQuery({ TableMasterQuery, data });
    },
  },
}

client.mutate({
  mutation: TodoCreateMutation,
  variables: {
    text,
  },
  update: (proxy, { data: { createTodo } }) => {
    // Read the data from our cache for this query.
    const data = proxy.readQuery({ query: TodoAppQuery });

    // Add our todo from the mutation to the end.
    data.todos.push(createTodo);

    // Write our data back to the cache.
    proxy.writeQuery({ query: TodoAppQuery, data });
  },
});

const modalFunc = graphql(upsertFunc)(modal);
*/




