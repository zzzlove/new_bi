import createG2 from 'g2-react';
import { Stat, Global } from 'g2';
import React from 'react';
import { Spin, Icon, Card } from 'antd';


const B1Defs = createG2((chart, data) => {
    
  var colDefs = {
  cat_1st: {alias: "分类说明"},
  amount: {alias: "收入"},
  data_f: {alias: "交易次数", min: 0, max: 50, nice: false},
  data_af: {alias: "交易次数", min: 0, max: 50, nice: false},
  count_distinct: {alias: "客户数"},
  t_run: {alias: "月份"}  
  };
  
  chart.source(data, colDefs);


  chart.legend({offset: 75, position: 'bottom'});
  chart.axis('data_f', false);  
  chart.axis('amount', false);  

  chart.intervalStack().position('t_run*count_distinct').opacity(0.6);
  chart.area().position('t_run*data_af').color('cat_1st').opacity(0.3).shape('smooth');
  chart.line().position('t_run*data_f').color('cat_1st').shape('spline');
  
  chart.render();
});


class B1 extends React.Component {

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
    <B1Defs
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


export default B1;
