import createG2 from 'g2-react';
import { Stat, Global } from 'g2';
import React from 'react';
import { Spin, Icon, Card } from 'antd';

// 复制后改4个地方
// chart.filter('cut', ['Ideal', 'Good']); 

const F1Defs = createG2((chart, data) => {
    
  var colDefs = {
  t_time: {alias: "时间", type: "time", min: new Date() - 10, max: new Date(), nice: false},
  amount: {alias: "金额"},  
  };
  
  chart.source(data, colDefs);

  chart.axis('t_time', false);  
  chart.axis('amount', false);  
  chart.legend(false);
  
  
  chart.tooltip(false);

  chart.line().position('t_time*amount').shape('smooth');

  chart.render();
});


class F1 extends React.Component {

 constructor(props) {
  super(props);
  this.state = {
    width: 150,
    height: 15,
    plotCfg: { margin: [1, 1, 1, 1],  },
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
    <F1Defs
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

export default F1;
