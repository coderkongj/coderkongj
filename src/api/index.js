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