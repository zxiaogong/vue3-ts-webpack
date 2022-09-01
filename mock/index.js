/*************** mock模拟后端响应数据 ***************** */
const express = require('express');    //引入express模块
const app = express();                //实例化express
const path = require("path");
const fs = require('fs');
const bodyParser = require('body-parser')

console.log("✨✨✨✨✨✨✨✨✨✨✨ start mock ✨✨✨✨✨✨✨✨✨✨✨")



//请求响应头
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    res.header('Access-Control-Allow-Credentials', "true");// //允许跨域后session的存取
    next();
});
/**第三方插件，接收post数据 */
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
// app.use(bodyParser.json())

/**接口路由 */
app.get('/home', async (req, res) => {
    /** get请求参数可通过 req.query 获取 */
    /** post请求参数可通过 req.body 获取 */
    console.log(req.query)
    /**读取json文件并响应 */
    res.send(await getJson("test.json"))
});



/**
 * 监听8090端口
 */
app.listen('8090');

/**读取json文件 */
function getJson(filePath) {
    return new Promise((res) => {
        fs.readFile(path.resolve(__dirname, filePath), 'utf8', (err, data) => {
            if (err) {
                res({
                    code: 500,
                    msg: "请求错误，请联系管理员",
                    data: {}
                })
            }
            if (data) {
                res(data)
            }
        })
    })
}