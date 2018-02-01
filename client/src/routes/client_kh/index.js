import React from 'react'
import PropTypes from 'prop-types';
import { compose, gql, graphql } from 'react-apollo';
import { connect } from 'dva';
import { Spin, Input, Tooltip, Icon, Button, Row, Col,Badge, Popover, DatePicker, message, Tabs } from 'antd';


import ModalRender from './modal';
import TableMaster from './table';
import FetchPropsModal from './fetchPropsModal';
import PagePropsModal from './pagePropsModal';
import { SearchInput } from '../../components';

import TableX1 from './tableX1';

//onCreateRecord, onPageOne, onExportExl, onImportExl, onSetFetchProps

function RenderComponent ({dispatch, client_kh, dataOption, createRunning, updateRunning, destroyRunning}) {


  const { modalVisible, fetchPropsModalVisible, searchPropsModalVisible, modalType, searchProps, selectedItem, currentItem, fetchProps, pagination, pagePropsModalVisible, showInPage, sizePage, footerPage } = client_kh;

  //console.log(client_kh);

  if (dataOption.loading) {
    return (<div><Spin size={'large'} tip={'数据加载中 Loading...'}/></div>)
  }
  if (dataOption.error) {
    return (<p>{error.message}</p>)
  }

  const searchGroupProps = {
    keyword: '',
    select: true,
    size: 'large',
    selectOptions: [{ value: 'tableAllColumns', name: '全表查询' }],
    selectProps: {
      defaultValue: 'tableAllColumns',
    },
    onSearch: (value) => {
      dispatch({
        type: 'client_kh/setSearchProps',
        payload: {searchProps: value},
      })
    },
    onClearFilter: () => {
      dispatch({
        type: 'client_kh/setSearchProps',
        payload: {sorterPage: {}, filtersPage: {}},
      })
    },
  };


  const tableMasterProps = {
    dataOption,
    pagination,
    onPageChange(pagination, filters, sorter) {
      dispatch({
        type: 'client_kh/setPageChange',
        payload: {pagination: pagination, filtersPage: filters, sorterPage: sorter},
      })
    },
    onRowClick(record, index, event) {
      dispatch({
        type: 'client_kh/setSelectedItem',
        payload: {selectedItem: record},
      })
    },
    onDeleteItem (id) {
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
        .then(({data: {destroyMemberContract}})=> {if(destroyMemberContract){message.success('删除成功')}})
        .catch((error) => {message.error('存在错误，未执行成功  '+JSON.stringify(error)) })
    },
    onEditItem (item) {
      dispatch({
        type: 'client_kh/showModal',
        payload: {modalType: 'update', currentItem: item,  },
      })
    },
  }


  const modalRenderProps = {
    item: modalType === 'create' ? {} : currentItem,
    type: modalType,
    visible: modalVisible,
    onOk (data) {
      if (modalType === 'create') {
        createRunning({
           variables: {input_content: data},
           update: (proxy, { data: { createMemberContract } }) => {
              const cached = proxy.readQuery({ query: TableMasterQuery, variables: fetchProps })
              cached.dataSource.unshift(createMemberContract);
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
        type: 'client_kh/hideModal',
      })
    },
    onCancel () {
      dispatch({
        type: 'client_kh/hideModal',
      })
    },
  }



  const TableMasterActive = graphql(TableMasterQuery, {
    options: { variables: fetchProps }
  })(TableMaster)


  function KeyFuncTable({onCreateRecord, onPageProps, onExportExl, onImportExl, onSetFetchProps}){
    return (
      <Input.Group compact size="large">
         <Button style={{ fontSize: '14px' }} size={'large'} onClick={onCreateRecord}><Icon type="file-add" style={{fontSize: '16px'}}/>新建</Button>
         <Tooltip title="页面显示设置"><Button style={{ fontSize: '16px' }} size={'large'} onClick={onPageProps}><Icon type="setting" style={{fontSize: '16px'}}/></Button></Tooltip>
         <Tooltip title="导出到Excel"><Button style={{ fontSize: '16px' }} size={'large'} onClick={onExportExl}><Icon type="download" style={{fontSize: '16px'}}/></Button></Tooltip>
         <Tooltip title="从Excel导入"><Button style={{ fontSize: '16px' }} size={'large'} onClick={onImportExl}><Icon type="upload" style={{fontSize: '16px'}}/></Button></Tooltip>
         <Tooltip title="输入查询参数，从服务器获取数据"><Button style={{ fontSize: '16px' }} size={'large'} onClick={onSetFetchProps}><Icon type="cloud-download" style={{fontSize: '16px'}}/></Button></Tooltip>
      </Input.Group>
     )
  }

  const keyFuncTableProps = {
    onCreateRecord () {
      dispatch({
        type: 'client_kh/showModal',
        payload: {
          modalType: 'create',
          currentItem: {},
        },
      })
    },
    onSetFetchProps () {
      dispatch({
        type: 'client_kh/showFetchPropsModal',
      })
    },
    onPageProps () {
      dispatch({
        type: 'client_kh/showPagePropsModal',
      })
    },
  };

  const fetchPropsModalProps = {
    visible: fetchPropsModalVisible,
    item: fetchProps,
    onOk (data) {
      dispatch({
        type: 'client_kh/setFetchProps',
        payload: {fetchProps: data},
      })
    },
    onCancel () {
      dispatch({
        type: 'client_kh/hideFetchPropsModal',
      })
    },
  };

  const pagePropsModalProps = {
    visible: pagePropsModalVisible,
    item: {showInPage, sizePage, footerPage},
    onOk (data) {
      dispatch({
        type: 'client_kh/setPageProps',
        payload: data,
      })
    },
    onCancel () {
      dispatch({
        type: 'client_kh/setPageProps',
      })
    },
  };

  const FetchPropsModalGene = () => <FetchPropsModal {...fetchPropsModalProps}/>;
  const PagePropsModalGene = () => <PagePropsModal {...pagePropsModalProps}/>;
  const ModalRenderGene = () => <ModalRender {...modalRenderProps}/>;

  return (
  <div>
  <Row style={{ marginBottom: 10 }}>
    <Col lg={15} md={24}>
      {}
    </Col>
    <Col lg={9} md={24} style={{textAlign: 'right'}}>
      <SearchInput {...searchGroupProps}/>
    </Col>
  </Row>
  <TableMasterActive {...tableMasterProps}/>
  <FetchPropsModalGene/>
  <PagePropsModalGene/>
  <ModalRenderGene/>
  <Tabs defaultActiveKey="1" size="small">
   {selectedItem&&<Tabs.TabPane tab="客户履约情况" key="1"><TableX1 service_id={selectedItem.service_id} member_name={selectedItem.member_name}/></Tabs.TabPane>}
  </Tabs>
  </div>
  )
}



const TableMasterQuery = gql`
query MyQuery {
  dataSource: member_contract {
    id
    member_id
    service_id
    employee_id
    type
    round_trip
    quantity
    unit_price
    started_at
    finished_at
    disabled
    remarks
    member_name
    service_name
    employee_name
  }
}


`;


const DataOptionQuery = gql`
query MyQuery {
  dataOptiong002: field_option(option_code: "g002") {
    id
    value
    text
  }
  dataOptionsd001: field_option(option_code: "sd001") {
    id
    value
    text
  }
  dataOptionsd002: field_option(option_code: "sd002") {
    id
    value
    text
  }
}

`;


const createRunningMaster = gql`
mutation createMemberContract($input_content: MemberContractInput) {
  createMemberContract(input_content: $input_content) {
    id
    member_id
    service_id
    employee_id
    type
    round_trip
    quantity
    unit_price
    started_at
    finished_at
    disabled
    remarks
    member_name
    service_name
    employee_name
  }
}
`

const updateRunningMaster = gql`
mutation updateMemberContract($id: Int!, $input_content: MemberContractInput) {
  updateMemberContract(id: $id, input_content: $input_content) {
    id
    member_id
    service_id
    employee_id
    type
    round_trip
    quantity
    unit_price
    started_at
    finished_at
    disabled
    remarks
    member_name
    service_name
    employee_name
  }
}
`

const destroyRunningMaster = gql`
mutation thisRunning($id: Int!) {
  destroyMemberContract(id: $id)
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
    client_kh: state.client_kh,
    user: state.app.user
  }
}

export default connect(mapStateToProps)(RenderComponentWithMutations);
