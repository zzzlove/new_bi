//import { query } from '../services/service_no_kh_details'

import { parse } from 'qs'

export default {
  namespace: 'control_center_kh_daily_data',
  state: {
     id: -1,
     t_time: 0, 
     started_at: [0, 0],
     type: "",
     record_type: "",
    },
  
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/control_center_kh_daily_data') {
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
      const { id, t_time, type, record_type } = action.payload
      return { ...state,
        id,
        t_time,
        started_at: [parseInt(t_time, 10), parseInt(t_time, 10)+1000*60*60*24],
        type,
        record_type,
      }
    }
  },
}