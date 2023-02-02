import request from './request'
import mockRequest from './mockRequest'

//  获取首页商品分类列表api
export function getCategoryList() {
  return request.get('/product/getBaseCategoryList')
}

// 获取首页轮播图api
export function getBannerList() {
  return mockRequest.get('/banner')
}

// 获取floor轮播图api
export function getFloorList() {
  return mockRequest.get('/floor')
}

// 获取search(搜索模块数据)  给服务器传递参数 至少是一个空对象
export function getSearchInfo(params) {
  return request({
    method: 'POST',
    url: '/list',
    data: params
  })
}

// 获取产品信息详情
export function reqGoodInfo(id) {
  return request({
    method: 'get',
    url: `/item/${id}`
  })
}

// 添加到购物车  对已有产品数量进行更新
export function reqaddGood(skuId, skuNum) {
  return request({
    method: 'post',
    url: `cart/addToCart/${skuId}/${skuNum}`
  })
}

// 获取购物车列表
export function reqShopCartList() {
  return request({
    method: 'get',
    url: '/cart/cartList'
  })
}

// 切换购物车选中商品状态
export function reqToggleCheckedById(skuId, isChecked) {
  return request({
    method: 'get',
    url: `/cart/checkCart/${skuId}/${isChecked}`
  })
}

// 删除选中商品
export function reqDeleteGoodFromCart(skuId) {
  return request({
    method: 'delete',
    url: `/cart/deleteCart/${skuId}`
  })
}

// 获取验证码
export function reqCode(phone) {
  return request({
    method: 'get',
    url: `/user/passport/sendCode/${phone}`
  })
}

// 注册用户
export function reqUserRegister(data) {
  return request({
    method: 'post',
    url: '/user/passport/register',
    data
  })
}

// 用户登录
export function reqUserLogin(data) {
  return request({
    method: 'post',
    url: '/user/passport/login',
    data
  })
}

// 退出登录
export function reqLogout() {
  return request({
    method: 'get',
    url: '/user/passport/logout'
  })
}

// 获取用户信息
export function reqUserInfo() {
  return request({
    method: 'get',
    url: '/user/passport/auth/getUserInfo'
  })
}

// 获取用户地址信息
export function reqUserAddress() {
  return request({
    method: 'get',
    url: '/user/userAddress/auth/findUserAddressList '
  })
}

// 获取交易商品信息
export function reqTradeInfo() {
  return request({
    method: 'get',
    url: '/order/auth/trade'
  })
}

// 提交订单信息
export function reqSubmitOrder(tradeNo, data) {
  return request({
    method: 'post',
    url: `/order/auth/submitOrder?tradeNo=${tradeNo}`,
    data
  })
}

// 获取订单支付信息
export function reqOrderInfo(orderId) {
  return request({
    method: 'get',
    url: `/payment/weixin/createNative/${orderId}`
  })
}

// 获取订单支付状态
export function reqOrderStatus(orderId) {
  return request({
    method: 'get',
    url: `/payment/weixin/queryPayStatus/${orderId}`
  })
}

// 获取订单列表
export function reqOrderList(page, limit) {
  return request({
    method: 'get',
    url: `/order/auth/${page}/${limit}`
  })
}
