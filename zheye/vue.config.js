// import { Configuration } from "webpack";

/**
 * @type {Configuration}
 */
module.exports = {
  lintOnSave: false,
  chainWebpack: config => {
    config.resolve.symlinks(true) // 修复热更新失效
  },
  devServer: {
    open: false, // auto open brower 项目启动后自动打开浏览器...
    disableHostCheck: false,
    host: '0.0.0.0',
    // port: 8099, // 修改端口号
    overlay: {
      //  当出现编译器错误或警告时，在浏览器中显示全屏覆盖层
      warnings: false,
      errors: true
    },
    https: false,
    hotOnly: true, // See https://github.com/vuejs/vue-cli/blob/dev/docs/cli-service.md#configuring-proxy
    proxy: {
      // string | Object 解决跨域问题
      '/api': {
        target: 'http://api.vikingship.xyz', // 对应自己的 跨域地址 即请求的后端地址
        changeOrigin: true
        // ws: true
        // pathRewrite: {
        //   '^/api': ''
        // }
      }
    }
  }
}
