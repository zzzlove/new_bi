import createG2 from 'g2-react';
import { Stat, Global } from 'g2';
import React from 'react';
import { Spin, Icon, Card } from 'antd';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const Chart1Defs = createG2((chart, data) => {
 
    var colDefs = {
    cat_2nd: {alias: "部门"},
    count: {alias: "人数" },
    cat_5th: {alias: "周"},
    t_run: {alias: "周截至时间"}  
    };
    
    chart.source(data, colDefs);
    
 //   chart.axis('amount', {labelOffset: 20, line: false });
    chart.axis('cat_5th', {title: false });

    chart.legend({offset: 20, position: 'bottom', itemWrap: true});
//    chart.tooltip({ title: null });      chart.legend('control_center', {offset: 20, position: 'bottom', itemWrap: true});

    chart.intervalStack().position('cat_5th*count').color('cat_2nd').opacity(0.8).tooltip('t_run*count*cat_2nd');

    
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
          plotCfg={{ margin: [30, 30, 90, 80],  }}
          forceFit={true}
           />
        </div>
     );
}

const QueryToRender = gql`

query MyQuery($cat_1st: [String], $service_no: [String]) {
  dataSource: cube_data_hr(cube_no: "h03", service_no: $service_no, cat_1st: $cat_1st) {
    id
    t_run
    cat_2nd
    cat_5th
    count
  }
}


`;

/*
[45, 138, 120, 111, 61, 72, 39, 31, 78, 23, 33, 68, 121]

export default graphql(QueryToRender, {
  options: { variables: { cat_1st: "上海天地汇供应链管理有限公司", service_no: "入职" } },
})(RenderComponent);

export default graphql(QueryToRender, {
  options: (props) => ({ variables: { control_center_id: props.control_center_id } }),
})(RenderComponent);
*/

export default graphql(QueryToRender, {
  options: (props) => ({ variables: { cat_1st: props.cat_1st, service_no: props.service_no } }),
})(RenderComponent);