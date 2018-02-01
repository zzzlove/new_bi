import createG2 from 'g2-react';
import { Stat, Global } from 'g2';
import React from 'react';
import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';
import { Spin, Icon, Card } from 'antd';

const Area10Defs = createG2((chart, data) => {
  
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
//  chart.line().position('t_run*count').color('cat_1st').shape('smooth');
//  chart.area().position('t_run*data_af').color('cat_1st').opacity(0.3).shape('smooth');
//  chart.line().position('t_run*data_f').color('cat_1st').shape('spline');
//  chart.line().position('t_run*amount').color('cat_1st').shape('spline').size(2);
  
  
  chart.render();
});


class Area10 extends React.Component {

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
query active01($service_no: [String], $t_run: [String]) {
  chart_data(chart_no: "K01E1A", service_no: $service_no, t_run: $t_run, order: ["t_run", "pct"]) {
    id
    t_run
    service_no
    cat_1st
    pct
    amount
  }
}

`;

const K01E1A = graphql(ActivecountpectQuery)(Area10);

// export {Activecountpect};  暂时处于调试阶段

 export default K01E1A;


// script end at 2017-07-20 10:49:59.571324+08