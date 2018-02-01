import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import createG2 from 'g2-react';
import { Stat, Global } from 'g2';
import React from 'react';
import { Table, Badge, Collapse, Spin, Icon, Card, Button, Popover } from 'antd';
const Panel = Collapse.Panel;
import _ from 'lodash';


// 复制后改4个地方

const G1Defs = createG2((chart, data) => {
    
  chart.setMode('select'); // 开启框选模式
  chart.select('rangeX'); // 选择框选交互形式
  
  var colDefs = {
  started_at: {alias: "日期", type: "time"},
  control_element: {alias: "运作方式", values: ["外雇", "定挂", "甩挂"]},  
  trader_name: {alias: "会员"}, 
  status_desc: {alias: "状态"},  
  gross_margin: {alias: "毛利"},  
  order_no: {alias: "单号"},
  amount: {alias: "收入"},
  };
  
  chart.source(data, colDefs);

//  chart.legend('control_element',{offset: 10, position: 'right', itemWrap: true});
  chart.legend('trader_name',{offset: 10, position: 'bottom', itemWrap: true});
  chart.legend('control_element',{offset: 10, position: 'top', itemWrap: true});
  
//  chart.legend('amount', false);
  chart.axis('trader_name', false);
  chart.axis('started_at', {title: null});
  chart.tooltip({ title: null });

  chart.point().position('started_at*trader_name').color('trader_name').size('amount', 12, 3).opacity(0.7).shape('control_element', ['circle', 'circle', 'circle']).tooltip('started_at*trader_name*order_no*control_element*status_desc*amount*gross_margin');

//  ['circle', 'triangle-down', 'square', 'diamond']
  
  chart.render();
  
  chart.on('plotdblclick', function(ev) {
    chart.get('options').filters = {};
    chart.repaint();
  });
  
});


const G2Defs = createG2((chart, data) => {
    
  chart.setMode('select'); // 开启框选模式
  chart.select('rangeX'); // 选择框选交互形式
  
  var colDefs = {
  started_at: {alias: "日期", type: "time"},
  control_element: {alias: "运作方式", values: ["外雇", "定挂", "甩挂"]},  
  trader_name: {alias: "会员"}, 
  status_desc: {alias: "状态", values: ["已开单", "已发车", "已到车", "已签收", "已对账", "已付款"]},  
  gross_margin: {alias: "毛利"},  
  order_no: {alias: "单号"},
  amount: {alias: "收入"},
  };
  
  chart.source(data, colDefs);

  chart.legend('status_desc',{offset: 10, position: 'bottom', itemWrap: true});
  chart.legend('trader_name', false);
  chart.legend('control_element',{offset: 10, position: 'top', itemWrap: true});  
//  chart.legend('amount', false);
  chart.axis('trader_name', false);
  chart.axis('started_at', {title: null});
  chart.tooltip({ title: null });

  chart.point().position('started_at*trader_name').color('status_desc').size('gross_margin', 10, 2).opacity(0.9).shape('control_element', ['circle', 'triangle', 'diamond', 'triangle-down']).tooltip('started_at*trader_name*order_no*control_element*status_desc*amount*gross_margin');
//  chart.point().position('started_at*trader_name').color('status_desc').size('gross_margin', 12, 3).opacity(0.6).shape('circle').tooltip('started_at*trader_name*remarks*gross_margin*control_element');

//  ['circle', 'triangle-down', 'square', 'diamond']
  
  chart.render();
  
  chart.on('plotdblclick', function(ev) {
    chart.get('options').filters = {};
    chart.repaint();
  });
  
});



class GToRender extends React.Component {

