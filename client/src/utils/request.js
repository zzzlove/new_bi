import axios from 'axios'
import qs from 'qs'
import { baseURL, apiPrefix } from './config'
import lodash from 'lodash'

axios.defaults.baseURL = baseURL + apiPrefix

const fetch = (options) => {
  let {
    method = 'get',
    data,
    url,
  } = options

  switch (method.toLowerCase()) {
    case 'get':
      return axios.get(`${url}${!lodash.isEmpty(data) ? `?${qs.stringify(data)}` : ''}`, { withCredentials : true })
    case 'delete':
      return axios.delete(url, { data })
    case 'head':
      return axios.head(url, data)
    case 'post':
      return axios.post(url, data, { withCredentials : true })
    case 'put':
      return axios.put(url, data)
    case 'patch':
      return axios.patch(url, data)
    default:
      return axios(options)
  }
}

export default function request (options) {
  return fetch(options).then((response) => {
    const { statusText, status } = response
    let data = response.data
    return {
      success: true,
      message: statusText,
      status,
      ...data,
    }
  }).catch((error) => {
    const { response } = error
    let message
    let status
    if (response) {
      status = response.status
      const { data, statusText } = response
      message = data.message || statusText
    } else {
      status = 600
      message = 'Network Error'
    }
    return { success: false, status, message }
  })
}
