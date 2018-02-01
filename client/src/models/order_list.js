//import { query } from '../services/service_no_kh_details'

import { parse } from 'qs'

export default {
  namespace: 'order_list',
  state: {
     searchProps: {order_no: 'xx'},
     order_no: '',
     trader_name: '',
     service_no: '',
     fin_code: '',
     ops_code: '',
     billing_no: '',
     field: 'order_no',
     started_at: [0, 0],
  },
  
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/order_list') {
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
    },

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

    *setServiceNo ({ payload }, { put }) {
      yield put({
        type: 'setServiceNoSuccess',
        payload: payload,
      })
    }, 

    *setFinCode ({ payload }, { put }) {
      yield put({
        type: 'setFinCodeSuccess',
        payload: payload,
      })
    },

    *setOpsCode ({ payload }, { put }) {
      yield put({
        type: 'setOpsCodeSuccess',
        payload: payload,
      })
    },    

    *setBillingNo ({ payload }, { put }) {
      yield put({
        type: 'setBillingNoSuccess',
        payload: payload,
      })
    },   
    
  },
 
  reducers: {
  setSearchPropsSuccess (state, action) {
      const searchProps = action.payload
      return { ...state,
        searchProps,
      }
    },

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
    setServiceNo (state, action) {
      const service_no = action.payload
      return { ...state,
        service_no,
        field: 'service_no',
      }
    },
    setFinCode (state, action) {
      const fin_code = action.payload
      return { ...state,
        fin_code,
        field: 'fin_code',
      }
    },
    setOpsCode (state, action) {
      const ops_code = action.payload
      return { ...state,
        ops_code,
        field: 'ops_code',
      }
    },
    setBillingNo (state, action) {
      const billing_no = action.payload
      return { ...state,
        billing_no,
        field: 'billing_no',
      }
    },
  },
}