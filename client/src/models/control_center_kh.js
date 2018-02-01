//import { query } from '../services/service_no_kh_details'

import { parse } from 'qs'

export default {
  namespace: 'control_center_kh',
  state: {
     name: '',
     field: 'name',
    },
  
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/control_center_kh') {
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
    *setName ({ payload }, { put }) {
      yield put({
        type: 'setNameSuccess',
        payload: payload,
      })
    },    
    
  },
 
  reducers: {
    querySuccess (state, action) {
      const { id } = action.payload
      return { ...state,
        id,
      }
    },
    setNameSuccess (state, action) {
      const name = action.payload
      return { ...state,
        name,
        field: 'name',
      }
    }    
  },
}