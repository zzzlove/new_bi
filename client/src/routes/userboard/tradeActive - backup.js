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
  amount_dec2: {alias: "交易次数"},
  array_dec2: {alias: "交易次数"},
  count_distinct: {alias: "客户数"},
  t_month: {alias: "月份"}  
  };
  
  chart.source(data, colDefs);


  chart.legend({offset: 75, position: 'bottom'});
  chart.axis('amount_dec2', false);  
  chart.axis('amount', false);  

  chart.intervalStack().position('t_month*count_distinct').opacity(0.6);
  chart.area().position('t_month*array_dec2').color('cat_1st').opacity(0.2).shape('smooth');
  chart.line().position('t_month*amount_dec2').color('cat_1st').shape('spline');
  chart.line().position('t_month*amount').color('cat_1st').shape('spline').size(2);
  
  
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

 const { loading, error, cube_data } = this.props.data;   

  if (loading) {
    return (<div><Spin size={'large'} tip={'数据加载中 Loading...'}/></div>)
  }
  if (error) {
    return (<p>{error.message}</p>)
  }
 
 return (
    <div>
    <Area10Defs
      data={cube_data}
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
  cube_data(cube_name: "p001", cat_1st: ["p25-75", "平均数", "中位数", "客户数", "收入"], 
    service_no: $service_no
    order: ["t_month"]) {
    id
    t_month
    cat_1st
    array_dec2
    amount_dec2
    amount
    count_distinct
  }
}
`;

const Activecountpect = graphql(ActivecountpectQuery)(Area10);

// export {Activecountpect};  暂时处于调试阶段

 export default Activecountpect;


// script end at 2017-07-20 10:49:59.571324+08