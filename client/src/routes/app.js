import React from 'react'
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet'

import { connect } from 'dva'

import { message } from 'antd'

import { Layout, ChangePasswordModal, ChangeCenterModal } from '../components'

import { classnames, config } from '../utils'

import '../themes/index.less'

const { Header, Bread, Footer, Sider, styles } = Layout

const App = ({ children, location, dispatch, app }) => {
  const { user, changePasswordModalVisible, changeCenterModalVisible, siderFold, darkTheme, isNavbar, menuPopoverVisible, navOpenKeys } = app
  
  const changePasswordModalProps = {
    user,
    visible: changePasswordModalVisible,
    onOk (data) {
      dispatch({
        type: 'app/changePassword',
        payload: data,
      })
    },
    onCancel () {
      dispatch({
        type: 'app/hideChangePasswordModal',
      })
    },
  }

  const changeCenterModalProps = {
    visible: changeCenterModalVisible,
    onOk (data) {
      dispatch({
        type: 'app/setUserDetails',
        payload: data,
      });
      dispatch({
        type: 'app/hideChangeCenterModal',
      })
    },
    onCancel () {
      dispatch({
        type: 'app/hideChangeCenterModal',
      })
    },
  }
  
  const headerProps = {
    user,
    siderFold,
    location,
    isNavbar,
    menuPopoverVisible,
    navOpenKeys,
    switchMenuPopover () {
      dispatch({ type: 'app/switchMenuPopver' })
    },
    logout () {
      dispatch({ type: 'app/logout' })
    },
    changePasswd () {
      dispatch({
        type: 'app/showChangePasswordModal',
      })
    },
    changeCenter () {
      dispatch({
        type: 'app/showChangeCenterModal',
      })
    },
    switchSider () {
      dispatch({ type: 'app/switchSider' })
    },
    changeOpenKeys (openKeys) {
      dispatch({ type: 'app/handleNavOpenKeys', payload: { navOpenKeys: openKeys } })
    },
  }

  const siderProps = {
    user,
    siderFold,
    darkTheme,
    location,
    navOpenKeys,
    changeTheme () {
      dispatch({ type: 'app/changeTheme' })
    },
    changeOpenKeys (openKeys) {
      localStorage.setItem('navOpenKeys', JSON.stringify(openKeys))
      dispatch({ type: 'app/handleNavOpenKeys', payload: { navOpenKeys: openKeys } })
    },
  }

  if (config.openPages && config.openPages.indexOf(location.pathname) > -1) {
    return <div>{children}</div>
  }

  if (!user || Object.getOwnPropertyNames(user).length == 0) {
    return <div></div>
  }

  const ChangePasswordModalGen = () =>
    <ChangePasswordModal {...changePasswordModalProps} />

  const ChangeCenterModalGen = () =>
    <ChangeCenterModal {...changeCenterModalProps} />  
    
  return (
    <div>
      <div className={classnames(styles.layout, { [styles.fold]: isNavbar ? false : siderFold }, { [styles.withnavbar]: isNavbar })}>
        {!isNavbar ? <aside className={classnames(styles.sider, { [styles.light]: !darkTheme })}>
          <Sider {...siderProps} />
        </aside> : ''}
        <div className={styles.main}>
          <Header {...headerProps} />
          <Bread location={location} />
          <div className={styles.container}>
            <div className={styles.content}>
              {children}
            </div>
            <ChangePasswordModalGen />
            <ChangeCenterModalGen />
          </div>
          <Footer />
        </div>
      </div>
    </div>
  )
}

App.propTypes = {
  children: PropTypes.element.isRequired,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  app: PropTypes.object,
}

export default connect(({ app }) => ({ app }))(App)
