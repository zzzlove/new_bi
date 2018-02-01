import createG2 from 'g2-react';
import { Stat, Global } from 'g2';
import React from 'react';
import { Spin, Icon, Card } from 'antd';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';


const Chart1Defs = createG2((chart, data) => {

  var colDefs = {
  cat_1st: {alias: "分类说明"},
  count: {alias: "月交易次数", min: 0},
  count_distinct: {alias: "客户数"},
  t_run: {alias: "月份"}
  };

  chart.source(data, colDefs);

  chart.axis('t_run', {title: false});

  chart.legend({offset: 20, position: 'top'});

  chart.intervalStack().position('t_run*count_distinct').label('count_distinct',{offset: 5,label: {fill: '#4FAAEB'}});

  //chart.point().position('t_run*count_distinct').shape('line').label('count_distinct',{offset: 5,label: {fill: '#4FAAEB'}});

  chart.line().position('t_run*count').color('cat_1st', ['#94e08a', '#edcc72']).shape('spline').size(3);



// .color('#94e08a')
  chart.render();
});

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
          plotCfg={{ margin: [45, 70, 50, 80],  }}
          forceFit={true}
           />
        </div>
     );
}

const QueryToRender = gql`
query MyQuery($control_center_id: [Int]) {
  chart_title_one(code: "KH_MTFT01"){show_title}
  title: chart_data_one(chart_no: "MTFT01", control_center_id: $control_center_id){control_center}
  dataSource: chart_data(chart_no: "MTFT01", control_center_id: $control_center_id, order: ["t_run"]) {
    id
    t_run
    cat_1st
    count 
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



