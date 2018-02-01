import React from 'react'
import PropTypes from 'prop-types';
import { compose, gql, graphql } from 'react-apollo';
import { connect } from 'dva';
import moment from 'moment';
import _ from 'lodash';
import { Spin, Input, Tooltip, Icon, Button, Row, Col, Badge, Popover, DatePicker, message, Tabs, Checkbox, Table, Form, Popconfirm, Card, Modal, Check, Select, InputNumber, Radio, Tag} from 'antd';
import {formatter, getAllValuesFromRecord, color, getDistinctValues} from '../../utils';
import stylesShared from '../../utils/table.less';
import { DropOption, SearchInput } from '../../components';
import config from '../../utils/config';
import qs from 'qs';


const confirm = Modal.confirm;

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
}




import FetchPropsModal from './fetchPropsModal';
import PagePropsModal from './pagePropsModal';





function RenderComponent ({dispatch, orderSalesExtKh, user, dataOption, }) {


  const { modalVisible, detailedInfoVisible, fetchPropsModalVisible, searchPropsModalVisible, modalType, searchProps, selectedItem, hasSelectedItem, currentItem, fetchProps, pagination, pagePropsModalVisible, showInPage, sizePage, footerPage, filtersPage, sorterPage, scrollPage } = orderSalesExtKh;

  if (dataOption.loading) {
    return (<div><Spin size={'large'} tip={'数据加载中 Loading...'}/></div>)
  }
  if (dataOption.error) {
    return message.error(JSON.stringify(dataOption.error))
  }

  const { dataOptiong002, dataOptionsd001, dataOptionsd002, dataOptionsd004 } = dataOption;

  const searchGroupProps = {
    keyword: '',
    select: true,
    size: 'large',
    selectOptions: [{ value: 'tableAllColumns', name: '全表查询' },  ],
    selectProps: {
      defaultValue: 'tableAllColumns',
    },
    onSearch: (value) => {
      dispatch({
        type: 'orderSalesExtKh/setSearchProps',
        payload: {searchProps: value},
      })
    },
    onClearFilter: () => {
      dispatch({
        type: 'orderSalesExtKh/setSearchProps',
        payload: {sorterPage: {}, filtersPage: {}},
      })
    },
  };


  function TableMaster ({data, onPageChange, onRowClick,   }) {

    let { loading, error, dataSource } = data;

    if (loading) {
      return (<div><Spin size={'large'} tip={'数据加载中 Loading...'}/></div>)
    }
    if (error) {
      return (<p>{error.message}</p>)
    }

    var fin_code_distinct =  _.sortBy(_.uniqBy(dataSource, 'fin_code').map(d=>{return {value: d.fin_code, text: d.fin_code}}), 'value');
    var service_no_distinct =  _.sortBy(_.uniqBy(dataSource, 'service_no'), 'service_no').map(d=>{return {value: d.service_no, text: d.service_no}});
    var term_distinct =  _.sortBy(_.uniqBy(dataSource, 'term').map(d=>{return {value: d.term, text: d.term}}), 'value');
    var ops_code_distinct =  _.sortBy(_.uniqBy(dataSource, 'ops_code').map(d=>{return {value: d.ops_code, text: d.ops_code}}), 'value');


const columns = [{

  title: '状态',
  dataIndex: 'processing_status',
  key: 'processing_status',
  width: 120,
  filters: dataOptionsd001,
  onFilter: (value, record) => record.processing_status === value,
  filteredValue: filtersPage.type || null,
  render: (text, record, index) => {let i = _.findIndex(dataOptionsd001, {value: text}); if (i>=0){ return dataOptionsd001[i].text; } else {return text}},
  sorter: (a, b) => { let x = a.processing_status||"0"; let y = b.processing_status||"0"; if(x<y) return -1; else if(x>y) return 1; else return 0; },
  sortOrder: sorterPage.columnKey === 'processing_status' && sorterPage.order,
  }, {
  title: '月份',
  dataIndex: 'term',
  className: 'align-left',
  filters: term_distinct,
  onFilter: (value, record) => record.term === value,
  filteredValue: filtersPage.term || null,
  key: 'term',
  width: 120,
  sorter: (a, b) => { let x = a.term||"0"; let y = b.term||"0"; if(x<y) return -1; else if(x>y) return 1; else return 0; },
  sortOrder: sorterPage.columnKey === 'term' && sorterPage.order,
  }, {
  title: '线路',
  dataIndex: 'service_no',
  key: 'service_no',
  filters: service_no_distinct,
  onFilter: (value, record) => record.service_no === value,
  filteredValue: filtersPage.service_no || null,
  width: 130,
  sorter: (a, b) => { let x = a.service_no||"0"; let y = b.service_no||"0"; if(x<y) return -1; else if(x>y) return 1; else return 0; },
  sortOrder: sorterPage.columnKey === 'service_no' && sorterPage.order,
  },
  {
    title: '往返线路',
    dataIndex: 'line_name',
    key: 'line_name',
    width: 130,
  }

  ,{
  title: '运作方式',
  dataIndex: 'control_element',
  key: 'control_element',
  filters: dataOptionsd002,
  onFilter: (value, record) => record.control_element === value,
  filteredValue: filtersPage.control_element || null,
  width: 150,
  sorter: (a, b) => { let x = a.service_no||"0"; let y = b.service_no||"0"; if(x<y) return -1; else if(x>y) return 1; else return 0; },
  sortOrder: sorterPage.columnKey === 'control_element' && sorterPage.order,
  }, {
  title: '财务主体',
  dataIndex: 'fin_code',
  filters: fin_code_distinct,
  onFilter: (value, record) => record.fin_code === value,
  filteredValue: filtersPage.fin_code || null,
  key: 'fin_code',
  width: 150,
  sorter: (a, b) => { let x = a.fin_code||"0"; let y = b.fin_code||"0"; if(x<y) return -1; else if(x>y) return 1; else return 0; },
  sortOrder: sorterPage.columnKey === 'fin_code' && sorterPage.order,
  }, {
  title: '运营主体',
  dataIndex: 'ops_code',
  filters: ops_code_distinct,
  onFilter: (value, record) => record.ops_code === value,
  filteredValue: filtersPage.ops_code || null,
  key: 'ops_code',
  width: 150,
  sorter: (a, b) => { let x = a.ops_code||"0"; let y = b.ops_code||"0"; if(x<y) return -1; else if(x>y) return 1; else return 0; },
  sortOrder: sorterPage.columnKey === 'ops_code' && sorterPage.order,
  }, {
  title: '单号',
  dataIndex: 'order_no',
  key: 'order_no',
  width: 180,
  sorter: (a, b) => { let x = a.order_no||"0"; let y = b.order_no||"0"; if(x<y) return -1; else if(x>y) return 1; else return 0; },
  sortOrder: sorterPage.columnKey === 'reflection_id' && sorterPage.order,
  }, {
  title: '会员名称',
  dataIndex: 'trader_name',
  key: 'trader_name',
  width: 350,
  sorter: (a, b) => { let x = a.trader_name||"0"; let y = b.trader_name||"0"; if(x<y) return -1; else if(x>y) return 1; else return 0; },
  sortOrder: sorterPage.columnKey === 'trader_name' && sorterPage.order,
  },
  {
    title: '会员账号',
    dataIndex: 'trader_code',
    key: 'trader_code',
    width: 350,
    sorter: (a, b) => { let x = a.trader_code||"0"; let y = b.trader_code||"0"; if(x<y) return -1; else if(x>y) return 1; else return 0; },
    sortOrder: sorterPage.columnKey === 'trader_code' && sorterPage.order,
  },
  {
    title: '收货方',
    dataIndex: 'consignee_name',
    key: 'consignee_name',
    width: 180,
    sorter: (a, b) => { let x = a.consignee_name||"0"; let y = b.consignee_name||"0"; if(x<y) return -1; else if(x>y) return 1; else return 0; },
    sortOrder: sorterPage.columnKey === 'consignee_name' && sorterPage.order,
  },
  {
    title:'收货人电话',
    dataIndex:'consignee_code',
    key:'consignee_code',
    width: 180
  },
  {
  title: '开单时间',
  dataIndex: 'started_at',
  key: 'started_at',
  width: 200,
  //render: (text, record) => { if(text){ return <span>{formatter.date(new Date(text),'yyyy-MM-dd hh:mm:ss')}</span> } else { return null;} },
  render: (text, record) => { if(text){ return <span>{formatter.date(new Date(text),'yyyy-MM-dd hh:mm:ss')}</span> } else { return null;} },
  sorter: (a, b) => { let x=a.started_at||0; let y=b.started_at||0; if(x<y) return -1; else if(x>y) return 1; else return 0; },
  sortOrder: sorterPage.columnKey === 'started_at' && sorterPage.order,
  }, {
  title: '产值',
  dataIndex: 'amount',
  key: 'amount',
  width: 130,
  render: (text)=><div style={{textAlign: 'right'}}>{formatter.money(text, ",")}</div>,
  sorter: (a, b) => { let x=a.amount||0; let y=b.amount||0; if(x<y) return -1; else if(x>y) return 1; else return 0; },
  sortOrder: sorterPage.columnKey === 'amount' && sorterPage.order,
  },
   {
  title: '业务方式',
  dataIndex: 'cat_1st',
  key: 'cat_1st',
  render: (text, record, index) => {let i = _.findIndex(dataOptionsd004, {value: text}); if (i>=0){ return dataOptionsd004[i].text; } else {return text}},
  filters: dataOptionsd004,
  onFilter: (value, record) => record.cat_1st === value,
  filteredValue: filtersPage.cat_1st || null,
  width: 150,
  sorter: (a, b) => { let x = a.cat_1st||"0"; let y = b.cat_1st||"0"; if(x<y) return -1; else if(x>y) return 1; else return 0; },
  sortOrder: sorterPage.columnKey === 'cat_1st' && sorterPage.order,
  },
   {
 title: '对账单号',
  dataIndex: 'billing_no',
  key: 'billing_no',
  width: 200,
  }, {
 title: '货物名称',
  dataIndex: 'cargo_name',
  key: 'cargo_name',
  width: 200,
  },
  {
    title: '货物重量',
    dataIndex: 'cargo_weight',
    key: 'cargo_weight',
    width: 200,
  },
  {
    title: '货物体积',
    dataIndex: 'cargo_volumn',
    key: 'cargo_volumn',
    width: 200,
  },

  {
 title: '承运商',
  dataIndex: 'carrier_name',
  key: 'carrier_name',
  width: 350,
  }, {
 title: '实际发货方',
  dataIndex: 'trader_name_act',
  key: 'trader_name_act',
  width: 350,
  }, {
  title: '车牌号',
  dataIndex: 'plate_no',
  key: 'plate_no',
  width: 200,
  }, {
 title: '客户经理',
  dataIndex: 'manager_name',
  key: 'manager_name',
  width: 200,
  }, {
  title: '数据来源',
  dataIndex: 'reflection_id',
  key: 'reflection_id',
  width: 120,
  render: (text, record) => { if(text==1){ return <span>新卡航</span> } else { return <span>老卡航</span>;} },
  sorter: (a, b) => { let x=a.amount||0; let y=b.amount||0; if(x<y) return -1; else if(x>y) return 1; else return 0; },
  sortOrder: sorterPage.columnKey === 'reflection_id' && sorterPage.order,
  },{
    title: '实际发车时间',
    dataIndex: 'depart_time',
    key: 'depart_time',
    width: 200,
    render: (text, record) => { if(text){ return <span>{formatter.date(new Date(text),'yyyy-MM-dd hh:mm:ss')}</span> } else { return null;} },
  },{
    title: '实际到达时间',
    dataIndex: 'arrived_time',
    key: 'arrived_time',
    width: 200,
    render: (text, record) => { if(text){ return <span>{formatter.date(new Date(text),'yyyy-MM-dd hh:mm:ss')}</span> } else { return null;} },
  },{
    title: '计划发车时间',
    dataIndex: 'plan_depart_time',
    key: 'plan_depart_time',
    width: 200,
    render: (text, record) => { if(text){ return <span>{formatter.date(new Date(text),'yyyy-MM-dd hh:mm:ss')}</span> } else { return null;} },
  },{
    title: '计划到达时间',
    dataIndex: 'plan_arrived_time',
    key: 'plan_arrived_time',
    width: 200,
    render: (text, record) => { if(text){ return <span>{formatter.date(new Date(text),'yyyy-MM-dd hh:mm:ss')}</span> } else { return null;} },
  },{
    title: '远距离提货费',
    dataIndex: 'remote_pickup_charges',
    key: 'remote_pickup_charges',
    width: 120,
    render: (text, record) => { if(text){ return <span>{formatter.money(text, ",")}</span> } else { return null;} },
  },{
    title: '远距离送货费',
    dataIndex: 'remote_delivery_charges',
    key: 'remote_delivery_charges',
    width: 120,
    render: (text, record) => { if(text){ return <span>{formatter.money(text, ",")}</span> } else { return null;} },
  },{
    title: '多点提货费',
    dataIndex: 'multipoint_pickup_charges',
    key: 'multipoint_pickup_charges',
    width: 120,
    render: (text, record) => { if(text){ return <span>{formatter.money(text, ",")}</span> } else { return null;} },
  },{
    title: '多点送货费',
    dataIndex: 'multipoint_delivery_charges',
    key: 'multipoint_delivery_charges',
    width: 120,
    render: (text, record) => { if(text){ return <span>{formatter.money(text, ",")}</span> } else { return null;} },
  },{
    title: '基础运费',
    dataIndex: 'clean_freight',
    key: 'clean_freight',
    width: 120,
    render: (text, record) => { if(text){ return <span>{formatter.money(text, ",")}</span> } else { return null;} },
  },{
    title: '保价费',
    dataIndex: 'insured',
    key: 'insured',
    width: 120,
    render: (text, record) => { if(text){ return <span>{formatter.money(text, ",")}</span> } else { return null;} },
  },{
    title: '运输类型',
    dataIndex: 'trans_type',
    key: 'trans_type',
    width: 120,
  }, {
    title: '备注',
    dataIndex: 'remarks',
    key: 'remarks',
    width: 250,
  }];

    const dataRender = (!searchProps.field||!searchProps.keyword)?dataSource
     :dataSource.filter((d) => {

    let keyword = searchProps.keyword.toUpperCase();

      switch (searchProps.field){
        case 'tableAllColumns': {let xx = getAllValuesFromRecord(d); return xx.indexOf(keyword) != -1}

      }
     }
    )


    const tabelDefinition = {
              bordered: true,
              rowKey: 'id',
              size: 'small',
              columns: columns,
              pagination: pagination,
              dataSource: dataRender,
              onChange: onPageChange,
              scroll: scrollPage,
              onRowDoubleClick: onRowClick,
              onRowContextMenu:function(record, index, event){
                return (
                  <Menu
                    onClick={this.handleClick}
                    style={{ width: 240 }}
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    mode="inline"
                  >
                  </Menu>
                )
              }
            };



    return (
       <div>
          <Table {...tabelDefinition}/>
       </div>
      )

  }


  const tableMasterProps = {
    onPageChange(pagination, filters, sorter) {
      dispatch({
        type: 'orderSalesExtKh/setPageChange',
        payload: {pagination: pagination, filtersPage: filters, sorterPage: sorter},
      })
    },
    onRowClick(record, index, event) {
      dispatch({
        type: 'orderSalesExtKh/setSelectedItem',
        payload: {selectedItem: record},
      })
    },
  }


  const TableMasterActive = graphql(TableMasterQuery, {
    options: { variables: Object.getOwnPropertyNames(fetchProps).length == 0?{order_no: "xxx"}:fetchProps }
  })(TableMaster)


  var isShowExport = 'none';
  //const user = {roles:['admin']};

  const showExport = function(){
    user.roles.forEach(function(value, index, array){
      console.log(user);
      config.exportRole.forEach(function(cvalue, cindex, carray){
        console.log('cvalue:'+cvalue);
        console.log('value:'+value);
        if(value == cvalue){;
          isShowExport = null;
          console.log('-- show --');
        }

      })
    })
    return false;
  } ();


  function KeyFuncTable({openCreateModal, openPagePropsModal, downloadRunning, uploadRunning, openFetchModal, toggleDetails, doExport}){
    return (
      <Input.Group compact size="large">
          <Tooltip title="导出到Excel"><Button style={{ fontSize: '14px',display:isShowExport }} size={'large'} onClick={doExport} ><Icon type="download" style={{fontSize: '16px'}}/>导出</Button></Tooltip>
         <Tooltip title="输入查询参数，从服务器获取数据"><Button style={{ fontSize: '14px' }} size={'large'} onClick={openFetchModal}><Icon type="cloud-download" style={{fontSize: '16px'}}/></Button></Tooltip>
      </Input.Group>
     )
  }



  const keyFuncTableProps = {
    openCreateModal () {
      dispatch({
        type: 'orderSalesExtKh/showModal',
        payload: {
          modalType: 'create',
          currentItem: {},
        },
      })
    },
    openFetchModal () {
      dispatch({
        type: 'orderSalesExtKh/showFetchPropsModal',
      })
    },
    openPagePropsModal () {
      dispatch({
        type: 'orderSalesExtKh/showPagePropsModal',
      })
    },
    toggleDetails () {
      dispatch({
        type: 'orderSalesExtKh/setDetails',
        payload: {detailedInfoVisible: !detailedInfoVisible},
      })
    },
    doExport(e){
    var excelId = 'orderListKHTotal';


    var url = config.baseURL+config.baseExcelExportUrl+'?excelId='+excelId;
    var paramObj = {};
    if(fetchProps.order_no){
      //url=url+'&order_no='+fetchProps.order_no;
      paramObj.order_no=fetchProps.order_no;
    }

    if(fetchProps.trader_name){
      //url = url+'&trader_name='+fetchProps.trader_name
      paramObj.trader_name=fetchProps.trader_name;
    }

    if(fetchProps.service_no){
      //url=url+'&service_no='+fetchProps.service_no;
      paramObj.service_no=fetchProps.service_no;
    }

    if(fetchProps.fin_code){
      //url = url+'&fin_code='+fetchProps.fin_code
      paramObj.fin_code=fetchProps.fin_code;
    }

    if(fetchProps.ops_code){
      //url=url+'&ops_code='+fetchProps.ops_code;
      paramObj.ops_code=fetchProps.ops_code;
    }

    if(fetchProps.billing_no){
     // url = url+'&billing_no='+fetchProps.billing_no
      paramObj.billing_no=fetchProps.billing_no;
    }

    //add default param
    if(!fetchProps.started_at[1] || !fetchProps.started_at[0]){
      console.log('--------- 没选择日期 --------------');
      return false;
    }

    paramObj.dateLt=fetchProps.started_at[1];
    paramObj.dateGt=fetchProps.started_at[0];
    //url=url+'&dateLt='+fetchProps.started_at[1]+'&dateGt='+fetchProps.started_at[0];
    url=url+'&'+qs.stringify(paramObj);

    window.open(url);
  }

  };

  const fetchPropsModalProps = {
    visible: fetchPropsModalVisible,
    item: fetchProps,
    onOk (data) {
      dispatch({
        type: 'orderSalesExtKh/setFetchProps',
        payload: {fetchProps: data},
      })
    },
    onCancel () {
      dispatch({
        type: 'orderSalesExtKh/hideFetchPropsModal',
      })
    },
  };

  const FetchPropsModalGene = () => <FetchPropsModal {...fetchPropsModalProps}/>;



  return (
  <div>
  <Card style={{ marginBottom: 10 }} bodyStyle={{ padding: 5 }}>
    <Row style={{ marginBottom: 10 }}>
      <Col lg={15} md={24}>
        <KeyFuncTable {...keyFuncTableProps}/>
      </Col>
      <Col lg={9} md={24} style={{textAlign: 'right'}}>
        <SearchInput {...searchGroupProps}/>
      </Col>
    </Row>
  <TableMasterActive {...tableMasterProps}/>
  </Card>
  <FetchPropsModalGene/>

  </div>
  )
}


