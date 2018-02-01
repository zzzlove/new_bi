
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import C1 from './C1';

const K01C1AQuery = gql`
query chart_data($service_no: [String]){
  chart_data(chart_no: "K01C1A", service_no: $service_no, order: "t_run") {
    id
    t_run
    cat_1st
    amount
    pct    
  }
}

`;

const K01C1A = graphql(K01C1AQuery)(C1);

export default K01C1A;