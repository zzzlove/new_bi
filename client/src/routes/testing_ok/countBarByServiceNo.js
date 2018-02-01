import createG2 from 'g2-react';
import { Stat, Global } from 'g2';
import React from 'react';
import { Spin, Icon, Card, Alert } from 'antd';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const Chart1Defs = createG2((chart, data) => {
 
    var colDefs = {
      service_no: {alias: "运作方式"},

      count: {alias: "运单数"},
      t_run: {type: 'cat', alias: "日期", formatter: function (value) {
      return value.slice(4,8);},},  
    };
    
    chart.source(data, colDefs);
    
    chart.axis('count', {labelOffset: 20, line: false });
    chart.axis('t_run', {title: false });

    chart.legend('service_no', {position: 'top'}  );
    
    chart.tooltip({ title: null });

    chart.intervalDodge().position('t_run*count').color('service_no').opacity(0.8).tooltip('t_run*service_no*count');
    
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
          plotCfg={{ margin: [50, 30, 70, 80],  }}
          forceFit={true}
           />
        </div>
     );

}

const QueryToRender = gql`

query MyQuery($control_center_id: [Int]) {
  dataSource: chart_data(chart_no: "K02B0B", control_center_id: $control_center_id, order: "t_run") {
    id
    t_run
    service_no
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
  options: (props) => ({ variables: { control_center_id: props.control_center_id } }),
})(RenderComponent);