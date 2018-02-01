import { getUserInfo, logout } from '../services/app'
import { update as updateUser } from '../services/users'

import { routerRedux } from 'dva/router'
import { parse } from 'qs'

import { message } from 'antd'

import { config } from '../utils'
const { prefix, gqlSubscription } = config

const delay = timeout => new Promise(resolve => setTimeout(resolve, timeout))

export default {
  namespace: 'app',
  state: {
    user: {},
    bizDA: {id: 1},
    changePasswordModalVisible: false,
    changeCenterModalVisible: false,
    loginButtonLoading: false,
    menuPopoverVisible: false,
    siderFold: localStorage.getItem(`${prefix}.siderFold`) === 'true',
    darkTheme: localStorage.getItem(`${prefix}.darkTheme`) === 'true',
    isNavbar: document.body.clientWidth < 769,
    navOpenKeys: [],
  },
  subscriptions: {
    setup ({ dispatch }) {
      dispatch({ type: 'queryUser' })
      window.onresize = () => {
        dispatch({ type: 'changeNavbar' })
      }
    },
  },
  effects: {
    *checkSession ({
      payload,
    }, { call, put }) {
      const data = yield call(getUserInfo)
      if (data.success && data.user) {
        yield call(delay, 60*6000)
        yield put({ type: 'checkSession' })
      } else {
        if (location.pathname !== '/login') {
          let from = location.pathname
          if (location.pathname === '/dashboard') {
            from = '/dashboard'
          }
          yield put(routerRedux.push(`/login?from=${from}`))
        }
      }
    },
    *queryUser ({
      payload,
    }, { call, put }) {
      const data = yield call(getUserInfo, parse(payload))
    if (data.success && data.user) {
        yield put({
          type: 'queryUserSuccess',
          payload: data.user,
        })
        if (gqlSubscription) {
          yield put({
            type: 'subscriptionAuth',
            payload: data.user.gqlSubscriptionAuthToken,
          })
        }
        if (location.pathname === '/login') {
          yield put(routerRedux.push('/dashboard'))
        }
        yield call(delay, 5000)
        yield put({ type: 'checkSession' })
      } else {
        if (location.pathname !== '/login') {
          let from = location.pathname
          if (location.pathname === '/dashboard') {
            from = '/dashboard'
          }
          window.location = `${location.origin}/login?from=${from}`
        }
      }
    },
    *logout ({
      payload,
    }, { call, put }) {
      yield call(logout, parse(payload))
      yield put({ type: 'resetGqlStore' })
      yield put({ type: 'logoutSuccess' })
      yield put(routerRedux.push('/login'))
    },
    *changePassword ({
      payload,
    }, { call, put }) {
      yield put({ type: 'hideChangePasswordModal' })
      const data = yield call(updateUser, payload)
      if (data.success) {
        message.success('更改密码已成功')
      } else {
        message.error('更改密码失败！')
      }
    },
    *switchSider ({
      payload,
    }, { put }) {
      yield put({
        type: 'handleSwitchSider',
      })
    },
    *changeTheme ({
      payload,
    }, { put }) {
      yield put({
        type: 'handleChangeTheme',
      })
    },
    *changeNavbar ({
      payload,
    }, { put }) {
      if (document.body.clientWidth < 769) {
        yield put({ type: 'showNavbar' })
      } else {
        yield put({ type: 'hideNavbar' })
      }
    },
    *switchMenuPopver ({
      payload,
    }, { put }) {
      yield put({
        type: 'handleSwitchMenuPopver',
      })
    },
  },
  reducers: {
    queryUserSuccess (state, { payload: user }) {
      return {
        ...state,
        user,
      }
    },
    logoutSuccess (state) {
      var newState = {
        ...state,
      }
      delete newState.user
      return newState
    },
    showChangePasswordModal (state) {
      return { ...state, changePasswordModalVisible: true }
    },
    hideChangePasswordModal (state) {
      return { ...state, changePasswordModalVisible: false }
    },
    showChangeCenterModal (state) {
      return { ...state, changeCenterModalVisible: true }
    },
    hideChangeCenterModal (state) {
      return { ...state, changeCenterModalVisible: false }
    },
    showLoginButtonLoading (state) {
      return {
        ...state,
        loginButtonLoading: true,
      }
    },
    handleSwitchSider (state) {
      localStorage.setItem(`${prefix}.siderFold`, !state.siderFold)
      return {
        ...state,
        siderFold: !state.siderFold,
      }
    },
    handleChangeTheme (state) {
      localStorage.setItem(`${prefix}.darkTheme`, !state.darkTheme)
      return {
        ...state,
        darkTheme: !state.darkTheme,
      }
    },
    showNavbar (state) {
      return {
        ...state,
        isNavbar: true,
      }
    },
    hideNavbar (state) {
      return {
        ...state,
        isNavbar: false,
      }
    },
    handleSwitchMenuPopver (state) {
      return {
        ...state,
        menuPopoverVisible: !state.menuPopoverVisible,
      }
    },
    handleNavOpenKeys (state, { payload: navOpenKeys }) {
      console.log(navOpenKeys)
      return {
        ...state,
        ...navOpenKeys,
      }
    },
    setUserDetails (state, action) {
      return {
        ...state,
        user: {...state.user, ...action.payload }
      }
    },
  },
}
