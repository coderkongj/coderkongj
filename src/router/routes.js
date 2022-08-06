//引入路由组件
import Home from '@/pages/Home/index.vue'
import Login from '@/pages/Login/index.vue'
import Register from '@/pages/Register/index.vue'
import Search from '@/pages/Search/index.vue'
import Detail from '@/pages/Detail/index.vue'
import AddCartSuccess from '@/pages/AddCartSuccess/index.vue'
import ShopCart from '@/pages/ShopCart/index.vue'

// 路由配置信息
export default [{
  //重定向
  path: '*',
  redirect: '/home'
},
{
  path: '/home',
  component: Home,
  meta: { showFooter: true }
},
{
  path: '/login',
  component: Login,
  meta: { showFooter: false }
}, {
  path: '/search/:keyword?',
  component: Search,
  meta: { showFooter: true },
  name: 'search'
}, {
  path: '/register',
  component: Register,
  meta: { showFooter: false }
}, {
  path: '/detail/:skuId',
  component: Detail,
  meta: { showFooter: false }
}, {
  path: '/addcartsuccess',
  name: 'addcartsuccess',
  component: AddCartSuccess,
  meta: { showFooter: true }
},{
  path:'/shopcart',
  component:ShopCart,
  meta:{showFooter: true}
}]