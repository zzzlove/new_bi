import createG2 from 'g2-react';
import { Stat, Global } from 'g2';
import React from 'react';
import { Spin, Icon, Card } from 'antd';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';


const Chart1Defs = createG2((chart, data) => {
    
  var colDefs = {
  control_element: {alias: "运作方式", values: ["外雇", "定挂", "甩挂"]},
  amount: {alias: "收入(单位: 万元)", formatter: function (value) {
  return (value / 10000).toFixed(0);},
  },
  count: {alias: "运单数"},
  t_run: {type: 'cat', alias: "月份"}  
  };
  
  chart.source(data, colDefs);

  chart.axis('t_run', {title: false});
  chart.legend({offset: 20, position: 'top'});
//  chart.tooltip({ title: null });

  chart.intervalStack().position('t_run*amount').color('control_element').opacity(0.8).tooltip('control_element*amount*count');
  
  chart.render();
});

function RenderComponent({data}) {

 const { loading, error, dataSource } = data; 

  if (loading) {
    return (<div><Spin size={'large'} tip={'数据加载中 Loading...'}/></div>)
  }
  if (error) {
    return (<p>{error.message}</p>)
  }
 
 return (
    <div>
    <Chart1Defs
      data={dataSource}
      width={900}
      height={500}
      plotCfg={{ margin: [50, 30, 70, 80],  }}
      forceFit={true}
       />
    </div>
    );
}

const QueryToRender = gql`
query chart_data($control_center_id: [Int]){
  dataSource: chart_data(chart_no: "K01BLA", control_center_id: $control_center_id, order: "t_run") {
    id
    t_run
    control_element
    count
    amount  
   }
}
`;

/*
export default graphql(QueryToRender, {
  options: { variables: { control_center_id: 45 } },
})(RenderComponent);


export default graphql(QueryToRender, {
  options: (props) => ({ variables: { control_center_id: props.control_center_id } }),
})(RenderComponent);

*/

export default graphql(QueryToRender, {
  options: (props) => ({ variables: { control_center_id: props.control_center_id } }),
})(RenderComponent);



