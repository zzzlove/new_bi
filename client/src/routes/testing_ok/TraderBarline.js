import createG2 from 'g2-react';
import { Stat, Global } from 'g2';
import React from 'react';
import { Spin, Icon, Card } from 'antd';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const Chart1Defs = createG2((chart, data) => {
 
    var colDefs = {
    count: {alias: "日发车数" },
    amount: {alias: "收入(单位: 万元)", formatter: function (value) {
    return (value / 10000).toFixed(0);},
    },
    data_i: {alias: "车数月累计" },
    amount_acc: {alias: "收入月累计(单位: 万元)", formatter: function (value) {
    return (value / 10000).toFixed(0);},
    },
    t_time: {type: 'time', alias: "日期", mask: "mm-dd"}  
    };
    
    chart.source(data, colDefs);
    
    chart.axis('t_time', {title: false });
    chart.axis('amount', {line: false, labelOffset: 20, });
    chart.axis('amount_acc', {line: false, labelOffset: 20, });    
    
    chart.legend({position: 'bottom'});
    chart.tooltip({ title: null });

    chart.intervalStack().position('t_time*amount').opacity(0.8).tooltip('t_time*amount');
    chart.line().position('t_time*amount_acc').size(3).opacity(0.8).tooltip('t_time*amount_acc');
    
    chart.render();

  }
);


const Chart2Defs = createG2((chart, data) => {
 
    var colDefs = {
    count: {alias: "日发车数" },
    amount: {alias: "收入(单位: 万元)", formatter: function (value) {
    return (value / 10000).toFixed(0);},
    },
    data_i: {alias: "车数月累计" },
    amount_acc: {alias: "收入月累计(单位: 万元)", formatter: function (value) {
    return (value / 10000).toFixed(0);},
    },
    t_time: {type: 'time', alias: "日期", mask: "mm-dd"}  
    };
    
    chart.source(data, colDefs);
    
    chart.axis('t_time', {title: false });
    chart.axis('count', {line: false, labelOffset: 20, });
    chart.axis('data_i', {line: false, labelOffset: 20, });     
    
    chart.legend({position: 'bottom'});
    chart.tooltip({ title: null });

    chart.intervalStack().position('t_time*count').opacity(0.8).tooltip('t_time*count');
    chart.line().position('t_time*data_i').size(3).opacity(0.8).tooltip('t_time*data_i');
    
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
          plotCfg={{ margin: [30, 80, 70, 80],  }}
          forceFit={true}
           />
        <Chart2Defs
          data={dataSource}
          width={900}
          height={500}
          plotCfg={{ margin: [30, 80, 70, 80],  }}
          forceFit={true}
           />
        </div> 
     );
  
}

const QueryToRender = gql`

query MyQuery($profile_id: Int) {
  dataSource: chart_data(chart_no: "K02BLA", profile_id: $profile_id) {
    id
    t_time
		count
    data_i
    amount
    amount_acc
  }
}
`;

/*
1174908

export default graphql(QueryToRender, {
  options: { variables: { profile_id: 1174908 } },
})(RenderComponent);

export default graphql(QueryToRender, {
  options: (props) => ({ variables: { profile_id: props.profile_id } }),
})(RenderComponent);
*/

export default graphql(QueryToRender, {
  options: (props) => ({ variables: { profile_id: props.profile_id } }),
})(RenderComponent);