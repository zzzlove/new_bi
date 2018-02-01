import React from 'react'
import PropTypes from 'prop-types';

import { Icon, Switch } from 'antd'

import Menus from './Menu'
import { config } from '../../utils'

import styles from './Layout.less'

function Sider ({ user, siderFold, darkTheme, location, changeTheme, navOpenKeys, changeOpenKeys }) {
  const menusProps = {
    user,
    siderFold,
    darkTheme,
    location,
    navOpenKeys,
    changeOpenKeys,
  }
  return (
    <div>
      <div className={styles.logo}>
        <img alt={'logo'} src={config.logo} />
        {siderFold ? '' : <span>{config.name}</span>}
      </div>
      <Menus {...menusProps} />
      {!siderFold ? <div className={styles.switchtheme}>
        <span><Icon type="bulb" />切换主题</span>
        <Switch onChange={changeTheme} defaultChecked={darkTheme} checkedChildren="黑" unCheckedChildren="白" />
      </div> : ''}
    </div>
  )
}

Sider.propTypes = {
  user: PropTypes.object,
  siderFold: PropTypes.bool,
  darkTheme: PropTypes.bool,
  location: PropTypes.object,
  changeTheme: PropTypes.func,
  navOpenKeys: PropTypes.array,
  changeOpenKeys: PropTypes.func,
}

export default Sider
