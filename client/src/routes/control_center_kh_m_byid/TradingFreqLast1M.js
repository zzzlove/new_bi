import createG2 from 'g2-react';
import { Stat, Global } from 'g2';
import React from 'react';
import { Spin, Icon, Card } from 'antd';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';


const Chart1Defs = createG2((chart, data) => {

   
  var colDefs = {
  cat_1st: {alias: "月发车数量"},
  amount: {alias: "收入(单位: 万元)", formatter: function (value) {return (value / 10000).toFixed(0);}, },
  t_run: {type: 'cat', alias: "月份"},
  pct: {alias: "收入占比%"},  
  pct_acc: {alias: "收入累计%", min: 0, max: 100, nice: false},  
  count_distinct: {alias: "客户数"},  
  };
  
  chart.source(data, colDefs);

  chart.axis('pct_acc', {
    line: null,
    tickLine: null,
    titleOffset: 210,
    labelOffset: 80,
    }
  );  
//  chart.legend('pct_acc', false);
  chart.legend({position: 'top'});
  chart.tooltip({title: false});
  
  chart.intervalStack().position('cat_1st*amount').opacity(0.6).tooltip('t_run*cat_1st*amount*pct');
  chart.line().position('cat_1st*pct_acc').color('#edcc72').shape('spline').size(3);
  chart.line().position('cat_1st*count_distinct').color('#94e08a').shape('spline').size(3); 
  
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
      plotCfg={{ margin: [50, 150, 110, 80],  }}
      forceFit={true}
       />
    </div>
    );
}

const QueryToRender = gql`
query chart_data($control_center_id: [Int]){
  dataSource: chart_data(chart_no: "K01ACA", cat_2nd: "last1m", control_center_id: $control_center_id, order: ["t_run", "xorder"]) {
    id
    t_run
    cat_1st
    count_distinct
    amount
    pct
    pct_acc
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



