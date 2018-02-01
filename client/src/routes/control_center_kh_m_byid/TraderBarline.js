import createG2 from 'g2-react';
import { Stat, Global } from 'g2';
import React from 'react';
import { Spin, Icon, Card } from 'antd';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';


const Chart1Defs = createG2((chart, data) => {
    
  var colDefs = {
  cat_1st: {alias: "分类说明"},
  data_f: {alias: "月交易次数", min: 0, max: 70, nice: false},
  data_af: {alias: "月交易次数", min: 0, max: 70, nice: false},
  count_distinct: {alias: "客户数"},
  t_run: {alias: "月份"}  
  };
  
  chart.source(data, colDefs);

  chart.axis('t_run', {title: false});

  chart.legend({offset: 20, position: 'top'});
  chart.axis('data_f', false);  


  chart.intervalStack().position('t_run*count_distinct').opacity(0.6);
  chart.area().position('t_run*data_af').color('cat_1st').opacity(0.3).shape('smooth');
  chart.line().position('t_run*data_f').color('cat_1st').shape('spline');
  
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
      plotCfg={{ margin: [50, 70, 70, 80],  }}
      forceFit={true}
       />
    </div>
    );
}

const QueryToRender = gql`
query chart_data($control_center_id: [Int]){
  dataSource: chart_data(chart_no: "K01BLB", control_center_id: $control_center_id, order: "t_run") {
    id
    t_run
    cat_1st
    data_af
    data_f  
    count_distinct
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



