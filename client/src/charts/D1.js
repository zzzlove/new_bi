import createG2 from 'g2-react';
import { Stat, Global } from 'g2';
import React from 'react';
import { Spin, Icon, Card } from 'antd';

// 复制后改4个地方

const D1Defs = createG2((chart, data) => {
    
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


  chart.intervalStack().position('count*count_distinct').opacity(0.6);
  chart.line().position('count*pct_acc').shape('spline').size(3);
  chart.line().position('count*amount').color('cat_1st').shape('spline');

  chart.render();
  
});


class D1 extends React.Component {

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
    <D1Defs
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

export default D1;
