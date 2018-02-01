import React from 'react'
import PropTypes from 'prop-types';
import { compose, gql, graphql } from 'react-apollo';
import { connect } from 'dva';
import moment from 'moment';
import _ from 'lodash';
import { Spin, Input, Tooltip, Icon, Button, Row, Col, Badge, Popover, DatePicker, message, Tabs, Checkbox, Table, Form, Popconfirm, Card, Modal, Check, Select, InputNumber, Radio, Tag} from 'antd';
import {formatter, getAllValuesFromRecord, color, getDistinctValues} from '../../utils';
import stylesShared from '../../utils/table.less';
import { DropOption, Search } from '../../components';
const confirm = Modal.confirm;
//import FetchPropsModal from './fetchPropsModal';
//import PagePropsModal from './pagePropsModal';


const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
}





function RenderComponent ({dispatch, controlCenterAlter, user, dataOption, }) {


  const { modalVisible, detailedInfoVisible, fetchPropsModalVisible, searchPropsModalVisible, modalType, searchProps, selectedItem, hasSelectedItem, currentItem, fetchProps, pagination, pagePropsModalVisible, showInPage, sizePage, footerPage, filtersPage, sorterPage, scrollPage } = controlCenterAlter;

  if (dataOption.loading) {
    return (<div><Spin size={'large'} tip={'数据加载中 Loading...'}/></div>)
  }
  if (dataOption.error) {
    return message.error(JSON.stringify(dataOption.error))
  }

  console.log(controlCenterAlter);
    // 解构暂时不考虑

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
        type: 'controlCenterAlter/setSearchProps',
        payload: {searchProps: value},
      })
    },
  };


  function TableMaster ({data, onPageChange, onRowClick,  }) {

    let { loading, error, dataSource } = data;

    if (loading) {
      return (<div><Spin size={'large'} tip={'数据加载中 Loading...'}/></div>)
    }
    if (error) {
      return message.error(JSON.stringify(error))
    }



    const handleMenuClick = (record, e) => {
      switch (e.key){

      }
    }


   const columns = [{

    title: '周期',
    dataIndex: 't_run',
    key: 't_run',
    width: 150,
  }, {
      title: '类型',
    dataIndex: 'type',
    key: 'type',
    width: 100,
  }, {
      title: '统计周期',
    dataIndex: 'record_type',
    key: 'record_type',
    width: 100,
  }, {
      title: '监控类型',
    dataIndex: 'alter_type',
    key: 'alter_type',
    width: 100,
  }, {
      title: '详细信息',
    dataIndex: 'message',
    key: 'message',
    width: 200,
  }, {
      title: '管理中心名称',
    dataIndex: 'control_center',
    key: 'control_center',
    width: 150,
    sorter: (a, b) => { let x = a.control_center||"0"; let y = b.control_center||"0"; if(x<y) return -1; else if(x>y) return 1; else return 0; },
    sortOrder: sorterPage.columnKey === 'control_center' && sorterPage.order,
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
        type: 'controlCenterAlter/setPageChange',
        payload: {pagination: pagination, filtersPage: filters, sorterPage: sorter},
      })
    },
    onRowClick(record, index, event) {
      dispatch({
        type: 'controlCenterAlter/setSelectedItem',
        payload: {selectedItem: record},
      })
    },

  }


  const TableMasterActive = graphql(TableMasterQuery, {
    options: { variables: fetchProps }
  })(TableMaster)




  return (
  <div>
  <Card style={{ marginBottom: 10 }} bodyStyle={{ padding: 5 }}>
    <Row style={{ marginBottom: 10 }}>
      <Col lg={15} md={24}>
      </Col>
      <Col lg={9} md={24} style={{textAlign: 'right'}}>
        <Search {...searchGroupProps}/>
      </Col>
    </Row>
  <TableMasterActive {...tableMasterProps}/>
  </Card>

  </div>
  )
}


const TableMasterQuery = gql`
query MyQuery {
  dataSource: control_center_alter  {
    alter_type  message  record_type  pct  count  amount_1  control_center  amount_2  status  id  chart_2nd  t_run  control_center_id  type  chart_1st
    
  }
}
`;


const DataOptionQuery = gql`
query MyQuery {
  dataOptionTBD: field_option(option_code: "TBD") {value, text}
}
`;



const RenderComponentWithMutations = compose(
  graphql(DataOptionQuery, { name: 'dataOption' }),
)(RenderComponent);


function mapStateToProps(state) {
  return {
    controlCenterAlter: state.controlCenterAlter,
    user: state.app.user
  }
}

export default connect(mapStateToProps)(RenderComponentWithMutations);
