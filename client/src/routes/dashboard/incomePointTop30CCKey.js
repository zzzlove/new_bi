import createG2 from 'g2-react';
import { Stat, Global } from 'g2';
import React from 'react';
import { Spin, Icon, Card } from 'antd';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const Chart1Defs = createG2((chart, data) => {

    chart.setMode('select'); // 开启框选模式
    chart.select('rangeX'); // 选择框选交互形式
  
    var colDefs = {
    control_element: {alias: "运作方式"},
    control_center: {alias: "线路往返"},
    amount: {alias: "产值(单位: 万元)", formatter: function (value) {
    return (value / 10000).toFixed(0);},
    },
    count: {alias: "运单数"},
    t_time: {type: 'time', alias: "日期", mask: "mm-dd"}  
    };
    
    chart.source(data, colDefs);
    

    chart.axis('t_time', {title: false });
    chart.axis('control_center', {title: false, grid: false, line: false, labelOffset: 20, });

    chart.legend('count', false);    
    chart.legend('control_center', {offset: 20, position: 'bottom', itemWrap: true});
    chart.tooltip({ title: null });

    chart.point().position('t_time*control_center').color('control_center').size('count', 15, 3).opacity(0.6).shape('circle').tooltip('t_time*control_center*count*amount');

    
    chart.render();
    
    chart.on('plotdblclick', function(ev) {
      chart.get('options').filters = {};
      chart.repaint();
    });
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
          height={1000}
          plotCfg={{ margin: [30, 30, 90, 80],  }}
          forceFit={true}
           />
        </div>
     );

}

const QueryToRender = gql`

query MyQuery {
  dataSource: chart_data(cat_1st: "Top30", chart_no: "K02P0B") {
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

export default graphql(QueryToRender)(RenderComponent);