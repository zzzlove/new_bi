import { request, config } from '../../../utils'
const { api } = config
const { excel } = api

export async function saveTest (params) {
  return request({
    url: '/testRestful/save',
    method: 'post',
    data: params
  })
}
