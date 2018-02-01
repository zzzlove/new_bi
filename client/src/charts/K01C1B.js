
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import C1 from './C1';

const MyQuery = gql`
query chart_data($service_no: [String]){
  chart_data(chart_no: "K01C1B", service_no: $service_no, order: "t_run") {
    id
    t_run
    cat_1st
    amount
    pct    
  }
}
`;

const K01C1B = graphql(MyQuery)(C1);

export default K01C1B;