import React from 'react'
import PropTypes from 'prop-types';

import { connect } from 'dva'

import { gql, graphql } from 'react-apollo'

import { Row, Col, Card } from 'antd'

import styles from './adminDashboard.less'

const AddChannelInput = ({ mutate }) => {
  const handleKeyUp = (evt) => {
    if (evt.keyCode === 13) {
      mutate({
        variables: { name: evt.target.value },
        refetchQueries: [ { query: channelsQuery }],        
      })
      evt.target.value = ''
    }
  }
  return (
    <input type='text' placeholder='New channel' onKeyUp={handleKeyUp} />
  )
}

const addChannelMutatation = gql`
  mutation addChannel($name: String!) {
    addChannel(name: $name) {
      id
    }
  }
`
const AddChannelInputWithMutation = graphql(addChannelMutatation)(AddChannelInput)

const RemoveChannelButton = ({ name, mutate }) => {
  const handleClick = (evt) => {
    mutate({
      variables: { name },
      refetchQueries: [ { query: channelsQuery }],        
    })
  }
  return (
    <button onClick={handleClick}>Remove</button>
  )
}

const removeChannelMutatation = gql`
  mutation removeChannel($name: String!) {
    removeChannel(name: $name)
  }
`
const RemoveChannelButtonWithMutation = graphql(removeChannelMutatation)(RemoveChannelButton)

const ChannelsList = ({ data: {loading, error, channels }}) => {
  if (loading) {
    return (<p>Loading ...</p>)
  }
  if (error) {
    return (<p>{error.message}</p>)
  }
  return (
    <div>
      <h3>Channel list: </h3>
      <ul>
        { channels.map( ch => <li key={ch.id}>#{ch.name}  <RemoveChannelButtonWithMutation name={ch.name} /></li> ) }
      </ul>
      <AddChannelInputWithMutation />
    </div>
  )
}

const channelsQuery = gql`query { channels { id, name } }`
const ChannelsListWithGqlData = graphql(channelsQuery)(ChannelsList)

function AdminDashboard ({ user }) {
  return (
    <Row gutter={24}>
      <Col lg={24} md={24}>
        <Card bordered={false} bodyStyle={{
          padding: '24px 36px 24px 0',
        }}>
          <div>
            <h1>Admin dashboard</h1>
            <p /><h2>Following is example data from rest query result:</h2>
            <p />{user.dashboard ? user.dashboard.greeting : ''}
            <p /><p /><h2>Following is example data from gql query result:</h2>
            <ChannelsListWithGqlData />
          </div>
        </Card>
      </Col>
    </Row>
  )
}

AdminDashboard.propTypes = {
  user: PropTypes.object,
}

function mapStateToProps(state) {
  return {
    user: state.app.user
  }
}

export default connect(mapStateToProps)(AdminDashboard)
