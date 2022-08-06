import { reqShopCartList, reqDeleteCartItem, reqChangeChecked } from '@/api/index'

const state = {
  ShopCartList: []
}

const mutations = {
  GETSHOPCARTLIST(state, i) {
    state.ShopCartList = i
  }
}

const actions = {
  // 获取购物车商品列表
  async getShopCartList({ commit }) {
    let result = await reqShopCartList()
    if (result.code == 200) {
      commit('GETSHOPCARTLIST', result.data)
    }
  },
  // 删除购物车商品
  async deleteCartItem({ commit }, skuId) {
    let result = await reqDeleteCartItem(skuId)
    if (result.code == 200) {
      return "删除成功"
    } else {
      return Promise.reject(new Error('删除失败'))
    }
  },
  // 切换购物车商品选中状态
  async changeChecked({ commit }, { skuId, isChecked }) {
    let result = await reqChangeChecked(skuId, isChecked)
    if (result.code == 200) {
      return "OK"
    } else {
      return Promise.reject(new Error('修改失败'))
    }
  },
  // 删除选中的购物车商品
  deleteSelected({ dispatch, getters }) {
    let PromiseAll = []
    getters.ShopCartList.cartInfoList.forEach(element => {
      // 返回的结果result本身是一个Promise
      let result = element.isChecked == 1 ? dispatch('deleteCartItem', element.skuId) : ''
      PromiseAll.push(result)
    });
    return Promise.all(PromiseAll)
  },
  // 切换全选状态
  changeAllChecked({ state, dispatch }, isChecked) {
    let PromiseAll = []
    state.ShopCartList[0].cartInfoList.forEach(element => {
      let promise = dispatch('changeChecked', { skuId: element.skuId, isChecked: isChecked })
      PromiseAll.push(promise)
    });
    return Promise.all(PromiseAll)
  }
}

const getters = {
  ShopCartList(state) {
    return state.ShopCartList[0] || {}
  },
}

export default {
  state,
  mutations,
  actions,
  getters
}