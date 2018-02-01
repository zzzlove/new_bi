import createG2 from 'g2-react';
import { Stat, Global } from 'g2';
import React from 'react';
import { Spin, Icon, Card } from 'antd';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';


const Chart1Defs = createG2((chart, data) => {
    
  var colDefs = {
  cat_1st: {alias: "分类说明"},
  amount: {alias: "产值" },
  t_run: {type: 'cat', alias: "月份"},
  count_distinct: {alias: "客户数"},   
  };
  
  chart.source(data, colDefs);

  chart.facet(['t_run'], {
        margin: 50,
        facetTitle: {
          colDimTitle: {
            title: null
          },
          colTitle: { 
            title: {
              fontSize: 18,
              textAlign: 'center',
              fill: '#999'
            }
          }
        }
      }); 

  chart.legend({position: 'bottom'});

  chart.coord('theta', {radius: 1, inner: 0.35 });
  
  chart.tooltip({ title: null });

  chart.intervalStack().position(Stat.summary.percent('count_distinct')).color('cat_1st').label('..percent', {offset: -2});
  
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
          plotCfg={{ margin: [45, 30, 50, 30],  }}
          forceFit={true}
           />
        </div>
     );
}

const QueryToRender = gql`
query MyQuery($control_center_id: [Int]) {
  chart_title_one(code: "KH_MFIT01_2"){show_title}
  title: chart_data_one(chart_no: "MFIT01", control_center_id: $control_center_id){control_center}
  dataSource: chart_data(chart_no: "MFIT01", control_center_id: $control_center_id, order: ["cat_1st","t_run"]) {
    id
    t_run
    cat_1st
    amount
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



