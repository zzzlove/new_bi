import './index.html'
import 'babel-polyfill'

import ReactDOM from 'react-dom'

import dva from 'dva'
import createLoading from 'dva-loading'
import { browserHistory } from 'dva/router'

import { ApolloClient, ApolloProvider, createNetworkInterface } from 'react-apollo'
import { SubscriptionClient, addGraphQLSubscriptions } from 'subscriptions-transport-ws'

import moment from 'moment'
import 'moment/locale/zh-cn'

import { Global, Theme } from 'g2';
Global.setTheme('cheery');

import { baseURL, gqlSubscriptionURL, gqlSubscription, gqlSubscriptionAuthToken, gqlPrefix } from './utils/config'

const networkInterface = createNetworkInterface({
  uri: baseURL + gqlPrefix,
  opts: {
    credentials: 'include',
  },
})

const wsClient = gqlSubscription ? new SubscriptionClient(gqlSubscriptionURL, {
  reconnect: true,
  connectionParams: {
    authToken: gqlSubscriptionAuthToken,
  },
}) : null

const networkInterfaceWithSubscriptions = gqlSubscription ? addGraphQLSubscriptions(
  networkInterface,
  wsClient
) : null

const client = new ApolloClient({
  networkInterface: gqlSubscription ? networkInterfaceWithSubscriptions : networkInterface,
})

const app = dva({
  ...createLoading(),
  history: browserHistory,
  onError (error) {
    console.error('app onError -- ', error)
  },
})

const gqlReducer = (state, action) => {
  if (!state) {
    return {}
  }
  if (action.type == 'subscriptionAuth' && !state.done) {
    setTimeout(() => {
      var gqlAuthToken = action.payload
      wsClient.subscribe({
        query: `
          subscription {
            subscriptionAuth(token: "${gqlAuthToken}")
          }
        `,
      }, (err, result) => {
      })
    }, 0)
    return { ...state, done: true }
  }
  if (action.type == 'resetGqlStore') {
    setTimeout(() => {
      client.resetStore()
    }, 0)
  }
  return state
}

app.use({
  extraReducers: {
    apollo: client.reducer(),
    gql: gqlReducer,

  }
})

app.use({
  onAction: client.middleware()
})

app.model(require('./models/app'))

app.router(require('./router'))

//定义日期格式化函数
Date.prototype.Format = function (fmt) { //author: meizz
  var o = {
    "M+": this.getMonth() + 1, //月份
    "d+": this.getDate(), //日
    "h+": this.getHours(), //小时
    "m+": this.getMinutes(), //分
    "s+": this.getSeconds(), //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    "S": this.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
};

function getProvider(store, app, router) {
  return extraProps => (
    <ApolloProvider store={store} client={client}>
      { router({ app, history: app._history, ...extraProps }) }
    </ApolloProvider>
  )
}

app.start()

var container = document.querySelector('#root')
ReactDOM.render(React.createElement(getProvider(app._store, app, app._router)), container)
