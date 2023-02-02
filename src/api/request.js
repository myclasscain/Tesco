// 对axios进行二次封装
import axios from 'axios'
// 导入进度条
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'

// 导入仓库
import store from '@/store'

const request = axios.create({
  baseURL: '/api',
  timeout: 5000
})

// 请求拦截器
request.interceptors.request.use(config => {
  // config 配置对象, 对象里面有一个很重要的属性, headers请求头
  // 请求头加一个字段: 和后台商量好了
  if (store.state.detail.uuid_token) {
    config.headers.userTempId = store.state.detail.uuid_token
  }
  // 有token 请求头中携带token
  if (store.state.user.token) {
    config.headers.token = store.state.user.token
  }
  nprogress.start()
  return config
})

// 响应拦截器
request.interceptors.response.use(
  res => {
    nprogress.done()
    return res.data
  },
  error => {
    return Promise.reject(new Error('Faile'))
  }
)

export default request
