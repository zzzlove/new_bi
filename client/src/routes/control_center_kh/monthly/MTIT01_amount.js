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
  control_element: {alias: "分类说明"},
  amount: {alias: "产值(单位: 万元)", formatter: function (value) {return (value / 10000).toFixed(0);}, },
  t_run: {type: 'cat', alias: "月份"},
  pct: {alias: "产值贡献%"},
  };

  chart.source(data, colDefs);

  chart.axis('t_run', {title: false});

  chart.legend({offset: 20, position: 'top'});


  chart.intervalStack().position('t_run*amount').color('control_element')
    .label('amount',{offset: 5,label: {fill: '#676767'}});

  chart.render();

  chart.on('plotdblclick', function(ev){
     var data = ev.data;
     if (data) {
       const {control_center_id, t_run, type, record_type} = data._origin;
       openNewLink(`control_center_kh_monthly_data?id=${control_center_id}&t_run=${t_run}&type=${type}&record_type=${record_type}`)
        }
   });

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
          plotCfg={{ margin: [45, 30, 50, 80],  }}
          forceFit={true}
           />
        </div>
     );
}

const QueryToRender = gql`
query MyQuery($control_center_id: [Int]) {
  chart_title_one(code: "KH_MTIT01_1"){show_title}
  title: control_center_actual_one(type:["city_cus","line_cus","service_cus","region_cus","linegr_cus"], record_type:"monthly", data_set: "byCusLevel", control_center_id: $control_center_id){control_center}
  dataSource: control_center_actual(type:["city_cus","line_cus","service_cus","region_cus","linegr_cus"], record_type:"monthly", data_set: "byCusLevel", control_center_id: $control_center_id, order: ["t_run"]) {
    id
    control_center_id
    t_run
    type
    record_type
    control_element
    amount
    pct
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



