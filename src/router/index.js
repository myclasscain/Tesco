// 配置路由文件
import Vue from 'vue'

import VueRouter from 'vue-router'

// 导入仓库
import store from '@/store'

// 导入路由规则
import routes from './routes'

Vue.use(VueRouter)

// 重写push replace
let originPush = VueRouter.prototype.push
let originReplace = VueRouter.prototype.replace

VueRouter.prototype.push = function (location, resolve, reject) {
  if (resolve && reject) {
    originPush.call(this, location, resolve, reject)
  } else {
    originPush.call(
      this,
      location,
      () => {},
      () => {}
    )
  }
}

VueRouter.prototype.replace = function (location, resolve, reject) {
  if (resolve && reject) {
    originReplace.call(this, location, resolve, reject)
  } else {
    originReplace.call(
      this,
      location,
      () => {},
      () => {}
    )
  }
}

const router = new VueRouter({
  // 配置路由
  routes,
  // 滚动行为
  scrollBehavior(to, from, savedPosition) {
    return { y: 0 }
  }
})

router.beforeEach(async (to, from, next) => {
  let token = store.state.user.token
  let name = store.state.user.userInfo.name
  if (token) {
    // 有token 用户将登录了
    if (to.path === '/login' || to.path === '/register') {
      // 登录了 访问 login 或 register 页面 --- 不允许
      next('/')
    } else {
      // 访问的是除了 login 或 register 的其他页面
      if (name) {
        // 有 用户信息
        next()
      } else {
        try {
          // 没有用户信息
          await store.dispatch('user/getUserInfo')
          next()
        } catch (error) {
          // 这种情况是 token过期了
          // 要清除 token 跳转到登录界面
          store.dispatch('user/userLogout')
          next('/login')
        }
      }
    }
  } else {
    // 没有token 用户未登录
    // 用户为登录访问trade | pay paysuccess | center页面  不允许
    if (
      to.path.indexOf('/trade') !== -1 ||
      to.path.indexOf('/pay') !== -1 ||
      to.path.indexOf('/center') !== -1
    ) {
      let toPath = to.path
      next(`/login?redirect=${toPath}`)
    } else {
      next()
    }
  }
})

export default router
