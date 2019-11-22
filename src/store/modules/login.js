import * as Store from '@/utils/auth'

console.log(Store)

const state = {
  code: 'code',
  account: {
    ontid: '',
    username: '',
    token: ''
  }
}

const mutations = {
  SET_ACCOUNT(state, payload) {
    state.account = payload
  }
}
const actions = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
