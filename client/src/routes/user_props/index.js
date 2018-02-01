import React from 'react'
import PropTypes from 'prop-types';

import { connect } from 'dva'
import { Tag, Icon, Card } from 'antd';


function Dashboard ({ user }) {
  
  let {username, fin_code, ops_code, sales_code, fin_code_all, ops_code_all, sales_code_all, product_no_all, service_no_all, control_center_all, company_code, control_center_ids} = user;
  

  


  return (
  <div>
  <p>{username}{'  '}{fin_code}{'  '}{ops_code}{'  '}{sales_code}{'  '}{'  '}{'  '}{'  '}{JSON.stringify(control_center_ids)}</p>

    <div>
      <Tag color="#f50">#f50</Tag>
      <Tag color="#2db7f5">#2db7f5</Tag>
      <Tag color="#87d068">#87d068</Tag>
      <Tag color="#108ee9">#108ee9</Tag>
      <Tag color="#2db7e0">#2db7e0</Tag>
      <Tag color="#87d040">#87d040</Tag>
      <Tag color="#108ed4">#108ed4</Tag>
    </div>
  </div> 
  )
}

Dashboard.propTypes = {
  user: PropTypes.object,
}

function mapStateToProps(state) {
  return {
    user: state.app.user
  }
}

export default connect(mapStateToProps)(Dashboard)
