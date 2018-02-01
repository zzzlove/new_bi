import createG2 from 'g2-react';
import { Stat, Global } from 'g2';
import React from 'react';
import { Spin, Icon, Card } from 'antd';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const Chart1Defs = createG2((chart, data) => {

 
    var colDefs = {
    started_at: {type: 'time', alias: "日期", min: new Date() - 30, max: new Date(), nice: false},
    };
    
    chart.source(data, colDefs);
    

    chart.axis('started_at', false);
//    chart.axis('id', false);
    
    
    chart.tooltip(false);

    chart.point().position('started_at').opacity(0.7).shape('circle').tooltip('started_at');

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
          width={400}
          height={35}
          plotCfg={{ margin: [1, 5, 10, 5],  }}
          forceFit={true}
           />
        </div>
     );

}

const QueryToRender = gql`

query orders_chart(
  $equipment_no: String, 
  $started_at:[Float])
{dataSource: orders(reflection_id: [3, 4, 9, 10], 
    equipment_no: $equipment_no, 
    started_at: $started_at,
    order: "started_at") 
  {
    id
    started_at
  }
}
`;


var dateRange = [new Date().getTime() - 30*24*60*60*1000, new Date().getTime()];
/*


export default graphql(QueryToRender, {
  options: { variables: { equipment_no: "沪DD4421", started_at: dateRange } },
})(RenderComponent);

export default graphql(QueryToRender, {
  options: (props) => ({ variables: { equipment_no: props.equipment_no, started_at: props.started_at } }),
})(RenderComponent);
*/

export default graphql(QueryToRender, {
  options: (props) => ({ variables: { equipment_no: props.equipment_no, started_at: props.started_at } }),
})(RenderComponent);