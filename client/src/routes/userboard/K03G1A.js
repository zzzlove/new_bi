import createG2 from 'g2-react';
import { Stat, Global } from 'g2';
import React from 'react';
import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';
import { Spin, Icon, Card } from 'antd';

const Area10Defs = createG2((chart, data) => {
  
  chart.setMode('select'); // 开启框选模式
  chart.select('rangeX'); // 选择框选交互形式
  
  var colDefs = {
  t_time: {alias: "日期", type: "time"},
  control_center: {alias: "状态"},  
  cat_1st: {alias: "状态"},  
  remarks: {alias: "单号"},
  };
  
  chart.source(data, colDefs);


  chart.legend({offset: 75, position: 'bottom', itemWrap: true});
  
  chart.legend('data_i', false);
  chart.axis('control_center', {title: null, line: null,  tickLine: null,  grid: null, position: 'top'});
  chart.axis('t_time', {title: null});
  chart.tooltip({ title: null });

  chart.point().position('t_time*control_center').color('cat_1st').size('data_i', 12, 3).opacity(0.6).shape('control_center', ['circle', 'diamond']).tooltip('t_time*cat_1st*remarks');

  
  chart.render();
  
  chart.on('plotdblclick', function(ev) {
    chart.get('options').filters = {};
    chart.repaint();
  });
  
});


class Area10 extends React.Component {

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

const ActivecountpectQuery = gql`
query active01($trader_no: [String]) {
  chart_data(chart_no: "K03G1A", trader_no: $trader_no, order: ["t_time", "cat_1st"]) {
    id
    t_time
    control_center
    cat_1st
    data_i
    remarks
  }
}
`;

const K02F1A = graphql(ActivecountpectQuery)(Area10);

// export {Activecountpect};  暂时处于调试阶段

 export default K02F1A;


// script end at 2017-07-20 10:49:59.571324+08