import React from 'react'
import PropTypes from 'prop-types';

import { Menu, Icon } from 'antd'

import { Link } from 'dva/router'

import { menu } from '../../utils'

const topMenus = menu.map(item => item.key)
const getMenus = function (menuArray, user, siderFold, parentPath = '/') {
  return menuArray.filter(item => {
    if (!user || !user.menu) return true
    return user.menu.hasOwnProperty(item.key)
  }).map(item => {
    const linkTo = parentPath + item.key
    if (item.child) {
      return (
        <Menu.SubMenu key={linkTo} title={<span>{item.icon ? <Icon type={item.icon} /> : ''}{siderFold && topMenus.indexOf(item.key) >= 0 ? '' : item.name}</span>}>
          {getMenus(item.child, user, siderFold, `${linkTo}/`)}
        </Menu.SubMenu>
      )
    }
    return (
      <Menu.Item key={linkTo}>
        <Link to={linkTo}>
          {item.icon ? <Icon type={item.icon} /> : ''}
          {siderFold && topMenus.indexOf(item.key) >= 0 ? '' : item.name}
        </Link>
      </Menu.Item>
    )
  })
}

function Menus ({ user, siderFold, darkTheme, location, handleClickNavMenu, navOpenKeys, changeOpenKeys }) {
  const menuItems = getMenus(menu, user, siderFold)

  const getAncestorKeys = (key) => {
    const map = {
      '/navigation/navigation2': ['/navigation'],
    }
    return map[key] || []
  }

  const onOpenChange = (openKeys) => {
    const latestOpenKey = openKeys.find(key => !(navOpenKeys.indexOf(key) > -1))
    const latestCloseKey = navOpenKeys.find(key => !(openKeys.indexOf(key) > -1))
    let nextOpenKeys = []
    if (latestOpenKey) {
      nextOpenKeys = getAncestorKeys(latestOpenKey).concat(latestOpenKey)
    }
    if (latestCloseKey) {
      nextOpenKeys = getAncestorKeys(latestCloseKey)
    }
    changeOpenKeys(nextOpenKeys)
  }

  let menuProps = !siderFold ? {
    onOpenChange,
    openKeys: navOpenKeys,
  } : {}

  return (
    <Menu
      {...menuProps}
      mode={siderFold ? 'vertical' : 'inline'}
      theme={darkTheme ? 'dark' : 'light'}
      onClick={handleClickNavMenu}
      defaultSelectedKeys={[location.pathname !== '/' ? location.pathname : '/dashboard']}
    >
      {menuItems}
    </Menu>
  )
}

Menus.propTypes = {
  user: PropTypes.object,
  siderFold: PropTypes.bool,
  darkTheme: PropTypes.bool,
  location: PropTypes.object,
  isNavbar: PropTypes.bool,
  handleClickNavMenu: PropTypes.func,
  navOpenKeys: PropTypes.array,
  changeOpenKeys: PropTypes.func,
}

export default Menus
