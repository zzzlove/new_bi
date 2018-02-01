//import { query } from '../services/service_no_kh_details'

import { parse } from 'qs'

export default {
  namespace: 'testing',
  state: {
     order_no: '',
     trader_name: '',
     field: 'order_no',
     started_at: [0, 0],
  },
  
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/testing') {
          dispatch({
            type: 'setDateRange',
            payload: parse(location.query),
          })
        }
      })
    },
  },
  

 
  effects: {
    *setOrderNo ({ payload }, { put }) {
      yield put({
        type: 'setOrderNoSuccess',
        payload: payload,
      })
    },
    
    *setTraderName ({ payload }, { put }) {
      console.log(JSON.stringify(payload));
      yield put({
        type: 'setTraderNameSuccess',
        payload: payload,
      })
    },    
    *setDateRange ({ payload }, { put }) {
      yield put({
        type: 'setDateRangeSuccess',
        payload: payload,
      })
    },
    
  },
 
  reducers: {
    setOrderNoSuccess (state, action) {
      const order_no = action.payload
      return { ...state,
        order_no,
        field: 'order_no',
      }
    },
    setTraderNameSuccess (state, action) {
      console.log(JSON.stringify(action));
      const trader_name = action.payload
      return { ...state,
        trader_name,
        field: 'trader_name',
      }
    },
    setDateRangeSuccess (state, action) {
      const {startDate, endDate} = action.payload
      return { ...state,
        started_at: [startDate, endDate],
      }
    },
  },
}