import createG2 from 'g2-react';
import { Stat, Global } from 'g2';
import React from 'react';
import { Spin, Icon, Card } from 'antd';

// 复制后改4个地方

const G1Defs = createG2((chart, data) => {
    
  chart.setMode('select'); // 开启框选模式
  chart.select('rangeX'); // 选择框选交互形式
  
  var colDefs = {
  t_time: {alias: "日期", type: "time"},
  cat_1st: {alias: "分类"},  
  cat_2nd: {alias: "状态"},  
  remarks: {alias: "单号"},
  };
  
  chart.source(data, colDefs);


  chart.legend({offset: 75, position: 'bottom', itemWrap: true});
  
  chart.legend('data_i', false);
  chart.axis('cat_1st', {title: null, line: null,  tickLine: null,  grid: null, position: 'top'});
  chart.axis('t_time', {title: null});
  chart.tooltip({ title: null });

  chart.point().position('t_time*cat_1st').color('cat_2nd').size('data_i', 12, 3).opacity(0.6).shape('cat_1st', ['circle', 'diamond']).tooltip('t_time*cat_2nd*remarks');

  
  chart.render();
  
  chart.on('plotdblclick', function(ev) {
    chart.get('options').filters = {};
    chart.repaint();
  });
  
});


class G1 extends React.Component {

 constructor(props) {
  super(props);
  this.state = {
    width: 900,
    height: 230,
    plotCfg: { margin: [20, 80, 80, 80],   },
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
    <G1Defs
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

export default G1;
