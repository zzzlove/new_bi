
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import B1 from './B1';

const K01B1AQuery = gql`
query chart_data($service_no: [String]){
  chart_data(chart_no: "K01B1A", service_no: $service_no, order: "t_run") {
    id
    t_run
    amount
    cat_1st
    data_f
    data_af
    count_distinct
  }
}

`;

const K01B1A = graphql(K01B1AQuery)(B1);

export default K01B1A;