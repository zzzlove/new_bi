import React from 'react'
import PropTypes from 'prop-types';
import { compose, gql, graphql } from 'react-apollo';
import { connect } from 'dva';
import moment from 'moment';
import _ from 'lodash';
import { Alert, Spin, Input, Tooltip, Icon, Button, Row, Col, Badge, Popover, DatePicker, message, Tabs, Checkbox, Table, Form, Popconfirm, Card, Modal, Check, Select, InputNumber, Radio, Tag} from 'antd';
import {formatter, openNewLink, getAllValuesFromRecord, color, getDistinctValues, getDistinct2ndValues} from '../../../utils';
import stylesShared from '../../../utils/table.less';
import { DropOption, SearchInput, Exception } from '../../../components';
const confirm = Modal.confirm;
import { routerRedux, Link } from 'dva/router';




const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
}

const formLargeItemLayout = {
  labelCol: {
    span: 3,
  },
  wrapperCol: {
    span: 19,
  },
}


import FetchPropsModal from './fetchPropsModal';




function RenderComponent ({dispatch, pricingPud, user, elementAuth, dataOption, createRunning, updateRunning, destroyRunning, }) {

  if(!user.menu.pricingPud){
    return (
     <Exception type="403" style={{ minHeight: 500, height: '80%' }} linkElement={Link} />
    )
  }  
 
  const { selectedRowKeys, selectedRows, totalAmount, modalVisible, detailedInfoVisible, fetchPropsModalVisible, searchPropsModalVisible, modalType, searchProps, selectedItem, hasSelectedItem, currentItem, fetchPropsGet, pagination, pagePropsModalVisible, showInPage, sizePage, footerPage, filtersPage, sorterPage, } = pricingPud;
  
  if (dataOption.loading&&elementAuth.loading) {
    return (<div><Spin size={'large'} tip={'数据加载中 Loading...'}/></div>)
  }
  if (dataOption.error) {
    return message.error(JSON.stringify(dataOption.error))
  }  
  if (elementAuth.error) {
    return message.error(JSON.stringify(elementAuth.error))
  } 
  
  const fetchProps = {...fetchPropsGet, ...{type: "pud"}};
  
  const { DtOptnpricing_type, DtOptnpricing_unit_method, DtOptnops_code } = dataOption;   
 
  const searchGroupProps = {
    keyword: '',
    select: false,
    size: 'large',
    selectOptions: [{ value: 'tableAllColumns', name: '全表查询' },  ],
    selectProps: {
      defaultValue: 'tableAllColumns',
    },
    onSearch: (value) => {
      dispatch({
        type: 'pricingPud/setDetails',
        payload: {searchProps: value},
      })
    },
    onClearFilter: () => {
      dispatch({
        type: 'pricingPud/setDetails',
        payload: {sorterPage: {}, filtersPage: {}},
      })
    },
  }; 


  function TableMaster ({data, onPageChange, destroyRunning, updateRunning,  }) {

    let { loading, error, dataSource, countPricing } = data; 

    if (error) {
      return message.error(JSON.stringify(error))
    }        

      const distValues = getDistinctValues(dataSource, ['profile_id', 'status', 'type']);

    const handleMenuClick = (record, e) => {
      switch (e.key){
      case 'btn01020': {return dispatch({type: 'pricingPud/setDetails', payload: {modalVisible: true, modalType: 'update', currentItem: record,  }, })}
      case 'btn01023': {return confirm({ title: '您确定要删除这条记录吗?', onOk () { destroyRunning(record.id)}, }) }
      } 
    }  


   const columns = [{
  title: '操作',
  key: 'operation',
  width: 50,
  
  className: stylesShared.align_center,
  render: (text, record) => {
    return <DropOption onMenuClick={e => handleMenuClick(record, e)} menuOptions={[{ key: 'btn01020', name: '编辑', icon: 'edit', disabled: !buttonAuth.btn01020 }, { key: 'btn01023', name: '删除', icon: 'delete', disabled: !buttonAuth.btn01023 }]} buttonStyle={{size: "large"}} />
  },
  }, {
    title: '编号',
    dataIndex: 'id',
    key: 'id',
    width: 60,
    sorter: (a, b) => { let x=parseInt(a.id)||0; let y=parseInt(b.id)||0; if(x<y) return -1; else if(x>y) return 1; else return 0; },
    sortOrder: sorterPage.columnKey === 'id' && sorterPage.order,
  }, {
      title: '运营站点',
    dataIndex: 'profile_id',
    key: 'profile_id',
    width: 120,
    render: (text, record, index) => {let i = _.findIndex(DtOptnops_code, {value: text}); if (i>=0){ return DtOptnops_code[i].text; } else {return text}},
    filters: distValues.profile_id.map(d => {let i = _.findIndex(DtOptnops_code, {value: d}); if (i>=0){return DtOptnops_code[i];}else {return {value: d, text: d};} }),
    onFilter: (value, record) => record.profile_id === value,
    filteredValue: filtersPage.profile_id || null,
    sorter: (a, b) => { let x=a.profile_id||0; let y=b.profile_id||0; if(x<y) return -1; else if(x>y) return 1; else return 0; },
    sortOrder: sorterPage.columnKey === 'profile_id' && sorterPage.order,
  }, {
      title: '目的地',
    dataIndex: 'dest_code',
    key: 'dest_code',
    width: 150,
    sorter: (a, b) => { let x = a.dest_code||"0"; let y = b.dest_code||"0"; if(x<y) return -1; else if(x>y) return 1; else return 0; },
    sortOrder: sorterPage.columnKey === 'dest_code' && sorterPage.order,
  }, {
      title: '计价方式',
    dataIndex: 'unit_method',
    key: 'unit_method',
    width: 120,
    render: (text, record, index) => {let i = _.findIndex(DtOptnpricing_unit_method, {value: text}); if (i>=0){ return DtOptnpricing_unit_method[i].text; } else {return text}},
    sorter: (a, b) => { let x = a.unit_method||"0"; let y = b.unit_method||"0"; if(x<y) return -1; else if(x>y) return 1; else return 0; },
    sortOrder: sorterPage.columnKey === 'unit_method' && sorterPage.order,
  }, {
      title: '单件价格',
    dataIndex: 'qty_unit',
    key: 'qty_unit',
    width: 80,
    render: (text)=><div style={{textAlign: 'right'}}>{formatter.money(text, ",")}</div>,
    sorter: (a, b) => { let x=a.qty_unit||0; let y=b.qty_unit||0; if(x<y) return -1; else if(x>y) return 1; else return 0; },
    sortOrder: sorterPage.columnKey === 'qty_unit' && sorterPage.order,
  }, {
      title: '重量单价',
    dataIndex: 'weight_unit',
    key: 'weight_unit',
    width: 80,
    render: (text)=><div style={{textAlign: 'right'}}>{formatter.money(text, ",")}</div>,
    sorter: (a, b) => { let x=a.weight_unit||0; let y=b.weight_unit||0; if(x<y) return -1; else if(x>y) return 1; else return 0; },
    sortOrder: sorterPage.columnKey === 'weight_unit' && sorterPage.order,
  }, {
      title: '体积单价',
    dataIndex: 'volume_unit',
    key: 'volume_unit',
    width: 80,
    render: (text)=><div style={{textAlign: 'right'}}>{formatter.money(text, ",")}</div>,
    sorter: (a, b) => { let x=a.volume_unit||0; let y=b.volume_unit||0; if(x<y) return -1; else if(x>y) return 1; else return 0; },
    sortOrder: sorterPage.columnKey === 'volume_unit' && sorterPage.order,
  }, {
      title: '内部折扣',
    dataIndex: 'internal_discount',
    key: 'internal_discount',
    width: 80,
    sorter: (a, b) => { let x=a.internal_discount||0; let y=b.internal_discount||0; if(x<y) return -1; else if(x>y) return 1; else return 0; },
    sortOrder: sorterPage.columnKey === 'internal_discount' && sorterPage.order,
  }, {
      title: '整车价格',
    dataIndex: 'ftl_unit',
    key: 'ftl_unit',
    width: 80,
    render: (text)=><div style={{textAlign: 'right'}}>{formatter.money(text, ",")}</div>,
    sorter: (a, b) => { let x=a.ftl_unit||0; let y=b.ftl_unit||0; if(x<y) return -1; else if(x>y) return 1; else return 0; },
    sortOrder: sorterPage.columnKey === 'ftl_unit' && sorterPage.order,
  }, {
      title: '生效时间',
    dataIndex: 'started_at',
    key: 'started_at',
    width: 150,
    render: (text, record) => { if(text){ return <span>{formatter.date(new Date(text),'yyyy-MM-dd hh:mm:ss')}</span> } else { return null;} },
    sorter: (a, b) => { let x=a.started_at||0; let y=b.started_at||0; if(x<y) return -1; else if(x>y) return 1; else return 0; },
    sortOrder: sorterPage.columnKey === 'started_at' && sorterPage.order,
  }, {
      title: '结束时间',
    dataIndex: 'finished_at',
    key: 'finished_at',
    width: 150,
    render: (text, record) => { if(text){ return <span>{formatter.date(new Date(text),'yyyy-MM-dd hh:mm:ss')}</span> } else { return null;} },
    sorter: (a, b) => { let x=a.finished_at||0; let y=b.finished_at||0; if(x<y) return -1; else if(x>y) return 1; else return 0; },
    sortOrder: sorterPage.columnKey === 'finished_at' && sorterPage.order,
  }, {
      title: '备注',
    dataIndex: 'remarks',
    key: 'remarks',
    width: 150,
    sorter: (a, b) => { let x = a.remarks||"0"; let y = b.remarks||"0"; if(x<y) return -1; else if(x>y) return 1; else return 0; },
    sortOrder: sorterPage.columnKey === 'remarks' && sorterPage.order,
    }];


    const dataRender = loading?[]:(!searchProps.keyword?dataSource: 
      dataSource.filter((d) => {
        let keyword = searchProps.keyword.toUpperCase();
        switch (searchProps.field){
          case '': {let xx = getAllValuesFromRecord(d); return xx.indexOf(keyword) != -1}
          case 'tableAllColumns': {let xx = getAllValuesFromRecord(d); return xx.indexOf(keyword) != -1}
          
        }  
      })
    )



    const tabelDefinition = {
              rowKey: 'id',
              size: 'small',
              columns: columns,
              dataSource: dataRender,
              pagination: pagination,
              bordered: true,
              rowClassName: (record, index) => record.id == selectedItem.id ? stylesShared.selectedItem : null,
              onChange: onPageChange,
              loading: loading,
              onRowDoubleClick: (record, index, event)=>dispatch({type: 'pricingPud/setDetails', payload: {selectedItem: record, hasSelectedItem: true}, }),
              scroll: {x: 1350},
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
        type: 'pricingPud/setDetails',
        payload: {pagination: pagination, filtersPage: filters, sorterPage: sorter},
      })
    },
    destroyRunning (id) {
        destroyRunning({
           variables: {id}, 
           update: (proxy) => {
              const cached = proxy.readQuery({ query: TableMasterQuery, variables: fetchProps })
              for (let i = 0; i < cached.dataSource.length; i++) {
                if (cached.dataSource[i].id == id) {
                  cached.dataSource.splice(i, 1)
                  break
                }
              }
              proxy.writeQuery({ query: TableMasterQuery, variables: fetchProps, data: cached })
           }, 
           
        })
        .then(({data: {destroyPricing}})=> {if(destroyPricing){message.success('删除成功')}})
        .catch((error) => {message.error('存在错误，未执行成功  '+JSON.stringify(error)) })
    },
    updateRunning (id, data) {
      updateRunning({ 
           variables: { id: id, input_content: data }, 
        })
      .then((d)=> {if(d){message.success('修改成功')}})
      .catch((error) => {message.error('存在错误，未执行成功  '+JSON.stringify(error)) })  
    },
  } 
  
  
  const TableMasterActive = graphql(TableMasterQuery, {
    options: { variables: fetchProps }
  })(TableMaster) 


  const modalMaster = ({
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
        validateFields((err, values) => {

        if(err){return }

      if(values.dest_id == item.dest_id){delete values.dest_id; } else {if(typeof(values.dest_id)=="undefined"){values.dest_id = null; }}
      if(values.started_by == item.started_by){delete values.started_by; }
      if(values.started_at == item.started_at){delete values.started_at; } else{values.started_at=values.started_at.valueOf(); }
      if(values.unit_method == item.unit_method){delete values.unit_method; } else {if(typeof(values.unit_method)=="undefined"){values.unit_method = null; }}
      if(values.weight_unit == item.weight_unit){delete values.weight_unit; } else {if(typeof(values.weight_unit)=="undefined"){values.weight_unit = null; }}
      if(values.status == item.status){delete values.status; }
      if(values.sub_type == item.sub_type){delete values.sub_type; }
      if(values.finished_at == item.finished_at){delete values.finished_at; } else{values.finished_at=values.finished_at.valueOf(); }
      if(values.service_id == item.service_id){delete values.service_id; } else {if(typeof(values.service_id)=="undefined"){values.service_id = null; }}
      if(values.dest_code == item.dest_code){delete values.dest_code; }
      if(values.service_code == item.service_code){delete values.service_code; }
      if(values.qty_unit == item.qty_unit){delete values.qty_unit; } else {if(typeof(values.qty_unit)=="undefined"){values.qty_unit = null; }}
      if(values.remarks == item.remarks){delete values.remarks; }
      if(values.name == item.name){delete values.name; }
      if(values.finished_by == item.finished_by){delete values.finished_by; }
      if(values.ftl_unit == item.ftl_unit){delete values.ftl_unit; } else {if(typeof(values.ftl_unit)=="undefined"){values.ftl_unit = null; }}
      if(values.profile_id == item.profile_id){delete values.profile_id; } else {if(typeof(values.profile_id)=="undefined"){values.profile_id = null; }}
      if(values.internal_discount == item.internal_discount){delete values.internal_discount; } else {if(typeof(values.internal_discount)=="undefined"){values.internal_discount = null; }}
      if(values.volume_unit == item.volume_unit){delete values.volume_unit; } else {if(typeof(values.volume_unit)=="undefined"){values.volume_unit = null; }}
        
        if (Object.getOwnPropertyNames(values).length == 0) {
          onCancel()
          return
        }
        const data = {
          ...values, 
        }

        onOk(data)      

      })
    }

    const modalOpts = {
      title: `${type === 'create' ? '新建' : '修改'}`,
      visible,
      onOk: handleOk,
      onCancel,
      wrapClassName: 'vertical-center-modal',
      width: 520,
    }


    
    return (
      <Modal {...modalOpts}>
        <Form layout="horizontal">
        
        <Form.Item label={'运营站点'} {...formItemLayout} >
           {getFieldDecorator('profile_id', {
                initialValue: item.profile_id,
              }
            )(
            <Select showSearch={true} allowClear={true} optionFilterProp={'title'} >
              {DtOptnops_code.map(d => <Select.Option key={d.value} title={d.text}>{d.text}</Select.Option>)}
            </Select>         
            )}
        </Form.Item>         
        <Form.Item label={'目的地'} {...formItemLayout} >
           {getFieldDecorator('dest_code', {
                initialValue: item.dest_code,
              }
            )(
            <Input  />   
            )}
        </Form.Item>         
        <Form.Item label={'计价方式'} {...formItemLayout} >
           {getFieldDecorator('unit_method', {
                initialValue: item.unit_method,
              }
            )(
            <Select allowClear={true} optionFilterProp={'title'} showSearch={true} >
              {DtOptnpricing_unit_method.map(d => <Select.Option key={d.value} title={d.text}>{d.text}</Select.Option>)}
            </Select>         
            )}
        </Form.Item>         
        <Form.Item label={'单件价格'} {...formItemLayout} >
           {getFieldDecorator('qty_unit', {
                initialValue: item.qty_unit,
              }
            )(
            <InputNumber precision={0} />   
            )}
        </Form.Item>         
        <Form.Item label={'重量单价'} {...formItemLayout} >
           {getFieldDecorator('weight_unit', {
                initialValue: item.weight_unit,
              }
            )(
            <InputNumber precision={0} />   
            )}
        </Form.Item>         
        <Form.Item label={'体积单价'} {...formItemLayout} >
           {getFieldDecorator('volume_unit', {
                initialValue: item.volume_unit,
              }
            )(
            <InputNumber precision={0} />   
            )}
        </Form.Item>         
        <Form.Item label={'内部折扣'} {...formItemLayout} >
           {getFieldDecorator('internal_discount', {
                initialValue: item.internal_discount,
              }
            )(
            <InputNumber  />   
            )}
        </Form.Item>         
        <Form.Item label={'整车价格'} {...formItemLayout} >
           {getFieldDecorator('ftl_unit', {
                initialValue: item.ftl_unit,
              }
            )(
            <InputNumber precision={0} />   
            )}
        </Form.Item>         
        <Form.Item label={'生效时间'} {...formItemLayout} >
           {getFieldDecorator('started_at', {
                initialValue: item.started_at? moment(item.started_at): null,
              }
            )(
            <DatePicker showTime={{ format: 'HH:mm' }} allowClear={true} format={'YYYY-MM-DD HH:mm:ss'} />   
            )}
        </Form.Item>         
        <Form.Item label={'结束时间'} {...formItemLayout} >
           {getFieldDecorator('finished_at', {
                initialValue: item.finished_at? moment(item.finished_at): null,
              }
            )(
            <DatePicker showTime={{ format: 'HH:mm' }} allowClear={true} format={'YYYY-MM-DD HH:mm:ss'} />   
            )}
        </Form.Item>         
        <Form.Item label={'备注'} {...formItemLayout} >
           {getFieldDecorator('remarks', {
                initialValue: item.remarks,
              }
            )(
            <Input  />   
            )}
        </Form.Item> 
        </Form>
      </Modal>
    )
  }


  const ModalRender = Form.create()(modalMaster); 


  const modalRenderProps = {
    item: modalType === 'create' ? {} : currentItem,
    type: modalType,
    visible: modalVisible,
    onOk (data) {
      if (modalType === 'create') {
        createRunning({
           variables: {input_content: {...data, type: 'pud'}}, 
           update: (proxy, { data: { createPricing } }) => {
              const cached = proxy.readQuery({ query: TableMasterQuery, variables: fetchProps })
              cached.dataSource.unshift(createPricing);
              proxy.writeQuery({ query: TableMasterQuery, variables: fetchProps, data: cached })
           }, 
        })
        .then((d)=> {if(d){message.success('新建成功')}})
        .catch((error) => {message.error('存在错误，未执行成功  '+JSON.stringify(error)) })
      } 
      
      if (modalType === 'update') {
        updateRunning({ 
           variables: { id: currentItem.id, input_content: data }, 
        })
        .then((d)=> {if(d){message.success('修改成功')}})
        .catch((error) => {message.error('存在错误，未执行成功  '+JSON.stringify(error)) })        
      }
      dispatch({
        type: 'pricingPud/hideModal',
      })
    },    
    onCancel () {
      dispatch({
        type: 'pricingPud/hideModal',
      })
    },
  }



  const ModalRenderGene = () => <ModalRender {...modalRenderProps}/>;  


  const fetchPropsModalProps = {
    visible: fetchPropsModalVisible,
    item: fetchPropsGet,
    onOk (data) {
      dispatch({
        type: 'pricingPud/setSearchProps',
        payload: {fetchPropsGet: data, fetchPropsModalVisible: false},
      })
    },
    onCancel () {
      dispatch({
        type: 'pricingPud/setDetails', payload: {fetchPropsModalVisible: false}, 
      })
    },
  };

  const FetchPropsModalGene = () => <FetchPropsModal {...fetchPropsModalProps}/>;



  const buttonAuth = {btn01019: elementAuth ? _.findIndex(elementAuth.element_auth, {element_code: 'btn01019', permitted: true})!=-1 : false, 
        btn01023: elementAuth ? _.findIndex(elementAuth.element_auth, {element_code: 'btn01023', permitted: true})!=-1 : false, 
        btn01024: elementAuth ? _.findIndex(elementAuth.element_auth, {element_code: 'btn01024', permitted: true})!=-1 : false, 
        btn01020: elementAuth ? _.findIndex(elementAuth.element_auth, {element_code: 'btn01020', permitted: true})!=-1 : false, 
        wd00104: elementAuth ? _.findIndex(elementAuth.element_auth, {element_code: 'wd00104', permitted: true})!=-1 : false, };

  
  function KeyFuncTable({ data: { refetch } }){
    return (
      <Input.Group compact size="large">
       {buttonAuth.btn01019 &&
         <Button style={{ fontSize: '14px' }} size={'large'} 
            onClick={() => {dispatch({type: 'pricingPud/showModal',  payload: {modalType: 'create', currentItem: {}, }, }) }} >  
            <Icon type="file-add" style={{fontSize: '16px'}}/>新建
         </Button>}
      </Input.Group>
     ) 
  }  
  
  const KeyFuncTableActive  = graphql(TableMasterQuery, {options: { variables: fetchProps }})(KeyFuncTable);  




  return (
  <div>
  <Card style={{ marginBottom: 10 }} bodyStyle={{ padding: 10 }}>  
    <Row style={{ marginBottom: 10 }}>
      <Col lg={15} md={24}>
        <KeyFuncTableActive/>
      </Col>
      <Col lg={9} md={24} style={{textAlign: 'right'}}> 
        <SearchInput {...searchGroupProps}/>
      </Col>    
    </Row>
    
  <TableMasterActive {...tableMasterProps}/>
  </Card>  
  <FetchPropsModalGene/>
  {modalVisible&&!dataOption.loading&&<ModalRenderGene/>}


  </div> 
  )
}


