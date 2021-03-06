import request from './request'

/**
 * Check the registered scan result
 * @param {String} id 
 */
export function checkRegister(id) {
  return request({
    url: '/api/v1/account/register/result/' + id,
    method: 'get'
  })
}

/**
 * Get registered QR code parameters
 * @param {Object} data 
 */
export function postRegister(data) {
  return request({
    url: '/api/v1/account/register',
    method: 'post',
    data
  })
}

// Get the QR code parameter of the login
export function getSignMsg() {
  return request({
    url: '/api/v1/account/login',
    method: 'post'
  })
}

/**
 * Check the scan result of the login
 * @param {String} id 
 */
export function checkSign(id) {
  return request({
    url: '/api/v1/account/login/result/' + id,
    method: 'get'
  })
}
