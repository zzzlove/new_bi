import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import G1 from './G1';

//输入组件名称3个地方，输出2个地方

const MyQuery = gql`
query chart_data($trader_no: [String]) {
  chart_data(chart_no: "K03G1A", trader_no: $trader_no, order: ["t_time", "cat_1st"]) {
    id
    t_time
    cat_1st: control_center
    cat_2nd: cat_1st
    data_i
    remarks
  }
}
`;

const K03G1A = graphql(MyQuery)(G1);



export default K03G1A;

