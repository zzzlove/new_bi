
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import A1 from './A1'

const K01A1AQuery = gql`
query chart_data($service_no: [String]){
  chart_data(chart_no: "K01A1A", service_no: $service_no, order: "t_run") {
    id
    t_run
    service_no
    cat_1st
    count
    amount  
  }
}

`;

const K01A1A = graphql(K01A1AQuery)(A1);



export default K01A1A;