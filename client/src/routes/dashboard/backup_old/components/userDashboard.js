import React from 'react'
import PropTypes from 'prop-types';

import { connect } from 'dva'

import { Row, Col, Card } from 'antd'

import styles from './userDashboard.less'

function UserDashboard ({ user }) {
  return (
    <Row gutter={24}>
      <Col lg={24} md={24}>
        <Card bordered={false} bodyStyle={{
          padding: '24px 36px 24px 0',
        }}>
          <div>
            <h1>User dashboard</h1>
            <p /><h2>Following is example data from rest query result:</h2>
            <p />{user.dashboard ? user.dashboard.greeting : ''}
          </div>
        </Card>
      </Col>
    </Row>
  )
}

UserDashboard.propTypes = {
  user: PropTypes.object,
}

function mapStateToProps(state) {
  return {
    user: state.app.user
  }
}

export default connect(mapStateToProps)(UserDashboard)
