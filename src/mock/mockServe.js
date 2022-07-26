//引入mockjs模块
import Mock from 'mockjs'
//引入JSON数据格式[JSON数据格式没有对外暴露，但是可以引用：webpage默认对外暴露图片、JSON数据格式]
import banner from './banner.json'
import floor from './floor.json'

//mock数据参数:(请求地址，请求数据)
Mock.mock('/mock/banner', { code: 200, data: banner })
Mock.mock('/mock/floor', { code: 200, data: floor })