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
        c: {alias: "业务分类", },
        y: {alias: "产值(单位: 万元)", formatter: function (value) {return (value / 10000).toFixed(0);}, },

        };

        chart.source(data, colDefs);

        chart.axis('y', {labelOffset: 20, line: false });

        chart.axis('x', {title: false });

        chart.legend({position: 'top'});

        chart.intervalStack().position('x*y').color('c');


        chart.render();

      }
    );


     if (dataSource.length==0) { 
        return (<h3><Icon type="frown-o"/>暂无对应数据 </h3>)
     }

     return (
        <ChartDefs
          data={dataSource}
          width={900}
          height={600}
          plotCfg={{ margin: [45, 70, 50, 80],  }}
          forceFit={true}
           />
     );
};
