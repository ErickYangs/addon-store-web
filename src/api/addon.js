import request from './request'

/**
 * query common add-on list api
 */
export function queryCommonAddon() {
  return request({
    url: '/api/v1/app/addon/common',
    method: 'get'
  })
}

/**
 * query custom add-on of ontid
 * @param {custom ontid} ontid
 */
export function queryCustomAddon(ontid) {
  return request({
    url: `/api/v1/app/addon/custom/${ontid}`,
    method: 'get'
  })
}
