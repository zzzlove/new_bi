import createG2 from 'g2-react';
import { Stat, Global } from 'g2';
import React from 'react';
import { Spin, Icon, Card } from 'antd';

// 复制后改4个地方

const E1Defs = createG2((chart, data) => {
    
  chart.facet(['t_run'], {
        margin: 50,
        facetTitle: {
          colDimTitle: {
            title: null
          },
          colTitle: { 
            title: {
              fontSize: 18,
              textAlign: 'center',
              fill: '#999'
            }
          }
        }
      }); 
    
  var colDefs = {
  cat_1st: {alias: "分类说明"},
  pct: {alias: "百分比"},
  t_run: {alias: "月份"},
  amount: {alias: "金额"},  
  };
  
  chart.source(data, colDefs);


  chart.legend({offset: 75, position: 'bottom', itemWrap: true});
  
  chart.coord('theta', { radius: 1, inner: 0.35 });
  
  chart.tooltip({ title: null });


  chart.intervalStack().position(Stat.summary.percent('pct')).color('cat_1st')        
     .label('..percent', {offset: -2})
     .style({lineWidth: 1 });


  chart.render();
});


class E1 extends React.Component {

 constructor(props) {
  super(props);
  this.state = {
    width: 900,
    height: 500,
    plotCfg: { margin: [100, 80, 30, 80],  },
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
    <E1Defs
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

export default E1;
