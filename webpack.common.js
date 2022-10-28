const path = require("path");
const fs = require('fs');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const ProgressBarPlugin = require("progress-bar-webpack-plugin");
const { VueLoaderPlugin } = require('vue-loader');
const miniCssExtractPlugin = require("mini-css-extract-plugin")
const chalk = require("chalk");
const WEBPACK_ENV = process.env.WEBPACK_ENV
module.exports = {
    entry: "./src/render/index",
    output: {
        filename: "js/[name].[contenthash:8].js", // 用于输出文件的文件名
        path: path.resolve(__dirname, "./dist"), // 目标输出目录 path 的绝对路径
        publicPath: "/",
    },
    // 开发环境
    mode: "development",
    module: {
        strictExportPresence: true,
        rules: [
            {
                test: /\.s?css$/,
                use: [
                    WEBPACK_ENV === "development" ?
                        "style-loader"
                        :
                        miniCssExtractPlugin.loader,
                    "css-loader",
                    'postcss-loader',
                ]
            },
            {
                test: /\.less$/,
                use: [
                    WEBPACK_ENV === "development" ?
                        "style-loader"
                        :
                        miniCssExtractPlugin.loader,
                    "css-loader",
                    'less-loader',
                    'postcss-loader',
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
    resolve: {
        /** 设置别名*/
        alias: {
            "@router": path.resolve(__dirname, "./src/router/"),
            "@page": path.resolve(__dirname, "./src/page/"),
            "@theme": path.resolve(__dirname, "./src/theme/"),
            "@store": path.resolve(__dirname, "./src/store/"),
            "@type": path.resolve(__dirname, "./src/type/"),
            "@apiCall": path.resolve(__dirname, "./src/apiCall/"),
            "@common": path.resolve(__dirname, "./src/common/"),
        },
        /**引入这些文件可以不带后缀 */
        extensions: [
            '.tsx', '.ts', '.mjs', '.cjs', '.js', '.jsx',
            /**以下这些不管写没写，不带后缀都会报错（暂时还没找到原因），所以我暂时注释了 */
            // '.vue', '.scss', '.sass', '.css', '.json'
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: path.resolve(__dirname, "./src/index.html"),
            inject: true,
            favicon: path.resolve('favicon.ico'),
        }),

        new VueLoaderPlugin(),
        new CleanWebpackPlugin(),
        new ProgressBarPlugin({
            format: `:msg [:bar] ${chalk.green.bold(":percent")} (:elapsed s)`,
        }), // 进度条

    ].concat(notDevPlug()),
}


function notDevPlug() {
    console.log()
    if (WEBPACK_ENV !== "development") {
        return [
            /**分离css */
            new miniCssExtractPlugin(
                {
                    filename: "css/[name].[contenthash:8].css",
                    chunkFilename: "css/[name].[contenthash:8].css",
                }
            ),
        ]
    }
    return []
}

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