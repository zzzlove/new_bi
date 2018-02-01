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

const { DtOptnpricing_type, DtOptnpricing_unit_method, DtOptncity_list, DtOptnops_code } = dataOption;  //153.2

   function handleOk() {

      validateFields((err, values) => {
        
      if(err){return }



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

     </Form>
    </Modal>

   )
  
}


const ModelCreate = Form.create()(modal);

//173.5
const DataOptionQuery = gql`
query MyQuery {
  DtOptnpricing_type: field_option(option_code: "pricing_type") {value, text}
  DtOptnpricing_unit_method: field_option(option_code: "pricing_unit_method") {value, text}
  DtOptncity_list: city(level: "city"){value: id, text: full_name}
  DtOptnops_code: profile(is_biz_code: true, biz_code_type: "ops_code"){value: id, text: name_abbr}
}
`;

export default graphql(DataOptionQuery, { name: 'dataOption' })(ModelCreate);