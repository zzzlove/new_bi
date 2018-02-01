import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import createG2 from 'g2-react';
import { Stat, Global } from 'g2';
import React from 'react';
import { Spin, Icon, Card, Button, Popover } from 'antd';


// 复制后改4个地方

const G1Defs = createG2((chart, data) => {
    
  chart.setMode('select'); // 开启框选模式
  chart.select('rangeX'); // 选择框选交互形式
  
  var colDefs = {
  t_time: {alias: "日期", type: "time"},
  cat_1st: {alias: "运作方式"},  
  cat_2nd: {alias: "会员"}, 
  cat_3rd: {alias: "状态"},  
  data_i: {alias: "毛利"},  
  order_no: {alias: "单号"},
  amount: {alias: "收入"},
  };
  
  chart.source(data, colDefs);

//  chart.legend('cat_1st',{offset: 10, position: 'right', itemWrap: true});
  chart.legend('cat_2nd',{offset: 10, position: 'bottom', itemWrap: true});
  
//  chart.legend('amount', false);
  chart.axis('cat_2nd', false);
  chart.axis('t_time', {title: null});
  chart.tooltip({ title: null });

  chart.point().position('t_time*cat_2nd').color('cat_2nd').size('amount', 12, 3).opacity(0.7).shape('circle').tooltip('t_time*cat_2nd*order_no*cat_1st*cat_3rd*amount*data_i');

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
  t_time: {alias: "日期", type: "time"},
  cat_1st: {alias: "运作方式", values: ["外雇", "定挂", "甩挂"]},  
  cat_2nd: {alias: "会员"}, 
  cat_3rd: {alias: "状态", values: ["1 已开单", "2 已发车", "3 已到车", "4 已签收", "5 已对账", "6 已付款"]},  
  data_i: {alias: "毛利"},  
  order_no: {alias: "单号"},
  amount: {alias: "收入"},
  };
  
  chart.source(data, colDefs);

  chart.legend('cat_3rd',{offset: 10, position: 'bottom', itemWrap: true});
  chart.legend('cat_2nd', false);
  chart.legend('cat_1st',{offset: 10, position: 'top', itemWrap: true});  
//  chart.legend('amount', false);
  chart.axis('cat_2nd', false);
  chart.axis('t_time', {title: null});
  chart.tooltip({ title: null });

  chart.point().position('t_time*cat_2nd').color('cat_3rd').size('data_i', 10, 2).opacity(0.9).shape('cat_1st', ['circle', 'triangle', 'diamond']).tooltip('t_time*cat_2nd*order_no*cat_1st*cat_3rd*amount*data_i');
//  chart.point().position('t_time*cat_2nd').color('cat_3rd').size('data_i', 12, 3).opacity(0.6).shape('circle').tooltip('t_time*cat_2nd*remarks*data_i*cat_1st');

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
  };
 }


render() {

 const { loading, error, chart_data } = this.props.data;   
 
  const content = (
    <div>
    <p>通过观察运单点在时间轴上的密集度，获取收入波动的认识</p>
    <p>通过观察运单点在时间轴上的连续性，获取客户发货连续性的认识</p>
    <p>通过观察运单点的相对大小，获取客户支付不同价格的认识</p>
    <p>通过图例的筛选，对比不同客户的发货情况</p>
    <p>直观对比外雇/定挂/甩挂的执行情况</p>
    <p>获取运单的当期交易状态，重点关注超过一定时间未对账未收款的运单</p>
    <p>通过第二图的大小观察利润的变化及稳定性</p>
    <p>通过时间轴的放大可以获取更加相信的信息</p>
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
    <Popover placement="right" content={content} title="90天运单管理看板解读">
    <Button type="primary">解读帮助</Button>
    </Popover>
    <G1Defs
      data={chart_data}
      width={900}
      height={380}
      plotCfg={{ margin: [10, 100, 120, 10],   }}
      forceFit={true}
       />
    <p/>   
    <p/>          
    <G2Defs
      data={chart_data}
      width={900}
      height={380}
      plotCfg={{ margin: [50, 100, 70, 10],   }}
      forceFit={true}
       />
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
{chart_data: orders(reflection_id: [1, 2], 
    service_no: $service_no, 
    trader_name: $trader_name, 
    started_at: $started_at,
    order: "started_at") 
  {
    id
    order_no
    data_i: gross_margin
    cat_2nd: trader_name
    t_time: started_at
    cat_1st: control_element
    cat_3rd: status_desc
    amount
  }
}
`;

var now = new Date().getTime() - 10*24*60*60*1000;
var startDate = new Date().getTime() - 15*24*60*60*1000;
var dateRange = [new Date().getTime() - 90*24*60*60*1000, new Date().getTime()];
var service_no = "上海-成都";

const Order01G = graphql(MyQuery, {
  options: { variables: { service_no: service_no, started_at: dateRange } },
})(GToRender);



export default Order01G;
