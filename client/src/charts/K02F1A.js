import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import F1 from './F1';


const K02F1AQuery = gql`
query active01($service_no: [String]) {
  chart_data(chart_no: "K02F1A", service_no: $service_no, order: "t_time") {
    id
    t_time
    amount
  }
}

`;

const K02F1A = graphql(K02F1AQuery)(F1);



export default K02F1A;

