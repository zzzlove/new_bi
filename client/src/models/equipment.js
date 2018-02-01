//import { query } from '../services/service_no_kh_details'

import { parse } from 'qs'

export default {
  namespace: 'equipment',
  state: {
     equipment_no: {},
     dateRange: [],
  },
  
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/equipment') {
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
      const { equipment_no } = action.payload
      return { ...state,
        equipment_no,
      }
    }
  },
}