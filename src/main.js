import Vue from 'vue'
import App from './App.vue'

// 导入路由
import router from '@/router/index.js'
// 导入全局组件
import TypeNav from '@/components/TypeNav'
import Carousel from '@/components/Carousel'
import Pagination from '@/components/Pagination/Pagination.vue'

// 按需引入ElementUI
import { MessageBox } from 'element-ui'
// 导入仓库
import store from '@/store'

// 导入所有接口
import * as API from '@/api'
Vue.prototype.$API = API

// 应用组件
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert

// 使用mock
import '@/mock/mockServer.js'
// 导入swiper样式
import 'swiper/css/swiper.min.css'

// 注册全局组件
Vue.component('TypeNav', TypeNav)
Vue.component(Carousel.name, Carousel)
Vue.component(Pagination.name, Pagination)

// 导入并使用懒加载模块
import VueLazyload from 'vue-lazyload'
// 导入的图片不可以使用路径
import defaultImg from '@/assets/images/2be049a8a4285756d9ebdae566ea5cf1.jpeg'
Vue.use(VueLazyload, {
  loading: defaultImg
})

// 使用插件
import '@/plugins/validate'
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store,
  // 配置全局事件总线
  beforeCreate() {
    Vue.prototype.$bus = this
  }
}).$mount('#app')
