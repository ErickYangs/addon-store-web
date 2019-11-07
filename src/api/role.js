import request from './request'

export function CheckToken(data) {
  return request({
    url: '/api/v1/addon/token',
    method: 'post',
    data
  })
}
