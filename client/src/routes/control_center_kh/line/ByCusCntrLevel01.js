import createG2 from 'g2-react';
import { Stat, Global,chart } from 'g2';
import React from 'react';
import { Spin, Icon, Card, Row, Col, Button, Radio } from 'antd';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { connect } from 'dva';
import _ from 'lodash';




class RenderComponent extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
         t_run_selected: '整体合计',
       };
    }

  handleChange(value) {

   this.setState({ t_run_selected: value })

  }

    render() {

    const { loading, error, dataSource, title, chart_title_one } = this.props.data;
    const { t_run_selected } = this.state;

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

    const handleChangeGo = (value) => {this.handleChange(value)};

    var colorMap = {
            '签约-优质': '#edcc72',
            '签约-普通': '#4e7ccc',
            '签约-活跃': '#94e08a',
            '非签约-优质': '#f8ab60',
            '非签约-普通': '#36b3c3',
            '非签约-活跃': '#4ecda5',
          }

    const Chart1Defs = createG2((chart, data) => {

        var colDefs = {
          control_element: {alias: "签约", values: ['签约', '非签约']},
          cat_1st: {alias: "签约及活跃", values: ['签约-优质', '签约-普通', '签约-活跃', '非签约-优质', '非签约-普通', '非签约-活跃']},
          t_run: {alias: "月份"},
          count_distinct: {alias: "客户数"},
          amount: {alias: "收入(单位: 万元)", formatter: function (amount) {
          return (amount / 10000).toFixed(0);},
          },
        };


        chart.source(data, colDefs);

        chart.legend(false);
  //    chart.legend({position: 'top'});

//      .shape('control_element', ['rect','hollowRect'])

        chart.interval(['dodge', 'stack']).position('t_run*amount')
           .color('control_element*cat_1st', function(control_element, cat_1st) { return colorMap[cat_1st]; })
           .tooltip('cat_1st*amount')
           .size(20)
          .label('amount',{offset: 5,label: {fill: '#4FAAEB'}});

        chart.render();

        chart.on('plotdblclick', function(ev){
          var data = ev.data;
          if (data) {
            handleChangeGo(data._origin.t_run)
          }
        });


      }
    );

    const Chart2Defs = createG2(chart => {
      var data = chart.get('data');
      //var Stat = G2.Stat;
      chart.legend(false);
      chart.coord('theta', {
        radius: 0.5 // 设置饼图的大小
      });
      // 绘制内部的饼图
      chart.intervalStack()
        .position(Stat.summary.percent('amount'))
        .color('control_element',['#4E7CCC', '#36B3C3', '#F9815C'])
        .label('control_element', {
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
        .position(Stat.summary.percent('amount'))
        .color('cat_1st', function(value) { return colorMap[value]; })
        .label('cat_1st*control_element')
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
          var selectedType = data.control_element;
          var items = viewGeom.getData();
          for (var i = 0; i < items.length; i++) {
            var item = items[i];
            if (item['_origin'].control_element === selectedType) {
              viewGeom.setSelected(item);
            }
          }
        }
      });
    });

//            <Button onClick={()=>this.handleChange('整体合计')}>整体合计百分比</Button>

      let dataRender = t_run_selected=='整体合计'?  _.sortBy(dataSource, 'cat_1st'): _.sortBy(_.filter(dataSource, {t_run: t_run_selected}), 'cat_1st');


      return (
        <div>
        <Card>
        <h2>{title.control_center}{chart_title_one.show_title}{'的收入统计, 及'}{t_run_selected}{'百分比分布'}</h2>
        <Row gutter={24} >

        <Col lg={9} md={24}>
            <Button onClick={()=>this.handleChange('整体合计')}>显示整体合计百分比</Button>
            <Chart2Defs
              data={dataRender}
              forceFit={true}
              width={500}
              height={430}
              plotCfg={{ margin: [80, 30, 60, 80],  }}/>
          </Col>
        <Col lg={15} md={24}>
            <Chart1Defs
              data={dataSource}
              forceFit={true}
              width={500}
              height={450}
              plotCfg={{ margin: [45, 30, 60, 80],  }}/>
          </Col>
        </Row>
        </Card>
        </div>
      )

  }
}


const QueryToRender = gql`
query MyQuery($control_center_id: [Int]) {
  chart_title_one(code: "KH_M2LP01"){show_title}
  title: control_center_actual_one(data_set: "byCusCntrLevel", control_center_id: $control_center_id){control_center}
  dataSource: control_center_actual(data_set: "byCusCntrLevel", control_center_id: $control_center_id, order: ["t_run"]) {
    id
    t_run
    control_center_id
    control_element
    cat_1st
    amount
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
  options: (props) => ({ variables: { control_center_id: props.control_center_id } }),
})(RenderComponent);
*/




export default graphql(QueryToRender, {
  options: (props) => ({ variables: { control_center_id: props.control_center_id } }),
})(RenderComponent);


