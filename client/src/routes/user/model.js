import { parse } from 'qs'

export default {
  namespace: 'xuser',
  
  state: {
    selectedRowKeys: [],
    totalAmount: {},
    currentItem: {},
    hasSelectedItem: false,
    detailedInfoVisible: false,
    selectedItem: {},
    distinctValues: {},
    searchProps: {},
    searchPropsModalVisible: false, 
    fetchProps: {},
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
    scrollPage: {x: 1380},
    pagePropsModalVisible: false,
    dtlsModelAuth: { modalVisible: false, modalType: 'create', currentItem: {}, pagination: {
      showSizeChanger: true,
      showQuickJumper: true,
      showTotal: (total, range) => `${range[0]}-${range[1]} / ${total}`,
      pageSizeOptions: ['5', '10', '20', '40', '100'],
      defaultPageSize: 10,
      pageSize: 10,
      current: 1,
    }, filtersPage: {}, sorterPage: {}, },
   dtlsElementAuth: { selectedItemElement: {}, modalVisible: false, modalType: 'create', currentItem: {}, pagination: {
      showSizeChanger: true,
      showQuickJumper: true,
      showTotal: (total, range) => `${range[0]}-${range[1]} / ${total}`,
      pageSizeOptions: ['5', '10', '20', '40', '100'],
      defaultPageSize: 10,
      pageSize: 10,
      current: 1,
    }, filtersPage: {}, sorterPage: {}, },
   dtlsClientUserAuth: { modalVisible: false, modalType: 'create', currentItem: {}, pagination: {}, filtersPage: {}, sorterPage: {}, },
   dtlsElementAction: { modalVisible: false, modalType: 'create', currentItem: {}, },
  },
  
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/user') {
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
    setQuery (state, action) {
      if( JSON.stringify(action.payload) == "{}"){ return { ...state}}
      else { return { ...state, selectedItem: action.payload, fetchProps: action.payload, hasSelectedItem: true, detailedInfoVisible: true }}
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
    setDetailsModelAuth (state, action) {
      return { ...state, dtlsModelAuth: {...state.dtlsModelAuth, ...action.payload }}
    },
    setDetailsElementAuth (state, action) {
      return { ...state, dtlsElementAuth: {...state.dtlsElementAuth, ...action.payload }}
    },
    setDetailsClientUserAuth (state, action) {
      return { ...state, dtlsClientUserAuth: {...state.dtlsClientUserAuth, ...action.payload }}
    },
    setDetailsElementAction (state, action) {
      return { ...state, dtlsElementAction: {...state.dtlsElementAction, ...action.payload }}
    },
  },
}