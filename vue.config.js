const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  // 关闭sourceMap
  productionSourceMap: false,
  transpileDependencies: true,
  // 关闭esLint
  lintOnSave: false,
  devServer: {
    proxy: {
      '/api': {
        target: 'http://gmall-h5-api.atguigu.cn'
      }
    }
  }
})
