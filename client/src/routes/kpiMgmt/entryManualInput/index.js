import React from 'react'
import PropTypes from 'prop-types';
import { compose, gql, graphql } from 'react-apollo';
import { connect } from 'dva';
import moment from 'moment';
import _ from 'lodash';
import { Alert, Spin, Input, Tooltip, Icon, Button, Row, Col, Badge, Popover, DatePicker, message, Tabs, Checkbox, Table, Form, Popconfirm, Card, Modal, Check, Select, InputNumber, Radio, Tag} from 'antd';
import {formatter, openNewLink, getAllValuesFromRecord, color, getDistinctValues, getDistinct2ndValues} from '../../../utils';
import stylesShared from '../../../utils/table.less';
import { DropOption, SearchInput } from '../../../components';
const confirm = Modal.confirm;
import { routerRedux } from 'dva/router';




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




function RenderComponent ({dispatch, entry, user, elementAuth, dataOption, createRunning, updateRunning, destroyRunning, }) {
  
 
  const { selectedRowKeys, selectedRows, totalAmount, modalVisible, detailedInfoVisible, fetchPropsModalVisible, searchPropsModalVisible, modalType, searchProps, selectedItem, hasSelectedItem, currentItem, fetchPropsGet, pagination, pagePropsModalVisible, showInPage, sizePage, footerPage, filtersPage, sorterPage, } = entry;
  
  if (dataOption.loading&&elementAuth.loading) {
    return (<div><Spin size={'large'} tip={'数据加载中 Loading...'}/></div>)
  }
  if (dataOption.error) {
    return message.error(JSON.stringify(dataOption.error))
  }  
  if (elementAuth.error) {
    return message.error(JSON.stringify(elementAuth.error))
  } 
  
  const fetchProps = {...fetchPropsGet, ...{type: "manual"}};
  
  const { DtOptnentry_type, DtOptnmanualEntryAccount, DtOptnfin_code, DtOptnops_code } = dataOption;   
 
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
        type: 'entry/setDetails',
        payload: {searchProps: value},
      })
    },
    onClearFilter: () => {
      dispatch({
        type: 'entry/setDetails',
        payload: {sorterPage: {}, filtersPage: {}},
      })
    },
  }; 


  function TableMaster ({data, onPageChange, destroyRunning, updateRunning,  }) {

    let { loading, error, dataSource, countEntry } = data; 

    if (error) {
      return message.error(JSON.stringify(error))
    }        

      const distValues = getDistinctValues(dataSource, ['status', 'id', 'type', 'ops_id', 'fin_id']);

    const handleMenuClick = (record, e) => {
      switch (e.key){
      case 'btn00978': {return dispatch({type: 'entry/setDetails', payload: {modalVisible: true, modalType: 'update', currentItem: record,  }, })}
      case 'btn00981': {return confirm({ title: '您确定要删除这条记录吗?', onOk () { destroyRunning(record.id)}, }) }
      } 
    }  


   const columns = [{
  title: '操作',
  key: 'operation',
  width: 50,
  
  className: stylesShared.align_center,
  render: (text, record) => {
    return <DropOption onMenuClick={e => handleMenuClick(record, e)} menuOptions={[{ key: 'btn00978', name: '编辑', icon: 'edit', disabled: !buttonAuth.btn00978||record.locked_status=='locked' }, { key: 'btn00981', name: '删除', icon: 'delete', disabled: !buttonAuth.btn00981||record.locked_status=='locked' }]} buttonStyle={{size: "large"}} />
  },
  }, {
    title: '科目',
    dataIndex: 'account_no',
    key: 'account_no',
    width: 150,
    render: (text, record, index) => {let i = _.findIndex(DtOptnmanualEntryAccount, {value: text}); if (i>=0){ return DtOptnmanualEntryAccount[i].text; } else {return text}},
    sorter: (a, b) => { let x = a.account_no||"0"; let y = b.account_no||"0"; if(x<y) return -1; else if(x>y) return 1; else return 0; },
    sortOrder: sorterPage.columnKey === 'account_no' && sorterPage.order,
  }, {
      title: '类别',
    dataIndex: 'type',
    key: 'type',
    width: 120,
    render: (text, record, index) => {let i = _.findIndex(DtOptnentry_type, {value: text}); if (i>=0){ return DtOptnentry_type[i].text; } else {return text}},
    filters: distValues.type.map(d => {let i = _.findIndex(DtOptnentry_type, {value: d}); if (i>=0){return DtOptnentry_type[i];}else {return {value: d, text: d};} }),
    onFilter: (value, record) => record.type === value,
    filteredValue: filtersPage.type || null,
    sorter: (a, b) => { let x = a.type||"0"; let y = b.type||"0"; if(x<y) return -1; else if(x>y) return 1; else return 0; },
    sortOrder: sorterPage.columnKey === 'type' && sorterPage.order,
  }, {
      title: '金额',
    dataIndex: 'amount',
    key: 'amount',
    width: 60,
    render: (text)=><div style={{textAlign: 'right'}}>{formatter.money(text, ",", 2)}</div>,
    sorter: (a, b) => { let x=a.amount||0; let y=b.amount||0; if(x<y) return -1; else if(x>y) return 1; else return 0; },
    sortOrder: sorterPage.columnKey === 'amount' && sorterPage.order,
  }, {
      title: '财务主体',
    dataIndex: 'fin_id',
    key: 'fin_id',
    width: 100,
    render: (text, record, index) => {let i = _.findIndex(DtOptnfin_code, {value: text}); if (i>=0){ return DtOptnfin_code[i].text; } else {return text}},
    filters: distValues.fin_id.map(d => {let i = _.findIndex(DtOptnfin_code, {value: d}); if (i>=0){return DtOptnfin_code[i];}else {return {value: d, text: d};} }),
    onFilter: (value, record) => record.fin_id === value,
    filteredValue: filtersPage.fin_id || null,
    sorter: (a, b) => { let x=a.fin_id||0; let y=b.fin_id||0; if(x<y) return -1; else if(x>y) return 1; else return 0; },
    sortOrder: sorterPage.columnKey === 'fin_id' && sorterPage.order,
  }, {
      title: '经营主体',
    dataIndex: 'ops_id',
    key: 'ops_id',
    width: 100,
    render: (text, record, index) => {let i = _.findIndex(DtOptnops_code, {value: text}); if (i>=0){ return DtOptnops_code[i].text; } else {return text}},
    filters: distValues.ops_id.map(d => {let i = _.findIndex(DtOptnops_code, {value: d}); if (i>=0){return DtOptnops_code[i];}else {return {value: d, text: d};} }),
    onFilter: (value, record) => record.ops_id === value,
    filteredValue: filtersPage.ops_id || null,
    sorter: (a, b) => { let x=a.ops_id||0; let y=b.ops_id||0; if(x<y) return -1; else if(x>y) return 1; else return 0; },
    sortOrder: sorterPage.columnKey === 'ops_id' && sorterPage.order,
  }, {
      title: '调整备注',
    dataIndex: 'voucher_desc',
    key: 'voucher_desc',
    width: 150,
    sorter: (a, b) => { let x = a.voucher_desc||"0"; let y = b.voucher_desc||"0"; if(x<y) return -1; else if(x>y) return 1; else return 0; },
    sortOrder: sorterPage.columnKey === 'voucher_desc' && sorterPage.order,
  }, {
      title: '入账时间',
    dataIndex: 'posting_at',
    key: 'posting_at',
    width: 150,
    render: (text, record) => { if(text){ return <span>{moment(text).format('YYYY-MM-DD')}</span> } else { return null;} },
    sorter: (a, b) => { let x=a.posting_at||0; let y=b.posting_at||0; if(x<y) return -1; else if(x>y) return 1; else return 0; },
    sortOrder: sorterPage.columnKey === 'posting_at' && sorterPage.order,
  }, {
      title: '生效时间',
    dataIndex: 'started_at',
    key: 'started_at',
    width: 150,
    render: (text, record) => { if(text){ return <span>{moment(text).format('YYYY-MM-DD')}</span> } else { return null;} },
    sorter: (a, b) => { let x=a.started_at||0; let y=b.started_at||0; if(x<y) return -1; else if(x>y) return 1; else return 0; },
    sortOrder: sorterPage.columnKey === 'started_at' && sorterPage.order,
  }, {
      title: '交易对手',
    dataIndex: 'trader_name',
    key: 'trader_name',
    width: 150,
    sorter: (a, b) => { let x = a.trader_name||"0"; let y = b.trader_name||"0"; if(x<y) return -1; else if(x>y) return 1; else return 0; },
    sortOrder: sorterPage.columnKey === 'trader_name' && sorterPage.order,
  }, {
      title: '交易号',
    dataIndex: 'transaction_no',
    key: 'transaction_no',
    width: 150,
    sorter: (a, b) => { let x = a.transaction_no||"0"; let y = b.transaction_no||"0"; if(x<y) return -1; else if(x>y) return 1; else return 0; },
    sortOrder: sorterPage.columnKey === 'transaction_no' && sorterPage.order,
  }, {
      title: '流程状态',
    dataIndex: 'locked_status',
    key: 'locked_status',
    width: 120,
    render: (text, record) => { if(text=='locked'){ return <span>已封账</span> } else { return '调整确认中';} },
    sorter: (a, b) => { let x = a.locked_status||"0"; let y = b.locked_status||"0"; if(x<y) return -1; else if(x>y) return 1; else return 0; },
    sortOrder: sorterPage.columnKey === 'locked_status' && sorterPage.order,
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
              onRowDoubleClick: (record, index, event)=>dispatch({type: 'entry/setDetails', payload: {selectedItem: record, hasSelectedItem: true}, }),
              scroll: {x: 1330},
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
        type: 'entry/setDetails',
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
        .then(({data: {destroyEntry}})=> {if(destroyEntry){message.success('删除成功')}})
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
        
      if(values.fin_id == item.fin_id){delete values.fin_id; } else {if(typeof(values.fin_id)=="undefined"){values.fin_id = null; }}
      if(values.ops_id == item.ops_id){delete values.ops_id; } else {if(typeof(values.ops_id)=="undefined"){values.ops_id = null; }}
      if(values.account_no == item.account_no){delete values.account_no; } else {if(typeof(values.account_no)=="undefined"){values.account_no = null; }}
      if(values.started_by == item.started_by){delete values.started_by; }
      if(values.report_period == item.report_period){delete values.report_period; }
      if(values.reference_no == item.reference_no){delete values.reference_no; }
      if(values.status == item.status){delete values.status; }
      if(values.trader_id == item.trader_id){delete values.trader_id; } else {if(typeof(values.trader_id)=="undefined"){values.trader_id = null; }}
      if(values.reference_id == item.reference_id){delete values.reference_id; } else {if(typeof(values.reference_id)=="undefined"){values.reference_id = null; }}
      if(values.locked_status == item.locked_status){delete values.locked_status; }
      if(values.transaction_no == item.transaction_no){delete values.transaction_no; }
      if(values.voucher_desc == item.voucher_desc){delete values.voucher_desc; }
      if(values.posting_at == item.posting_at){delete values.posting_at; } else{values.posting_at=values.posting_at.valueOf(); }
      if(values.started_at == item.started_at){delete values.started_at; } else{values.started_at=values.started_at.valueOf(); }
      if(values.amount == item.amount){delete values.amount; } else {if(typeof(values.amount)=="undefined"){values.amount = null; }}
      if(values.reference_type == item.reference_type){delete values.reference_type; }
      if(values.trader_name == item.trader_name){delete values.trader_name; }
      if(values.amount_sumup == item.amount_sumup){delete values.amount_sumup; } else {if(typeof(values.amount_sumup)=="undefined"){values.amount_sumup = null; }}
      if(values.account_name == item.account_name){delete values.account_name; }
      if(values.entry_no == item.entry_no){delete values.entry_no; }
        
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
        <Form.Item label={'财务主体'} {...formItemLayout} >
           {getFieldDecorator('fin_id', {
                initialValue: item.fin_id,
              }
            )(
            <Select allowClear={true} optionFilterProp={'title'} showSearch={true} >
              {DtOptnfin_code.map(d => <Select.Option key={d.value} title={d.text}>{d.text}</Select.Option>)}
            </Select>         
            )}
        </Form.Item> 
        <Form.Item label={'经营主体'} {...formItemLayout} >
           {getFieldDecorator('ops_id', {
                initialValue: item.ops_id,
              }
            )(
            <Select allowClear={true} optionFilterProp={'title'} showSearch={true} >
              {DtOptnops_code.map(d => <Select.Option key={d.value} title={d.text}>{d.text}</Select.Option>)}
            </Select>         
            )}
        </Form.Item> 
        <Form.Item label={'科目'} {...formItemLayout} >
           {getFieldDecorator('account_no', {
                initialValue: item.account_no,
              }
            )(
            <Select allowClear={true} optionFilterProp={'title'} showSearch={true} >
              {DtOptnmanualEntryAccount.map(d => <Select.Option key={d.value} title={d.text}>{d.text}</Select.Option>)}
            </Select>         
            )}
        </Form.Item>         
        <Form.Item label={'金额'} {...formItemLayout} >
           {getFieldDecorator('amount', {
                initialValue: item.amount,
              }
            )(
            <InputNumber precision={2} />   
            )}
        </Form.Item>         
        <Form.Item label={'调整备注'} {...formItemLayout} >
           {getFieldDecorator('voucher_desc', {
                initialValue: item.voucher_desc,
              }
            )(
            <Input  />   
            )}
        </Form.Item>         
        <Form.Item label={'入账时间'} {...formItemLayout} >
           {getFieldDecorator('posting_at', {
                initialValue: item.posting_at? moment(item.posting_at): null,
              }
            )(
            <DatePicker showTime={{ format: 'HH:mm' }} allowClear={true} format={'YYYY-MM-DD HH:mm:ss'} />   
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
        <Form.Item label={'交易对手'} {...formItemLayout} >
           {getFieldDecorator('trader_name', {
                initialValue: item.trader_name,
              }
            )(
            <Input  />   
            )}
        </Form.Item>         
        <Form.Item label={'交易号'} {...formItemLayout} >
           {getFieldDecorator('transaction_no', {
                initialValue: item.transaction_no,
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
           variables: {input_content: {...data, type: "manual"}}, 
           update: (proxy, { data: { createEntry } }) => {
              const cached = proxy.readQuery({ query: TableMasterQuery, variables: fetchProps })
              cached.dataSource.unshift(createEntry);
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
        type: 'entry/hideModal',
      })
    },    
    onCancel () {
      dispatch({
        type: 'entry/hideModal',
      })
    },
  }



  const ModalRenderGene = () => <ModalRender {...modalRenderProps}/>;  


  const fetchPropsModalProps = {
    visible: fetchPropsModalVisible,
    item: fetchPropsGet,
    onOk (data) {
      dispatch({
        type: 'entry/setSearchProps',
        payload: {fetchPropsGet: data, fetchPropsModalVisible: false},
      })
    },
    onCancel () {
      dispatch({
        type: 'entry/setDetails', payload: {fetchPropsModalVisible: false}, 
      })
    },
  };

  const FetchPropsModalGene = () => <FetchPropsModal {...fetchPropsModalProps}/>;



  const buttonAuth = {btn00978: elementAuth ? _.findIndex(elementAuth.element_auth, {element_code: 'btn00978', permitted: true})!=-1 : false, 
        btn00982: elementAuth ? _.findIndex(elementAuth.element_auth, {element_code: 'btn00982', permitted: true})!=-1 : false, 
        btn00977: elementAuth ? _.findIndex(elementAuth.element_auth, {element_code: 'btn00977', permitted: true})!=-1 : false, 
        wd00100: elementAuth ? _.findIndex(elementAuth.element_auth, {element_code: 'wd00100', permitted: true})!=-1 : false, 
        btn00981: elementAuth ? _.findIndex(elementAuth.element_auth, {element_code: 'btn00981', permitted: true})!=-1 : false, };

  
  function KeyFuncTable({ data: { refetch } }){
    return (
      <Input.Group compact size="large">
       {buttonAuth.btn00977 &&
         <Button style={{ fontSize: '14px' }} size={'large'} 
            onClick={() => {dispatch({type: 'entry/showModal',  payload: {modalType: 'create', currentItem: {}, }, }) }} >  
            <Icon type="file-add" style={{fontSize: '16px'}}/>新建
         </Button>}
         <Button style={{ fontSize: '14px' }} size={'large'} 
            onClick={() => refetch()} >  
            <Icon type="reload" style={{fontSize: '16px'}}/>刷新数据
         </Button>
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
query MyQuery ($id: [ID], $ops_id: [Int], $type: [String], $reference_id: Int, $transaction_no: String, $offset: Int, $limit: Int, $order: JSON){
  dataSource: entry (transaction_no: $transaction_no, reference_id: $reference_id, ops_id: $ops_id, type: $type, id: $id, offset: $offset, limit: $limit, order: $order){
    reference_no  reference_id  reference_type  amount_sumup  created_at  account_name  updated_at  status  id  trader_id  type  entry_no  locked_status  ops_id  amount  transaction_no  voucher_desc  trader_name  posting_at  started_at  started_by  report_period  fin_id  account_no
    
  }
  countEntry (transaction_no: $transaction_no, reference_id: $reference_id, ops_id: $ops_id, type: $type, id: $id)
}
`;


const DataOptionQuery = gql`
query MyQuery {
  DtOptnentry_type: field_option(option_code: "entry_type") {value, text}
  DtOptnmanualEntryAccount: account(concerning_biz: "manual"){value: code, text: name}
  DtOptnfin_code: profile(is_fin_code: true){value: id, text: name_abbr}
  DtOptnops_code: profile(is_biz_code: true, biz_code_type: "ops_code"){value: id, text: name_abbr}
}
`;


const createRunningMaster = gql`
mutation createEntry($input_content: EntryInput) {
  createEntry(input_content: $input_content) {
    reference_no  reference_id  reference_type  amount_sumup  created_at  account_name  updated_at  status  id  trader_id  type  entry_no  locked_status  ops_id  amount  transaction_no  voucher_desc  trader_name  posting_at  started_at  started_by  report_period  fin_id  account_no
    
  }
}
`

const updateRunningMaster = gql`
mutation updateEntry($id: ID!, $input_content: EntryInput) {
  updateEntry(id: $id, input_content: $input_content) {
    reference_no  reference_id  reference_type  amount_sumup  created_at  account_name  updated_at  status  id  trader_id  type  entry_no  locked_status  ops_id  amount  transaction_no  voucher_desc  trader_name  posting_at  started_at  started_by  report_period  fin_id  account_no
    
  }
}
`

const destroyRunningMaster = gql`
mutation thisRunning($id: ID!) {
  destroyEntry(id: $id)
}
`;


const ElementAuth = gql`
query MyQuery($role_applied: [String]) {
  element_auth(role_applied: $role_applied, frame_id: 18580) {
    id
    element_code
    element_id
    permitted
  }
}
`;



const RenderComponentWithMutations = compose(
  graphql(ElementAuth, { name: 'elementAuth', options: (props) => {return { variables: { role_applied: props.user.roles } }} }),
  graphql(DataOptionQuery, { name: 'dataOption' }),
  graphql(createRunningMaster, { name: 'createRunning' }),
  graphql(updateRunningMaster, { name: 'updateRunning' }),
  graphql(destroyRunningMaster, { name: 'destroyRunning' }),
  
)(RenderComponent);


function mapStateToProps(state) {
  return {
    entry: state.entry,
    user: state.app.user
  }
}

export default connect(mapStateToProps)(RenderComponentWithMutations);