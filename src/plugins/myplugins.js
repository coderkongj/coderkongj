let myPlugins = {}

myPlugins.install = function (Vue, options) {
  // 全局指令
  // console.log(options);
  // Vue.component
  // Vue.directive
  // Vue.prototype
  // ...
  Vue.directive(options.name, (element, params) => {// 第一个参数传入name(upper)，第二个传入回调,回调函数的两个参数：绑定指令的元素；包含value的对象
    element.innerHTML = params.value.toUpperCase()
  })

}

export default myPlugins