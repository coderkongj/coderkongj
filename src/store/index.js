import Vue from 'vue'
import Vuex from 'vuex'
//需使用插件
Vue.use(Vuex)

//state：仓库存储数据的地方
// const state = {}
//mutations：修改state的唯一手段
// const mutations = {}
//action：处理action，可以书写自己的业务逻辑，但也可以处理异步
// const actions = {}
//getters：理解为计算属性，用于简化仓库数据，让组件获取仓库数据更加方便
// const getters = {}

//对外暴露
// export default new Vuex.Store({
//   state,
//   mutations,
//   actions,
//   getters
// })

//vuex模块式开发，建小仓库
//引入小仓库
import search from './search/index'
import home from './home'

//对外暴露Store类的一个实例
export default new Vuex.Store({
  //实现vuex仓库模块式开发存储数据
  modules: {
    home,
    search
  }
})

