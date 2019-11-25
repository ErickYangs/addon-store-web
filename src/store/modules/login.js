import * as Store from '@/utils/auth'
import { queryCommonAddon, queryCustomAddon } from '@/api/addon'

// console.log(Store)

const state = {
  code: 'code',
  account: {
    ontid: '',
    username: '',
    token: ''
  },
  commonAddon: [],
  customAddon: []
}

const mutations = {
  SET_ACCOUNT(state, payload) {
    state.account = payload
  },
  SET_COMMON_ADDON(state, payload) {
    state.commonAddon = [...payload]
  },
  SET_CUSTOM_ADDON(state, payload) {
    state.customAddon = [...payload]
  }
}
const actions = {
  async getCommonAddon({ commit, dispatch }) {
    try {
      let result = await queryCommonAddon()
      let data = result.desc !== 'SUCCESS' ? [] : result.result
      commit('SET_COMMON_ADDON', data)
    } catch (error) {
      throw error
    }
  },
  async getCustomAddon({ commit, dispatch, state }) {
    try {
      let result = await queryCustomAddon(state.account.ontid)
      let data = result.desc !== 'SUCCESS' ? [] : result.result
      commit('SET_CUSTOM_ADDON', data)
    } catch (error) {
      throw error
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
