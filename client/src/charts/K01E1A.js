
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import E1 from './E1';

// 组件3个地方，名称2个地方

const MyQuery = gql`
query active01($service_no: [String], $t_run: [String]) {
  chart_data(chart_no: "K01E1A", service_no: $service_no, t_run: $t_run, order: ["t_run", "pct"]) {
    id
    t_run
    service_no
    cat_1st
    pct
    amount
  }
}

`;

const K01E1A = graphql(MyQuery)(E1);

export default K01E1A;