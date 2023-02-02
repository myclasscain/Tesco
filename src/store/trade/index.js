import { reqUserAddress, reqTradeInfo } from '@/api'
const actions = {
  // 获取用户地址
  async getUserAddress({ commit }) {
    const result = await reqUserAddress()
    if (result.code === 200) {
      commit('USERADDRESS', result.data)
    }
  },
  // 获取订单信息
  async getOrderInfo({ commit }) {
    const result = await reqTradeInfo()
    if (result.code === 200) {
      commit('ORDERINFO', result.data)
    }
  }
}
const mutations = {
  USERADDRESS(state, addressInfo) {
    state.addressInfo = addressInfo
  },
  ORDERINFO(state, orderInfo) {
    state.orderInfo = orderInfo
  }
}
const getters = {}
const state = {
  addressInfo: [],
  orderInfo: {}
}
export default {
  namespaced: true,
  actions,
  mutations,
  getters,
  state
}
