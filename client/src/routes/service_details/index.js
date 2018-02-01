

import React from 'react'
import PropTypes from 'prop-types';

import { routerRedux } from 'dva/router'
import { connect } from 'dva'


import ServiceDetailsDashBoard from './ServiceDetailsDashBoard';




function ServiceDetails ({ service_no, user, loading }) {


var dateRange = [new Date().getTime() - 90*24*60*60*1000, new Date().getTime()];

  const ServiceDetailsDashBoardProps = {
    service_no: service_no, started_at: dateRange
  }
  
  return (
    <div>
    <h2>{'线路名称(单边数据):'}{'    '}{service_no}</h2>
    <ServiceDetailsDashBoard {...ServiceDetailsDashBoardProps} />
    </div>
    );
}

ServiceDetails.propTypes = {
  service_no: PropTypes.string,
  dateRange: PropTypes.array,  
  loading: PropTypes.bool,
  user: PropTypes.object,  
}

function mapStateToProps(state) {
  return {
    user: state.app.user,
    service_no: state.service_no_kh_details.service_no,
    loading: state.loading.models.service_no_kh_details,
  }
}

export default connect(mapStateToProps)(ServiceDetails)


