// 封装请求
import axios, { AxiosRequestConfig } from 'axios'
/**当前开发环境 */
const NODE_ENV = process.env.NODE_ENV

// 请求
const http = axios.create({
    /**生产环境：127.0.0.1，开发环境：locahost */
    baseURL: NODE_ENV === "development" ? "http://127.0.0.1:8090" : "http://locahost:8090",
    /**超时时间 */
    timeout: 10000,
    //返回数据类型
    responseType: 'json',
    headers: { 'content-type': 'application/x-www-form-urlencoded;charset=UTF-8' }
})
// 请求拦截
http.interceptors.request.use((config: AxiosRequestConfig) => {
    /**发送请求前可进行设置,如token */
    // let token = localStorage.getItem('token') || ''
    // config?.headers.Authorization = token
    return config
}, err => {
    console.log(err);
})

// 响应拦截
http.interceptors.response.use(res => {
    return res
}, err => {
    return {
        ...err,
        data: {
            msg: "接口请求错误，请联系管理员。"
        }
    }
})
// 返出
export default http