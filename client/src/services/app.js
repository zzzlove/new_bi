import { request, config } from '../utils'
const { api } = config
const { userInfo, userLogout } = api

export async function login (params) {
  return request({
    url: userLogin,
    method: 'post',
    data: params,
  })
}

export async function logout (params) {
  return request({
    url: userLogout,
    method: 'post',
    data: params,
  })
}

export async function getUserInfo (params) {
  return request({
    url: userInfo,
    method: 'get',
    data: params,
  })
}
