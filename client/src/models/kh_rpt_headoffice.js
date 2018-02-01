//import { query } from '../services/service_no_kh_details'

import { parse } from 'qs'

export default {
  namespace: 'kh_rpt_headoffice',
  state: {
     service_no: "上海-成都",
     dateRange: [],
  },
  
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/kh_rpt_headoffice') {
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
        type: 'querySuccess',
        payload: parse(payload),
      })
    },
  },
 
  reducers: {
    querySuccess (state, action) {
      const { service_no } = action.payload
      return { ...state,
        service_no,
      }
    }
  },
}