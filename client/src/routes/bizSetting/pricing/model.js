import { parse } from 'qs'

export default {
  namespace: 'pricing',
  
  state: {
    selectedRowKeys: [],
    selectedRows: [],
    totalAmount: {},
    currentItem: {},
    hasSelectedItem: false,
    detailedInfoVisible: false,
    selectedItem: {},
    distinctValues: {},
    searchProps: {},
    searchPropsModalVisible: false, 
    fetchPropsGet: {},
    fetchPropsModalVisible: false,
    modalVisible: false,
    modalType: 'create',
    pagination: {
      showSizeChanger: true,
      showQuickJumper: true,
      showTotal: (total, range) => `${range[0]}-${range[1]} / ${total}`,
      pageSizeOptions: ['5', '10', '20', '40', '100'],
      defaultPageSize: 10,
      pageSize: 10,
      current: 1,
    },

    filtersPage: {},
    sorterPage: {},
    sizePage: 'small',
    footerPage: false,
    showInPage: true, 
    pagePropsModalVisible: false,
    
  },
  
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/bizSetting/pricing') {
          dispatch({
            type: 'query',
            payload: location.query,
          })
        }
      })
    },
  },
  

 
  effects: {
    *query ({ payload }, { put }) {
         yield put({
          type: 'setQuery',
          payload: parse(payload),
        })
    },
  },
 
  reducers: {

    showModal (state, action) {
      return { ...state, ...action.payload, modalVisible: true }
    },
    hideModal (state) {
      return { ...state, modalVisible: false }
    },
    showSearchPropsModal (state) {
      return { ...state, searchPropsModalVisible: true }
    },
    hideSearchPropsModal (state) {
      return { ...state, searchPropsModalVisible: false }
    },
    setSearchProps (state, action) {
      return { ...state, ...action.payload, searchPropsModalVisible: false, pagination: {...state.pagination, current: 1}, selectedRowKeys: [], totalAmount: {}, }
    },
    showFetchPropsModal (state) {
      return { ...state, fetchPropsModalVisible: true }
    },
    showPagePropsModal (state) {
      return { ...state, pagePropsModalVisible: true }
    },
    setPageProps (state, action) {
      return { ...state, ...action.payload, pagePropsModalVisible: false }
    },
    setQuery (state, action) {
      if( JSON.stringify(action.payload) == "{}"){ return { ...state}}
      else { return { ...state, selectedItem: action.payload, fetchPropsGet: action.payload, hasSelectedItem: true, detailedInfoVisible: true }}
    },
    setDetails (state, action) {
      return { ...state, ...action.payload }
    },

  },
}