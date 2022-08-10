const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  // vue-cli-service serve --open
  devServer: {
    host: 'localhost',
    port: 8080
  },
  // productionSourceMap:false
})