 constructor(props) {
  super(props);
  this.state = {
    width: 900,
    height: 380,
    tabelDefinition: {
            bordered: true,
            rowKey: 'id',
            pagination: {showSizeChanger: true},
            size: 'small',
            title: false,
            showHeader: true,
            footer: false,
          },
  };
 }


render() {

 const { loading, error, dataSource, dataOptiong003, dataOptiong002, dataOptionsd001 } = this.props.data; 

 const columns = [{
  title: '',
  dataIndex: 'status',
  key: '2179',
  width: 40,
  render: (text, record, index) => {return <Badge status={text}/>},
  filters: dataOptiong002,
  onFilter: (value, record) => record.status === value,
  }, {   
  title: '状态',
  dataIndex: 'processing_status',
  key: 'processing_status',
  width: 120,
  filters: dataOptionsd001,
  onFilter: (value, record) => record.processing_status === value,
  render: (text, record, index) => {let i = _.findIndex(dataOptionsd001, {value: text}); if (i>=0){ return dataOptionsd001[i].text; } else {return text}},
  sorter: (a, b) => { let x = a.status||"0"; let y = b.status||"0"; if(x<y) return -1; else if(x>y) return 1; else return 0; },
  }, {
  title: '月份',
  dataIndex: 'term',
  key: '1485',
  width: 130,
  sorter: (a, b) => { let x = a.term||"0"; let y = b.term||"0"; if(x<y) return -1; else if(x>y) return 1; else return 0; },
  }, {
  title: '线路',
  dataIndex: 'service_no',
  key: '2164',
  width: 150,
  sorter: (a, b) => { let x = a.service_no||"0"; let y = b.service_no||"0"; if(x<y) return -1; else if(x>y) return 1; else return 0; },
  }, {
  title: '运作方式',
  dataIndex: 'control_element',
  key: 'control_element',
  width: 150,
  sorter: (a, b) => { let x = a.service_no||"0"; let y = b.service_no||"0"; if(x<y) return -1; else if(x>y) return 1; else return 0; },
  }, {
  title: '财务主体',
  dataIndex: 'fin_code',
  key: '1894',
  width: 150,
  sorter: (a, b) => { let x = a.fin_code||"0"; let y = b.fin_code||"0"; if(x<y) return -1; else if(x>y) return 1; else return 0; },
  }, {
  title: '运营主体',
  dataIndex: 'ops_code',
  key: '1895',
  width: 150,
  sorter: (a, b) => { let x = a.ops_code||"0"; let y = b.ops_code||"0"; if(x<y) return -1; else if(x>y) return 1; else return 0; },
  }, {  
  title: '单号',
  dataIndex: 'order_no',
  key: '1447',
  width: 200,
  sorter: (a, b) => { let x = a.order_no||"0"; let y = b.order_no||"0"; if(x<y) return -1; else if(x>y) return 1; else return 0; },
  }, {
  title: '会员名称',
  dataIndex: 'trader_name',
  key: '1467',
  width: 450,
  sorter: (a, b) => { let x = a.trader_name||"0"; let y = b.trader_name||"0"; if(x<y) return -1; else if(x>y) return 1; else return 0; },
  }, {
  title: '开单时间',
  dataIndex: 'started_at',
  key: '1906',
  width: 250,
  render: (text, record) => { if(text){ return <span>{new Date(text).toLocaleString()}</span> } else { return null;} },
  sorter: (a, b) => { let x=a.started_at||0; let y=b.started_at||0; if(x<y) return -1; else if(x>y) return 1; else return 0; },
  }, {
  title: '金额',
  dataIndex: 'amount',
  key: '1403',
  width: 150,
  sorter: (a, b) => { let x=a.amount||0; let y=b.amount||0; if(x<y) return -1; else if(x>y) return 1; else return 0; },
  }, {
  title: '毛利',
  dataIndex: 'gross_margin',
  key: 'gross_margin',
  width: 150,
  sorter: (a, b) => { let x=a.amount||0; let y=b.amount||0; if(x<y) return -1; else if(x>y) return 1; else return 0; },
  }, {  title: '对账单号',
  dataIndex: 'billing_no',
  key: 'billing_no',
  width: 250,
  sorter: (a, b) => { let x=a.amount||0; let y=b.amount||0; if(x<y) return -1; else if(x>y) return 1; else return 0; },
  }, {    
  title: '数据来源',
  dataIndex: 'reflection_id',
  key: 'reflection_id',
  width: 120,
  render: (text, record) => { if(text==1){ return <span>新卡航</span> } else { return <span>老卡航</span>;} },
  sorter: (a, b) => { let x=a.amount||0; let y=b.amount||0; if(x<y) return -1; else if(x>y) return 1; else return 0; },
  }];
 
  const content1 = (
    <div>
    <p>一个点代表一个运单, 不同的客户按不同的颜色显示</p>
    <p>收入的时间波动: 通过观察运单点在时间轴上的密集度</p>
    <p>客户发货连续性: 通过观察运单点在时间轴上的连续性</p>
    <p>客户发货分布: 集中在某个时间段还是比较均匀的分布</p>
    <p>客户支付的价格: 通过观察运单点的相对大小</p>
    <p/><p/>
    <p>数据选择方法1：通过顶部图例运营方式选择数据</p>
    <p>数据选择方法2：通过底部图例客户选择数据</p>
    <p>数据选择方法3：通过选取时间轴获取数据，双击页面回到原始状态</p>
    </div>
   );
   
  const content2 = (
    <div>
    <p>一个点代表一个运单, 分布与运单客户与收入看板完全一致</p>
    <p>状态控制: 重点观察超过一定时间仍未达到既定状态的运单</p>
    <p>毛利对比: 通过观察运单点的相对大小</p>
    <p/><p/>
    <p>数据选择方法1：通过顶部图例运营方式选择数据</p>
    <p>数据选择方法2：通过底部图例客户选择数据</p>
    <p>数据选择方法3：通过选取时间轴获取数据，双击页面回到原始状态</p>
    </div>
   );

  if (loading) {
    return (<div><Spin size={'large'} tip={'数据加载中 Loading...'}/></div>)
  }
  if (error) {
    return (<p>{error.message}</p>)
  }
 
 return (
  <div>
  <Collapse bordered={false} defaultActiveKey={['1']}>
    <Panel header={<Popover placement="right" content={content1} title="看板解读 - 重点从客户与收入的角度"><span>运单客户与收入看板</span></Popover>} key="1">
      <G1Defs
      data={dataSource}
      width={900}
      height={520}
      plotCfg={{ margin: [50, 100, 120, 10],   }}
      forceFit={true}
       />

    </Panel>
    <Panel header={<Popover placement="right" content={content2} title="看板解读 - 重点从状态与毛利的角度"><span>运单状态与利润看板</span></Popover>} key="2">

      <G2Defs
      data={dataSource}
      width={900}
      height={450}
      plotCfg={{ margin: [50, 100, 70, 10],   }}
      forceFit={true}
       />
    </Panel>
    <Panel header={<Popover placement="right" content={'以上2个看板对应的运单明细'}><span>运单明细列表</span></Popover>} key="3">
      <Table {...this.state.tabelDefinition} dataSource={dataSource} columns={columns}  scroll={{ x: 1000 }}/>
    </Panel>
  </Collapse>
  </div>
    );
  }
}


