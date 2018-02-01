import React from 'react'
import PropTypes from 'prop-types';
import { compose, gql, graphql } from 'react-apollo';
import { connect } from 'dva';
import moment from 'moment';
import _ from 'lodash';
import { Alert, Spin, Input, Tooltip, Icon, Button, Row, Col, Badge, Popover, DatePicker, message, Tabs, Checkbox, Table, Form, Popconfirm, Card, Modal, Check, Select, InputNumber, Radio, Tag} from 'antd';
import {formatter, openNewLink, getAllValuesFromRecord, color, getDistinctValues, getDistinct2ndValues, fetchPropSummary} from '../../../utils';
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
import DtlsEntry from './DtlsEntry';



function RenderComponent ({dispatch, kpiSummary, user, elementAuth, dataOption, createRunning, updateRunning, destroyRunning, lock_entry_summary_by_month, calculate_entry_summary_by_month, initiate_entry_summary_by_month}) {

  if(!user.menu.kpiSummary){
    return (
     <Exception type="403" style={{ minHeight: 500, height: '80%' }} linkElement={Link} />
    )
  }  
 
  const { selectedRowKeys, selectedRows, totalAmount, modalVisible, detailedInfoVisible, fetchPropsModalVisible, searchPropsModalVisible, modalType, searchProps, selectedItem, hasSelectedItem, currentItem, fetchPropsGet, pagination, pagePropsModalVisible, showInPage, sizePage, footerPage, filtersPage, sorterPage, } = kpiSummary;
  
  if (dataOption.loading&&elementAuth.loading) {
    return (<div><Spin size={'large'} tip={'数据加载中 Loading...'}/></div>)
  }
  if (dataOption.error) {
    return message.error(JSON.stringify(dataOption.error))
  }  
  if (elementAuth.error) {
    return message.error(JSON.stringify(elementAuth.error))
  } 
  
  const fetchProps = {...fetchPropsGet, ...{order: [["report_period", "DESC"]]}, ...fetchPropSummary(pagination, filtersPage, sorterPage)};
  
  const { DtOptnentry_item, DtOptnfin_code, DtOptnops_code } = dataOption;   
 
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
        type: 'kpiSummary/setDetails',
        payload: {searchProps: value},
      })
    },
    onClearFilter: () => {
      dispatch({
        type: 'kpiSummary/setDetails',
        payload: {sorterPage: {}, filtersPage: {}},
      })
    },
  }; 


  function TableMaster ({data, onPageChange, destroyRunning, updateRunning,  }) {

    let { loading, error, dataSource, countEntrySummary } = data; 

    if (error) {
      return message.error(JSON.stringify(error))
    }        

    

    const handleMenuClick = (record, e) => {
      switch (e.key){

      } 
    }  

    /*
    
    title: '财务主体',
    dataIndex: 'fin_id',
    key: 'fin_id',
    width: 120,
    render: (text, record, index) => {let i = _.findIndex(DtOptnfin_code, {value: text}); if (i>=0){ return DtOptnfin_code[i].text; } else {return text}},
    sorter: (a, b) => { let x=a.fin_id||0; let y=b.fin_id||0; if(x<y) return -1; else if(x>y) return 1; else return 0; },
    sortOrder: sorterPage.columnKey === 'fin_id' && sorterPage.order,
  }, {
    
    */

   const columns = [{

      title: '经营主体',
    dataIndex: 'ops_id',
    key: 'ops_id',
    width: 120,
    render: (text, record, index) => {let i = _.findIndex(DtOptnops_code, {value: text}); if (i>=0){ return DtOptnops_code[i].text; } else {return text}},
    sorter: (a, b) => { let x=a.ops_id||0; let y=b.ops_id||0; if(x<y) return -1; else if(x>y) return 1; else return 0; },
    sortOrder: sorterPage.columnKey === 'ops_id' && sorterPage.order,
  }, {
      title: '考核项目',
    dataIndex: 'item',
    key: 'item',
    width: 140,
    render: (text, record, index) => {let i = _.findIndex(DtOptnentry_item, {value: text}); if (i>=0){ return DtOptnentry_item[i].text; } else {return text}},
    sorter: (a, b) => { let x = a.item||"0"; let y = b.item||"0"; if(x<y) return -1; else if(x>y) return 1; else return 0; },
    sortOrder: sorterPage.columnKey === 'item' && sorterPage.order,
  }, {
      title: '月份',
    dataIndex: 'report_period',
    key: 'report_period',
    width: 150,
    sorter: (a, b) => { let x = a.report_period||"0"; let y = b.report_period||"0"; if(x<y) return -1; else if(x>y) return 1; else return 0; },
    sortOrder: sorterPage.columnKey === 'report_period' && sorterPage.order,
  }, {
      title: '期初数',
    dataIndex: 'amount_init',
    key: 'amount_init',
    width: 90,
    render: (text)=><div style={{textAlign: 'right'}}>{formatter.money(text, ",")}</div>,
    sorter: (a, b) => { let x=a.amount_init||0; let y=b.amount_init||0; if(x<y) return -1; else if(x>y) return 1; else return 0; },
    sortOrder: sorterPage.columnKey === 'amount_init' && sorterPage.order,
  }, {
      title: '本期发生',
    dataIndex: 'amount_actual',
    key: 'amount_actual',
    width: 90,
    render: (text)=><div style={{textAlign: 'right'}}>{formatter.money(text, ",")}</div>,
    sorter: (a, b) => { let x=a.amount_actual||0; let y=b.amount_actual||0; if(x<y) return -1; else if(x>y) return 1; else return 0; },
    sortOrder: sorterPage.columnKey === 'amount_actual' && sorterPage.order,
  }, {
      title: '本期调整',
    dataIndex: 'amount_adj',
    key: 'amount_adj',
    width: 90,
    render: (text)=><div style={{textAlign: 'right'}}>{formatter.money(text, ",")}</div>,
    sorter: (a, b) => { let x=a.amount_adj||0; let y=b.amount_adj||0; if(x<y) return -1; else if(x>y) return 1; else return 0; },
    sortOrder: sorterPage.columnKey === 'amount_adj' && sorterPage.order,
  }, {
      title: '本期合计',
    dataIndex: 'amount',
    key: 'amount',
    width: 90,
    render: (text)=><div style={{textAlign: 'right'}}>{formatter.money(text, ",")}</div>,
    sorter: (a, b) => { let x=a.amount||0; let y=b.amount||0; if(x<y) return -1; else if(x>y) return 1; else return 0; },
    sortOrder: sorterPage.columnKey === 'amount' && sorterPage.order,
  }, {
      title: '期末数',
    dataIndex: 'amount_ytd',
    key: 'amount_ytd',
    width: 90,
    render: (text)=><div style={{textAlign: 'right'}}>{formatter.money(text, ",")}</div>,
    sorter: (a, b) => { let x=a.amount_ytd||0; let y=b.amount_ytd||0; if(x<y) return -1; else if(x>y) return 1; else return 0; },
    sortOrder: sorterPage.columnKey === 'amount_ytd' && sorterPage.order,
  }, {
      title: '财务已入账',
    dataIndex: 'amount_posted',
    key: 'amount_posted',
    width: 100,
    render: (text)=><div style={{textAlign: 'right'}}>{formatter.money(text, ",")}</div>,
    sorter: (a, b) => { let x=a.amount_posted||0; let y=b.amount_posted||0; if(x<y) return -1; else if(x>y) return 1; else return 0; },
    sortOrder: sorterPage.columnKey === 'amount_posted' && sorterPage.order,
  }, {
      title: '财务未入账',
    dataIndex: 'amount_unposted',
    key: 'amount_unposted',
    width: 100,
    render: (text)=><div style={{textAlign: 'right'}}>{formatter.money(text, ",")}</div>,
    sorter: (a, b) => { let x=a.amount_unposted||0; let y=b.amount_unposted||0; if(x<y) return -1; else if(x>y) return 1; else return 0; },
    sortOrder: sorterPage.columnKey === 'amount_unposted' && sorterPage.order,
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
              pagination: {...pagination, total: countEntrySummary},
              bordered: true,
              rowClassName: (record, index) => record.id == selectedItem.id ? stylesShared.selectedItem : null,
              onChange: onPageChange,
              loading: loading,
              onRowDoubleClick: (record, index, event)=>dispatch({type: 'kpiSummary/setDetails', payload: {selectedItem: record, hasSelectedItem: true}, }),
              scroll: {x: 1180},
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
        type: 'kpiSummary/setDetails',
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
           refetchQueries: [ { query: TableMasterQuery, variables: fetchProps }],
        })
        .then(({data: {destroyEntrySummary}})=> {if(destroyEntrySummary){message.success('删除成功')}})
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

      if(values.ops_code == item.ops_code){delete values.ops_code; }
      if(values.account_no == item.account_no){delete values.account_no; }
      if(values.report_period == item.report_period){delete values.report_period; }
      if(values.amount_adj == item.amount_adj){delete values.amount_adj; } else {if(typeof(values.amount_adj)=="undefined"){values.amount_adj = null; }}
      if(values.amount_ytd == item.amount_ytd){delete values.amount_ytd; } else {if(typeof(values.amount_ytd)=="undefined"){values.amount_ytd = null; }}
      if(values.amount_actual == item.amount_actual){delete values.amount_actual; } else {if(typeof(values.amount_actual)=="undefined"){values.amount_actual = null; }}
      if(values.ops_id == item.ops_id){delete values.ops_id; } else {if(typeof(values.ops_id)=="undefined"){values.ops_id = null; }}
      if(values.fin_id == item.fin_id){delete values.fin_id; } else {if(typeof(values.fin_id)=="undefined"){values.fin_id = null; }}
      if(values.item == item.item){delete values.item; } else {if(typeof(values.item)=="undefined"){values.item = null; }}
      if(values.amount_init == item.amount_init){delete values.amount_init; } else {if(typeof(values.amount_init)=="undefined"){values.amount_init = null; }}
      if(values.amount_posted == item.amount_posted){delete values.amount_posted; } else {if(typeof(values.amount_posted)=="undefined"){values.amount_posted = null; }}
      if(values.amount_unposted == item.amount_unposted){delete values.amount_unposted; } else {if(typeof(values.amount_unposted)=="undefined"){values.amount_unposted = null; }}
      if(values.amount == item.amount){delete values.amount; } else {if(typeof(values.amount)=="undefined"){values.amount = null; }}
        
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
            <Select allowClear={true} optionFilterProp={'title'} showSearch={true} disabled={true} >
              {DtOptnfin_code.map(d => <Select.Option key={d.value} title={d.text}>{d.text}</Select.Option>)}
            </Select>         
            )}
        </Form.Item>         
        <Form.Item label={'经营主体'} {...formItemLayout} >
           {getFieldDecorator('ops_id', {
                initialValue: item.ops_id,
              }
            )(
            <Select allowClear={true} optionFilterProp={'title'} showSearch={true} disabled={true} >
              {DtOptnops_code.map(d => <Select.Option key={d.value} title={d.text}>{d.text}</Select.Option>)}
            </Select>         
            )}
        </Form.Item>         
        <Form.Item label={'考核项目'} {...formItemLayout} >
           {getFieldDecorator('item', {
                initialValue: item.item,
              }
            )(
            <Select allowClear={true} optionFilterProp={'title'} showSearch={true} disabled={true} >
              {DtOptnentry_item.map(d => <Select.Option key={d.value} title={d.text}>{d.text}</Select.Option>)}
            </Select>         
            )}
        </Form.Item>         
        <Form.Item label={'月份'} {...formItemLayout} >
           {getFieldDecorator('report_period', {
                initialValue: item.report_period,
              }
            )(
            <Input  />   
            )}
        </Form.Item>         
        <Form.Item label={'期初数'} {...formItemLayout} >
           {getFieldDecorator('amount_init', {
                initialValue: item.amount_init,
              }
            )(
            <InputNumber precision={0} />   
            )}
        </Form.Item>         
        <Form.Item label={'本期发生'} {...formItemLayout} >
           {getFieldDecorator('amount_actual', {
                initialValue: item.amount_actual,
              }
            )(
            <InputNumber precision={0} disabled={true} />   
            )}
        </Form.Item>         
        <Form.Item label={'本期调整'} {...formItemLayout} >
           {getFieldDecorator('amount_adj', {
                initialValue: item.amount_adj,
              }
            )(
            <InputNumber precision={0} />   
            )}
        </Form.Item>         
        <Form.Item label={'本期合计'} {...formItemLayout} >
           {getFieldDecorator('amount', {
                initialValue: item.amount,
              }
            )(
            <InputNumber precision={0} />   
            )}
        </Form.Item>         
        <Form.Item label={'期末数'} {...formItemLayout} >
           {getFieldDecorator('amount_ytd', {
                initialValue: item.amount_ytd,
              }
            )(
            <InputNumber precision={0} />   
            )}
        </Form.Item>         
        <Form.Item label={'财务已入账'} {...formItemLayout} >
           {getFieldDecorator('amount_posted', {
                initialValue: item.amount_posted,
              }
            )(
            <InputNumber precision={0} disabled={true} />   
            )}
        </Form.Item>         
        <Form.Item label={'财务未入账'} {...formItemLayout} >
           {getFieldDecorator('amount_unposted', {
                initialValue: item.amount_unposted,
              }
            )(
            <InputNumber precision={0} disabled={true} />   
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
           variables: {input_content: {...data, }}, 
           update: (proxy, { data: { createEntrySummary } }) => {
              const cached = proxy.readQuery({ query: TableMasterQuery, variables: fetchProps })
              cached.dataSource.unshift(createEntrySummary);
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
        type: 'kpiSummary/hideModal',
      })
    },    
    onCancel () {
      dispatch({
        type: 'kpiSummary/hideModal',
      })
    },
  }



  const ModalRenderGene = () => <ModalRender {...modalRenderProps}/>;  


  const fetchPropsModalProps = {
    visible: fetchPropsModalVisible,
    item: fetchPropsGet,
    onOk (data) {
      dispatch({
        type: 'kpiSummary/setSearchProps',
        payload: {fetchPropsGet: data},
      })
    },
    onReset () {
      dispatch({
        type: 'kpiSummary/setDetails',
        payload: {fetchPropsGet: {}, filtersPage: {}, selectedRowKeys: [], totalAmount: {},},
      })
    },
    toggleForm () {
      dispatch({
        type: 'kpiSummary/setDetails',
        payload: {fetchPropsModalVisible: !fetchPropsModalVisible},
      })
    },
  };

  const FetchPropsModalGene = () => <FetchPropsModal {...fetchPropsModalProps}/>; 


  const buttonAuth = {btn01025: elementAuth ? _.findIndex(elementAuth.element_auth, {element_code: 'btn01025', permitted: true})!=-1 : false, 
        btn01013: elementAuth ? _.findIndex(elementAuth.element_auth, {element_code: 'btn01013', permitted: true})!=-1 : false, 
        wd00103: elementAuth ? _.findIndex(elementAuth.element_auth, {element_code: 'wd00103', permitted: true})!=-1 : false, 
        wd00105: elementAuth ? _.findIndex(elementAuth.element_auth, {element_code: 'wd00105', permitted: true})!=-1 : false, 
        btn01010: elementAuth ? _.findIndex(elementAuth.element_auth, {element_code: 'btn01010', permitted: true})!=-1 : false, 
        btn01012: elementAuth ? _.findIndex(elementAuth.element_auth, {element_code: 'btn01012', permitted: true})!=-1 : false, 
        btn01014: elementAuth ? _.findIndex(elementAuth.element_auth, {element_code: 'btn01014', permitted: true})!=-1 : false, };

  
  function KeyFuncTable({ data: { refetch } }){
    return (
      <Input.Group compact size="large">
       {buttonAuth.btn01010 && <Tooltip title={<span>导出到Excel</span>}>
         <Button style={{ fontSize: '14px' }} size={'large'} 
             >  
            <Icon type="download" style={{fontSize: '16px'}}/>导出
         </Button></Tooltip>}

         <Button style={{ fontSize: '14px' }} size={'large'} 
            onClick={() => refetch()} >  
            <Icon type="reload" style={{fontSize: '16px'}}/>刷新数据
         </Button>
       {buttonAuth.btn01012 && <Tooltip title={<span>显示或隐藏明细(需要先在主表中选择数据)</span>}>
         <Button style={{ fontSize: '14px' }} size={'large'} 
            onClick={() => {dispatch({type: 'kpiSummary/setDetails', payload: {detailedInfoVisible: !detailedInfoVisible}, })  }} 
           disabled={!hasSelectedItem}>  
            {detailedInfoVisible?<span><Icon type="caret-up" style={{fontSize: '16px'}}/>隐藏明细</span>:<span><Icon type="caret-down" style={{fontSize: '16px'}}/>显示明细</span>}
         </Button></Tooltip>}
       {buttonAuth.btn01025 &&
         <Button style={{ fontSize: '14px' }} size={'large'} 
            onClick={() => { initiate_entry_summary_by_month({ variables: { month: fetchPropsGet.report_period }, }).then((d)=> {if(d){ message.success('执行成功')}}).catch((error) => { message.error('存在错误，未执行成功  '+JSON.stringify(error)) })    }} >  
            <Icon type="link" style={{fontSize: '16px'}}/>初始化
         </Button>}
       {buttonAuth.btn01013 &&
         <Button style={{ fontSize: '14px' }} size={'large'} 
            onClick={() => { calculate_entry_summary_by_month({ variables: { month: fetchPropsGet.report_period }, }).then((d)=> {if(d){ message.success('执行成功')}}).catch((error) => { message.error('存在错误，未执行成功  '+JSON.stringify(error)) })    }} >  
            <Icon type="play-circle-o" style={{fontSize: '16px'}}/>重新计算
         </Button>}
       {buttonAuth.btn01014 &&
         <Button style={{ fontSize: '14px' }} size={'large'} 
            onClick={() => { lock_entry_summary_by_month({ variables: { month: fetchPropsGet.report_period }, }).then((d)=> {if(d){ message.success('执行成功')}}).catch((error) => { message.error('存在错误，未执行成功  '+JSON.stringify(error)) })    }} >  
            <Icon type="lock" style={{fontSize: '16px'}}/>封账
         </Button>}
      </Input.Group>
     ) 
  }  
  
  const KeyFuncTableActive  = graphql(TableMasterQuery, {options: { variables: fetchProps }})(KeyFuncTable);  


  return (
  <div>
  <Card style={{ marginBottom: 10 }} bodyStyle={{ padding: 10 }}>  
    <Row style={{ marginBottom: 10 }}>
       <KeyFuncTableActive/>
    </Row>
    <Row style={{ marginBottom: 10 }}>
       <FetchPropsModalGene/>
    </Row>
  <TableMasterActive {...tableMasterProps}/>
  </Card> 
  {modalVisible&&!dataOption.loading&&<ModalRenderGene/>}

  {hasSelectedItem&&detailedInfoVisible&&<Card bodyStyle={{ padding: 10 }}>
    <Tabs defaultActiveKey="1">
      {buttonAuth.wd00105 && <Tabs.TabPane tab="业绩明细" key="1">{hasSelectedItem&&<DtlsEntry/>}</Tabs.TabPane>}
    </Tabs>
  </Card>}
  </div> 
  )
}