const TableMasterQuery = gql`
query MyQuery ($type: [String], $id: [ID], $offset: Int, $limit: Int, $order: JSON){
  dataSource: pricing (type: $type, id: $id, offset: $offset, limit: $limit, order: $order){
    dest_id  dest_code  id  weight_unit  name  profile_id  sub_type  started_at  volume_unit  qty_unit  unit_method  ftl_unit  remarks  created_at  status  type  finished_at  internal_discount  finished_by  started_by  service_code  service_id
    
  }
  countPricing (type: $type, id: $id)
}
`;


const DataOptionQuery = gql`
query MyQuery {
  DtOptnpricing_type: field_option(option_code: "pricing_type") {value, text}
  DtOptnpricing_unit_method: field_option(option_code: "pricing_unit_method") {value, text}
  DtOptnops_code: profile(is_biz_code: true, biz_code_type: "ops_code"){value: id, text: name_abbr}
}
`;


const createRunningMaster = gql`
mutation createPricing($input_content: PricingInput) {
  createPricing(input_content: $input_content) {
    dest_id  dest_code  id  weight_unit  name  profile_id  sub_type  started_at  volume_unit  qty_unit  unit_method  ftl_unit  remarks  created_at  status  type  finished_at  internal_discount  finished_by  started_by  service_code  service_id
    
  }
}
`

