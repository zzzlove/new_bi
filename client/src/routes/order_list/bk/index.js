import _ from 'lodash';
import { connect } from 'dva';
import React from 'react';
import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';
import { Table, Spin, Icon, Button, Popconfirm, Row, Col, Card, Badge, Popover } from 'antd';
import { Form, Select, Input, Checkbox, InputNumber, DatePicker } from 'antd';
import moment from 'moment';
import 'antd/dist/antd.css';
import { Search } from '../../components';
import config from '../../utils/config';
const { RangePicker } = DatePicker;
import OrderTable from './OrderTable';



function RenderComponent ({ dispatch, order_list, form , user}) {

  console.log(order_list);

  console.log(user);

  const { getFieldDecorator, validateFields, getFieldsValue } = form;
  const { searchProps } = order_list;


  function handleTableSearchPropsChange(e) {
      e.preventDefault();
      validateFields((err, values) => {

        if(err){return }


        if(!values.order_no){delete values.order_no; }
        if(!values.fin_code){delete values.fin_code; }
        if(!values.ops_code){delete values.ops_code; }
        if(!values.trader_name){delete values.trader_name; }
        if(!values.started_at||!values.started_at[0]){delete values.started_at; }
        else{ values.started_at=[values.started_at[0].valueOf(), values.started_at[1].valueOf()]}

        if (Object.getOwnPropertyNames(values).length == 0) {
          values={limit: 100}
        }
        
        dispatch({
          type: 'order_list/setSearchProps',
          payload:  values ,
        })
      });
  }


  console.log(JSON.stringify(searchProps));

  const doExport = function(e){
    var excelId = 'orderListKHTotal';


    var url = config.baseURL+config.baseExcelExportUrl+'?excelId='+excelId;

    if(searchProps.order_no){
      url=url+'&order_no='+searchProps.order_no;
    }

    if(searchProps.trader_name){
      url = url+'&trader_name='+searchProps.trader_name
    }

    if(searchProps.service_no){
      url=url+'&service_no='+searchProps.service_no;
    }

    if(searchProps.fin_code){
      url = url+'&fin_code='+searchProps.fin_code
    }

    if(searchProps.ops_code){
      url=url+'&ops_code='+searchProps.ops_code;
    }

    if(searchProps.billing_no){
      url = url+'&billing_no='+searchProps.billing_no
    }

    //add default param
    if(!searchProps.started_at[1] || !searchProps.started_at[0]){
      console.log('--------- 没选择日期 --------------');
      return false;
    }
    url=url+'&dateLt='+searchProps.started_at[1]+'&dateGt='+searchProps.started_at[0];
    window.open(url);
  }

  var isShowExport = 'none';
  //const user = {roles:['admin']};

  const showExport = function(){
    user.roles.forEach(function(value, index, array){
      config.exportRole.forEach(function(cvalue, cindex, carray){

        if(value == cvalue){;
          isShowExport = null;
          console.log('-- show --');
        }

      })
    })
    return false;
  } ();

  return (
     <div>
     <Form onSubmit={handleTableSearchPropsChange}>
      <Row gutter={16} justify="start">
      <Col span={3}>
      <Form.Item
       required={false}
       >
       {getFieldDecorator('order_no'
        )(
        <Input placeholder="请输入运单号"/>
        )}
      </Form.Item>
      </Col>
      <Col span={3}>
      <Form.Item
       required={false}
       >
       {getFieldDecorator('fin_code'
        )(
        <Input placeholder="请输入财务主体"/>
        )}
      </Form.Item>
      </Col>
      <Col span={3}>
      <Form.Item
       required={false}

       >
       {getFieldDecorator('ops_code'
        )(
        <Input placeholder="请输入运营主体"/>
        )}
      </Form.Item>
      </Col>
      <Col span={3}>
      <Form.Item
       required={false}
       >
       {getFieldDecorator('trader_name'
        )(
        <Input placeholder="请输入客户名称"/>
        )}
      </Form.Item>
      </Col>
      <Col span={7} style={{textAlign: 'left' }}>
      <Form.Item
       label={'开单时间'}
       required={true}
       labelCol={{span: 5}}
       wrapperCol={{span: 19}}
       >
       {getFieldDecorator('started_at'
        )(
        <RangePicker showTime={{defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('00:00:00', 'HH:mm:ss')]}} format="YYYY-MM-DD HH:mm:ss"/>
        )}
      </Form.Item>
      </Col>
      <Col span={3}>
      <Form.Item>
         <Button type="primary" htmlType="submit">
           查询
         </Button>
      </Form.Item>
      </Col>

      <Col span={2} style={{display:isShowExport}}>
        <Button type="primary" icon="download" onClick={doExport}>导出Excel</Button>
      </Col>

      </Row>
     </Form>
     <OrderTable {...searchProps} />
     </div>
   )

}



const RenderComponentActive = Form.create()(RenderComponent);

function mapStateToProps(state) {
  return {
    order_list: state.order_list,
    user: state.app.user
  }
}

export default connect(mapStateToProps)(RenderComponentActive);
