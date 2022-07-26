//对axios二次封装
import axios from "axios"
//引入进度条,nprogress是一个对象，start:进度条开始 done:进度条结束
import nprogress from "nprogress"
//引入进度条样式
import 'nprogress/nprogress.css'

//1.利用axios方法的create，创建axios实例
//2.requst就是axios
const requests = axios.create({
  baseURL: 'http://gmall-h5-api.atguigu.cn/api',
  timeout: 6000
})
//请求拦截器：发送请求之前
requests.interceptors.request.use((config) => {
  //config:配置对象，对象里面有一个属性很重要，header请求头
  //进度条开始动
  nprogress.start()
  return config
})
//响应拦截器
requests.interceptors.response.use((res) => {
  //成功的回调：服务器响应数据回来以后,响应拦截器可以检测到
  //进度调结束
  nprogress.done()
  return res.data
}, (error) => {
  //响应失败的回调函数
  return Promise.reject(new Error('faile'))
})

export default requests