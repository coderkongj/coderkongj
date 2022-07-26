//当前模块对API统一管理
import requests from "./request"
import mockrequest from './mockrequest'

//三级联动接口
export const reqCategoryList = () => requests({ url: '/product/getBaseCategoryList', method: 'get', })
//切记:当前函数执行需要把服务器返回结果返回

//获取banner
export const reqBannerList = () => mockrequest.get('/banner')

//获取floor
export const reqFloorList = () => mockrequest.get('/floor')

//获取搜索模块数据
export const reqSearchList = (params) => requests({ url: '/list', method: 'POST', data: params })
