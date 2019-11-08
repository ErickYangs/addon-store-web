const state = {
  isShowNav: false
}

const mutations = {
  CHANGE_STATUS(state, payload) {
    state.isShowNav = payload
  }
}
const actions = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
