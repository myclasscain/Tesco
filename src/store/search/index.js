import { getSearchInfo } from '@/api'
const actions = {
  // 获取search模块数据
  async reqSearchInfo({ commit }, params = {}) {
    const result = await getSearchInfo(params)
    if (result.code === 200) {
      commit('SEARCHINFO', result.data)
    }
  }
}
const mutations = {
  // 存储search搜索数据
  SEARCHINFO(state, searchInfo) {
    state.searchInfo = searchInfo
  }
}
const getters = {
  // 简化数据
  attrsList(state) {
    return state.searchInfo.attrsList || []
  },
  goodsList(state) {
    return state.searchInfo.goodsList || []
  },
  trademarkList(state) {
    return state.searchInfo.trademarkList || []
  }
}
const state = {
  // search搜索数据
  searchInfo: {}
}

export default {
  namespaced: true,
  actions,
  mutations,
  getters,
  state
}
