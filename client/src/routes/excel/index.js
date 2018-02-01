import _ from 'lodash';
import { connect } from 'dva';
import React from 'react';
import { graphql, compose } from 'react-apollo';
import { Table, Spin, Icon, Button, Popconfirm, Row, Col, Card, Badge, Popover } from 'antd';
import { Form, Select, Input, Checkbox, InputNumber, DatePicker } from 'antd';
import moment from 'moment';
import 'antd/dist/antd.css';
import config from '../../utils/config';
const { RangePicker } = DatePicker;
import OrderList from './finOrderList';
import ExImport from './excelImport';
import CUModal from './modal';
import gqlDao from '../../services/dao/gql/testGql';
import PreviewModal from './previewModal';
import {excelImport} from '../../services/excel'
//import ButtonGroup from "antd/es/button/button-group";



function RenderComponent ({ dispatch, order_list, form, manual_fin }) {


  const { getFieldDecorator, validateFields, getFieldsValue } = form;

  var {modalType,modalVisible,excelModalVisible,loadingPreview,previewData} = manual_fin;
  
 

  const searchProps = {};

  var excelData = {};


  //新建&更新 modal
  const modalProps = {
    item: modalType,
    type: modalType,
    width: 800,
    title:'新增发票',
    visible: modalVisible,
    onOk (data) {
      if (modalType === 'create') {

      }

      if (modalType === 'update') {

      }
      gqlDao.saveTest();

    },
    onCancel () {
      dispatch({
        type: 'manual_fin/hideModal',
      })
    }
  }

  //预览导入
  const excelShowProps = {
    item:'cteate',
    width: 1600,
    title:'导入预览',
    visible: excelModalVisible,
    tableData:previewData,
    loading:loadingPreview,
    onOk () {
      //提交
      excelImport({"sheetData":JSON.stringify(previewData).replace('\n','')});

      dispatch({
        type: 'manual_fin/hidePerview',
      })
    },
    onCancel () {
     // this.state.excelModalVisible = false;
      dispatch({
        type: 'manual_fin/hidePerview',
      })
    }
  }

  //Excel导入
  const importProps = {
    showPreview:function(data){
       console.log('previewData'+data)
      previewData = data;
      return false;
      dispatch({
        type: 'manual_fin/showPreview',
        payload:data
      })
    }
  };




  function handleTableSearchPropsChange(e) {
    e.preventDefault();
    validateFields((err, values) => {
      if(err){return }

      dispatch({
        type: 'manual_fin/setSearchProps',
        payload:  values ,
      })
    });
  }
  //console.log(JSON.stringify(searchProps));

  const doExport = function(e){
    var excelId = 'orderListKHTotal';
    var url = config.baseURL+config.baseExcelExportUrl+'?excelId='+excelId;
    window.open(url);
  }

  var isShowExport = 'none';
  const user = {roles:['admin']};

  const showExport = function(){
    user.roles.forEach(function(value, index, array){
      config.exportRole.forEach(function(cvalue, cindex, carray){

        if(value == cvalue){
          isShowExport = null;
        }

      })
    })
    return false;
  } ();

  const showModal = function() {
    dispatch({
      type: 'manual_fin/showModal',
      payload: {
        modalType: 'create',
        currentItem: {},
      },
    })

  }

  return (
    <div>
      <Form onSubmit={handleTableSearchPropsChange}>
        <Row gutter={16} justify="start">
          <Col span={2}>
            <ExImport {...importProps}/>
          </Col>

          <Col span={4}>
            <Button type="primary" icon="file-add" onClick={showModal}>新增</Button>
          </Col>

          <Col span={4} style={{display:'none'}}>
            <Button type="primary" icon="download" onClick={doExport}>导出Excel</Button>
          </Col>

        </Row>
      </Form>
  <OrderList {...searchProps} />

      <CUModal {...modalProps} />

      <PreviewModal {...excelShowProps} />
    </div>
  )

}

/*
    
*/

const RenderComponentActive = Form.create()(RenderComponent);

function mapStateToProps(state) {
  return {
    order_list: state.order_list,
    user: state.app.user,
    manual_fin:state.manual_fin
  }
}

export default connect(mapStateToProps)(RenderComponentActive);
