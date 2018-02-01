//import { query } from '../services/service_no_kh_details'

import { parse } from 'qs'

export default {
  namespace: 'trader_details',
  state: {
     id: 0,
    },
  
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/trader_details') {
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
      const { id } = action.payload
      return { ...state,
        id,
      }
    }
  },
}