import createG2 from 'g2-react';
import { Stat, Global,Shape } from 'g2';
import React from 'react';
import { Spin, Icon, Card } from 'antd';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

function openNewLink(url) {
  window.open(url)
}

/*
Shape.registShape('interval', 'textInterval', {
  drawShape(cfg, group) {
    const points = this.parsePoints(cfg.points); // 将0-1空间的坐标转换为画布坐标
    const value = (cfg.origin._origin.amount/10000).toFixed(0);
    group.addShape('text', {
      attrs: {
        text: value,
        textAlign: 'center',
        x: points[1].x + cfg.size / 2,
        y: points[1].y,
        fontFamily: 'PingFang SC',
        fontSize: 12,
        fill: '#BBB',
      },
    });
    const polygon = group.addShape('polygon', {
      attrs: {
        points: points.map(point => [point.x, point.y]),
        fill: cfg.color,
      },
    });
    return polygon;
  },
});
*/

const Chart1Defs = createG2((chart, data) => {


    const colorSet = {
      MODIFY: '#4FAAEB',
      PRERELEASE: '#9AD681',
      RELEASING: '#FED46B',
    };

    var colDefs = {
    amount: {alias: "产值(单位: 万元)", formatter: function (value) {
    return (value / 10000).toFixed(0);},
    },
    count_distinct: {alias: "客户数"},
    pop_compared: {alias: "环比%", formatter: function (value) {
    return (value*100).toFixed(0); }, },
    t_run: {type: 'cat', alias: "月份"}
    };

    chart.source(data, colDefs);

    chart.axis('amount', {labelOffset: 20, line: false });
    chart.axis('t_run', {title: false });

    chart.legend({position: 'top'});

    //chart.intervalStack().position('t_run*amount').tooltip('amount').shape('textInterval').size(50).color('#4FAAEB');
    chart.intervalStack().position('t_run*amount').tooltip('amount');

    chart.line().position('t_run*pop_compared').color('#94e08a').shape('spline').size(3);

    chart.point().position('t_run*amount')
      .shape('line')
      .label('amount',{offset: 5,label: {fill: '#4FAAEB'}});

    chart.render();

    chart.on('plotdblclick', function(ev){
      var data = ev.data;
      if (data) {
        const {control_center_id, t_run, type, record_type} = data._origin;
        openNewLink(`control_center_kh_monthly_data?id=${control_center_id}&t_run=${t_run}&type=${type}&record_type=${record_type}`)
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
  chart_title_one(code: "KH_MTI001"){show_title}
  title: control_center_actual_one(type:["city_inc","line_inc","service_inc","region_inc"],record_type:"monthly", control_element: "总计",
    control_center_id: $control_center_id){control_center}
  dataSource: control_center_actual(type:["city_inc","line_inc","service_inc","region_inc"],record_type:"monthly", control_element: "总计",control_center_id: $control_center_id, order: ["t_run"]) {
    id
    control_center_id
    t_run
    type
    record_type
    amount
    count_distinct
    pop_compared
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
  options: (props) => ({ variables: { control_center_id: props.control_center_id } }),
})(RenderComponent);
