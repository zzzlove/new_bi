import createG2 from 'g2-react';
import { Stat, Global } from 'g2';
import React from 'react';
import { Spin, Icon, Card } from 'antd';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

function openNewLink(url) {
  window.open(url)
}




function RenderComponent({data}) {


    const { loading, error, dataSource, title, chart_title_one, variables } = data;

     if (loading) {
        return (<div><Spin size={'large'} tip={'数据加载中 Loading...'}/></div>)
     }

     if (error) {
        return (<p>{error.message}</p>)
     }

    const Chart1Defs = createG2((chart, data) => {


        var colDefs = variables.type.indexOf('line_inc')>-1?{
        control_element: {alias: "运作方式", values: ["外雇", "定挂", "甩挂"]},
        amount: {alias: "产值(单位: 万元)", formatter: function (value) {
        return (value / 10000).toFixed(0);},
        },
        count: {alias: "运单数"},
        t_time: {type: 'time', alias: "日期", mask: "mm-dd"}
        }:
        {
        control_element: {alias: "运作方式", values: ["A0", "A1", "A2"]},
        amount: {alias: "产值(单位: 万元)", formatter: function (value) {
        return (value / 10000).toFixed(0);},
        },
        count: {alias: "运单数"},
        t_time: {type: 'time', alias: "日期", mask: "mm-dd"}
        };

        chart.source(data, colDefs);

        chart.axis('amount', {labelOffset: 20, line: false });
        chart.axis('t_time', {title: false });

        chart.legend({position: 'top'});
    //    chart.tooltip({ title: null });

        chart.intervalStack().position('t_time*amount').color('control_element').tooltip('control_element*count*amount')
          .label('t_time',{offset: 5,label: {fill: '#676767'},
            renderer: function(text, item, index)  {
              //console.info(item);
              //console.info(index);
              if((index<=60 && index%10===0)||(index>60&&index<122&&(index-1)%10=== 0)||(index>=122&&(index-2)%10=== 0)){
                return (item.point.amount/10000).toFixed(0);
              }
              return '';
            }});


        chart.render();

        chart.on('plotdblclick', function(ev){
          var data = ev.data;
          if (data) {
            const {control_center_id, t_time, type} = data._origin;
            openNewLink(`control_center_kh_daily_data?id=${control_center_id}&t_time=${t_time}&type=${type}`)
          }
        });

      }
    );

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

query MyQuery($control_center_id: [Int], $type: [String]) {
  chart_title_one(code: "KH_DTIE01"){show_title}
  title: control_center_actual_one(type:["city_inc","line_inc","service_inc","region_inc"],record_type:"daily", data_set: "level_1",control_center_id: $control_center_id){control_center}
  dataSource: control_center_actual(type: $type, record_type:"daily", data_set: "level_1",control_center_id: $control_center_id, order: ["t_run"]) {
    id
    control_center_id
    t_time
    type
    control_element
    amount
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
  options: (props) => ({ variables: { control_center_id: props.control_center_id, type: props.type  } }),
})(RenderComponent);
