const { merge } = require("webpack-merge");
const common = require("./webpack.common");
const path = require("path");
const fs = require('fs');
const UglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin');
/** 
 * 使用 miniCssExtractPlugin 会分离出js和css,
 * 没有使用也能打包成功，但是会出现清一色js，
 * 开发环境使用的话，会出现更改样式后热加载无效的问题。
 *  */
const miniCssExtractPlugin = require("mini-css-extract-plugin")
// 生产环境
module.exports = merge(common, {
    devtool: "eval-cheap-module-source-map",
    cache: {
        type: 'filesystem', // 使用文件缓存
    },
    // 生成环境
    mode: "production",
    module: {
        strictExportPresence: true,
        rules: [
            {
                test: /\.s?css$/,
                use: [
                    {
                        loader: miniCssExtractPlugin.loader,
                        options: {
                            // 当前的css所在的文件相对于打包后的根路径dist的相对路径
                            publicPath: '../'
                        }
                    },
                    "css-loader",
                    'postcss-loader',
                ]
            },
            {
                test: /\.less$/,
                use: [
                    {
                        loader: miniCssExtractPlugin.loader,
                        options: {
                            // 当前的css所在的文件相对于打包后的根路径dist的相对路径
                            publicPath: '../'
                        }
                    },
                    "css-loader",
                    'less-loader',
                ]
            },
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: [
                    tsLoader()
                ],
            },
            {
                test: /\.tsx$/,
                exclude: /node_modules/,
                use: [
                    "babel-loader", // 代码换成ES5 的代码来做浏览器兼容
                    tsLoader()
                ],
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    "babel-loader", // 代码换成ES5 的代码来做浏览器兼容
                ],
            },
            {
                test: /\.vue$/,
                use: [
                    "vue-loader",
                ],
            },
            {
                test: /\.(png|jpe?g|gif|svg|mp3|mp4|mov|wav|wma|avi|flv)$/,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            limit: 1000,
                            name: "./images/[hash][query].[ext]",
                            esModule: false
                        }
                    }
                ],
                type: 'javascript/auto'
            },

        ]
    },
    plugins: [
        /**打包，压缩代码用 */
        new UglifyjsWebpackPlugin(),
        new miniCssExtractPlugin({
            filename: "css/[name].[contenthash:8].css"
        }),
    ]
});

function tsLoader() {
    return {
        loader: require.resolve('ts-loader'),
        options: {
            appendTsxSuffixTo: [
                /\.vue$/
            ],
            transpileOnly: true,
            configFile: path.join(__dirname, 'tsconfig.json')
        }
    }
}