//输入组件名称3个地方，输出2个地方

const MyQuery = gql`
query orders_chart(
  $service_no: [String], 
  $trader_name: String,
  $started_at:[Float])
{dataSource: orders(reflection_id: [1, 2], 
    service_no: $service_no, 
    trader_name: $trader_name, 
    started_at: $started_at,
    order: "started_at") 
  {
    id
    order_no
    type
    biz_code
    fin_code
    ops_code
    trader_code
    trader_name
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
    status_desc
  }
  
  dataOptiong003: field_option(option_code: "g003") {
    value
    text
  }
  dataOptiong002: field_option(option_code: "g002") {
    value
    text
  }
  dataOptionsd001: field_option(option_code: "sd001") {
    value
    text
  }
  
}
`;

/*
var now = new Date().getTime() - 10*24*60*60*1000;
var startDate = new Date().getTime() - 15*24*60*60*1000;
var dateRange = [new Date().getTime() - 90*24*60*60*1000, new Date().getTime()];
var service_no = "上海-成都";

const Order01GT = graphql(MyQuery, {
  options: { variables: { service_no: service_no, started_at: dateRange } },
})(GToRender);

*/

const ServiceDetailsDashBoard = graphql(MyQuery, {
  options: (props) => ({ variables: { service_no: props.service_no, started_at: props.started_at } }),
})(GToRender);



export default ServiceDetailsDashBoard;
