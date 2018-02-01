
import { connect } from 'dva';
import React from 'react';
import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';
import { Table, Spin, Icon, Button, Popconfirm, Row, Col, Card } from 'antd';
import 'antd/dist/antd.css'; 

import { Select, Input, DatePicker } from 'antd';



class Table00003 extends React.Component {
  
 constructor(props) {
  super(props);
  this.state = {
       visible: false,
       editValues: null,
       filterDropdownVisible: false,
       searchText: '',
       selectedRowKeys: [],
       currentSelectedRow: {},
       selectedRows: [],
       tabelDefinition: {
            bordered: true,
            rowKey: 'id',
            pagination: {showSizeChanger: true},
            size: 'small',
            title: false,
            showHeader: true,
            footer: false,
            rowSelection: {},
          }
       };
 }
 
  handleTableChange = (pagination, filters, sorter) => {
    this.setState({
      filteredInfo: filters,
      sortedInfo: sorter,
    });
  }


  
   onCellChange = (index, key) => {
    return (value) => {
      const dataSource = [...this.state.dataSource];
      dataSource[index][key] = value;
      this.setState({ dataSource });
    };
  }

   showModalandCreate = () => {
    this.setState({ editValues: null });
    this.setState({ visible: true });
  }

   showModalandEdit = (record) => {
    this.setState({ editValues: record });
    this.setState({ visible: true });
  }

   handleDialogCancel = () => {
    this.setState({ visible: false });
  }

  handleDialogOk = (data) => {
    this.setState({ visible: false });
    this.props.Table00124Upsert({input_content: {data}})
       .then(({ data }) => {
        console.log('saved');
        }).catch((error) => {
        console.log('there was an error sending the query', error);
        });
  }
  
   handleRowClick = (record, index) => {
    this.setState({ currentSelectedRow: record });
  }

   onDelete = (index) => {
    const dataSource = [...this.state.dataSource];
    dataSource.splice(index, 1);
    this.setState({ dataSource });
  }

