import createG2 from 'g2-react';
import { Stat, Global } from 'g2';
import React from 'react';
import { Spin, Icon, Card } from 'antd';

const A1Defs = createG2((chart, data) => {
    
  var colDefs = {
  cat_1st: {alias: "分类说明"},
  amount: {alias: "收入(单位: 万元)", formatter: function (value) {
  return (value / 10000).toFixed(0);},
  },
  count: {alias: "运单数"},
  t_run: {type: 'cat', alias: "月份"}  
  };
  
  chart.source(data, colDefs);


  chart.legend({offset: 75, position: 'bottom'});
  chart.tooltip({ title: null });

  chart.intervalStack().position('t_run*amount').color('cat_1st').opacity(0.8).tooltip('t_run*amount*count');
  chart.line().position('t_run*count').color('cat_1st').shape('smooth');

  
  chart.render();
});


class A1 extends React.Component {

 constructor(props) {
  super(props);
  this.state = {
    width: 900,
    height: 500,
    plotCfg: { margin: [30, 80, 100, 80],  },
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
    <A1Defs
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


export default A1;
