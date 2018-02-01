import createG2 from 'g2-react';
import { Stat, Global } from 'g2';
import React from 'react';
import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';
import { Spin, Icon, Card } from 'antd';

const Area10Defs = createG2((chart, data) => {
    
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
  //chart.line().position('t_run*amount').color('cat_1st').shape('spline').size(2);
  
  
  chart.render();
});


class Area10 extends React.Component {

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
query active01($service_no: [String]){
  chart_data(chart_no: "K01B1A", service_no: $service_no, order: "t_run") {
    id
    t_run
    amount
    cat_1st
    data_f
    data_af
    count_distinct
  }
}
`;

const Activecountpect = graphql(ActivecountpectQuery)(Area10);

// export {Activecountpect};  暂时处于调试阶段

 export default Activecountpect;


// script end at 2017-07-20 10:49:59.571324+08