import React from 'react'
import PropTypes from 'prop-types';

import { Router } from 'dva/router'

import App from './routes/app'

const cached = {}
const registerModel = (app, model) => {
  if (!cached[model.namespace]) {
    app.model(model)
    cached[model.namespace] = 1
  }
}


const Routers = function ({ history, app }) {
  const routes = [
    {
      path: '/',
      component: App,
      getIndexRoute (nextState, cb) {
        require.ensure([], require => {
          registerModel(app, require('./models/dashboard'))
          cb(null, { component: require('./routes/dashboard/') })
        }, 'dashboard')
      },
      childRoutes: [
        {
          path: 'login',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/login'))
              cb(null, require('./routes/login/'))
            }, 'login')
          },
        }, {
          path: 'user',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./routes/user/model'))
              cb(null, require('./routes/user/'))
            }, 'user')
          },
        }, {
          path: 'dashboard',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/dashboard'))
              cb(null, require('./routes/dashboard/'))
            }, 'dashboard')
          },

        }, {
          path: 'bizDA',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/bizDataAnalysis'))
              cb(null, require('./routes/bizDA/'))
            }, 'bizDA')
          },
        },  {
          path: 'bizDAAll',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/bizDataAnalysis'))
              cb(null, require('./routes/bizDAAll/'))
            }, 'bizDAAll')
          },
        },{
          path: 'bizUkDA',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/bizUkDataAnalysis'))
              cb(null, require('./routes/bizUkDA/'))
            }, 'bizUkDA')
          },
        }, {
          path: 'control_center_kh',
          getComponent (nextState, cb) {
            require.ensure([], require => {
            registerModel(app, require('./models/control_center_kh'))
            cb(null, require('./routes/control_center_kh/'))
            }, 'control_center_kh')
          },
        }, {
          path: 'control_center_kh_city',
          getComponent (nextState, cb) {
            require.ensure([], require => {
            cb(null, require('./routes/control_center_kh_city/'))
            }, 'control_center_kh_city')
          },
        }, {
          path: 'service_no_kh_details',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/service_no_kh_details'))
              cb(null, require('./routes/service_details'))
            }, 'service_no_kh_details')
          },
        }, {
          path: 'control_center_kh_daily',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/control_center_kh_daily'))
              cb(null, require('./routes/control_center_kh/daily'))
            }, 'control_center_kh_daily')
          },
        }, {
          path: 'control_center_kh_daily_data',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/control_center_kh_daily_data'))
              cb(null, require('./routes/control_center_kh/daily_data'))
            }, 'control_center_kh_daily_data')
          },
        }, {
        path: 'control_center_kh_monthly',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/control_center_kh_monthly'))
              cb(null, require('./routes/control_center_kh/monthly'))
            }, 'control_center_kh_monthly')
          },
        }, {
          path: 'control_center_kh_monthly_data',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/control_center_kh_monthly_data'))
              cb(null, require('./routes/control_center_kh/monthly_data'))
            }, 'control_center_kh_monthly_data')
          },
        }, {
        path: 'control_center_kh_weekly',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/control_center_kh_weekly'))
              cb(null, require('./routes/control_center_kh/weekly'))
            }, 'control_center_kh_weekly')
          },
        }, {
        path: 'control_center_kh_line',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/control_center_kh_line'))
              cb(null, require('./routes/control_center_kh/line'))
            }, 'control_center_kh_line')
          },
        }, {
        path: 'trader_details',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/trader_details'))
              cb(null, require('./routes/trader_details'))
            }, 'trader_details')
          },
        }, {
          path: 'client_kh',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./routes/client_kh/model'))
              cb(null, require('./routes/client_kh/'))
            }, 'client_kh')
          },
        }, {
          path: 'order_list',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./routes/order_list/model'))
              cb(null, require('./routes/order_list/'))
            }, 'order_list')
          },
        }, {
          path: 'kpiMgmt/entryManualInput',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./routes/kpiMgmt/entryManualInput/model'))
              cb(null, require('./routes/kpiMgmt/entryManualInput/'))
            }, 'entryManualInput')
          },
        }, {
          path: 'kpiMgmt/kpiSummary',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./routes/kpiMgmt/kpiSummary/model'))
              cb(null, require('./routes/kpiMgmt/kpiSummary/'))
            }, 'kpiSummary')
          },
        }, {
          path: 'bizSetting/pricing',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./routes/bizSetting/pricing/model'))
              cb(null, require('./routes/bizSetting/pricing/'))
            }, 'pricing')
          },
        }, {
          path: 'bizSetting/pricingPud',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./routes/bizSetting/pricingPud/model'))
              cb(null, require('./routes/bizSetting/pricingPud/'))
            }, 'pricingPud')
          },
        }, {
          path: '*',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              cb(null, require('./routes/error/'))
            }, 'error')
          },
        },
      ],
    },
  ]

  return <Router history={history} routes={routes} />
}

Routers.propTypes = {
  history: PropTypes.object,
  app: PropTypes.object,
}

export default Routers
