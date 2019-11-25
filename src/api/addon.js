import request from './request'

export function queryAppAddonStatus(appId) {
  return request({
    url: `/api/v1/addon/${appId}`,
    method: 'GET'
  })
}

/**
 * query common add-on list api
 */
export function queryCommonAddon() {
  return request({
    url: '/api/v1/addon/common',
    method: 'get'
  })
}
/**
 * get detail by add-on id
 * @param {add-on id} id
 */
export function queryCommonAddonDetail(id) {
  return request({
    url: `/api/v1/addon/common/detail/${id}`,
    method: 'get'
  })
}

/**
 * query custom add-on of ontid
 * @param {custom ontid} ontid
 */
export function queryCustomAddon(ontid) {
  return request({
    url: `/api/v1/addon/custom/${ontid}`,
    method: 'get'
  })
}

/**
 * get custom add-on detail by add-on id
 * @param {custom add-on id} id
 */
export function queryCustomAddonDetail(id) {
  return request({
    url: `/api/v1/addon/custom/detail/${id}`,
    method: 'get'
  })
}

/**
 * create custon data
 * @param {Object} data
 */
export function createCustomAdd(data) {
  return request({
    url: '/api/v1/addon/custom',
    method: 'post',
    data
  })
}

export function updateCustomAddon(data) {
  return request({
    url: '/api/v1/addon/custom',
    method: 'put',
    data
  })
}
