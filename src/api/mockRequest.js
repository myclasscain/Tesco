// 对axios进行二次封装
import axios from 'axios'
// 导入进度条
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'

const mockRequest = axios.create({
  baseURL: '/mock',
  timeout: 5000
})

// 请求拦截器
mockRequest.interceptors.request.use(config => {
  nprogress.start()
  return config
})

// 响应拦截器
mockRequest.interceptors.response.use(
  res => {
    nprogress.done()
    return res.data
  },
  error => {
    return Promise.reject(new Error('Faile'))
  }
)

export default mockRequest
