import React from 'react'
import PropTypes from 'prop-types';
import  crypto from 'crypto';
import { Form, Input, Modal, Select, Tooltip, Icon } from 'antd'
const FormItem = Form.Item
import { compose, gql, graphql } from 'react-apollo';
import { connect } from 'dva';


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
  dataProp,
  changeUserDefaultCode,
  visible = false,
  onOk,
  onCancel,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
    getFieldValue,
  },
}) => {
  
  const { opsCode, salesCode, finCode } = dataProp; 
  let isAdmin = user.roles ? (user.roles.indexOf('admin') != -1||user.roles.indexOf('kh_admin') != -1||user.roles.indexOf('headoffice_kh') != -1) : false;
  
  if (dataProp.loading) {
    return (<div>数据加载中 Loading...</div>)
  }
  
  var opsCodeValid = !visible||dataProp.loading?[]:opsCode.filter(d=>user.ops_code_all.indexOf(d.id)!=-1);
  var finCodeValid = !visible||dataProp.loading?[]:finCode.filter(d=>user.fin_code_all.indexOf(d.id)!=-1);
  var salesCodeValid = !visible||dataProp.loading?[]:salesCode.filter(d=>user.sales_code_all.indexOf(d.id)!=-1);
 
  
  
  function handleOk () {
    validateFields((errors, values) => {
      if (errors) {
        return
      }

      if (Object.getOwnPropertyNames(values).length == 0) {
        onCancel()
        return
      }


      let data = {};
      data.fin_id = values.fin_id.key;
      data.fin_code = values.fin_id.label;
      data.ops_id = values.ops_id.key;
      data.ops_code = values.ops_id.label;

      onOk(data);
      changeUserDefaultCode({ 
         variables: { id: user.id, input_content: data }, 
       });
     
    })
  }



  const modalOpts = {
    title: <span>切换公司或经营站点<Tooltip title={<span>切换后的公司或经营站点将保持为默认值<br/>下次登入的时候自动使用默认值登入</span>}>&nbsp;&nbsp;<Icon type={'question-circle-o'} /></Tooltip></span>,
    visible,
    onOk: handleOk,
    onCancel,
    wrapClassName: 'vertical-center-modal',
  }

  return isAdmin ? (
    <Modal {...modalOpts}>
      <Form layout="horizontal">
        <FormItem label="公司" hasFeedback {...formItemLayout}>
          {getFieldDecorator('fin_id', {
            initialValue: {key: user.fin_id?user.fin_id.toString():'', label: user.fin_code?user.fin_code:''}
          })(
         <Select optionFilterProp={'title'} showSearch={true} labelInValue style={{width: '100%'}}>
              {visible&&!dataProp.loading&&finCode.map(d => <Select.Option key={d.id} title={d.name}>{d.name_abbr}</Select.Option>)}
         </Select>
          )}
        </FormItem>
        <FormItem label="经营站点" hasFeedback {...formItemLayout}>
          {getFieldDecorator('ops_id', {
            initialValue: {key: user.ops_id?user.ops_id.toString():'', label: user.ops_code?user.ops_code:''}
          })(
         <Select optionFilterProp={'title'} showSearch={true} labelInValue style={{width: '100%'}}>
              {visible&&!dataProp.loading&&opsCode.map(d => <Select.Option key={d.id} title={d.name}>{d.name_abbr}</Select.Option>)}
         </Select>
          )}
        </FormItem>
        </Form>
    </Modal>
  ): (
    <Modal {...modalOpts}>
      <Form layout="horizontal">
        <FormItem label="公司" hasFeedback {...formItemLayout}>
          {getFieldDecorator('fin_id', {
            initialValue: {key: user.fin_id?user.fin_id.toString():'', label: user.fin_code?user.fin_code:''}
          })(
         <Select optionFilterProp={'title'} showSearch={true} labelInValue style={{width: '100%'}}>
              {visible&&!dataProp.loading&&finCodeValid.map(d => <Select.Option key={d.id} title={d.name}>{d.name_abbr}</Select.Option>)}
         </Select>
          )}
        </FormItem>
        <FormItem label="经营站点" hasFeedback {...formItemLayout}>
          {getFieldDecorator('ops_id', {
            initialValue: {key: user.ops_id?user.ops_id.toString():'', label: user.ops_code?user.ops_code:''}
          })(
         <Select optionFilterProp={'title'} showSearch={true} labelInValue style={{width: '100%'}}>
              {visible&&!dataProp.loading&&opsCodeValid.map(d => <Select.Option key={d.id} title={d.name}>{d.name_abbr}</Select.Option>)}
         </Select>
          )}
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

const RenderComponent = Form.create()(modal);

const DataOptionProp = gql`
query MyQuery  {
  opsCode: profile(is_biz_code: true, biz_code_type: "ops_code"){id, name, name_abbr, city_id}
  salesCode: profile(is_biz_code: true, biz_code_type: "sales_code"){id, name, name_abbr}
  finCode: profile(is_fin_code: true){id, name, name_abbr}
}
`;

const changeUserDefaultCode = gql`
mutation changeUserDefaultCode($id: ID!, $input_content: UserDefaultInput) {
  changeUserDefaultCode(id: $id, input_content: $input_content){id}
}
`;

const RenderComponentWithMutations = compose(
  graphql(DataOptionProp, { name: 'dataProp', }),
  graphql(changeUserDefaultCode, { name: 'changeUserDefaultCode' }),
)(RenderComponent);


function mapStateToProps(state) {
  return {
    user: state.app.user
  }
}

export default connect(mapStateToProps)(RenderComponentWithMutations);
