 import React from 'react'
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom'

import { Input, Select, Button, Icon, AutoComplete, Tooltip } from 'antd'

/*
<AutoComplete
      style={{ width: 200 }}
      dataSource={dataSource}
      placeholder="try to type `b`"
      filterOption={(inputValue, option) => option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
    />

*/


class Search extends React.Component {
  state = {
    clearVisible: false,
    selectValue: (this.props.select && this.props.selectProps) ? this.props.selectProps.defaultValue : '',
    keywordInput: '',
    expand: false,
  }
  handleSearch = () => {
    const data = {
      keyword: this.state.keywordInput,
      field: this.state.selectValue,
    }
    if (this.props.onSearch) this.props.onSearch(data)
  }
  handleInputChange = value => {
    this.setState({
      ...this.state,
      clearVisible: value !== '',
      keywordInput: value,
    })
  }
  handeleSelectChange = value => {
    this.setState({
      ...this.state,
      selectValue: value,
    })
  }
  handleClearInput = () => {
    this.setState({
      clearVisible: false,
      keywordInput: '',
    })
   this.props.onClearFilter({keyword: '', field: this.state.selectValue})  //onClearFilter
  }
  handleExpand = () => {
    this.setState({
      expand: !this.state.expand,
    })
   this.props.onSearch({keyword: '', field: this.state.selectValue}) //onExpandChange
  }
  render () {
    const { size, select, selectOptions, selectProps, style, keyword } = this.props;
    const { clearVisible, keywordInput, expand } = this.state;  



    return (
      <Input.Group compact size={size} >
        <Select dropdownMatchSelectWidth={false} onChange={this.handeleSelectChange} size={size} {...selectProps}>
          {selectOptions && selectOptions.map((item, key) => <Select.Option value={item.value} key={key}>{item.name || item.value}</Select.Option>)}
        </Select>
        <AutoComplete style={{ width: 220 }} size={size} 
           onChange={this.handleInputChange} 
           onPressEnter={this.handleSearch} 
           defaultValue={keyword} value={keywordInput}
           dataSource={this.props.dataSource}
           filterOption={(inputValue, option) => option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}/>
        <Tooltip title="模糊查询"><Button size={size} type="primary" onClick={this.handleSearch}><Icon type="search" style={{fontSize: '16px'}}/></Button></Tooltip>
        <Tooltip title="清除所有查询与过滤设置"><Button size={size} onClick={this.handleClearInput}><Icon type="close-circle-o" style={{fontSize: '16px'}}/></Button></Tooltip>
      </Input.Group>
    )
  }
}



//         <Tooltip title="高级查询"><Button size={size} onClick={this.handleExpand}><Icon type={expand ? 'up' : 'down'} style={{fontSize: '16px'}}/></Button></Tooltip>

Search.propTypes = {
  size: PropTypes.string,
  select: PropTypes.bool,
  selectProps: PropTypes.object,
  onSearch: PropTypes.func,
  selectOptions: PropTypes.array,
  style: PropTypes.object,
  keyword: PropTypes.string,
}

export default Search
