import { request, config } from '../utils'
const { api } = config
const { excel } = api

export async function excelImport (params) {
  return request({
    url: excel+'/import',
    method: 'post',
    data: params,
  })
}

