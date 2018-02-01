import createG2 from 'g2-react';
import { Stat, Global } from 'g2';
import React from 'react';
import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';
import { Spin, Icon, Card } from 'antd';

const Area10Defs = createG2((chart, data) => {
  
    
  var colDefs = {
  t_time: {alias: "时间", type: "time"},
  amount: {alias: "金额"},  
  };
  
  chart.source(data, colDefs);


  chart.legend({offset: 75, position: 'bottom', itemWrap: true});
  
  
  chart.tooltip({ title: null });

  chart.line().position('t_time*amount').shape('smooth').tooltip('t_time*amount');

  
  chart.render();
});


class Area10 extends React.Component {

 constructor(props) {
  super(props);
  this.state = {
    width: 150,
    height: 60,
    plotCfg: { margin: [5, 5],  },
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
query active01($service_no: [String]) {
  chart_data(chart_no: "K02F1A", service_no: $service_no, order: "t_time") {
    id
    t_time
    amount
  }
}

`;

const K02F1A = graphql(ActivecountpectQuery)(Area10);

// export {Activecountpect};  暂时处于调试阶段

 export default K02F1A;


// script end at 2017-07-20 10:49:59.571324+08