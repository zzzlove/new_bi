//import { query } from '../services/service_no_kh_details'

import { parse } from 'qs'

export default {
  namespace: 'manual_fin',
  state: {
     searchProps: {},
     order_list:{},
     modalVisible: false,
     excelModalVisible:false,
     modalType: 'create',
     loadingPreview :true,
     previewData:{}
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/manual_fin') {
          dispatch({
            type: 'setDateRange',
            payload: parse(location.query),
          })
        }
      })
    },
  },



  effects: {
  *setSearchProps ({ payload }, { put }) {
      yield put({
        type: 'setSearchPropsSuccess',
        payload: payload,
      })
    }

  },

  reducers: {
  setSearchPropsSuccess (state, action) {
      const searchProps = action.payload
      return { ...state,
        searchProps,
      }
    },
    showModal(state, action){
      return { ...state, ...action.payload, modalVisible: true , excelModalVisible:false};
    },
    hideModal(state, action){
      return { ...state, ...action.payload, modalVisible: false , excelModalVisible:false};
    },
    showPreview(state, action){
      return { ...state, ...action.payload, modalVisible: false, excelModalVisible:true ,loadingPreview:false,previewData:action.payload  };
    },
    hidePerview(state, action){
      return { ...state, ...action.payload, modalVisible: false, excelModalVisible:false ,loadingPreview:true  };
    }
  },

}
