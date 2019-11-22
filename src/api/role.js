import request from './request'

export function CheckToken(data) {
  return request({
    url: '/api/v1/account/token',
    method: 'post',
    data
  })
}
