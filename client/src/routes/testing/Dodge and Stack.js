import createG2 from 'g2-react';
import { Stat, Global } from 'g2';
import React from 'react';
import { Spin, Icon, Card } from 'antd';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';


const Chart1Defs = createG2((chart, data) => {
 
    var colDefs = {
      cat_1st: {alias: "分类1"},
      cat_2nd: {alias: "分类2"},
      t_run: {alias: "月份"},
      count: {alias: "交易次数"},
      amount: {alias: "收入(单位: 万元)", formatter: function (value) {
      return (value / 10000).toFixed(0);},
      },
    };

    var colorMap = {
        '中位数_1': '#98abc5',
        '中位数_2': '#8a89a6',
        '中位数_3': '#7b6888',
        '平均数_1': '#6b486b',
        '平均数_2': '#a05d56',
        '平均数_3': '#d0743c'
      }
   
    chart.source(data, colDefs);
    
    chart.legend({position: 'top'});
//    chart.legend('cat_2nd', {position: 'left'});
    
    chart.interval(['dodge', 'stack']).position('t_run*count')
       .color('cat_1st*cat_2nd', function(cat_1st, cat_2nd) { return colorMap[cat_2nd]; })
       .tooltip('cat_2nd*count')
       .size(20);

    chart.render();
 

  }
);


function RenderComponent({data}) {


    const { loading, error, dataSource, title, chart_title_one } = data; 

     if (loading) {
        return (<div><Spin size={'large'} tip={'数据加载中 Loading...'}/></div>)
     }
     
     if (error) {
        return (<p>{error.message}</p>)
     }

     var totalRecordNumbers = dataSource.length;
     
     if (!totalRecordNumbers) {
        return (<h3><Icon type="frown-o"/>暂无对应数据 - {chart_title_one.show_title}</h3>)
     }
     
     return (
        <div>
        <h2>{title.control_center}{chart_title_one.show_title}</h2>
        <Chart1Defs
          data={dataSource}
          width={900}
          height={500}
          plotCfg={{ margin: [45, 100, 70, 80],  }}
          forceFit={true}
           />
        </div>
     );
}

const QueryToRender = gql`
query MyQuery($control_center_id: [Int]) {
  chart_title_one(code: "KH_MTFT01"){show_title}
  title: chart_data_one(chart_no: "MTFT01", control_center_id: $control_center_id){control_center}
  dataSource: chart_data(chart_no: "MTFT01", control_center_id: $control_center_id, order: "t_run") {
    id
    t_run
    cat_1st
    cat_2nd
    amount
    count 
    count_distinct
    xorder
  }
}
`;

/*
[45, 138, 120, 111, 61, 72, 39, 31, 78, 23, 33, 68, 121]

export default graphql(QueryToRender, {
  options: { variables: { control_center_id: 45 } },
})(RenderComponent);

export default graphql(QueryToRender, {
  options: (props) => ({ variables: { control_center_id: props.control_center_id, control_element: props.control_element } }),
})(RenderComponent);
*/

export default graphql(QueryToRender, {
  options: { variables: { control_center_id: [1, 51] } },
})(RenderComponent);