import { reqGetAddress, reqGetOrderlist } from "@/api/index";

const state = {
  address: [],
  orderlist: {}
}
const mutations = {
  SETADDRESS(state, address) {
    state.address = address
  },
  SETORDERLIST(state, orderlist) {
    state.orderlist = orderlist
  }
}
const actions = {
  // 获取用户地址信息
  async getAddress({ commit }) {
    let result = await reqGetAddress()
    if (result.code == 200) {
      commit('SETADDRESS', result.data)
    }
  },
  // 获取订单交易页信息
  async getOrderlist({ commit }) {
    let result = await reqGetOrderlist()
    if (result.code == 200) {
      commit('SETORDERLIST', result.data)
    }
  },
}
const getters = {}

export default {
  state,
  mutations,
  actions,
  getters
}