const updateRunningMaster = gql`
mutation updatePricing($id: ID!, $input_content: PricingInput) {
  updatePricing(id: $id, input_content: $input_content) {
    dest_id  dest_code  id  weight_unit  name  profile_id  sub_type  started_at  volume_unit  qty_unit  unit_method  ftl_unit  remarks  created_at  status  type  finished_at  internal_discount  finished_by  started_by  service_code  service_id
    
  }
}
`

const destroyRunningMaster = gql`
mutation thisRunning($id: ID!) {
  destroyPricing(id: $id)
}
`;


const ElementAuth = gql`
query MyQuery($role_applied: [String]) {
  element_auth(role_applied: $role_applied, frame_id: 19325) {
    id
    element_code
    element_id
    permitted
  }
}
`;



const RenderComponentWithMutations = compose(
  graphql(ElementAuth, { name: 'elementAuth', options: (props) => {return { variables: { role_applied: props.user.roles }, fetchPolicy: 'network-only' }} }),
  graphql(DataOptionQuery, { name: 'dataOption' }),
  graphql(createRunningMaster, { name: 'createRunning' }),
  graphql(updateRunningMaster, { name: 'updateRunning' }),
  graphql(destroyRunningMaster, { name: 'destroyRunning' }),
  
)(RenderComponent);


function mapStateToProps(state) {
  return {
    pricingPud: state.pricingPud,
    user: state.app.user
  }
}

export default connect(mapStateToProps)(RenderComponentWithMutations);