import QRCode from 'qrcode'

/**
 * Open Link Page
 * @param {string} url
 * @param {string} type
 */
export function openLink(url, type = '_blank') {
  window.open(url, type)
}

/**
 * Jump to Path
 * @param {Object} target
 * @param {Object} origin
 * @param {Function} next
 */
export function jumpTo(target, origin, next) {
  if (target.name !== origin.name) {
    return next(target)
  }
  return next()
}

export function createQRcode(params) {
  params = JSON.stringify(params)
  return QRCode.toDataURL(params)
    .then(url => {
      return url
    })
    .catch(err => {
      console.error(err)
      return ''
    })
}
