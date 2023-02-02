// 引入接口
import {
  reqCode,
  reqUserRegister,
  reqUserLogin,
  reqUserInfo,
  reqLogout
} from '@/api'
// 引入token处理函数
import { setToken, getToken, removeToken } from '@/utils/token'
const actions = {
  // 获取验证码
  async getCode({ commit }, phone) {
    const result = await reqCode(phone)
    if (result.code === 200) {
      commit('GETCODE', result.data)
    } else {
      return Promise.reject('Code Faile')
    }
  },
  // 注册用户
  async userRegister({ commit }, data) {
    const result = await reqUserRegister(data)
    if (result.code === 200) {
      return 'ok'
    } else {
      return Promise.reject(new Error('Register Faile'))
    }
  },
  // 用户登录
  async userLogin({ commit }, data) {
    const result = await reqUserLogin(data)
    if (result.code === 200) {
      setToken(result.data.token)
      commit('USERLOGIN', result.data.token)
      return 'ok'
    } else {
      return Promise.reject(new Error(result.message))
    }
  },
  // 获取用户信息  失败先不要直接返回失败的Promise 因为 用户刚开始打开页面时会报Promise失败的错误
  async getUserInfo({ commit }) {
    const result = await reqUserInfo()
    if (result.code === 200) {
      commit('USERINFO', result.data)
      return 'ok'
    } else {
      return Promise.reject(new Error(result.message))
    }
  },
  // 退出登录
  async userLogout({ commit }) {
    const result = await reqLogout()
    if (result.code === 200) {
      commit('CLEAR')
      return 'ok'
    } else {
      return Promise.reject(new Error(result.message))
    }
  }
}
const mutations = {
  GETCODE(state, code) {
    state.code = code
  },
  USERLOGIN(state, token) {
    state.token = token
  },
  USERINFO(state, userInfo) {
    state.userInfo = userInfo
  },
  CLEAR(state) {
    state.token = ''
    state.userInfo = {}
    removeToken()
  }
}
const getters = {}
const state = {
  code: '',
  token: getToken(),
  userInfo: {}
}

export default {
  namespaced: true,
  actions,
  mutations,
  getters,
  state
}
