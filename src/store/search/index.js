import { reqSearchList } from "@/api";
//search模块的小仓库
const state = {
  searchList: {}
}
const mutations = {
  SEARCHLIST(state, searchList) {
    state.searchList = searchList
  }
}
const actions = {
  async searchList({ commit }, params = {}) {//params形参
    let result = await reqSearchList(params)
    if (result.code == 200) {
      commit('SEARCHLIST', result.data)
    }
  }
}
const getters = {
  goodsList(state) {
    return state.searchList.goodsList
  },
  attrsList(state) {
    return state.searchList.attrsList
  },
  trademarkList(state) {
    return state.searchList.trademarkList
  }
}
export default {
  state,
  mutations,
  actions,
  getters
}