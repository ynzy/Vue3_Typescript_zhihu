// import { Configuration } from "webpack";


/**
 * @type {Configuration}
 */
module.exports = {
  lintOnSave: false,
  chainWebpack: (config) => {
    config.resolve.symlinks(true) // 修复热更新失效
  },
  devServer: {
    open: false, // 启动后打开浏览器
    overlay: {
      //  当出现编译器错误或警告时，在浏览器中显示全屏覆盖层
      warnings: false,
      errors: true
    },
    hotOnly: true,
  },
}