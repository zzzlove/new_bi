import { C1 } from '../../charts'
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';


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

const Traderanalysis = graphql(K01C1AQuery)(C1);

// export {Traderanalysis};  暂时处于调试阶段

 export default Traderanalysis;


// script end at 2017-07-20 22:48:09.679498+08