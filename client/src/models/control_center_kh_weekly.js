//import { query } from '../services/service_no_kh_details'

import { parse } from 'qs'

export default {
  namespace: 'control_center_kh_weekly',
  state: {
     id: -1,
    },
  
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/control_center_kh_weekly') {
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