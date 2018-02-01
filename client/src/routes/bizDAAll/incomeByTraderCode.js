import createG2 from 'g2-react';
import { Stat, Global,Shape } from 'g2';
import React from 'react';
import { Spin, Icon, Card } from 'antd';

function openNewLink(url) {
  window.open(url)
}





export default function RenderComponent({dataSource, xType}) {

    const ChartDefs = createG2((chart, data) => {

        var colDefs = {
        x: {type: xType, alias: "时间"},
        c: {alias: "客户分类", values: ["非签约会员", "签约会员"]},
        y1: {alias: "产值(单位: 万元)", formatter: function (value) {return (value / 10000).toFixed(0);}, },
        y2: {alias: "客户数", min: 0},
        };

        chart.source(data, colDefs);

        chart.axis('y1', {labelOffset: 20, line: false });
        chart.axis('y2', {labelOffset: 20, line: false });
        chart.axis('x', {title: false });

        chart.legend({position: 'top'});

        chart.intervalStack().position('x*y1').color('c').tooltip('c*y1*y2');

        chart.line().position('x*y2').color('c').shape('spline').size(3).tooltip(false);

        chart.render();
/*
        chart.on('plotdblclick', function(ev){
          var data = ev.data;
          if (data) {
            const {control_center_id, t_run, type, record_type} = data._origin;
            openNewLink(`control_center_kh_monthly_data?id=${control_center_id}&t_run=${t_run}&type=${type}&record_type=${record_type}`)
          }
        });
*/
      }
    );


     if (dataSource.length==0) { 
        return (<h3><Icon type="frown-o"/>暂无对应数据 </h3>)
     }

     return (
        <ChartDefs
          data={dataSource}
          width={900}
          height={500}
          plotCfg={{ margin: [45, 70, 50, 80],  }}
          forceFit={true}
           />
     );
};
