import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import D1 from './D1';

//输入组件名称3个地方，输出2个地方

const MyQuery = gql`
query active01($service_no: [String]){
  chart_data(chart_no: "K01D1A", service_no: $service_no, t_run: "201705") {
    id
    t_run
    count
    amount
    pct_acc    
    count_distinct
  }
}
`;

const K01D1A = graphql(MyQuery)(D1);



export default K01D1A;

