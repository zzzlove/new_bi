//import { query } from '../services/service_no_kh_details'

import { parse } from 'qs'

export default {
  namespace: 'control_center_kh_monthly_data',
  state: {
     id: -1,
     t_run: '', 
     type: "",
     record_type: "",     
    },
  
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/control_center_kh_monthly_data') {
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
      const { id, t_run, type, record_type } = action.payload
      return { ...state,  id,  t_run, type, record_type,   }
    }
  },
}