const TableMasterQuery = gql`
query MyQuery ($report_period: String, $id: [ID], $ops_id: [Int], $offset: Int, $limit: Int, $order: JSON){
  dataSource: entry_summary (report_period: $report_period, ops_id: $ops_id, id: $id, offset: $offset, limit: $limit, order: $order){
    id  amount_unposted  ops_code  amount_init  report_period  amount_adj  amount_ytd  ops_id  amount_actual  amount_posted  amount  item  fin_id  account_no
    
  }
  countEntrySummary (report_period: $report_period, ops_id: $ops_id, id: $id)
}
`;


const DataOptionQuery = gql`
query MyQuery {
  DtOptnentry_item: field_option(option_code: "entry_item") {value, text}
  DtOptnfin_code: profile(is_fin_code: true){value: id, text: name_abbr}
  DtOptnops_code: profile(is_biz_code: true, biz_code_type: "ops_code"){value: id, text: name_abbr}
}
`;


const createRunningMaster = gql`
mutation createEntrySummary($input_content: EntrySummaryInput) {
  createEntrySummary(input_content: $input_content) {
    id  amount_unposted  ops_code  amount_init  report_period  amount_adj  amount_ytd  ops_id  amount_actual  amount_posted  amount  item  fin_id  account_no
    
  }
}
`

