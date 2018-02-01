import { request, config } from '../utils'
const { api } = config
const { userList, userAdd, userRemove, userUpdate } = api

export async function query (params) {
  return request({
    url: userList,
    method: 'get',
    data: params,
  })
}

export async function create (params) {
  return request({
    url: userAdd,
    method: 'post',
    data: params,
  })
}

export async function remove (params) {
  return request({
    url: userRemove,
    method: 'post',
    data: params,
  })
}

export async function update (params) {
  return request({
    url: userUpdate,
    method: 'post',
    data: params,
  })
}
