module.exports = [
  {
    key: 'dashboard',
    name: '管理看板',
    icon: 'laptop',
  },
  {
    key: 'user',
    name: '系统用户',
    icon: 'user',
  },
  {
    key: 'bizDA',
    name: '经营分析',
    icon: 'chrome'
  },
  {
    key: 'bizDAAll',
    name: '经营分析(全)',
    icon: 'chrome'
  },
  {
    key: 'bizUkDA',
    name: '优卡业务',
    icon: 'code-o'
  },
  {
    key: 'control_center_kh',
    name: '线路经营',
    icon: 'retweet'
  },
  {
    key: 'client_kh',
    name: '客户管理',
    icon: 'usergroup-add'
  },
  {
    key: 'order_list',
    name: '运单明细',
    icon: 'file-excel'
  },
  {
    key: 'bizSetting',
    name: '业务配置',
    icon: 'global',
    child: [
      {key: 'pricing', name: '价格表维护', icon: 'setting',},
      {key: 'pricingPud', name: '短驳价格表维护', icon: 'setting',},
      ]
  },
  {
    key: 'kpiMgmt',
    name: '业绩管理',
    icon: 'code-o',
    child: [
      {key: 'entryManualInput', name: '业绩调整', icon: 'idcard',},
      {key: 'kpiSummary', name: '业绩汇总', icon: 'laptop',},
      ]
  },

  {
    key: 'testing',
    name: '临时测试',
    icon: 'code-o'
  },
]

