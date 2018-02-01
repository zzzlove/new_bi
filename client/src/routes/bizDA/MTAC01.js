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
     

        var colDefs = {
        amount_acc: {alias: "客户履约率", min: 0, max: 100},
        pct: {alias: "产值占比", min: 0, max: 100},
        t_run: {alias: "月份"},
        };
        
        chart.source(data, colDefs);
        

        chart.axis('t_run', {title: false });

        chart.legend({position: 'top'});

        chart.intervalStack().position('t_run*amount_acc').tooltip('t_run*amount_acc');

        chart.point().position('t_run*amount_acc')
          .shape('line')
          .label('amount_acc',{offset: 5,label: {fill: '#4FAAEB'}});        
        
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
  chart_title_one(code: "KH_MTAC01"){show_title}
  title: control_center_actual_one(control_center_id: $control_center_id){control_center}
  dataSource: control_center_actual(type: ["bloc_cus_achieving", "service_cus_achieving", "line_cus_achieving", "city_cus_achieving", "region_cus_achieving"], control_center_id: $control_center_id, order: ["t_run"]) {
    id
    control_center_id
    t_run
    type
    amount_acc
  }
}
`;


/*
[45, 138, 120, 111, 61, 72, 39, 31, 78, 23, 33, 68, 121]   type="bloc_cus_achieving"

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