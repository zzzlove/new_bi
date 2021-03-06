import { parse } from 'qs'
import moment from 'moment';

//     time_started_at: moment(moment().valueOf() - 1000*3600*24*30),

export default {
  namespace: 'bizUkDataAnalysis',
  
  state: {
     timeSelectMode: "byDay",
     xType: 'cat',
     time_started_at: moment().subtract(12, 'months'),
     time_finished_at: moment(),
     format_started_at: moment().subtract(12, 'months').format('YYYYMM'),
     format_finished_at: moment().format('YYYYMM'),
     incomeDaFetchProp: {
       mode: "byMonth", started_at: moment().subtract(12, 'months').format('YYYYMM'), finished_at: moment().format('YYYYMM'),
     },
     incomeTraderNameLevelDownVisible: false,
     titleLevelDownTraderName: '',
     incomeServiceLevelDownVisible: false,
     titleLevelDownService: '',
  },
  
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/user') {
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
          type: 'setQuery',
          payload: parse(payload),
        })
    },
  },
 
  reducers: {


    setQuery (state, action) {
      if( JSON.stringify(action.payload) == "{}"){ return { ...state, }}
      else { return { ...state,  }}
    },
    setPageChange (state, action) {
      return { ...state, ...action.payload }
    },
    setSelectedItem (state, action) {
      return { ...state, ...action.payload, hasSelectedItem: true, }
    },
    setDetails (state, action) {
      return { ...state, ...action.payload }
    },
    showTraderNameDetails (state, action) {
      const {trader_name} = action.payload;
      return { ...state, incomeTraderNameLevelDownVisible: true, titleLevelDownTraderName: trader_name, incomeDaFetchProp: {...state.incomeDaFetchProp, trader_name: trader_name} }
    },
    showServiceDetails (state, action) {
      const {service_no} = action.payload;
      return { ...state, incomeServiceLevelDownVisible: true, titleLevelDownService: service_no, incomeDaFetchProp: {...state.incomeDaFetchProp, service_no: service_no} }
    },
  },
}