const state = {
  currentStep: 0
}

const mutations = {
  CHANGE_STEP_ADD(state, payload) {
    state.currentStep++
  },
  RESERT_STEP(state, payload) {
    state.currentStep = 0
  }
}
const actions = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
