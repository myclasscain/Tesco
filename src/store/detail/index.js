import { reqGoodInfo, reqaddGood } from '@/api'
// 获取生成uuid函数
import { getUUID } from '@/utils/uuid_token'
const actions = {
  // 获取产品详情信息
  async getGoodInfoById({ commit }, id) {
    const result = await reqGoodInfo(id)
    if (result.code === 200) {
      commit('GOODINFOBYID', result.data)
    }
  },
  // 添加商品到购物车  对已产品数量进行更新
  async addGoodIntoCart({ commit }, { skuId, skuNum }) {
    const result = await reqaddGood(skuId, skuNum)
    if (result.code === 200) {
      return 'ok'
    }
    return Promise.reject(new Error('Faile'))
  }
}
const mutations = {
  GOODINFOBYID(state, goodInfo) {
    state.goodInfo = goodInfo
  }
}
const getters = {
  // 路径导航简化数据
  categoryView(state) {
    return state.goodInfo.categoryView || {}
  },
  // 简化产品信息数据
  skuInfo(state) {
    return state.goodInfo.skuInfo || {}
  },
  // 简化售卖属性数据
  spuSaleAttrList(state) {
    return state.goodInfo.spuSaleAttrList || []
  }
}
const state = {
  goodInfo: {},
  uuid_token: getUUID()
}

export default {
  namespaced: true,
  actions,
  mutations,
  getters,
  state
}
