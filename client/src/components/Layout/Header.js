import React from 'react'
import PropTypes from 'prop-types';

import { Menu, Icon, Popover } from 'antd'

import Menus from './Menu'

import styles from './Header.less'

const SubMenu = Menu.SubMenu

function Header ({ user, logout, changePasswd, changeCenter, switchSider, siderFold, isNavbar, menuPopoverVisible, location, switchMenuPopover, navOpenKeys, changeOpenKeys }) {
  let handleClickMenu = (e) => {
    if (e.key === 'logout') logout()
    else if (e.key == 'changePasswd') changePasswd()
    else if (e.key == 'changeCenter') changeCenter()
  }
  const menusProps = {
    user,
    siderFold: false,
    darkTheme: false,
    isNavbar,
    handleClickNavMenu: switchMenuPopover,
    location,
    navOpenKeys,
    changeOpenKeys,
  }
  return (
    <div className={styles.header}>
      {isNavbar
        ? <Popover placement="bottomLeft" onVisibleChange={switchMenuPopover} visible={menuPopoverVisible} overlayClassName={styles.popovermenu} trigger="click" content={<Menus {...menusProps} />}>
          <div className={styles.button}>
            <Icon type="bars" />
          </div>
        </Popover>
        : <div className={styles.button} onClick={switchSider}>
          <Icon type={siderFold ? 'menu-unfold' : 'menu-fold'} />
        </div>}
      <div className={styles.rightWarpper}>
        <div className={styles.button}>
          <Icon type="mail" />
        </div>
        <Menu mode="horizontal" onClick={handleClickMenu}>
          <SubMenu style={{
            float: 'right',
          }} title={< span > <Icon type="user" />
            {user.name}&nbsp;/&nbsp;{user.ops_code}&nbsp;/&nbsp;{user.fin_code}< /span>}
          >
            <Menu.Item key="logout">
              <a>注销</a>
            </Menu.Item>
            <Menu.Divider></Menu.Divider>
            <Menu.Item key="changePasswd">
              <a>更改密码</a>
            </Menu.Item>
            <Menu.Divider></Menu.Divider>
            <Menu.Item key="changeCenter">
              <a>切换公司与网点</a>
            </Menu.Item>
          </SubMenu>
        </Menu>
      </div>
    </div>
  )
}

/*
 {user.name}&nbsp;/&nbsp;{user.ops_code}&nbsp;/&nbsp;{user.fin_code}
            <Menu.Item key="changeCenter">
              <a>切换公司与网点</a>
            </Menu.Item>  
*/

Header.propTypes = {
  user: PropTypes.object,
  logout: PropTypes.func,
  changePasswd: PropTypes.func,
  switchSider: PropTypes.func,
  siderFold: PropTypes.bool,
  isNavbar: PropTypes.bool,
  menuPopoverVisible: PropTypes.bool,
  location: PropTypes.object,
  switchMenuPopover: PropTypes.func,
  navOpenKeys: PropTypes.array,
  changeOpenKeys: PropTypes.func,
}

export default Header