   handleSizeChange = (e) => {
    this.setState({ tabelDefinition: {size: e.target.value} });
  }
  
render() {

 const { loading, error, dataSource, dataOptiong004, dataOptionmd003, dataOptiong001 } = this.props.data;    

 const { selectedRowKeys, currentSelectedRow } = this.state;

 const columns = [{
  title: 'name',
  dataIndex: 'name',
  key: '1908',
  width: 150,
  sorter: (a, b) => { let x = a.name||"0"; let y = b.name||"0"; if(x<y) return -1; else if(x>y) return 1; else return 0; },
  }, {
  title: 'name_en',
  dataIndex: 'name_en',
  key: '1912',
  width: 150,
  sorter: (a, b) => { let x = a.name_en||"0"; let y = b.name_en||"0"; if(x<y) return -1; else if(x>y) return 1; else return 0; },
  }, {
  title: 'profile_no',
  dataIndex: 'profile_no',
  key: '2215',
  width: 150,
  sorter: (a, b) => { let x = a.profile_no||"0"; let y = b.profile_no||"0"; if(x<y) return -1; else if(x>y) return 1; else return 0; },
  }, {
  title: 'type',
  dataIndex: 'type',
  key: '2127',
  width: 150,
  render: (text, record, index) => { switch (text) {
}; },
  filters: dataOptionmd003,
  onFilter: (value, record) => record.type === value,
  sorter: (a, b) => { let x = a.type||"0"; let y = b.type||"0"; if(x<y) return -1; else if(x>y) return 1; else return 0; },
  }, {
  title: 'status',
  dataIndex: 'status',
  key: '2126',
  width: 150,
  render: (text, record, index) => { switch (text) {
  case 'pocessing': return '审批中';  break; 
  case 'approved': return '审批结束';  break; 
  case 'entered': return '提交';  break; 
  case 'locked': return '已过账';  break; }; },
  filters: dataOptiong004,
  onFilter: (value, record) => record.status === value,
  sorter: (a, b) => { let x = a.status||"0"; let y = b.status||"0"; if(x<y) return -1; else if(x>y) return 1; else return 0; },
  }, {
  title: 'fin_code',
  dataIndex: 'fin_code',
  key: '1919',
  width: 150,
  sorter: (a, b) => { let x = a.fin_code||"0"; let y = b.fin_code||"0"; if(x<y) return -1; else if(x>y) return 1; else return 0; },
  }, {
  title: 'sales_code',
  dataIndex: 'sales_code',
  key: '1920',
  width: 150,
  sorter: (a, b) => { let x = a.sales_code||"0"; let y = b.sales_code||"0"; if(x<y) return -1; else if(x>y) return 1; else return 0; },
  }, {
  title: 'ops_code',
  dataIndex: 'ops_code',
  key: '1921',
  width: 150,
  sorter: (a, b) => { let x = a.ops_code||"0"; let y = b.ops_code||"0"; if(x<y) return -1; else if(x>y) return 1; else return 0; },
  }, {
  title: 'started_at',
  dataIndex: 'started_at',
  key: '1909',
  width: 150,
  sorter: (a, b) => { let x=a.started_at||0; let y=b.started_at||0; if(x<y) return -1; else if(x>y) return 1; else return 0; },
  render: (text, record) => { if(text){
    return <span>{new Date(text).toLocaleDateString()}</span> } else {return null;} }
  }, {
  title: 'finished_at',
  dataIndex: 'finished_at',
  key: '1910',
  width: 150,
  render: (text, record) => { if(text){
    return <span>{new Date(text).toLocaleDateString()}</span> } else {return null;} },
  sorter: (a, b) => { let x=a.finished_at||0; let y=b.finished_at||0; if(x<y) return -1; else if(x>y) return 1; else return 0; },
  }, {
  title: 'locked_status',
  dataIndex: 'locked_status',
  key: '2007',
  width: 150,
  render: (text, record, index) => { switch (text) {
  case 'entered': return '数据锁定状态';  break; 
  case 'locked': return 'locked';  break; 
  case 'approved': return 'approved';  break; }; },
  filters: dataOptiong001,
  onFilter: (value, record) => record.locked_status === value,
  sorter: (a, b) => { let x = a.locked_status||"0"; let y = b.locked_status||"0"; if(x<y) return -1; else if(x>y) return 1; else return 0; },
  }, {
  title: 'icon',
  dataIndex: 'icon',
  key: '2214',
  width: 150,
  sorter: (a, b) => { let x = a.icon||"0"; let y = b.icon||"0"; if(x<y) return -1; else if(x>y) return 1; else return 0; },
  }, {
  title: 'name_abbr',
  dataIndex: 'name_abbr',
  key: '2191',
  width: 150,
  sorter: (a, b) => { let x = a.name_abbr||"0"; let y = b.name_abbr||"0"; if(x<y) return -1; else if(x>y) return 1; else return 0; },
  }];

  if (loading) {
    return (<div><Spin size={'large'} tip={'数据加载中 Loading...'}/></div>)
  }
  if (error) {
    return (<p>{error.message}</p>)
  }
  
  return (
     <div>
     <Table {...this.state.tabelDefinition} dataSource={dataSource} columns={columns}   onRowClick={this.handleRowClick} scroll={{ x: 1200 }}/>
     <h1>Admin dashboard</h1>

     </div>
    )  
  }
}



const Table00003Query = gql`
query Table00003($ops_code: String){
dataSource: profile(ops_code: $ops_code){name, name_en, profile_no, type, status, fin_code, sales_code, ops_code, started_at, finished_at, locked_status, icon, name_abbr}
dataOptiong004: field_option(option_code: "g004"){value, text}
dataOptionmd003: field_option(option_code: "md003"){value, text}
dataOptiong001: field_option(option_code: "g001"){value, text}}
`;

const Table00003NeedProps = graphql(Table00003Query)(Table00003);

function mapStateToProps(state) {
  return {
    user: state.app.user
  }
}


const Table00003End = ({user}) => {
  return (
    <div>
      <Table00003NeedProps ops_code={user.ops_code}/>
    </div>
  )
}


export default connect(mapStateToProps)(Table00003End)
