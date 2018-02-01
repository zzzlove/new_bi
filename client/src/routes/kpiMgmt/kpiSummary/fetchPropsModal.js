import React from 'react'
import PropTypes from 'prop-types';
import { compose, gql, graphql } from 'react-apollo';
import { Form, Input, InputNumber, Radio, Modal, DatePicker, Checkbox, Select, Spin, Button, Icon, Row, Col, Tooltip } from 'antd'
const { RangePicker, MonthPicker } = DatePicker;
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


const { DtOptnfin_code, DtOptnops_code } = dataOption;  //153.2
  

    function handleOk (e) {
      e.preventDefault();

      validateFields((err, values) => {
        
      if(err){return }

      if(!values.ops_id){delete values.ops_id; }
      values.report_period = moment(values.report_period).format('YYYYMM');
      
      console.log(values)
     
      onOk(values);
      });
   }
  

    return (
        <Form layout="inline" onSubmit={handleOk} >
        
        <Form.Item label={'经营主体'}  >
           {getFieldDecorator('ops_id', {
                initialValue: item.ops_id,
              }
            )(
            <Select allowClear={true} optionFilterProp={'title'} showSearch={true} style={{width: 220}} >
              {DtOptnops_code.map(d => <Select.Option key={d.value} title={d.text}>{d.text}</Select.Option>)}
            </Select>         
            )}
        </Form.Item>         
        <Form.Item label={'月份'}  >
           {getFieldDecorator('report_period', {
                initialValue: moment(),     rules: [{ required: true, message: '此项目为必填项!'}] ,
              }
            )(
        <MonthPicker allowClear={false}  style={{ marginRight: 10, width: 120 }} 
        /> 
            )}
        </Form.Item> 
          <span>
            <Button type="primary" htmlType="submit">查询</Button>
            <Button style={{ marginLeft: 8 }} onClick={onReset}>重置</Button>
          </span>
        </Form>
    )
}

const ModelCreate = Form.create()(modal);

//173.5
const DataOptionQuery = gql`
query MyQuery {
  DtOptnfin_code: profile(is_fin_code: true){value: id, text: name_abbr}
  DtOptnops_code: profile(is_biz_code: true, biz_code_type: "ops_code"){value: id, text: name_abbr}
}
`;

export default graphql(DataOptionQuery, { name: 'dataOption' })(ModelCreate);