const updateRunningMaster = gql`
mutation updateEntrySummary($id: ID!, $input_content: EntrySummaryInput) {
  updateEntrySummary(id: $id, input_content: $input_content) {
    id  amount_unposted  ops_code  amount_init  report_period  amount_adj  amount_ytd  ops_id  amount_actual  amount_posted  amount  item  fin_id  account_no
    
  }
}
`

const destroyRunningMaster = gql`
mutation thisRunning($id: ID!) {
  destroyEntrySummary(id: $id)
}
`;


const ElementAuth = gql`
query MyQuery($role_applied: [String]) {
  element_auth(role_applied: $role_applied, frame_id: 19289) {
    id
    element_code
    element_id
    permitted
  }
}
`;

const lock_entry_summary_by_month = gql`
mutation lock_entry_summary_by_month($month: String!) {
  lock_entry_summary_by_month(month: $month) 
}
`;
const calculate_entry_summary_by_month = gql`
mutation calculate_entry_summary_by_month($month: String!) {
  calculate_entry_summary_by_month(month: $month) 
}
`;
const initiate_entry_summary_by_month = gql`
mutation initiate_entry_summary_by_month($month: String!) {
  initiate_entry_summary_by_month(month: $month) 
}
`;

const RenderComponentWithMutations = compose(
  graphql(ElementAuth, { name: 'elementAuth', options: (props) => {return { variables: { role_applied: props.user.roles }, fetchPolicy: 'network-only' }} }),
  graphql(DataOptionQuery, { name: 'dataOption' }),
  graphql(createRunningMaster, { name: 'createRunning' }),
  graphql(updateRunningMaster, { name: 'updateRunning' }),
  graphql(destroyRunningMaster, { name: 'destroyRunning' }),
  graphql(lock_entry_summary_by_month, { name: 'lock_entry_summary_by_month' }),
  graphql(calculate_entry_summary_by_month, { name: 'calculate_entry_summary_by_month' }),
  graphql(initiate_entry_summary_by_month, { name: 'initiate_entry_summary_by_month' }),  
)(RenderComponent);


function mapStateToProps(state) {
  return {
    kpiSummary: state.kpiSummary,
    user: state.app.user
  }
}

export default connect(mapStateToProps)(RenderComponentWithMutations);