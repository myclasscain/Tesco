import {
  reqShopCartList,
  reqToggleCheckedById,
  reqDeleteGoodFromCart
} from '@/api'
const actions = {
  // 获取购物车列表
  async getShopCartList({ commit }) {
    const result = await reqShopCartList()
    if (result.code === 200) {
      commit('SHOPCARTLIST', result.data)
    }
  },
  // 切换换商品选中状态
  async toggleCheckedById({ commit }, { skuId, isChecked }) {
    const result = await reqToggleCheckedById(skuId, isChecked)
    if (result.code === 200) {
      return 'ok'
    } else {
      return Promise.reject(new Error('TFaile'))
    }
  },
  // 删除选中商品
  async deleteGoodById({ commit }, skuId) {
    const result = await reqDeleteGoodFromCart(skuId)
    if (result.code === 200) {
      return 'ok'
    } else {
      return Promise.reject(new Error('DFaile'))
    }
  },
  // 删除所有选中商品
  deleteAllGoodsIsChecked(context, goodInfoList) {
    const promiseArr = []
    goodInfoList.forEach(item => {
      const promise = context.dispatch('deleteGoodById', item.skuId)
      promiseArr.push(promise)
    })

    return Promise.all(promiseArr)
  },
  // 切换所有商品状态
  toggleAllGoodsState(context, { goodInfoList, newState }) {
    const promiseArr = []
    goodInfoList.forEach(item => {
      let promise = context.dispatch('toggleCheckedById', {
        skuId: item.skuId,
        isChecked: newState
      })
      promiseArr.push(promise)
    })

    return Promise.all(promiseArr)
  }
}
const mutations = {
  SHOPCARTLIST(state, cartList) {
    // 服务器返回的数据有问题 不是我们真正想要的那个
    state.cartList = cartList
  }
}
const getters = {
  // 计算出真正想要的购物车列表数据
  cartList(state) {
    return state.cartList[0] || {}
  }
}
const state = {
  cartList: []
}

export default {
  namespaced: true,
  actions,
  mutations,
  getters,
  state
}
