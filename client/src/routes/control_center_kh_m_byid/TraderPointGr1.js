import createG2 from 'g2-react';
import { Stat, Global } from 'g2';
import React from 'react';
import { Spin, Icon, Card } from 'antd';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';


const Chart1Defs = createG2((chart, data) => {
    
  var colDefs = {
  cat_1st: {alias: "会员分类"},
  amount: {alias: "收入(单位: 万元)", formatter: function (value) {return (value / 10000).toFixed(0);}, },
  t_run: {type: 'cat', alias: "月份"},
  pct: {alias: "收入贡献%"},  
  };
  
  chart.source(data, colDefs);

  chart.axis('t_run', {title: false});

  chart.legend('cat_1st', {offset: 75, position: 'top'});  
  chart.legend('pct', false);
  
  chart.point().position('t_run*amount').color('cat_1st').size('pct', 30, 5).opacity(0.6).shape('circle').tooltip('t_run*amount*cat_1st*pct');
  
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
  dataSource: chart_data(chart_no: "K01P0A", control_center_id: $control_center_id, order: "t_run") {
    id
    t_run
    cat_1st
    count
    amount
    pct
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



