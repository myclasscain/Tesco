import { getCategoryList, getBannerList, getFloorList } from '@/api'

const actions = {
  // 请求三级分类列表数据
  async categoryList({ commit }) {
    const result = await getCategoryList()
    if (result.code === 200) {
      commit('CATEGORYLIST', result.data)
    }
  },
  // 获取首页轮播图数据
  async reqBannerList({ commit }) {
    const result = await getBannerList()
    if (result.code === 200) {
      commit('BANNERLIST', result.data)
    }
  },
  // 获取floor轮播图数据
  async reqFloorList({ commit }) {
    const result = await getFloorList()
    if (result.code === 200) {
      commit('FLOORLIST', result.data)
    }
  }
}
const mutations = {
  // 存储三级列表数据
  CATEGORYLIST(state, categoryList) {
    state.categoryList = categoryList
  },
  // 存储首页轮播图数据
  BANNERLIST(state, bannerList) {
    state.bannerList = bannerList
  },
  // 存储floor轮播图数据
  FLOORLIST(state, floorList) {
    state.floorList = floorList
  }
}
const getters = {}
const state = {
  categoryList: [],
  bannerList: [],
  floorList: []
}

export default {
  namespaced: true,
  actions,
  mutations,
  getters,
  state
}
