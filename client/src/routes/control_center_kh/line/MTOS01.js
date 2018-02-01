import createG2 from 'g2-react';
import { Stat, Global } from 'g2';
import React from 'react';
import { Spin, Icon, Card } from 'antd';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

function openNewLink(url) {
  window.open(url)
}


const Chart1Defs = createG2((chart, data) => {

    var colDefs = {
      control_center: {alias: "单边线路"},
      amount: {alias: "收入(单位: 万元)", formatter: function (value) {
      return (value / 10000).toFixed(0);},
      },
      count: {alias: "运单数"},
      t_run: {alias: "月份"},
      count_distinct: {alias: "客户数"},
    };

    chart.source(data, colDefs);

    chart.axis('count', {labelOffset: 20, line: false });
    chart.axis('t_run', {title: false });

    chart.legend('control_center', {position: 'top'} );


    chart.intervalDodge().position('t_run*count').color('control_center').tooltip('*control_center*count*amount*count_distinct')
      .label('count',{offset: 5,label: {fill: '#676767'}});

    chart.render();

    chart.on('plotdblclick', function(ev){
      var data = ev.data;
      if (data) {
        const {control_center_id} = data._origin;
        openNewLink(`control_center_kh_monthly?id=${control_center_id}`)
      }
    });

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
        <h2>{title.name}{chart_title_one.show_title}</h2>
        <Chart1Defs
          data={dataSource}
          width={900}
          height={500}
          plotCfg={{ margin: [45, 30, 50, 80],  }}
          forceFit={true}
           />
        </div>
     );
}

const QueryToRender = gql`
query MyQuery($id: ID, $control_center_pid: Int, $control_element: [String]) {
  chart_title_one(code: "KH_MTOS01"){show_title}
  title: control_center_one(id: $id){name}
  dataSource: control_center_actual(record_type: "monthly", type:["city_inc","line_inc","service_inc","region_inc"], 
    control_element: $control_element, control_center_pid: $control_center_pid, order: ["t_run", "xorder"]) {
    id
    t_run
    control_center_id
    control_center
    control_element
    amount
    count
    count_distinct
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
  options: (props) => ({ variables: { id: props.id, control_center_pid: props.control_center_pid, control_element: props.control_element } }),
})(RenderComponent);
