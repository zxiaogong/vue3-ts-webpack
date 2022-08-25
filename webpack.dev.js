const { merge } = require("webpack-merge");
const webpack = require("webpack");
const common = require("./webpack.common");
// 开发环境
module.exports = merge(common, {
    devtool: "eval-cheap-module-source-map",
    cache: {
        type: 'filesystem', // 使用文件缓存
    },
    // 打包环境，默认开发
    mode: "development",
    devServer: {
        hot: true, //热更新
        open: true, // 是否打开默认浏览器 
        historyApiFallback: true, // 当使用 [HTML5 History API] 时，任意的 `404` 响应被替代为 `index.html`
        port: 9000, // 启动的端口
        compress: true, // 是否开启代码压缩
    },
});


