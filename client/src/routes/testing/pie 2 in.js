import createG2 from 'g2-react';
import { Stat, Global,chart } from 'g2';
import React from 'react';
import { Spin, Icon, Card } from 'antd';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { connect } from 'dva';




class RenderComponent extends React.Component {

    constructor(props) {
      super(props);
    }

    render() {
      
    const { loading, error, dataSource, title, chart_title_one } = this.props.data;
      
    const Chart = createG2(chart => {
      var data = chart.get('data');
      //var Stat = G2.Stat;
      chart.legend(false);
      chart.coord('theta', {
        radius: 0.5 // 设置饼图的大小
      });
      // 绘制内部的饼图
      chart.intervalStack()
        .position(Stat.summary.percent('value'))
        .color('cat_1st',['#4E7CCC', '#36B3C3', '#F9815C'])
        .label('cat_1st', {
          offset: -10,
          label: {
            fontSize: 12
          }
        });
      // 绘制外圈饼图
      var view = chart.createView();
      view.source(data);
      view.coord('theta', {
        inner: 0.75 // 设置空心部分的大小
      });
      view.intervalStack()
        .position(Stat.summary.percent('value'))
        .color('cat_2nd')
        .label('cat_2nd*cat_1st')
        .selected({
          mode: 'multiple' // 设置 geom 的选择模式
        });
      chart.render();
      // 交互，内部饼图某个部分被点击触发外圈饼图选中
      chart.on('plotclick', function(ev) {
        var chartGeom = chart.get('geoms')[0];
        var viewGeom = view.get('geoms')[0];
        viewGeom.clearSelected();
        var selected = chartGeom.getSelected();
        if (selected) {
          var data = selected['_origin'];
          var selectedType = data.cat_1st;
          var items = viewGeom.getData();
          for (var i = 0; i < items.length; i++) {
            var item = items[i];
            if (item['_origin'].cat_1st === selectedType) {
              viewGeom.setSelected(item);
            }
          }
        }
      });
    });    
    
      if (loading) {
        return (<div><Spin size={'large'} tip={'数据加载中 Loading...'}/></div>)
      }

      if (error) {
        return (<p>{error.message}</p>)
      }

      /*
      var nData = [];
      dataSource.forEach(function (value, index, array) {
        var nObj = {};
        nObj['value'] = value['count'];
        nObj['type'] = value['cat_1st'];
        nObj['name'] = value['cat_2nd'];
        nData.push(nObj);
      });

      console.log('------------');
      console.log(nData);
*/
      return (
        <div>
          <Chart
            data={dataSource}
            forceFit={true}
            width={500}
            height={450}
            plotCfg={{
              margin: 35
            }}

          />
        </div>
      )

  }
  }


const QueryToRender = gql`
query MyQuery($control_center_id: [Int]) {
  chart_title_one(code: "KH_MTFT01"){show_title}
  title: chart_data_one(chart_no: "MTFT01", control_center_id: $control_center_id){control_center}
  dataSource: chart_data(chart_no: "MTFT01", control_center_id: $control_center_id) {
    id
    t_run
    cat_1st
    cat_2nd
    amount
    value: count 
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
  options: { variables: { control_center_id: [1, 51] } },
})(RenderComponent);


