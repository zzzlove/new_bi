import { gql,graphql } from 'react-apollo';



const createRunningMaster = gql`
mutation createOrdersUpdated($input_content: OrdersUpdatedInput) {
  createOrdersUpdated(input_content: $input_content) {
    id
    order_no
    type
    biz_code
    fin_code
    ops_code
    trader_code
    trader_name
    status
    processing_status
    started_at
    term
    billing_no
    amount
    biz_type
    service_no
    reflection_id
    control_center
    control_element
    related_no
    billing_status
    gross_margin
    remarks
  }
}
`

const saveTest = function (){
  //for test
  var params = {order_no:'111',type:'1',biz_code:'111',fin_code:'11',ops_code:'22',trader_code:'333',trader_name:'333'};

  const re = graphql(createRunningMaster,{
    options: (props) => ({ variables: { input_content: props.input_content } })})(function({mutate}){
    console.log('set data');
    return mutate({variables:{input_content:params}});
  });

  console.log(re);
}

module.exports={
  saveTest
}
