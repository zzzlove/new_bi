import createG2 from 'g2-react';
import { Stat, Global,Shape } from 'g2';
import React from 'react';
import { Spin, Icon, Card, message, Tabs, Col, Row, Button } from 'antd';
import { compose, gql, graphql } from 'react-apollo';
import { connect } from 'dva';
function openNewLink(url) {
  window.open(url)
}
import styles from './Analysis.less';
import numeral from 'numeral';



function RenderComponent({dispatch, bizDataAnalysis, data }) {

  const { xType, timeSelectMode, time_started_at, time_finished_at, format_started_at, format_finished_at, incomeTraderNameLevelDownVisible, titleLevelDownTraderName} = bizDataAnalysis; 
  
 
  if (!incomeTraderNameLevelDownVisible) {
    return false;
  }
  
  const { sales_yd_amount_tradername_gb_range, sales_yd_amount_tradername_range_gb_service, loading, error } = data; 
  
  if (loading) {
    return (<div><Spin size={'large'} tip={'数据加载中 Loading...'}/></div>)
  }
  if (error) {
      return message.error(JSON.stringify(error))
  }

  
  
    const ChartDefs = createG2((chart, data) => {

        var colDefs = {
        x: {type: xType, alias: "时间"},
        y: {alias: "产值(单位: 万元)", formatter: function (value) {return (value / 10000).toFixed(0);}, },
        };

        chart.source(data, colDefs);

        chart.axis('y', {labelOffset: 20, line: false });
        chart.axis('x', {title: false });

        chart.legend(false);

        chart.intervalStack().position('x*y');

        chart.render();
      }
    );


     if (sales_yd_amount_tradername_gb_range.length==0) { 
        return (<h3><Icon type="frown-o"/>暂无对应数据 </h3>)
     }

     const SalesRank = () =>   <div className={styles.salesRank}>
          <Tabs size="small">
            <Tabs.TabPane tab="发货线路" key="service">
              <ul className={styles.rankingList}>
                {
                  sales_yd_amount_tradername_range_gb_service.map((item, i) => (
                    <li key={item.c}>
                      <span className={(i < 3) && styles.active}>{i + 1}</span>
                      <span>{item.c}</span>
                      <span>{numeral(item.y).format('0,0')}</span>
                    </li>
                  ))
                }
              </ul>
            </Tabs.TabPane>
          </Tabs>
        </div>;
        
    const HideTraderNameDetails = (<div>
        <Button type="primary" onClick={()=>dispatch({type: 'bizDataAnalysis/setDetails',  payload: {incomeTraderNameLevelDownVisible: false}, })}><Icon type="close" style={{fontSize: '14px'}}/>关闭窗口</Button>
      </div>)
      
     return (
        <Card
          bordered={false}
          bodyStyle={{ padding: 0 }}
          style={{marginBottom: 10}}
        >
          <div className={styles.salesCard}>
            <Tabs size="large" tabBarStyle={{ marginBottom: 24 }} tabBarExtraContent={HideTraderNameDetails} >
              <Tabs.TabPane tab={<span>{titleLevelDownTraderName}产值分解</span>} key="trader_name">
                <Row>
                  <Col xl={16} lg={12} md={12} sm={24} xs={24}>
                    <div className={styles.salesBar}>
                      <ChartDefs
                        data={sales_yd_amount_tradername_gb_range}
                        width={900}
                        height={500}
                        plotCfg={{ margin: [45, 70, 50, 80],  }}
                        forceFit={true}
                       />
                    </div>
                  </Col>
                  <Col xl={8} lg={12} md={12} sm={24} xs={24}>
                    <SalesRank/>
                  </Col>
                </Row>
              </Tabs.TabPane>
            </Tabs>
          </div>
        </Card>
     );
};


const IncomeTraderNameLevelDownQuery = gql`
query MyQuery($ops_id: [Int!], $mode: String!, $started_at: String!, $finished_at: String!, $trader_name: String!) {
  sales_yd_amount_tradername_gb_range(ops_id: $ops_id, mode: $mode, started_at: $started_at, finished_at: $finished_at, trader_name: $trader_name){x, y}
  sales_yd_amount_tradername_range_gb_service(ops_id: $ops_id, mode: $mode, started_at: $started_at, finished_at: $finished_at, trader_name: $trader_name){c, y}
}
`;

const IncomeServiceLevelDownQuery = gql`
query MyQuery($ops_id: [Int!], $mode: String!, $started_at: String!, $finished_at: String!, $service_no: String!) {
  sales_yd_amount_service_gb_range(ops_id: $ops_id, mode: $mode, started_at: $started_at, finished_at: $finished_at, service_no: $service_no){x, y}
  sales_yd_amount_service_range_gb_tradername(ops_id: $ops_id, mode: $mode, started_at: $started_at, finished_at: $finished_at, service_no: $service_no){c, y}
}
`;

const RenderComponentWithMutations = compose(
  graphql(IncomeTraderNameLevelDownQuery, { name: 'data', options: (props) => {return { variables: { ops_id: props.user.ops_id, ...props.bizDataAnalysis.incomeDaFetchProp } }} }),
)(RenderComponent);


function mapStateToProps(state) {
  return {
    bizDataAnalysis: state.bizDataAnalysis,
    user: state.app.user
  }
}

export default connect(mapStateToProps)(RenderComponentWithMutations);