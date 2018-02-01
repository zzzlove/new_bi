import createG2 from 'g2-react';
import { Stat, Global } from 'g2';
import React from 'react';
import { Spin, Icon, Card } from 'antd';

const C1Defs = createG2((chart, data) => {
    
  var colDefs = {
  cat_1st: {alias: "会员分类"},
  amount: {alias: "收入(单位: 万元)", formatter: function (value) {return (value / 10000).toFixed(0);}, },
  t_run: {type: 'cat', alias: "月份"},
  pct: {alias: "收入贡献%"},  
  };
  
  chart.source(data, colDefs);

  chart.legend('cat_1st', {offset: 75, position: 'bottom'});  
 
  chart.point().position('t_run*amount').color('cat_1st').size('pct', 30, 5).opacity(0.6).shape('circle').tooltip('t_run*amount*cat_1st*pct');

  chart.render();
});


class C1 extends React.Component {

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
    <C1Defs
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

export default C1;
