import { reqCategoryList, reqBannerList, reqFloorList } from "@/api/index"
//home模块的小仓库

const state = {
  //state中的数据默认初始值根据接口返回值初始化，对象、数组等
  categoryList: [],
  bannerList: [],
  floorList: []
}

const mutations = {
  CATEGORYLIST(state, categoryList) {
    state.categoryList = categoryList
  },
  BANNERLIST(state, bannerList) {
    state.bannerList = bannerList
  },
  FLOORLIST(state, floorList) {
    state.floorList = floorList
  }
}

const actions = {
  //获取商品分类数据:通过api里面的接口调用函数，像服务器发请求获取数据
  async categoryList({ commit }) { //！解构commit:{commit}
    let result = await reqCategoryList()
    // console.log(result)
    if (result.code == 200) {
      commit('CATEGORYLIST', result.data)
    }
  },
  //获取轮播图数据
  async bannerList({ commit }) {
    let result = await reqBannerList()
    if (result.code == 200) {
      commit('BANNERLIST', result.data)
    }
  },
  //获取floor数据
  async floorList({ commit }) {
    let result = await reqFloorList()
    if (result.code == 200) {
      commit('FLOORLIST', result.data)
    }
  }
}

//计算属性
const getters = {}

export default {
  state,
  mutations,
  actions,
  getters
}