const TableMasterQuery = gql`
query MyQuery ($fin_code: [String], $ops_code: [String], $trader_name: String, $started_at: [Float], $order_no: String, $billing_no: String){
  dataSource: order_sales_ext_kh (fin_code: $fin_code, ops_code: $ops_code, trader_name: $trader_name, started_at: $started_at, order_no: $order_no, billing_no: $billing_no, reflection_id: [1, 2]) {
    id
    order_no
    type
    biz_code
    fin_code
    ops_code
    trader_code
    trader_name
    trader_code_act
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
    cat_1st
    cargo_name
    trader_code
    manager_name
    plate_no
    carrier_name
    line_name
    cargo_weight
    cargo_volumn
    consignee_name
    consignee_code
    depart_time
    arrived_time
    plan_depart_time
    plan_arrived_time
    remote_pickup_charges
    remote_delivery_charges
    multipoint_pickup_charges
    multipoint_delivery_charges
    clean_freight
    insured
    trans_type
    remarks
  }
}
`;


const DataOptionQuery = gql`
query MyQuery {
  dataOptiong002: field_option(option_code: "g002") {
    value
    text
  }
  dataOptionsd001: field_option(option_code: "sd001") {
    value
    text
  }
  dataOptionsd002: field_option(option_code: "sd002") {
    value
    text
  }
  dataOptionsd004: field_option(option_code: "sd004") {
    value
    text
  }
}
`;





const RenderComponentWithMutations = compose(
  graphql(DataOptionQuery, { name: 'dataOption' }),
)(RenderComponent);


function mapStateToProps(state) {
  return {
    orderSalesExtKh: state.orderSalesExtKh,
    user: state.app.user
  }
}

export default connect(mapStateToProps)(RenderComponentWithMutations);
