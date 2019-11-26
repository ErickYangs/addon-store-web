import request from './request'

/**
 * Register app api
 * @param {Object} data 
 */
export function registerApp(data) {
  return request({
    url: '/api/v1/app',
    method: 'post',
    data
  })
}

/**
 * Query application list api
 * @param {String} id 
 */
export function queryAppList(id) {
  return request({
    url: '/api/v1/app/list/' + id,
    method: 'get'
  })
}

/**
 * Query application detail api
 * @param {Srting} id 
 */
export function queryAppDetail(id) {
  return request({
    url: '/api/v1/app/' + id,
    method: 'get'
  })
}

/**
 * Edit application api
 * @param {Object} data 
 */
export function editApp(data) {
  return request({
    url: '/api/v1/app',
    method: 'put',
    data
  })
}

/**
 * Query add-on list api
 * @param {String} id 
 */
export function queryAddonList(id) {
  return request({
    url: '/api/v1/app/addon/' + id,
    method: 'get'
  })
}

/**
 * Eelete add-on api
 * @param {String} appId 
 * @param {String} addonId 
 */
export function deleteAddon(appId, addonId) {
  return request({
    url: `/api/v1/addon/${appId}/${addonId}`,
    method: 'delete'
  })
}
