import { reqGoodsInfo, reqShopCart } from "@/api/index";
import { getUUID } from "@/utils/uuid_token";

const state = {
  goodsInfo: {},
  // 游客临时身份
  uuid_token: getUUID()
}

const mutations = {
  GETGOODSINFO(state, i) {
    state.goodsInfo = i
  }
}

const actions = {
  async getGoodsInfo({ commit }, skuId) {
    let result = await reqGoodsInfo(skuId)
    if (result.code == 200) {
      commit('GETGOODSINFO', result.data)
    }
  },
  async addToShopcart({ commit }, { skuId, skuNum }) {
    let result = await reqShopCart(skuId, skuNum)
    if (result.code == 200) {
      return "添加成功"
    } else {
      //添加失败
      return Promise.reject(new Error('添加失败'))
    }
  }
}
const getters = {
  //简化导航category数据
  categoryView(state) {
    return state.goodsInfo.categoryView || {}
  },
  //简化产品信息数据(名称、价格等)
  skuInfo(state) {
    return state.goodsInfo.skuInfo || {}
  },
  //简化产品售卖属性数据(颜色、内存等)
  spuSaleAttrList(state) {
    return state.goodsInfo.spuSaleAttrList || []
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}