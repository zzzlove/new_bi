import React from 'react'
import PropTypes from 'prop-types';

import { Dropdown, Button, Icon, Menu } from 'antd'

const DropOption = ({ onMenuClick, menuOptions = [], buttonStyle, dropdownProps }) => {
//  const menu = menuOptions.map(item => <Menu.Item key={item.key}>{item.name}</Menu.Item>)

  const menu = menuOptions.map(item => <Menu.Item key={item.key} disabled={item.disabled?true:false}>{item.icon&&<Icon style={{ marginRight: 4 }} type={item.icon} />}{item.name}</Menu.Item>)


  return (<div><Dropdown
    overlay={<Menu onClick={onMenuClick}>{menu}</Menu>}
    {...dropdownProps}
  >
    <a>
      <Icon type="down" style={{fontSize: '14px'}}/>
    </a>
  </Dropdown></div>)
}

/*
    <Button style={{ border: 'none', ...buttonStyle }}>
      <Icon style={{ marginRight: 3 }} type="bars" />
      <Icon type="down" />
    </Button>
*/

DropOption.propTypes = {
  onMenuClick: PropTypes.func,
  menuOptions: PropTypes.array.isRequired,
  buttonStyle: PropTypes.object,
  dropdownProps: PropTypes.object,
}

export default DropOption
