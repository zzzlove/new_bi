import createG2 from 'g2-react';
import { Stat, Global } from 'g2';
import React from 'react';
import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';
import { Spin, Icon, Card } from 'antd';

const Area10Defs = createG2((chart, data) => {
  

  
  var colDefs = {
  count: {alias: "月交易次数"},
  amount: {alias: "收入"},
  pct_acc: {alias: "收入累计%"},
  count_distinct: {alias: "客户数"},
  t_month: {alias: "月份"}  
  };
  
  chart.source(data, colDefs);

  chart.legend(false);
  
//  chart.legend({offset: 75, position: 'bottom'});
  
  chart.axis('amount', {
  formatter: function(val) {
    return val/10000 + 'w'; // 格式化坐标轴显示
  },
  line: null,
  tickLine: null,
  titleOffset: 80,
  labels: {
    label: {
      fill: '#90ed7d'
    }
  },
  title: {
    fill: '#90ed7d',
    fontSize: 14
  }
  });
  
chart.axis('pct_acc', {

  line: null,
  tickLine: null,
  titleOffset: 210,
  labelOffset: 80,
  labels: {
    label: {
      fill: '#333'
    }
  },

});
//  chart.axis('amount', false);  

  chart.intervalStack().position('count*count_distinct').opacity(0.6);
  chart.line().position('count*pct_acc').shape('spline').size(3);
  chart.line().position('count*amount').color('cat_1st').shape('spline');
  
//  chart.area().position('t_month*array_dec2').color('cat_1st', ['#d8d8ff', '#6060ff']).opacity(0.2).shape('smooth');
//  chart.line().position('t_month*amount_dec2').color('cat_1st').shape('spline');

  chart.render();
});


class Area10 extends React.Component {

 constructor(props) {
  super(props);
  this.state = {
    width: 900,
    height: 500,
    plotCfg: { margin: [60, 160, 100, 90],  },
  };
 }


render() {

 const { loading, error, chart_data } = this.props.data;   

  if (loading) {
    return (<div><Spin size={'large'} tip={'数据加载中 Loading...'}/></div>)
  }
  if (error) {
    return (<p>{error.message}</p>)
  }
 
 return (
    <div>
    <Area10Defs
      data={chart_data}
      width={this.state.width}
      height={this.state.height}
      plotCfg={this.state.plotCfg}
      forceFit={true}
       />
    </div>
    );
  }
}

const TraderCountQuery = gql`
query active01($service_no: [String]){
  chart_data(chart_no: "K01D1A", service_no: $service_no, t_run: "201705") {
    id
    t_run
    count
    amount
    pct_acc    
    count_distinct
  }
}

`;

const TraderCount = graphql(TraderCountQuery)(Area10);

// export {Activecountpect};  暂时处于调试阶段

 export default TraderCount;


// script end at 2017-07-20 10:49:59.571324+08