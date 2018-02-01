import React from 'react'
import PropTypes from 'prop-types';
import { compose, gql, graphql } from 'react-apollo';
import { Form, Input, InputNumber, Radio, Modal, DatePicker, Checkbox, Select, Spin, Button, Icon, Row, Col, Tooltip } from 'antd'
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


function modal ({ visible, item = {}, onOk, dataOption, onReset, toggleForm, form: {getFieldDecorator, validateFields, getFieldsValue,} }) {

  if (dataOption.loading) {
    return (<div><Spin size={'large'} tip={'数据加载中 Loading...'}/></div>)
  }
  if (dataOption.error) {
    return message.error(JSON.stringify(dataOption.error))
  }  


const { DtOptnpricing_type, DtOptnpricing_unit_method, DtOptncity_list, DtOptnops_code } = dataOption;  //153.2
  

    function handleOk (e) {
      e.preventDefault();

      validateFields((err, values) => {
        
      if(err){return }

      if(!values.profile_id){delete values.profile_id; }
      if(!values.dest_id){delete values.dest_id; }
     
      onOk(values);
      });
   }
  

 
    return (
        <Form layout="inline" onSubmit={handleOk} >
        
        <Form.Item label={'运营站点'}  >
           {getFieldDecorator('profile_id', {
                initialValue: item.profile_id,     
              }
            )(
            <Select showSearch={true} style={{width: 220}} allowClear={true} optionFilterProp={'title'} >
              {DtOptnops_code.map(d => <Select.Option key={d.value} title={d.text}>{d.text}</Select.Option>)}
            </Select>         
            )}
        </Form.Item>         
        <Form.Item label={'目的地'}  >
           {getFieldDecorator('dest_id', {
                initialValue: item.dest_id,     
              }
            )(
            <Select allowClear={true} allowClear={true} optionFilterProp={'title'} optionFilterProp={'title'} showSearch={true} style={{width: 220}} showSearch={true} style={{width: 220}} >
              {DtOptncity_list.map(d => <Select.Option key={d.value} title={d.text}>{d.text}</Select.Option>)}
            </Select>         
            )}
        </Form.Item> 
          <span>
            <Tooltip title={<span>类别性的字段的查询<br/>也可以通过表格上的筛选功能实现</span>}><Button type="primary" htmlType="submit">查询</Button></Tooltip>
            <Tooltip title={<span>表格上的筛选也会被重置</span>}><Button style={{ marginLeft: 8 }} onClick={onReset}>重置</Button></Tooltip>

          </span>
        </Form>
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