// 当前模块对API统一管理
import requests from "./request"
import mockrequest from './mockrequest'

// 三级联动接口
export const reqCategoryList = () => requests({ url: '/product/getBaseCategoryList', method: 'get', })
// 切记:当前函数执行需要把服务器返回结果返回

// 获取banner
export const reqBannerList = () => mockrequest.get('/banner')

// 获取floor
export const reqFloorList = () => mockrequest.get('/floor')

// 获取搜索模块数据
export const reqSearchList = (params) => requests({ url: '/list', method: 'POST', data: params })

// 获取产品详情信息
export const reqGoodsInfo = (skuId) => requests({ url: `/item/${skuId}`, method: 'GET' })

// 添加商品到购物车
export const reqShopCart = (skuId, skuNum) => requests({ url: `/cart/addToCart/${skuId}/${skuNum}`, method: 'POST' })

// 获取购物车列表
export const reqShopCartList = () => requests({ url: '/cart/cartList', method: 'GET' })

// 删除购物车商品
export const reqDeleteCartItem = (skuId) => requests({ url: `/cart/deleteCart/${skuId}`, method: 'DELETE' })

// 切换购物车商品选中状态
export const reqChangeChecked = (skuId, isChecked) => requests({ url: `cart/checkCart/${skuId}/${isChecked}`, method: 'GET' })

// 获取验证码
export const reqSendCode = (phone) => requests({ url: `/user/passport/sendCode/${phone}`, method: 'GET' })

// 注册用户
export const reqUserRegister = (data) => requests({ url: '/user/passport/register', data, method: 'POST' })

// 登录
export const reqUserLogin = (data) => requests({ url: '/user/passport/login', data, method: 'POST' })

// token校验获取用户登录信息
export const reqGetUserInfo = () => requests({ url: '/user/passport/auth/getUserInfo', method: 'GET' })

// 退出登陆
export const reqUserLogout = () => requests({ url: '/user/passport/logout', method: 'GET' })

// trade：获取用户地址信息
export const reqGetAddress = () => requests({ url: '/user/userAddress/auth/findUserAddressList', method: 'GET' })

// trade：获取订单交易页信息
export const reqGetOrderlist = () => requests({ url: '/order/auth/trade', method: 'GET' })

// trade：提交订单
export const reqSubmitOrder = (tradeNo, data) => requests({ url: `/order/auth/submitOrder?tradeNo=${tradeNo}`, data, method: 'POST' })

// pay：获取订单支付信息
export const reqGetPayInfo = (orderId) => requests({ url: `/payment/weixin/createNative/${orderId}`, method: 'GET' })

// pay：查询支付订单状态
export const reqGetPayStatus = (orderId) => requests({ url: `/payment/weixin/queryPayStatus/${orderId}`, method: 'GET' })

// center：获取我的订单列表
export const reqGetPresonalOrder = (page, limit) => requests({ url: `/order/auth/${page}/${limit}`, method: 'GET' })
