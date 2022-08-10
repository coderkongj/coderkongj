// 配置路由的地方
import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
// 使用插件
Vue.use(VueRouter)

import routes from './routes'
// 配置路由
let router = new VueRouter({
  // kv一致，省略v
  routes,
  scrollBehavior(to, from, savedPosition) {
    // 始终滚动到顶部
    return { y: 0 }
  }
})
// 全局前置守卫
router.beforeEach(async (to, from, next) => {
  let token = store.state.user.token
  let nickname = store.state.user.nickname

  // 用户已经登陆
  if (token) {
    // 登陆了，去login
    if (to.path == '/login') {
      next('/home')
    } else {
      // 登陆了，去其他页面
      if (nickname) {
        // 有用户信息
        next()
      } else {
        // 没有用户信息
        try {
          // 发请求获取用户信息
          await store.dispatch('getUserInfo')
          next()
        } catch (error) {
          // 获取不到用户信息：token失效，重新登录
          await store.dispatch('userLogout')
          next('/login')
        }
      }
    }
  } else {
    // 未登录
    const toPath = ['/trade', '/center', '/center/personalorder']
    // toPath.includes(to.path) ? next('/login?redirect' + to.path) : next()
    if (toPath.includes(to.path)) {
      console.log(555);
      next('/login?redirect=' + to.path)
      console.log(666);
    } else { next() }
  }
})
export default router
