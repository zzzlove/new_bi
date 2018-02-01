import React from 'react'
import PropTypes from 'prop-types';
import { compose, gql, graphql } from 'react-apollo';
import { connect } from 'dva';
import moment from 'moment';
import _ from 'lodash';
import { Alert, Spin, Input, Tooltip, Icon, Button, Row, Col, Badge, Popover, DatePicker, message, Tabs, Checkbox, Table, Form, Popconfirm, Card, Modal, Check, Select, InputNumber, Radio, Tag} from 'antd';
import {formatter, getAllValuesFromRecord, color, openNewLink, getDistinctValues} from '../../utils';
import stylesShared from '../../utils/table.less';
import { DropOption, SearchInput, Exception } from '../../components';
const confirm = Modal.confirm;
import  crypto from 'crypto';
import { routerRedux, Link } from 'dva/router';


const formItemLayout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 18,
  },
}

const formLargeItemLayout = {
  labelCol: {
    span: 2,
  },
  wrapperCol: {
    span: 21,
  },
}

const tailFormItemLayout = {

  wrapperCol: {
    span: 20, offset: 2
  },
}




import FetchPropsModal from './fetchPropsModal';
import PagePropsModal from './pagePropsModal';






function RenderComponent ({dispatch, xuser, user,  dataOption, createRunning, updateRunning, destroyRunning, }) {

  if(!user.menu.user){
    return (
     <Exception type="403" style={{ minHeight: 500, height: '80%' }} linkElement={Link} />
    )
  }
  const { selectedRowKeys, totalAmount, modalVisible, detailedInfoVisible, fetchPropsModalVisible, searchPropsModalVisible, modalType, searchProps, selectedItem, hasSelectedItem, currentItem, fetchProps, pagination, pagePropsModalVisible, showInPage, sizePage, footerPage, filtersPage, sorterPage, scrollPage } = xuser;
  
  if (dataOption.loading) {
    return (<div><Spin size={'large'} tip={'数据加载中 Loading...'}/></div>)
  }
  if (dataOption.error) {
    return message.error(JSON.stringify(dataOption.error))
  }  

  
  
  const { DtOptnfin_code, DtOptnops_code, DtOptnsales_code,  DtOptncontrol_center} = dataOption;   // 解构暂时不考虑  kh_admin
  
  const DtOptnroles = [{value: 'ops_kh', text: 'ops_kh'}, {value: 'headoffice_kh', text: 'headoffice_kh'}, {value: 'kh_admin', text: 'kh_admin'}, {value: 'headoffice_kh_excel', text: 'headoffice_kh_excel'}, {value: 'headoffice_uk', text: 'headoffice_uk'}]
 
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
        type: 'xuser/setSearchProps',
        payload: {searchProps: value},
      })
    },
    onClearFilter: () => {
      dispatch({
        type: 'xuser/setSearchProps',
        payload: {sorterPage: {}, filtersPage: {}},
      })
    },
  };


  function TableMaster ({data, onPageChange, onRowClick, destroyRunning, updateRunning, openEditModal,  }) {

    let { loading, error, dataSource } = data; 

    if (loading) {
      return (<div><Spin size={'large'} tip={'数据加载中 Loading...'}/></div>)
    }
    if (error) {
      return message.error(JSON.stringify(error))
    }        

    

    const handleMenuClick = (record, e) => {
      switch (e.key){
      case 'btn00316': {return confirm({ title: '您确定要删除这条记录吗?', onOk () { destroyRunning(record.id)}, }) }
      } 
    }  


   const columns = [{
  title: '操作',
  key: 'operation',
  width: 50,
  
  className: stylesShared.align_center,
  render: (text, record) => {
    return <DropOption onMenuClick={e => handleMenuClick(record, e)} menuOptions={[{ key: 'btn00316', name: '删除', icon: 'delete', }]} buttonStyle={{size: "large"}} />
  },
  }, {
    title: '编号',
    dataIndex: 'id',
    key: 'id',
    width: 80,
    sorter: (a, b) => { let x=parseInt(a.id)||0; let y=parseInt(b.id)||0; if(x<y) return -1; else if(x>y) return 1; else return 0; },
    sortOrder: sorterPage.columnKey === 'id' && sorterPage.order,
  }, {
      title: '真实名称',
    dataIndex: 'name',
    key: 'name',
    width: 150,
    sorter: (a, b) => { let x = a.name||"0"; let y = b.name||"0"; if(x<y) return -1; else if(x>y) return 1; else return 0; },
    sortOrder: sorterPage.columnKey === 'name' && sorterPage.order,
  }, {
      title: '登入账号',
    dataIndex: 'username',
    key: 'username',
    width: 150,
    sorter: (a, b) => { let x = a.username||"0"; let y = b.username||"0"; if(x<y) return -1; else if(x>y) return 1; else return 0; },
    sortOrder: sorterPage.columnKey === 'username' && sorterPage.order,
  }, {
      title: '财务主体',
    dataIndex: 'fin_id',
    key: 'fin_id',
    width: 150,
    render: (text, record, index) => {let i = _.findIndex(DtOptnfin_code, {value: text}); if (i>=0){ return DtOptnfin_code[i].text; } else {return text}},
    filters: DtOptnfin_code,
    onFilter: (value, record) => record.fin_id === value,
    filteredValue: filtersPage.fin_id || null,
    sorter: (a, b) => { let x = a.fin_id||"0"; let y = b.fin_id||"0"; if(x<y) return -1; else if(x>y) return 1; else return 0; },
    sortOrder: sorterPage.columnKey === 'fin_id' && sorterPage.order,
  }, {
      title: '运营主体',
    dataIndex: 'ops_id',
    key: 'ops_id',
    width: 150,
    render: (text, record, index) => {let i = _.findIndex(DtOptnops_code, {value: text}); if (i>=0){ return DtOptnops_code[i].text; } else {return text}},
    filters: DtOptnops_code,
    onFilter: (value, record) => record.ops_id === value,
    filteredValue: filtersPage.ops_id || null,
    sorter: (a, b) => { let x = a.ops_id||"0"; let y = b.ops_id||"0"; if(x<y) return -1; else if(x>y) return 1; else return 0; },
    sortOrder: sorterPage.columnKey === 'ops_id' && sorterPage.order,
  }, {
      title: '销售主体',
    dataIndex: 'sales_id',
    key: 'sales_id',
    width: 150,
    render: (text, record, index) => {let i = _.findIndex(DtOptnsales_code, {value: text}); if (i>=0){ return DtOptnsales_code[i].text; } else {return text}},
    filters: DtOptnsales_code,
    onFilter: (value, record) => record.sales_id === value,
    filteredValue: filtersPage.sales_id || null,
    sorter: (a, b) => { let x = a.sales_id||"0"; let y = b.sales_id||"0"; if(x<y) return -1; else if(x>y) return 1; else return 0; },
    sortOrder: sorterPage.columnKey === 'sales_id' && sorterPage.order,
  }, {
      title: '角色',
    dataIndex: 'roles',
    key: 'roles',
    width: 250,
    filters: DtOptnroles,
    onFilter: (value, record) => record.roles.indexOf(value)!=-1,
    filteredValue: filtersPage.roles || null,
    render: (text, record, index) => text.join(', '),
  }, {
      title: '创建时间',
    dataIndex: 'created_at',
    key: 'created_at',
    width: 150,
    render: (text, record) => { if(text){ return <span>{formatter.date(new Date(text),'yyyy-MM-dd hh:mm:ss')}</span> } else { return null;} },
  }, {
      title: '更新时间',
    dataIndex: 'updated_at',
    key: 'updated_at',
    width: 150,
    render: (text, record) => { if(text){ return <span>{formatter.date(new Date(text),'yyyy-MM-dd hh:mm:ss')}</span> } else { return null;} },
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
              rowClassName: (record, index) => record.id == selectedItem.id ? stylesShared.selectedItem : null,
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
        type: 'xuser/setPageChange',
        payload: {pagination: pagination, filtersPage: filters, sorterPage: sorter},
      })
    },
    onRowClick(record, index, event) {
      dispatch({
        type: 'xuser/setSelectedItem',
        payload: {selectedItem: record},
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
        .then(({data: {destroyUser}})=> {if(destroyUser){message.success('删除成功')}})
        .catch((error) => {message.error('存在错误，未执行成功  '+JSON.stringify(error)) })
    },
    openEditModal (item) {
      dispatch({
        type: 'xuser/showModal',
        payload: {modalType: 'update', currentItem: item,  },
      })
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


  const edifFormMaster = ({
    item = {},
    onOk,
    form: {
      getFieldDecorator,
      validateFields,
      getFieldsValue,
    },
  }) => {
    
    function handleOk (e) {
        e.preventDefault();
        validateFields((err, values) => {
        if(err){return }

      if(values.roles == item.roles){delete values.roles; } else {if(typeof(values.roles)=="undefined"){values.roles = null; }}
      if(values.username == item.username){delete values.username; }
      if(values.control_center_ids == item.control_center_ids){delete values.control_center_ids; } else {if(typeof(values.control_center_ids)=="undefined"){values.control_center_ids = null; }}
      if(values.control_center_all == item.control_center_all){delete values.control_center_all; } else {if(typeof(values.control_center_all)=="undefined"){values.control_center_all = null; }}
      if(values.fin_id == item.fin_id){delete values.fin_id; } else {if(typeof(values.fin_id)=="undefined"){values.fin_id = null; }}
      if(values.ops_id == item.ops_id){delete values.ops_id; } else {if(typeof(values.ops_id)=="undefined"){values.ops_id = null; }}
      if(values.ops_code_all == item.ops_code_all){delete values.ops_code_all; } else {if(typeof(values.ops_code_all)=="undefined"){values.ops_code_all = null; }}
      if(values.product_no_all == item.product_no_all){delete values.product_no_all; } else {if(typeof(values.product_no_all)=="undefined"){values.product_no_all = null; }}
      if(values.fin_code_all == item.fin_code_all){delete values.fin_code_all; } else {if(typeof(values.fin_code_all)=="undefined"){values.fin_code_all = null; }}
      if(values.name == item.name){delete values.name; }
      if(values.service_no_all == item.service_no_all){delete values.service_no_all; } else {if(typeof(values.service_no_all)=="undefined"){values.service_no_all = null; }}
      if(values.sales_code_all == item.sales_code_all){delete values.sales_code_all; } else {if(typeof(values.sales_code_all)=="undefined"){values.sales_code_all = null; }}
      if(values.password == item.password){delete values.password; }else{ var md5 = crypto.createHash('md5');    md5.update(values.password);  values.password = md5.digest('hex');}
      if(values.sales_id == item.sales_id){delete values.sales_id; } else {if(typeof(values.sales_id)=="undefined"){values.sales_id = null; }}
        
        if (Object.getOwnPropertyNames(values).length == 0) {
          return
        }
        const data = {
          ...values, 
        }

        onOk(data)      

      })
    }

    
    return (

        <Form layout="horizontal" onSubmit={handleOk} >
        <Row ><Col span={12}>
        <Form.Item label="真实名称"  {...formItemLayout} >
           {getFieldDecorator('name', {
                initialValue: item.name,
              }
            )(
            <Input  />   
            )}
        </Form.Item> </Col><Col span={12}>        
        <Form.Item label="登入账号"  {...formItemLayout} >
           {getFieldDecorator('username', {
                initialValue: item.username,     rules: [{ required: true, message: '此项目为必填项!'}] ,
              }
            )(
            <Input  />   
            )}
        </Form.Item> </Col></Row>        <Row ><Col span={12}>
        <Form.Item label="密码"  {...formItemLayout} >
           {getFieldDecorator('password', {
                initialValue: item.password,
              }
            )(
            <Input  />   
            )}
        </Form.Item> </Col><Col span={12}>        
        <Form.Item label="角色"  {...formItemLayout} >
           {getFieldDecorator('roles', {
                initialValue: item.roles,     rules: [{ required: true, message: '此项目为必填项!'}] ,
              }
            )(
            <Select allowClear={true} optionFilterProp={'title'} mode={'multiple'} >
              {DtOptnroles.map(d => <Select.Option key={d.value} title={d.text}>{d.text}</Select.Option>)}
            </Select>         
            )}
        </Form.Item> </Col></Row>        <Row ><Col span={12}>
        <Form.Item label="运营主体"  {...formItemLayout} >
           {getFieldDecorator('ops_id', {
                initialValue: item.ops_id,
              }
            )(
            <Select allowClear={true} optionFilterProp={'title'} showSearch={true} >
              {DtOptnops_code.map(d => <Select.Option key={d.value} title={d.text}>{d.text}</Select.Option>)}
            </Select>         
            )}
        </Form.Item> </Col><Col span={12}>        
        <Form.Item label="可访问运营主体集"  {...formItemLayout} >
           {getFieldDecorator('ops_code_all', {
                initialValue: item.ops_code_all,
              }
            )(
            <Select allowClear={true} mode={'multiple'} optionFilterProp={'title'} >
              {DtOptnops_code.map(d => <Select.Option key={d.value} title={d.text}>{d.text}</Select.Option>)}
            </Select>         
            )}
        </Form.Item> </Col></Row>        <Row ><Col span={12}>
        <Form.Item label="财务主体"  {...formItemLayout} >
           {getFieldDecorator('fin_id', {
                initialValue: item.fin_id,
              }
            )(
            <Select allowClear={true} optionFilterProp={'title'} showSearch={true} >
              {DtOptnfin_code.map(d => <Select.Option key={d.value} title={d.text}>{d.text}</Select.Option>)}
            </Select>         
            )}
        </Form.Item> </Col><Col span={12}>        
        <Form.Item label="可访问财务主体集"  {...formItemLayout} >
           {getFieldDecorator('fin_code_all', {
                initialValue: item.fin_code_all,
              }
            )(
            <Select allowClear={true} mode={'multiple'} optionFilterProp={'title'} >
              {DtOptnfin_code.map(d => <Select.Option key={d.value} title={d.text}>{d.text}</Select.Option>)}
            </Select>         
            )}
        </Form.Item> </Col></Row>        <Row ><Col span={12}>
        <Form.Item label="销售主体"  {...formItemLayout} >
           {getFieldDecorator('sales_id', {
                initialValue: item.sales_id,
              }
            )(
            <Select allowClear={true} optionFilterProp={'title'} showSearch={true} >
              {DtOptnsales_code.map(d => <Select.Option key={d.value} title={d.text}>{d.text}</Select.Option>)}
            </Select>         
            )}
        </Form.Item> </Col><Col span={12}>        
        <Form.Item label="可访问销售主体集"  {...formItemLayout} >
           {getFieldDecorator('sales_code_all', {
                initialValue: item.sales_code_all,
              }
            )(
            <Select allowClear={true} mode={'multiple'} optionFilterProp={'title'} >
              {DtOptnsales_code.map(d => <Select.Option key={d.value} title={d.text}>{d.text}</Select.Option>)}
            </Select>         
            )}
        </Form.Item> </Col></Row>        <Row ><Col span={12}>
        <Form.Item label="可访问产品主体集"  {...formItemLayout} >
           {getFieldDecorator('product_no_all', {
                initialValue: item.product_no_all,
              }
            )(
            <Select allowClear={true} mode={'multiple'} optionFilterProp={'title'} >
              
            </Select>         
            )}
        </Form.Item> </Col><Col span={12}>        
        <Form.Item label="可访问服务主体集"  {...formItemLayout} >
           {getFieldDecorator('service_no_all', {
                initialValue: item.service_no_all,
              }
            )(
            <Select allowClear={true} mode={'multiple'} optionFilterProp={'title'} >
              {DtOptncontrol_center.map(d => <Select.Option key={d.value} title={d.text}>{d.text}</Select.Option>)}
            </Select>         
            )}
        </Form.Item> </Col></Row>       
        <Row ><Col span={12}>
        <Form.Item label="下级编号"  {...formItemLayout} >
           {getFieldDecorator('control_ids', {
                initialValue: item.control_ids,
              }
            )(
            <Select allowClear={true} mode={'multiple'} optionFilterProp={'title'} disabled>
              {DtOptnops_code.map(d => <Select.Option key={d.value} title={d.text}>{d.text}</Select.Option>)}
            </Select>         
            )}
        </Form.Item> </Col><Col span={12}>        
        <Form.Item label="可关注的经营主体"  {...formItemLayout} >
           {getFieldDecorator('concerning_ids', {
                initialValue: item.concerning_ids,
              }
            )(
            <Select allowClear={true} mode={'multiple'} optionFilterProp={'title'} >
              {DtOptnops_code.map(d => <Select.Option key={d.value} title={d.text}>{d.text}</Select.Option>)}
            </Select>         
            )}
        </Form.Item> </Col></Row>
          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">确定</Button>
          </Form.Item>  
        </Form>

    )
  }

  /*
 <Row ><Col span={12}>
        <Form.Item label="control_center_all"  {...formItemLayout} >
           {getFieldDecorator('control_center_all', {
                initialValue: item.control_center_all,
              }
            )(
            <Select allowClear={true} mode={'multiple'} optionFilterProp={'title'} >
              
            </Select>         
            )}
        </Form.Item> </Col><Col span={12}>        
        <Form.Item label="control_center_ids"  {...formItemLayout} >
           {getFieldDecorator('control_center_ids', {
                initialValue: item.control_center_ids,
              }
            )(
            <Select allowClear={true} mode={'multiple'} optionFilterProp={'title'} >
              
            </Select>         
            )}
        </Form.Item> </Col></Row>  
  */

  const EdifFormMaster = Form.create()(edifFormMaster); 


  const createEditFormProps = {
    item: currentItem ,
    onOk (data) {
        createRunning({
           variables: {input_content: {...data, }}, 
           update: (proxy, { data: { createUser } }) => {
              const cached = proxy.readQuery({ query: TableMasterQuery, variables: fetchProps })
              cached.dataSource.unshift(createUser);
              proxy.writeQuery({ query: TableMasterQuery, variables: fetchProps, data: cached })
           }, 
        })
        .then((d)=> {if(d){message.success('新建成功')}})
        .catch((error) => {message.error('存在错误，未执行成功  '+JSON.stringify(error)) })

      dispatch({type: 'xuser/setDetails', payload: {currentItem: {}},  })
    },    
  }

  const updateEditFormProps = {
    item: selectedItem ,
    onOk (data) {
        updateRunning({ 
           variables: { id: selectedItem.id, input_content: data }, 
        })
        .then((d)=> {if(d){message.success('修改成功')}})
        .catch((error) => {message.error('存在错误，未执行成功  '+JSON.stringify(error)) })
    },    
  }  

  const CreateEdifFormMaster = () => <EdifFormMaster {...createEditFormProps}/>; 
  const UpdateEdifFormMaster = () => <EdifFormMaster {...updateEditFormProps}/>; 


  const fetchPropsModalProps = {
    visible: fetchPropsModalVisible,
    item: fetchProps,
    onOk (data) {
      dispatch({
        type: 'xuser/setFetchProps',
        payload: {fetchProps: data},
      })
    },
    onCancel () {
      dispatch({
        type: 'xuser/hideFetchPropsModal',
      })
    },
  };

  const FetchPropsModalGene = () => <FetchPropsModal {...fetchPropsModalProps}/>;
  
  const pagePropsModalProps = {
    visible: pagePropsModalVisible,
    item: {showInPage, sizePage, footerPage},
    onOk (data) {
      dispatch({
        type: 'xuser/setPageProps',
        payload: data,
      })
    },
    onCancel () {
      dispatch({
        type: 'xuser/setPageProps',
      })
    },
  };  

 
  const PagePropsModalGene = () => <PagePropsModal {...pagePropsModalProps}/>;




  function KeyFuncTable({openCreateModal, openPagePropsModal, downloadRunning, uploadRunning, openFetchModal, toggleDetails, }){
    return (
      <Input.Group compact size="large">
         <Tooltip title="显示或隐藏明细(需要先在主表中选择数据)"><Button style={{ fontSize: '14px' }} size={'large'} onClick={toggleDetails} disabled={!hasSelectedItem}>{detailedInfoVisible?<span><Icon type="caret-up" style={{fontSize: '16px'}}/>隐藏明细</span>:<span><Icon type="caret-down" style={{fontSize: '16px'}}/>显示明细</span>}</Button></Tooltip>
      </Input.Group>
     ) 
  }  
  
  const keyFuncTableProps = {
    openCreateModal () {
      dispatch({
        type: 'xuser/showModal',
        payload: {
          modalType: 'create',
          currentItem: {},
        },
      })
    },
    openFetchModal () {
      dispatch({
        type: 'xuser/showFetchPropsModal',
      })
    },
    openPagePropsModal () {
      dispatch({
        type: 'xuser/showPagePropsModal',
      })
    },
    toggleDetails () {
      dispatch({
        type: 'xuser/setDetails',
        payload: {detailedInfoVisible: !detailedInfoVisible},
      })
    },

  };




  return (
  <div>
  <Card style={{ marginBottom: 10 }} bodyStyle={{ padding: 10 }}>  
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
  <PagePropsModalGene/>

  {hasSelectedItem&&detailedInfoVisible&&<Card bodyStyle={{ padding: 10 }}>
    <Tabs defaultActiveKey="update">
      <Tabs.TabPane tab="变更" key="update">{!dataOption.loading&&<UpdateEdifFormMaster/>}</Tabs.TabPane>
      <Tabs.TabPane tab="新增" key="create">{!dataOption.loading&&<CreateEdifFormMaster/>}</Tabs.TabPane>
    </Tabs>
  </Card>}
  </div> 
  )
}


const TableMasterQuery = gql`
query MyQuery($id: ID) {
  dataSource:   user(id: $id){
    roles  company_code  name  username  started_at  fin_code_all  finished_at  ops_code_all  ops_code  sales_code  id  profile_id  control_center_ids  disabled  sales_code_all  product_no_all  service_no_all  control_center_all  created_at  updated_at  deleted_at  fin_code  fin_id  ops_id  sales_id  control_ids  concerning_ids
    
  }
}
`;


const DataOptionQuery = gql`
query MyQuery {
  DtOptnfin_code: profile(is_fin_code: true){value: id, text: name_abbr}
  DtOptnops_code: profile(is_biz_code: true, biz_code_type: "ops_code"){value: id, text: name_abbr}
  DtOptnsales_code: profile(is_biz_code: true, biz_code_type: "sales_code"){value: id, text: name_abbr}
  DtOptncontrol_center: control_center(type: ["line", "service"]){value: id, text: name}
}
`;


const createRunningMaster = gql`
mutation createUser($input_content: UserInput) {
  createUser(input_content: $input_content) {
    roles  company_code  name  username  started_at  fin_code_all  finished_at  ops_code_all  ops_code  sales_code  id  profile_id  control_center_ids  disabled  sales_code_all  product_no_all  service_no_all  control_center_all  created_at  updated_at  deleted_at  fin_code  fin_id  ops_id  sales_id   control_ids  concerning_ids
    
  }
}
`

const updateRunningMaster = gql`
mutation updateUser($id: ID!, $input_content: UserInput) {
  updateUser(id: $id, input_content: $input_content) {
    roles  company_code  name  username  started_at  fin_code_all  finished_at  ops_code_all  ops_code  sales_code  id  profile_id  control_center_ids  disabled  sales_code_all  product_no_all  service_no_all  control_center_all  created_at  updated_at  deleted_at  fin_code  fin_id  ops_id  sales_id  control_ids  concerning_ids
    
  }
}
`

const destroyRunningMaster = gql`
mutation thisRunning($id: ID!) {
  destroyUser(id: $id)
}
`;




const RenderComponentWithMutations = compose(
  graphql(DataOptionQuery, { name: 'dataOption' }),
  graphql(createRunningMaster, { name: 'createRunning' }),
  graphql(updateRunningMaster, { name: 'updateRunning' }),
  graphql(destroyRunningMaster, { name: 'destroyRunning' }),
  
)(RenderComponent);


function mapStateToProps(state) {
  return {
    xuser: state.xuser,
    user: state.app.user
  }
}

export default connect(mapStateToProps)(RenderComponentWithMutations);