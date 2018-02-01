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
    t_time: {type: 'time', alias: "日期", mask: "mm-dd"}  
    };
    
    chart.source(data, colDefs);
    
    chart.axis('amount', {labelOffset: 20, line: false });
    chart.axis('t_time', {title: false });

    chart.legend({position: 'top'});
    chart.tooltip({ title: null });

    chart.intervalStack().position('t_time*amount').color('control_element').opacity(0.8).tooltip('t_time*control_element*count*amount');

    
    chart.render();

  }
);


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
          plotCfg={{ margin: [30, 30, 70, 80],  }}
          forceFit={true}
           />
        </div>
     );
}

const QueryToRender = gql`

query MyQuery($control_center_id: [Int]) {
  dataSource: chart_data(chart_no: "K02B0A", control_center_id: $control_center_id, order: "xorder") {
    id
    control_center
    t_time
    control_element
    amount
    count
  }
}

`;

/*
[45, 138, 120, 111, 61, 72, 39, 31, 78, 23, 33, 68, 121]

export default graphql(QueryToRender, {
  options: { variables: { control_center_id: 45 } },
})(RenderComponent);

export default graphql(QueryToRender, {
  options: (props) => ({ variables: { control_center_id: props.control_center_id } }),
})(RenderComponent);
*/

export default graphql(QueryToRender, {
  options: { variables: { control_center_id: 0 } },
})(RenderComponent);