import React from 'react'
import PropTypes from 'prop-types';

import { connect } from 'dva'

import { AdminDashboard, UserDashboard } from './components'

import styles from './index.less'

function Dashboard ({ user }) {
  let isAdmin = user.roles ? (user.roles.indexOf('admin') != -1) : false
  return isAdmin ? (
    <AdminDashboard />
  ) : (
    <UserDashboard />
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
