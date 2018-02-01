import createG2 from 'g2-react';
import { Stat, Global } from 'g2';
import React from 'react';
import { Spin, Icon, Card } from 'antd';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const Chart1Defs = createG2((chart, data) => {

 
    var colDefs = {
    control_element: {alias: "运作方式"},
    control_center: {alias: "线路往返"},
    amount: {alias: "收入(单位: 万元)", formatter: function (value) {
    return (value / 10000).toFixed(0);},
    },
    count: {alias: "运单数"},
    t_time: {type: 'time', alias: "日期", min: new Date() - 30, max: new Date(), nice: false}  
    };
    
    chart.source(data, colDefs);
    

    chart.axis('t_time', false);
    chart.axis('control_center', false);
    
    chart.legend('count', false);    
    
    chart.tooltip({ title: null });

    chart.point().position('t_time*control_center').size('count', 15, 3).opacity(0.7).shape('circle').tooltip('t_time*count*amount');

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
          width={700}
          height={120}
          plotCfg={{ margin: [15, 10, 10, 10],  }}
          forceFit={true}
           />
        </div>
     );

}

const QueryToRender = gql`

query MyQuery($control_center_ids: [Int]) {
  dataSource: chart_data(control_center_id: $control_center_ids, chart_no: "K02P0B") {
    id
    control_center
    t_time
    amount
    count
  }
}

`;

/*


export default graphql(QueryToRender, {
  options: { variables: { control_center_ids: [45, 138, 120, 111, 61, 72, 39, 31, 78, 23, 33, 68, 121] } },
})(RenderComponent);

export default graphql(QueryToRender, {
  options: (props) => ({ variables: { control_center_ids: props.control_center_ids } }),
})(RenderComponent);
*/

export default graphql(QueryToRender, {
  options: (props) => ({ variables: { control_center_ids: props.control_center_ids } }),
})(RenderComponent);