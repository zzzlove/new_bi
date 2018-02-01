import React from 'react'
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom'

import { Input, Select, Button, Icon, AutoComplete } from 'antd'



class Search extends React.Component {
  state = {
    clearVisible: false,
    selectValue: (this.props.select && this.props.selectProps) ? this.props.selectProps.defaultValue : '',
    keywordInput: '',
  }
  handleSearch = () => {
    const data = {
      keyword: this.state.keywordInput,
      field: this.state.selectValue,
    }
    if (this.props.onSearch) this.props.onSearch(data)
  }
  handleInputChange = e => {
    this.setState({
      ...this.state,
      clearVisible: e.target.value !== '',
      keywordInput: e.target.value,
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
   this.props.onSearch({keyword: '', field: this.state.selectValue})
  }
  render () {
    const { size, select, selectOptions, selectProps, style, keyword } = this.props;
    const { clearVisible, keywordInput } = this.state;  


    return (
      <Input.Group compact size={size} >
        {select && <Select dropdownMatchSelectWidth={false} onChange={this.handeleSelectChange} size={size} {...selectProps}>
          {selectOptions && selectOptions.map((item, key) => <Select.Option value={item.value} key={key}>{item.name || item.value}</Select.Option>)}
        </Select>}
        <Input style={{ width: 220 }} size={size} onChange={this.handleInputChange} onPressEnter={this.handleSearch} defaultValue={keyword} value={keywordInput}
          suffix={clearVisible && <Icon type="close-circle" onClick={this.handleClearInput} style={{fontSize: '16px'}}/>}/>
        <Button style={{ width: 50 }} size={size} type="primary" onClick={this.handleSearch}><Icon type="search" style={{fontSize: '16px'}}/></Button>
      </Input.Group>
    )
  }
}


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
