import { parse } from 'qs'

export default {
  namespace: 'orderSalesExtKh',
  
  state: {
    selectedIds: [],
    currentItem: {},
    hasSelectedItem: false,
    detailedInfoVisible: false,
    selectedItem: {},
    distinctValues: {},
    searchProps: {},
    searchPropsModalVisible: false, 
    fetchProps: {},
    fetchPropsModalVisible: true,
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
    scrollPage: {x: '170%'},
    pagePropsModalVisible: false,
    
  },
  
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/orderSalesExtKh') {
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
          type: 'setSubFetchProps',
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
      return { ...state, ...action.payload, searchPropsModalVisible: false }
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
    hideFetchPropsModal (state) {
      return { ...state, fetchPropsModalVisible: false }
    },

    setFetchProps (state, action) {
      return { ...state, ...action.payload, fetchPropsModalVisible: false }
    },
    setSubFetchProps (state, action) {
      if( JSON.stringify(action.payload) == "{}"){ return { ...state}}
      else { return { ...state, fetchProps: action.payload, fetchPropsModalVisible: false }}
    },
    setPageChange (state, action) {
      return { ...state, ...action.payload }
    },
    setSelectedItem (state, action) {
      return { ...state, ...action.payload, hasSelectedItem: true, }
    },
    setDetails (state, action) {
      return { ...state, ...action.payload }
    },
  },
}