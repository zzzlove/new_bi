import React from 'react'
import PropTypes from 'prop-types';

import { Icon, Input, Button, Tooltip } from 'antd';

//<Icon type="cloud-download" />
//<Icon type="reload" />
//<Icon type="setting" />

export default function RenderComponent ({onCreateRecord, onPageProps, onExportExl, onImportExl, onSetFetchProps}) {
  
  
  return (
    <div>
      <Input.Group compact size="large">
        <Button style={{ fontSize: '14px' }} size={'large'} onClick={onCreateRecord}><Icon type="file-add" style={{fontSize: '16px'}}/>新建</Button>
       <Tooltip title="页面显示设置"><Button style={{ fontSize: '16px' }} size={'large'} onClick={onPageProps}><Icon type="setting" style={{fontSize: '16px'}}/></Button></Tooltip>
       <Tooltip title="导出到Excel"><Button style={{ fontSize: '16px' }} size={'large'} onClick={onExportExl}><Icon type="download" style={{fontSize: '16px'}}/></Button></Tooltip>
       <Tooltip title="从Excel导入"><Button style={{ fontSize: '16px' }} size={'large'} onClick={onImportExl}><Icon type="upload" style={{fontSize: '16px'}}/></Button></Tooltip>
       <Tooltip title="输入查询参数，从服务器获取数据"><Button style={{ fontSize: '16px' }} size={'large'} onClick={onSetFetchProps}><Icon type="cloud-download" style={{fontSize: '16px'}}/></Button></Tooltip>
      </Input.Group>
   </div> 
  )
}