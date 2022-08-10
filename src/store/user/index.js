import { reqSendCode, reqUserRegister, reqUserLogin, reqGetUserInfo, reqUserLogout } from "@/api/index";
import { setToken, getToken, removeToken } from "@/utils/token";

const state = {
  code: '',
  token: getToken(),
  nickname: ''
}
const mutations = {
  GETCODE(state, i) {
    state.code = i
  },
  USERLOGIN(state, ii) {
    state.token = ii
  },
  USERINFO(state, nickname) {
    state.nickname = nickname
  },
  CLEARUSERINFO(state) {
    state.token = ''
    state.nickname = ''
    removeToken()
  }
}
const actions = {
  // 获取验证码
  async GetCode({ commit }, phone) {
    let result = await reqSendCode(phone)
    if (result.code == 200) {
      commit('GETCODE', result.data)
      return 'OK'
    } else {
      return Promise.reject(new Error('获取验证码失败'))
    }
  },
  // 注册用户
  async userRegister({ commit }, data) {
    let result = await reqUserRegister(data)
    if (result.code == 200) {
      return 'OK'
    } else {
      return Promise.reject(new Error('注册失败'))
    }
  },
  // 登录业务（token）
  async userLogin({ commit }, data) {
    let result = await reqUserLogin(data)
    if (result.code == 200) {
      commit('USERLOGIN', result.data.token)
      setToken(result.data.token)
    }
  },
  // token校验获取用户登录信息
  async getUserInfo({ commit }) {
    let result = await reqGetUserInfo()
    if (result.code == 200) {
      commit('USERINFO', result.data.nickName)
      return 'OK'
    } else {
      return Promise.reject(new Error('获取用户信息失败'))
    }
  },
  // 退出登陆
  async userLogout({ commit }) {
    let result = await reqUserLogout()
    if (result.code == 200) {
      commit('CLEARUSERINFO',)
      return 'OK'
    } else {
      return Promise.reject(new Error('退出失败'))
    }
  }
}
const getters = {}

export default {
  state,
  mutations,
  actions,
  getters
}